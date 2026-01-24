import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import categoryApis from "../../../services/api/admin/product/category.api";
import { setCategories } from "../../../redux/slices/categorySlice";
import { toast } from "react-hot-toast";
import { handleAxiosError } from "../../../utils/handleAxiosError";

function AddCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        console.log("data", data)
        const toastId = toast.loading("Please Wait...");

        try {
            const updatedCategories = await categoryApis.createCategory(data);
            toast.success("Category created successfully");
            dispatch(setCategories(updatedCategories));
            navigate("/admin/categories");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
        
    });

    return (
        <motion.div className="max-w-xl mx-auto p-6 bg-white ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 uppercase tracking-wide">
                    Add Category
                </h2>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    rules={{ required: "Category name is required" }}
                />
                <InputField
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

export default AddCategory;
