import { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import FabricForm from "./FabricForm";
import axiosInstance from "../../../utils/apiConnector";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { useDispatch, useSelector } from "react-redux";
import { setFabrics } from "../../../redux/slices/fabricSlice";

const AdminFabrics = () => {
    // const [fabrics, setFabrics] = useState([]);
    const fabrics = useSelector((state) => state.fabrics || []);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [editFabric, setEditFabric] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const fetchFabrics = async () => {
        try {
            const res = await axiosInstance.get("/admin/fabrics/");
            dispatch(setFabrics(res.data));
        } catch (err) {
            console.error("Error fetching fabrics", err);
            handleAxiosError(err);
        }
    };

    useEffect(() => {
        fetchFabrics();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/admin/fabrics/${id}`);
            console.log("Deleted fabric ID:", id);
            fetchFabrics();
        } catch (err) {
            console.error("Delete failed", err);
            handleAxiosError(err);
        } finally {
            setDeleteId(null);
        }
    };

    const openEdit = (fabric) => {
        setEditFabric(fabric);
        setShowModal(true);
    };

    const openAdd = () => {
        setEditFabric(null);
        setShowModal(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    Meterial
                </h2>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition"
                >
                    <FiPlus /> Add Meterial
                </button>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                        <tr>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fabrics.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="text-center text-gray-600 py-6"
                                >
                                    No meterial found.
                                </td>
                            </tr>
                        ) : (
                            fabrics.map((fabric) => (
                                <tr key={fabric._id} className="text-gray-800">
                                    <td className="px-4 py-2 border capitalize">
                                        {fabric.title}
                                    </td>
                                    <td className="px-4 py-2 border flex gap-3">
                                        <button
                                            onClick={() => openEdit(fabric)}
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <FiEdit size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDeleteId(fabric._id)
                                            }
                                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                        >
                                            <FiTrash size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 w-full max-w-md rounded shadow-md relative"
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowModal(false)}
                        >
                            <FiX />
                        </button>
                        <FabricForm
                            fabric={editFabric}
                            onClose={() => setShowModal(false)}
                            onSave={async (data) => {
                                try {
                                    if (editFabric) {
                                        const res = await axiosInstance.put(
                                            `/admin/fabrics/${editFabric._id}`,
                                            data
                                        );
                                        console.log(
                                            "Updated fabric:",
                                            res.data
                                        );
                                    } else {
                                        const res = await axiosInstance.post(
                                            "/admin/fabrics",
                                            data
                                        );
                                        console.log("Added fabric:", res.data);
                                    }
                                    fetchFabrics();
                                } catch (err) {
                                    console.error("Save failed", err);
                                    handleAxiosError(err);
                                } finally {
                                    setShowModal(false);
                                }
                            }}
                        />
                    </motion.div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="fixed inset-0 glass flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 w-full max-w-sm rounded shadow-md"
                    >
                        <h3 className="text-lg font-semibold mb-3">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-5">
                            Are you sure you want to delete this meterial?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded text-sm hover:bg-gray-400"
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                onClick={() => handleDelete(deleteId)}
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default AdminFabrics;
