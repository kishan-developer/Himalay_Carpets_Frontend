import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression"; // help to image size compress
import { FiImage, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import uploadMedia from "../../../utils/uploadMedia";
import productApis from "../../../services/api/admin/product/product.api";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { setProducts } from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";
import { useEffect } from "react";
import { setFabrics } from "../../../redux/slices/fabricSlice";

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.categories || []);
    const fabrics = useSelector((s) => s.fabrics);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

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

    const dispatch = useDispatch();
    // Fetch Fabrics On First load

    // Handle file input and generate preview
    // const handleImageUpload = (e) => {
    //     const files = Array.from(e.target.files);
    //     console.log("files", files)
    //     setImageFiles(files);
    //     const previews = files.map((file) => URL.createObjectURL(file));
    //     // console.log("previews", previews)
    //     setImagePreviews(previews);
    // };


    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const compressedFiles = [];

        for (let file of files) {
            const options = {
                maxSizeMB: 0.9,            // 👈 target ≈ 900KB
                maxWidthOrHeight: 1800,    // reduces size but keeps quality
                initialQuality: 0.7,       // adjust for consistent <900KB
                useWebWorker: true,
            };

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


    // Remove a single image from preview & file list
    const handleRemoveImage = (index) => {
        const newFiles = [...imageFiles];
        const newPreviews = [...imagePreviews];
        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);
        setImageFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    // Form submit handler
    const onSubmit = async (data) => {
        // console.log(data);
        if (imageFiles.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        let totalSize = 0;
        imageFiles.forEach(file => {
            // totalSize += file.size;
            // console.log("files Size", file.size)
        });

        if (totalSize > 50 * 1024 * 1024) { // 50MB total limit example
            toast.error("Total image size cannot exceed 50MB.");
            return;
        }

        const toastId = toast.loading("Please wait...");

        try {
            const information = {
                type: "products",
                identifier:
                    data.productId ||
                    (data.name ? data.name.trim().replace(/\s+/g, "-") : null) ||
                    "product",
            };

            const imagesUrls = await uploadMedia(imageFiles, information);

            // console.log("imagesUrls", imagesUrls)

            if (!imagesUrls) return;

            data.images = imagesUrls;

            const products = await productApis.createProduct(data);
            dispatch(setProducts(products));

            reset();
            setImageFiles([]);
            setImagePreviews([]);
            toast.success("Product created successfully");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleCancel = () => {
        reset();
        setImageFiles([]);
        setImagePreviews([]);
        navigate(-1);
    };

    const textureOptions = [
        { value: "Soft", label: "Soft" },
        { value: "Medium", label: "Medium" },
        { value: "Rough", label: "Rough" },
    ];


    const styleOptions = [
        { value: "rectangle", label: "Rectangle" },
        { value: "square", label: "Square" },

    ];

    const materialOptins = [
        { value: "n.z.wool+silk", label: "N.Z. Wool + Silk" },
        { value: "h/s_n.z._wool", label: "H/S N.Z. Wool" },
        { value: "h/s_n.z._wool+silk", label: "H/S N.Z. Wool + Silk" },
        { value: "imported_wool", label: "Imported Wool" },
        { value: "h/s_n.z._wool+hand_karted_wool", label: "H/S N.Z. Wool + Hand Karted Wool" },
        { value: "h/s_n.z_3_ply_wool", label: "H/S N.Z. 3 Ply Wool" },

        { value: "n.z_wool", label: "N.Z. Wool" },
        { value: "hand_karted_wool", label: "Hand Karted Wool" },

        { value: "imported_wool+viscose", label: "Imported Wool + Viscose" },
        { value: "h/s_n.z_wool+jasmine_silk", label: "H/S N.Z. Wool + Jasmine Silk" },
        { value: "n.z_wool", label: "Imported Wool + Viscose" },
        { value: "n.z_wool", label: "N.Z. Wool" },
        { value: "n.z_wool", label: "N.Z. Wool" },
    ]

    // Example size options; you may also choose free text
    const sizeOptions = [

        { value: "1.5x2 ft", label: "1.5x2 ft" },
        { value: "2x2 ft", label: "2x2 ft" },
        { value: "2x3 ft", label: "2x3 ft" },
        { value: "2.5x4 ft", label: "2.5x4 ft" },
        { value: "4x6 ft", label: "4x6 ft" },
        { value: "5x8 ft", label: "5x8 ft" },
        { value: "6x9 ft", label: "6x9 ft" },
        { value: "8x10 ft", label: "8x10 ft" },
        { value: "8x11 ft", label: "8x11 ft" },
        { value: 'others', label: "others" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-4 sm:p-6 max-w-2xl mx-auto"
        >
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                Add Product
            </h3>

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

                {/* Price */}
                <InputField
                    label="Price"
                    name="price"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Price is required",
                        min: { value: "", message: "Must be positive" },
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

                <SelectField
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    rules={{ required: "Category is required" }}
                    options={categories.map((cat) => ({
                        value: cat._id || cat.value,
                        label: cat.name || cat.label,
                        disabled: cat.name == "all" ? true : false,
                    }))}
                />

                {/* Image Upload with Remove/Edit */}
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
                                <div key={i} className="relative w-16 h-16">
                                    <img
                                        src={src}
                                        alt={`Preview ${i}`}
                                        className="w-full h-full object-cover rounded-md"
                                        onClick={() => openModal(src)} // open modal on click
                                    />
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

                {/*  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* <SelectField
                        label="Texture"
                        name="texture"
                        register={register}
                        errors={errors}
                        rules={{ required: "Texture is required" }}
                        options={textureOptions}
                    /> */}

                    <InputField
                        label="Pile Thickness (e.g., 2/7 inch)"
                        name="pileThickness"
                        register={register}
                        errors={errors}
                    // rules={{ required: "Pile thickness is required" }}
                    />

                    <SelectField
                        label="Size"
                        name="size"
                        register={register}
                        errors={errors}
                        // rules={{ required: "Size is required" }}
                        options={sizeOptions}
                    />
                </div>

                {/* Size & Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* You can switch to InputField if sizes vary too much */}

                    <SelectField
                        label="Style"
                        name="style"
                        register={register}
                        errors={errors}
                        // rules={{ required: "Style is required" }}
                        options={styleOptions}
                    />

                    {/* <InputField
                        label="Material"
                        name="fabric"
                        register={register}
                        errors={errors} */}
                    {/* // rules={{ required: "Technique is required" }} */}
                    {/* /> */}
                    <SelectField
                        label="Meterial"
                        name="fabric"
                        register={register}
                        errors={errors}
                        options={fabrics?.map((cat) => ({
                            value: cat._id || cat.value,
                            label: cat.title || cat.label,
                        }))}
                    />
                </div>
                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* <SelectField
                        label="Meterial"
                        name="fabric"
                        register={register}
                        errors={errors}
                        // rules={{ required: "Fabric is required" }}
                        options={fabrics?.map((cat) => ({
                            value: cat._id || cat.value,
                            label: cat.title || cat.label,
                        }))}
                    /> */}
                    <InputField
                        label="Technique"
                        name="technique"
                        register={register}
                        errors={errors}
                    // rules={{ required: "Technique is required" }}
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
                    {/* <InputField
                    label="Assurance"
                    name="assurance"
                    register={register}
                    errors={errors}
                    rules={{ required: "Assurance is required" }}
                /> */}
                </div>

                <InputField
                    label="HSN Code"
                    name="hsnCode"
                    register={register}
                    value="57011010"
                    errors={errors}
                    rules={{
                        required: "HSN Code is required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "HSN Code must contain only numbers",
                        },
                    }}
                />
                {/* Offer Section */}
                <SelectField
                    label="Offer"
                    name="isOfferAplied"
                    register={register}
                    errors={errors}
                    value={false}
                    // rules={{ required: "Offer is required" }}
                    options={[
                        { name: "Yes", value: true },
                        { name: "No", value: false },
                    ].map((cat) => ({
                        value: cat._id || cat.value,
                        label: cat.name || cat.label,
                        disabled: cat.name == "all" ? true : false,
                    }))}
                />
                {/* Submit & Cancel Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        className="bg-neutral-950 h-12 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full"
                    >
                        Save
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

export default AddProduct;
