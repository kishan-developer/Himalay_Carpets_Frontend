import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosInstance from "../../../utils/apiConnector";
import CouponForm from "./CouponForm";
import { toast } from "react-hot-toast";

/**
 * AdminCoupons
 * — Fetches and displays all coupons
 * — Supports Create, Edit, Delete via modals
 */
export default function AdminCoupons() {
    // list of coupons
    const [coupons, setCoupons] = useState([]);
    // global loading when fetching list
    const [isLoading, setIsLoading] = useState(true);

    // modal state: { mode: "create"|"edit"|"delete", coupon: {...} } or null
    const [modal, setModal] = useState(null);
    // per-action loading (create|edit|delete)
    const [actionLoading, setActionLoading] = useState(false);

    // fetch all coupons on mount
    useEffect(() => {
        fetchCoupons();
    }, []);

    /** GET /admin/coupons */
    const fetchCoupons = async () => {
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.get("/admin/coupon/");
            setCoupons(data.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load coupons");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles both create & update
     * @param {object} formData — from CouponForm
     */
    const handleSave = async (formData) => {
        const isEdit = modal.mode === "edit";
        setActionLoading(true);
        const toastId = toast.loading(isEdit ? "Updating…" : "Creating…");

        try {
            if (isEdit) {
                await axiosInstance.put(
                    `/admin/coupon/${modal.coupon._id}`,
                    formData
                );
                toast.success("Coupon updated", { id: toastId });
            } else {
                await axiosInstance.post("/admin/coupon/create", formData);
                toast.success("Coupon created", { id: toastId });
            }
            setModal(null);
            fetchCoupons();
        } catch (err) {
            console.error(err);
            toast.error("Save failed", { id: toastId });
        } finally {
            setActionLoading(false);
        }
    };

    /** DELETE /admin/coupons/:id */
    const handleDelete = async () => {
        setActionLoading(true);
        const toastId = toast.loading("Deleting…");
        try {
            await axiosInstance.delete(`/admin/coupon/${modal.coupon._id}`);
            toast.success("Coupon deleted", { id: toastId });
            setModal(null);
            fetchCoupons();
        } catch (err) {
            console.error(err);
            toast.error("Delete failed", { id: toastId });
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Coupons
                </h2>
                <button
                    onClick={() => setModal({ mode: "create", coupon: null })}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    <FiPlus /> Add Coupon
                </button>
            </div>

            {/* List or Loading */}
            {isLoading ? (
                <div className="animate-pulse space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
            ) : coupons.length === 0 ? (
                <p className="text-gray-600">No coupons available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coupons.map((c) => (
                        <motion.div
                            key={c._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                        >
                            <h3 className="text-lg font-medium text-gray-700">
                                {c.code.toUpperCase()}
                            </h3>
                            <p>
                                <strong className="text-gray-700">
                                    Discount:
                                </strong>{" "}
                                {c.discount}%
                            </p>
                            <p>
                                <strong className="text-gray-700">
                                    Max Age:
                                </strong>{" "}
                                {c.maxAge} hrs
                            </p>
                            <p>
                                <strong className="text-gray-700">
                                    Usage Limit:
                                </strong>{" "}
                                {c.maxUsageLimit}
                            </p>
                            <p>
                                <strong className="text-gray-700">
                                    Status:
                                </strong>{" "}
                                {c.status ? "Active" : "Inactive"}
                            </p>
                            {(() => {
                                const createdAt = new Date(
                                    c.createdAt
                                ).getTime();
                                const maxAgeMs = c.maxAge * 60 * 60 * 1000; // hours to ms
                                const isExpired =
                                    Date.now() > createdAt + maxAgeMs;

                                return (
                                    <p>
                                        <strong className="text-gray-700">
                                            Expired:
                                        </strong>{" "}
                                        {isExpired ? "Yes" : "No"}
                                    </p>
                                );
                            })()}
                            <div className="flex gap-3 mt-3">
                                <button
                                    onClick={() =>
                                        setModal({ mode: "edit", coupon: c })
                                    }
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                >
                                    <FiEdit /> Edit
                                </button>
                                <button
                                    onClick={() =>
                                        setModal({ mode: "delete", coupon: c })
                                    }
                                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                >
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            {modal && (modal.mode === "create" || modal.mode === "edit") && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative"
                    >
                        {/* Close */}
                        <button
                            onClick={() => setModal(null)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FiX />
                        </button>
                        {/* Title */}
                        <h3 className="text-xl font-medium mb-4">
                            {modal.mode === "edit"
                                ? "Edit Coupon"
                                : "New Coupon"}
                        </h3>
                        <CouponForm
                            defaultValues={modal.coupon}
                            onSubmit={handleSave}
                            onCancel={() => setModal(null)}
                        />
                    </motion.div>
                </div>
            )}

            {/* Delete Confirmation */}
            {modal && modal.mode === "delete" && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white max-w-sm w-full rounded-lg shadow-lg p-6"
                    >
                        <h4 className="text-lg font-semibold mb-2">
                            Delete Coupon?
                        </h4>
                        <p className="mb-4 text-gray-700">
                            Code:{" "}
                            <strong>{modal.coupon.code.toUpperCase()}</strong>
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModal(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                disabled={actionLoading}
                            >
                                {actionLoading ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
