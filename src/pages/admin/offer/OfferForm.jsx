import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";

/**
 * OfferForm
 * @param {object} defaultValues – prefill when editing
 * @param {Function} onSubmit – called with parsed data
 * @param {Function} onCancel – close form
 */
export default function OfferForm({ defaultValues, onSubmit, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            discount: defaultValues.discount ?? "",
            maxAge: defaultValues.maxAge ?? "",
            maxUsageLimit: defaultValues.maxUsageLimit ?? "",
            status: defaultValues.status ? "active" : "inactive",
        },
    });

    // Wrap to convert to numbers / boolean
    const submitHandler = (data) =>
        onSubmit({
            discount: Number(data.discount),
            maxAge: Number(data.maxAge),
            maxUsageLimit: Number(data.maxUsageLimit),
            status: data.status === "active",
        });

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <InputField
                label="Discount (%)"
                name="discount"
                type="number"
                register={register}
                errors={errors}
                rules={{
                    required: "Discount is required",
                    min: { value: 0, message: "Min 0%" },
                    max: { value: 51, message: "Max 51%" },
                }}
            />

            <InputField
                label="Max Age (hours)"
                name="maxAge"
                type="number"
                register={register}
                errors={errors}
                rules={{
                    required: "Max age is required",
                    min: { value: 1, message: "Min 1 hour" },
                }}
            />

            <InputField
                label="Usage Limit"
                name="maxUsageLimit"
                type="number"
                register={register}
                errors={errors}
                rules={{
                    required: "Usage limit is required",
                    min: { value: 1, message: "Min 1 use" },
                }}
            />

            <SelectField
                label="Status"
                name="status"
                register={register}
                errors={errors}
                rules={{ required: "Status is required" }}
                options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                ]}
            />

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    disabled={isSubmitting}
                >
                    {defaultValues._id ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}
