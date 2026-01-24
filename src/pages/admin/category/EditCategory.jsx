// EditCategory.jsx
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import { toast } from "react-hot-toast";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import categoryApis from "../../../services/api/admin/product/category.api";
import { setCategories } from "../../../redux/slices/categorySlice";
import { useEffect } from "react";

function EditCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const categories = useSelector((state) => state.category.categories || []);
    const category = categories.find((c) => c._id === id);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (category) {
            reset({ name: category.name, description: category.description });
        }
    }, [category, reset]);

    const hasChanged = (newData, oldData) =>
        newData.name?.trim() !== oldData.name?.trim() ||
        newData.description?.trim() !== oldData.description?.trim();

    const onSubmit = handleSubmit(async (data) => {
        if (!hasChanged(data, category)) {
            toast.error("No changes detected");
            return;
        }
        const toastId = toast.loading("Please Wait...");
        try {
            const updatedCategories = await categoryApis.updateCategory(
                data,
                id
            );
            toast.success("Category updated successfully");
            dispatch(setCategories(updatedCategories));
            navigate("/admin/categories");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    });

    if (!category) return <p className="text-center">Category not found</p>;

    return (
        <motion.div className="max-w-xl mx-auto p-6 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 uppercase tracking-wide">
                    Edit Category
                </h2>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    value={category?.name}
                    rules={{ required: "Category name is required" }}
                />
                <InputField
                    value={category?.description}
                    label="Description"
                    name="description"
                    register={register}
                    errors={errors}
                    rules={{ required: "Description is required" }}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        className="bg-neutral-950 h-12 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
}

export default EditCategory;
