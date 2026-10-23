import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/common/InputField';
import SelectField from '../../../components/common/SelectField';
import toast from 'react-hot-toast';
import { handleAxiosError } from '../../../utils/handleAxiosError';
import axiosInstance from '../../../utils/apiConnector';

// Custom InputField Component


// Custom TextAreaField Component
const TextAreaField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    readOnly = false,
    rows = 3
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
    };

    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    return (
        <div className="relative mb-6">
            <textarea
                {...register(name, {
                    ...rules,
                    onBlur: (e) => {
                        handleBlur(e);
                        if (rules.onBlur) rules.onBlur(e);
                    },
                })}
                id={name}
                name={name}
                defaultValue={value}
                rows={rows}
                onFocus={handleFocus}
                placeholder=" " // Important for label behavior
                className="w-full p-3 py-4 border-[2px] border-gray-400 focus:outline-none focus:border-gray-800 text-gray-700 bg-white appearance-none transition-all duration-100 ease-linear"
                readOnly={readOnly}
            ></textarea>
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${isFocused || hasValue
                    ? "top-0 text-xs text-black"
                    : "top-1/2 text-base text-gray-600 transform -translate-y-1/2"
                    }`}
            >
                {label}
            </label>
            {errors?.[name] && (
                <p className="text-red-500 text-xs mt-1 absolute capitalize">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};


// Main MakeYourOwnRugsPage Component
function MakeYourOwnRugsPage() {
    // useForm hook provides register function, handleSubmit, and formState (which contains errors)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const sizePreference = watch('sizePreference'); // Used to conditionally render custom width/length fields

    const onSubmit = async (data) => {
        const toastId = toast.loading('Please wait')
        try {
            const response = await axiosInstance.post("/custom-rug-request", data); // Make sure your API URL is correct
            if (response.data.success) {
                toast.dismiss(toastId)
                toast.success('Your custom rug request has been captured successfully!');
                reset(); // Resets the form after successful submission
            } else {
                toast.dismiss(toastId)
                toast.error(response.data.message || 'Failed to submit request.');
            }
        } catch (error) {
            toast.dismiss(toastId)
            console.error("Error submitting custom rug request:", error);
            toast.error('There was an error submitting your request. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-cream text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 md:p-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                    Create Your Bespoke Rug
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
                    Transform your vision into a masterpiece with a custom-designed rug from Himalaya Carpets. Our expert artisans will craft a piece that is truly unique to your taste and space.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-gray-700">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            How It Works:
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-medium">Consultation:</span> Share your initial ideas, needs, and preferences.</li>
                            <li><span className="font-medium">Design & Quote:</span> Our designers create concepts and provide a detailed quotation.</li>
                            <li><span className="font-medium">Crafting:</span> Your unique rug is meticulously handcrafted by our skilled artisans.</li>
                            <li><span className="font-medium">Delivery:</span> We ensure secure and timely delivery to your doorstep.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Customization Options:
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-medium">Size & Shape:</span> From small accents to large area rugs, in any shape.</li>
                            <li><span className="font-medium">Material:</span> Choose from luxurious wool, silk, blends, and more.</li>
                            <li><span className="font-medium">Color Palette:</span> Select from an extensive range of colors or provide your specific shades.</li>
                            <li><span className="font-medium">Design & Texture:</span> Traditional, modern, abstract, or your own unique pattern.</li>
                        </ul>
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    Submit Your Customization Request
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Using InputField component with register and errors props */}
                        <InputField
                            label="Your Name"
                            name="name"
                            register={register}
                            errors={errors}
                            rules={{ required: "Name is required" }}
                        />
                        {/* Using InputField component for email */}
                        <InputField
                            label="Your Email"
                            name="email"
                            register={register}
                            errors={errors}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            }}
                            type="email"
                        />
                    </div>
                    <div>
                        {/* Using InputField component for phone */}
                        <InputField
                            label="Phone Number"
                            name="phone"
                            register={register}
                            errors={errors}
                            type="tel"
                            rules={{
                                required: "Phone Number is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Phone number must be digits only"
                                }
                            }}
                        />
                    </div>
                    <div>
                        {/* Using SelectField component for size preference */}
                        <SelectField
                            label="Size Preference"
                            name="sizePreference"
                            register={register}
                            errors={errors}
                            rules={{ required: "Size preference is required" }}
                            options={[
                                { value: "", label: "Select a size preference", disabled: true }, // Added disabled hidden option
                                { value: "standard", label: "Standard Sizes" },
                                { value: "custom", label: "Custom Dimensions" },
                            ]}
                        />
                    </div>
                    {sizePreference === 'custom' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Conditionally rendered InputFields for custom dimensions */}
                            <InputField
                                label="Custom Width (e.g., 8 ft / 240 cm)"
                                name="customWidth"
                                register={register}
                                errors={errors}
                                rules={{ required: "Custom width is required for custom size" }}
                                placeholder="e.g., 8 ft or 240 cm"
                            />
                            <InputField
                                label="Custom Length (e.g., 10 ft / 300 cm)"
                                name="customLength"
                                register={register}
                                errors={errors}
                                rules={{ required: "Custom length is required for custom size" }}
                                placeholder="e.g., 10 ft or 300 cm"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Material Preference</label>
                        <div className="mt-2 space-y-2">
                            {/* Standard input type checkbox, registered with react-hook-form */}
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="material"
                                    value="wool"
                                    {...register("material", { validate: (value) => value.length > 0 || "Please select at least one material" })}
                                    className="form-checkbox h-4 w-4 text-foreground rounded-md"
                                />
                                <span className="ml-2 text-gray-700">Wool</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="checkbox"
                                    name="material"
                                    value="silk"
                                    {...register("material", { validate: (value) => value.length > 0 || "Please select at least one material" })}
                                    className="form-checkbox h-4 w-4 text-foreground rounded-md"
                                />
                                <span className="ml-2 text-gray-700">Silk</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="checkbox"
                                    name="material"
                                    value="blended"
                                    {...register("material", { validate: (value) => value.length > 0 || "Please select at least one material" })}
                                    className="form-checkbox h-4 w-4 text-foreground rounded-md"
                                />
                                <span className="ml-2 text-gray-700">Blended</span>
                            </label>
                        </div>
                        {errors.material && <p className="text-red-500 text-xs mt-1 capitalize">{errors.material.message}</p>}
                    </div>
                    <div>

                        {/* Using SelectField component for size preference */}
                        <SelectField
                            label="Shape"
                            name="shape"
                            register={register}
                            errors={errors}
                            rules={{ required: "shape is required" }}
                            options={[
                                { value: "", label: "Select a shape", disabled: true },
                                { value: "rectangle", label: "Rectangle" },
                                { value: "square", label: "Square" },
                                { value: "round", label: "Round" },
                                { value: "oval", label: "Oval" },
                                { value: "runner", label: "Runner" },
                                { value: "others", label: "Others Shape" },
                            ]}
                        />

                        {/* Using InputField component for color palette */}
                        <InputField
                            label="Preferred Color Palette ( HEX #000000 )"
                            name="colorPalette"
                            register={register}
                            errors={errors}
                            rules={{ required: "Color palette is required" }}
                            placeholder="e.g., Neutrals (beige, grey), Vibrant (red, blue), Earth Tones, Specific HEX codes"
                        />
                    </div>
                    <div>
                        {/* Using SelectField component for design style */}
                        <SelectField
                            label="Design Style Preference"
                            name="designStyle"
                            register={register}
                            errors={errors}
                            rules={{ required: "Design style is required" }}
                            options={[
                                { value: "", label: "Select a style", disabled: true }, // Changed to required
                                { value: "traditional", label: "Traditional Indian" },
                                { value: "modern", label: "Modern Geometric" },
                                { value: "abstract", label: "Abstract" },
                                { value: "floral", label: "Floral" },
                                { value: "persian", label: "Persian/Oriental" },
                                { value: "other", label: "Other (Please describe below)" },
                            ]}
                        />
                    </div>
                    <div>
                        {/* Using TextAreaField component for design description */}
                        <TextAreaField
                            label="Describe Your Design Ideas"
                            name="designDescription"
                            register={register}
                            errors={errors}
                            rules={{ required: "Please describe your design ideas" }}
                            rows="5"
                            placeholder="Describe any specific patterns, motifs, textures, or inspirations you have in mind."
                        />
                    </div>
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="inline-block px-8 py-3 bg-foreground text-white font-medium rounded-md hover:bg-foreground/90 transition-colors duration-300"
                        >
                            Submit Your Request
                        </button>
                    </div>
                </form>
                <p className="text-base text-gray-700 mt-10 text-center">
                    Have questions before submitting? Reach out to our design team for a personal consultation.
                </p>
                <p className="text-base text-gray-700 text-center">
                    Email: <a href="mailto:carpetshimalaya@gmail.com" className="text-foreground hover:underline">carpetshimalaya@gmail.com</a> | Phone: <a href="tel:+919918022212" className="text-foreground hover:underline">+91 99180 22212</a>
                </p>
            </div>
        </div>
    );
}

export default MakeYourOwnRugsPage;
