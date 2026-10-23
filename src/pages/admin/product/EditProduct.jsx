import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression"; // help to image size compress
import { FiImage, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import uploadMedia from "../../../utils/uploadMedia";
import productApis from "../../../services/api/admin/product/product.api";
import { setProducts } from "../../../redux/slices/productSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { useOffer } from "../../../hooks/useOffer";

/**
 * EditProduct
 * - UI kept identical to AddProduct
 * - Prefills values from product in store (using id param)
 * - Shows existing images as previews and allows removing them
 * - Allows adding new images; only new files are uploaded on save
 * - Selects populate automatically (options are strings so reset() matches)
 */
const EditProduct = () => {
    const { id } = useParams(); // product id from route
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    // global store slices
    const categories = useSelector((state) => state.category.categories || []);
    const fabrics = useSelector((s) => s.fabrics || []);
    const { products } = useSelector((s) => s.product);
    const product = products?.find((p) => p._id === id);
    const offers = useOffer();

    // Image management
    const [originalImages, setOriginalImages] = useState([]); // URLs that come with product
    const [imageFiles, setImageFiles] = useState([]); // newly added File objects
    const [imagePreviews, setImagePreviews] = useState([]); // show both original URLs & new previews

    // keep initial data snapshot for change detection
    const [initialData, setInitialData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const openModal = (src) => {
        setCurrentImage(src);
        setModalOpen(true);
    };

    const closeModal = () => {
        setCurrentImage(null);
        setModalOpen(false);
    };

    const watchedFields = watch();

    // --- Helper: build select option arrays (values are strings) ---
    const categoryOptions = (categories || []).map((cat) => ({
        value: String(cat._id ?? cat.value ?? ""),
        label: cat.name ?? cat.label ?? "",
        disabled: cat.name === "all",
    }));

    const fabricOptions = (fabrics || []).map((f) => ({
        value: String(f._id ?? f.value ?? ""),
        label: f.title ?? f.label ?? "",
    }));

    const textureOptions = [
        { value: "Soft", label: "Soft" },
        { value: "Medium", label: "Medium" },
        { value: "Rough", label: "Rough" },
    ];

    const styleOptions = [
        { value: "rectangle", label: "Rectangle" },
        { value: "square", label: "Square" },
    ];

    const sizeOptions = [
        { value: "1.5x2 ft", label: "1.5x2 ft" },
        { value: "2x3 ft", label: "2x3 ft" },
        { value: "2x2 ft", label: "2x2 ft" },
        { value: "2.5x4 ft", label: "2.5x4 ft" },
        { value: "4x6 ft", label: "4x6 ft" },
        { value: "5x8 ft", label: "5x8 ft" },
        { value: "6x9 ft", label: "6x9 ft" },
        { value: "8x10 ft", label: "8x10 ft" },
        { value: "8x11 ft", label: "8x11 ft" },
        { value: 'others', label: "others" }
    ];

    const offerDiscountOptions = [
        { value: "0", label: "No Offer" },
        ...(offers?.map((of) => ({ value: String(of.discount), label: `discount ${of.discount}%` })) || []),
    ];

    // -------------------------------
    // Prefill form when product (and options) are available
    // Important: convert option values to strings so reset() matches option values
    // -------------------------------
    useEffect(() => {
        if (!isEdit) return;

        // Wait until product exists in store
        if (!product) return;

        console.log("Product", product)

        const init = {
            name: product.name ?? "",
            description: product.description ?? "",
            price: product.price ?? 0,

            category: String(product.category?._id ?? product.category ?? ""),
            stock: product.stock ?? 0,
            fabric: String(product?.fabric?._id ?? product?.fabric ?? ""), // fabric as material
            texture: product.texture ?? "",
            pileThickness: product.pileThickness ?? "", 
            material: product.fabric.title ?? "", 
            size: product.size ?? "",
            color: product.color ?? "",
            weight: product.weight ?? "",
            assurance: product.assurance ?? "",
            hsnCode: product.hsnCode ?? "5507",
            style: product?.style ?? "",
            isOfferAplied: String(product?.isOfferAplied ?? false), // store as string for select match
            offerDiscount: String(product?.offerDiscount ?? 0), // store as string for select match
            technique: product.technique ?? "",
        };

        // reset will populate all registered inputs/selects
        reset(init);
        setInitialData(init);

        // prepare images: original URLs from product
        const orig = Array.isArray(product.images) ? [...product.images] : [];
        setOriginalImages(orig);
        setImagePreviews(orig); // show existing URLs as previews
    }, [isEdit, product, reset]);

    // -------------------------------
    // Handle image selection (append new files in edit mode)
    // -------------------------------
    // const handleImageUpload = (e) => {
    //     const files = Array.from(e.target.files || []);
    //     if (!files.length) return;

    //     console.log("files in edit product", files)

    //     // append newly selected files
    //     setImageFiles((prev) => [...prev, ...files]);

    //     // create object URLs for previews and append
    //     const newPreviews = files.map((f) => URL.createObjectURL(f));
    //     setImagePreviews((prev) => [...prev, ...newPreviews]);
    // };



    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const compressedFiles = [];

        for (let file of files) {
            // const options = {
            //     maxSizeMB: 0.9,            // 👈 target ≈ 900KB
            //     maxWidthOrHeight: 1800,    // reduces size but keeps quality
            //     initialQuality: 0.7,       // adjust for consistent <900KB
            //     useWebWorker: true,
            // };

            const options = {
                maxSizeMB: 3,             // allow up to 3 MB
                maxWidthOrHeight: 6000,    // keep high resolution
                initialQuality: 1.0,      // very high quality
                useWebWorker: true,
            };

            // const options = {
            //     maxSizeMB: 20,            // allow up to 20 MB
            //     maxWidthOrHeight: 6000,   // keep full resolution (DSLR size)
            //     initialQuality: 1.0,      // highest quality possible
            //     useWebWorker: true,
            // };

            try {
                const compressedFile = await imageCompression(file, options);
                compressedFiles.push(compressedFile);

                // console.log(
                //     "Compressed:",
                //     compressedFile.name,
                //     (compressedFile.size / 1024).toFixed(2) + " KB"
                // );
            } catch (error) {
                console.error("Compression error:", error);
                compressedFiles.push(file);
            }
        }

        // Update state with compressed files
        setImageFiles((prev) => [...prev, ...compressedFiles]);

        // Preview URLs
        const newPreviews = compressedFiles.map((f) =>
            URL.createObjectURL(f)
        );
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };


    // -------------------------------
    // Remove an image preview (existing or newly added)
    // - If index < originalImages.length -> remove from originalImages (URL)
    // - else -> remove from imageFiles (newly added)
    // -------------------------------
    const handleRemoveImage = (index) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));

        if (index < originalImages.length) {
            setOriginalImages((prev) => prev.filter((_, i) => i !== index));
        } else {
            const fileIndex = index - originalImages.length;
            setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex));
        }
    };

    // Revoke object URLs on unmount to avoid memory leak
    useEffect(() => {
        return () => {
            imagePreviews.forEach((p) => {
                // only revoke object urls created from files (they usually start with "blob:")
                if (typeof p === "string" && p.startsWith("blob:")) {
                    URL.revokeObjectURL(p);
                }
            });
        };
        // we intentionally do not add imagePreviews as dependency to avoid frequent revokes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // -------------------------------
    // Detect changes (keeps your original behavior)
    // -------------------------------
    const isFormChanged = () => {
        if (!initialData) return true; // if no initial snapshot, consider changed
        for (let key in initialData) {
            if (String(watchedFields[key]) !== String(initialData[key])) {
                return true;
            }
        }
        if (imageFiles.length > 0) return true; // new files added
        if (originalImages.length !== (product?.images?.length || 0)) return true; // existing images removed
        return false;
    };

    // -------------------------------
    // Submit handler: upload only newly added files, merge with remaining original URLs
    // -------------------------------
    const onSubmit = async (data) => {
        if (!isFormChanged()) {
            toast.error("No changes detected.");
            return;
        }

        //  Show image sizes before upload
        // imageFiles.forEach((file) => {
        //     const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        //     toast.error(`${file.name} - ${sizeInMB} MB`);
        // });


        if (originalImages.length === 0 && imageFiles.length === 0) {
            // don't allow saving with no images
            toast.error("Please upload at least one image.");
            return;
        }


        setIsSubmitting(true);
        const toastId = toast.loading("Please wait...");

        try {
            // upload only new files
            let uploadedUrls = [];
            if (imageFiles.length > 0) {
                const information = {
                    type: "products",
                    identifier: data.productId || data.name || product?.name,
                };

                // console.log("imageFiles", imageFiles)
                uploadedUrls = await uploadMedia(imageFiles, information);
            }

            const newUrls = Array.isArray(uploadedUrls) ? uploadedUrls : uploadedUrls ? [uploadedUrls] : [];
            const finalImages = [...originalImages, ...newUrls];

            // prepare payload (convert strings back to expected types)
            const prepared = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                offerDiscount: Number(data.offerDiscount ?? 0),
                isOfferAplied: data.isOfferAplied === "true" || data.isOfferAplied === true,
                // keep fabric & category as IDs (strings) — your backend expects IDs
                fabric: data.fabric,
                category: data.category,
                images: finalImages,
            };

            const updatedProducts = await productApis.updateProduct(prepared, id);
            dispatch(setProducts(updatedProducts));
            toast.success("Product updated successfully");
            navigate(-1);
        } catch (err) {
            handleAxiosError(err);
        } finally {
            toast.dismiss(toastId);
            setIsSubmitting(false);
        }
    };

    // -------------------------------
    // Cancel -> reset to initial snapshot (if present) and navigate back
    // -------------------------------
    const handleCancel = () => {
        if (initialData) {
            reset(initialData);
            setOriginalImages(Array.isArray(product?.images) ? [...product.images] : []);
            setImageFiles([]);
            setImagePreviews(Array.isArray(product?.images) ? [...product.images] : []);
        } else {
            reset();
            setOriginalImages([]);
            setImageFiles([]);
            setImagePreviews([]);
        }
        navigate(-1);
    };

    // If product not found in store, show fallback UI
    if (!product) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 text-sm">Product not found.</p>
            </div>
        );
    }

    // -------------------------------
    // Render: kept identical to your AddProduct UI/structure
    // -------------------------------
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-4 sm:p-6 max-w-2xl mx-auto"
        >
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">Edit Product</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Basic Fields */}
                <InputField
                    label="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    rules={{ required: "Product name is required" }}
                />
                <InputField
                    label="Description"
                    name="description"
                    register={register}
                    errors={errors}
                    rules={{ required: "Description is required" }}
                />

                {/* Price & Price per sqft */}
                <InputField
                    label="Price"
                    name="price"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Price is required",
                        min: { value: 0, message: "Must be positive" },
                    }}
                />



                <InputField
                    label="Stock"
                    name="stock"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Stock is required",
                        min: { value: 0, message: "Must be positive" },
                    }}
                />


                {/* Category select (options built above) */}
                <SelectField
                    value={product?.category}
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    rules={{ required: "Category is required" }}
                    options={categoryOptions}
                />

                {/* Image Upload with Remove */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <FiImage size={16} /> Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-800"
                    />
                    {imagePreviews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews.map((src, i) => (
                                <div key={i} className="relative w-60 h-40">
                                    <img
                                        onClick={() => openModal(src)} // open modal on click
                                        src={src} alt={`Preview ${i}`} className="w-full h-full object-cover rounded-md" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute top-0 right-0 bg-white rounded-full p-0.5 shadow-md"
                                    >
                                        <FiX size={12} />

                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Modal */}
                    {modalOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                            onClick={closeModal} // close when clicking outside
                        >
                            <div
                                className="relative bg-white rounded-md p-2 max-w-3xl max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                            >
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow-md"
                                >
                                    <FiX size={20} />
                                </button>
                                <img
                                    src={currentImage}
                                    alt="Preview Large"
                                    className="max-w-full max-h-[80vh] object-contain rounded-md"
                                />
                            </div>
                        </div>
                    )}
                </div>




                {/* Texture & Pile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* <SelectField
                        label="Texture"
                        name="texture"
                        value={product?.texture}
                        register={register}
                        errors={errors}
                        rules={{ required: "Texture is required" }}
                        options={textureOptions}
                    /> */}

                    <InputField
                        label="Pile Thickness (e.g., 2/7 inch)"
                        value={product?.pileThickness}
                        name="pileThickness"
                        register={register}
                        errors={errors}
                        rules={{ required: "Pile thickness is required" }}
                       
                    />

                    <SelectField
                        label="Size"
                        name="size"
                        value={product?.size}
                        register={register}
                        errors={errors}
                        rules={{ required: "Size is required" }}
                        options={sizeOptions}
                    />

                </div>

                {/* Size & Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <SelectField
                        label="Style"
                        name="style"
                        value={product?.style}
                        register={register}
                        errors={errors}
                        rules={{ required: "Style is required" }}
                        options={styleOptions}
                    />
{/* 
                    <InputField
                        label="Material"
                        name="fabric"
                        register={register}
                        errors={errors} */}
                    {/* // rules={{ required: "Technique is required" }}
                    /> */}

                    <SelectField
                        label="Meterial"
                        name="fabric"
                        register={register}
                        value={product?.fabric}
                        errors={errors}
                        rules={{ required: "Fabric is required" }}
                        options={fabricOptions}
                    />


                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <InputField
                        label="Technique"
                        name="technique"
                        register={register}
                        errors={errors}
                        rules={{ required: "Technique is required" }}
                    />

                    <InputField
                        label="Color"
                        name="color"
                        register={register}
                        errors={errors}
                        rules={{ required: "Color is required" }}
                    />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <InputField
                        label="Weight (KG)"
                        name="weight"
                        register={register}
                        errors={errors}
                        rules={{ required: "Weight is required" }}
                    />

                </div>

                {/* <InputField
                    label="Assurance"
                    name="assurance"
                    register={register}
                    errors={errors}
                    rules={{ required: "Assurance is required" }}
                /> */}
                <InputField
                    label="HSN Code"
                    name="hsnCode"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "HSN Code is required",
                        pattern: { value: /^[0-9]+$/, message: "HSN Code must contain only numbers" },
                    }}
                />

                {/* Offer fields (kept like your Add: select values are strings) */}
                <SelectField
                    label="Offer Discount"
                    name="offerDiscount"
                    register={register}
                    value={product?.offerDiscount}
                    errors={errors}
                    options={offerDiscountOptions}
                />

                <SelectField
                    label="Offer"
                    name="isOfferAplied"
                    register={register}
                    value={product?.isOfferAplied}
                    errors={errors}
                    options={[
                        { value: "true", label: "Yes" },
                        { value: "false", label: "No" },
                    ]}
                />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
                        className="bg-neutral-950 text-white px-4 py-2 h-12 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full"
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditProduct;
