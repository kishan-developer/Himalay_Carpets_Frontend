import axios from "axios";
import axiosInstance from "./apiConnector";
import { handleAxiosError } from "./handleAxiosError";

const uploadMedia = async (files, data) => {
    // console.log("information-----------", data); // undefined
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    formData.append("name", data.name);

    try {
        console.log("formData ------------- ", formData);
        const res = await axiosInstance.post("/upload", formData);
        return res.data?.data;
    } catch (err) {
        console.error("Upload failed:", err);
        handleAxiosError(err);
        return null;
    }
};

export default uploadMedia;
