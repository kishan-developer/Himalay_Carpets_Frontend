import toast from "react-hot-toast";

export const handleAxiosError = (
    error,
    fallbackMessage = "Something went wrong"
) => {
    const message =
        error?.response?.data?.message || error?.message || fallbackMessage;

    // Show toast error
    toast.error(message);

    // Optional: Log the full error to console for debugging
    if (process.env.NODE_ENV === "development") {
        console.error("Axios Error:", error);
    }

    return message; // Optional: return the message if you want to use it
};
