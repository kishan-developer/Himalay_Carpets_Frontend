import axiosInstance from "../../../utils/apiConnector";
import categoryEndpoints from "../../endpoints/public/category.endpoints";

const categoriesApi = {
    getAllCategories: async () => {
        const res = await axiosInstance.get(categoryEndpoints.getAllCategory);
        return res?.data?.data;
    },
    getCategoryById: async (categoryId) => {
        const res = await axiosInstance.get(
            categoryEndpoints.getCategoryById(categoryId)
        );
        return res?.data?.data;
    },
};

export default categoriesApi;
