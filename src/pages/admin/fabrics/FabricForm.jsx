import { useForm } from "react-hook-form";

export default function FabricForm({ fabric, onClose, onSave }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: fabric?.title || "",
        },
    });

    const onSubmit = (data) => {
        onSave(data); // Just console.log for now
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div>
                <label className="block text-sm text-gray-700 mb-1">
                    Fabric Title
                </label>
                <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full border px-3 py-2 rounded text-gray-800"
                    placeholder="Enter fabric title"
                />
                {errors.title && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.title.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
                >
                    {fabric ? "Update" : "Add"}
                </button>
            </div>
        </form>
    );
}
