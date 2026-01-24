import axiosInstance from "../../../../utils/apiConnector";
import adminUserEndpoints from "../../../endpoints/admin/product/user.endpoints";

const adminUserApis = {
    getAllUsers: async () => {
        const res = await axiosInstance.get(adminUserEndpoints.getAllUser);
        return res?.data?.data;
    },
};

export default adminUserApis;
