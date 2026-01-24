import { useEffect, useState } from "react";
import { FiMail, FiDownload } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../utils/apiConnector";
import * as XLSX from "xlsx";

export default function AdminNewsletterEmails() {
    const [emails, setEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get("/admin/newsletters");
                setEmails(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load newsletter emails.");
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const exportToExcel = () => {
        if (emails.length === 0) return;

        // Prepare data
        const worksheet = XLSX.utils.json_to_sheet(
            emails.map((item, index) => ({
                SNo: index + 1,
                Email: item?.email || "",
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

        // Create and download file
        XLSX.writeFile(workbook, "newsletter_subscribers.xlsx");
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Newsletter Subscribers
                </h2>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        Total: {emails.length}
                    </span>
                    {emails.length > 0 && (
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                            <FiDownload /> Export
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
            ) : emails?.length === 0 ? (
                <p className="text-gray-600">No subscribers found.</p>
            ) : (
                <ul className="bg-white border border-gray-200 rounded-lg divide-y max-h-80 overflow-y-auto">
                    {emails.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                        >
                            <FiMail className="text-gray-500" />
                            {item?.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
