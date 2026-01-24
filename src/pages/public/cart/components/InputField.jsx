import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({ label, name, type = "text", rules = {} }) => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const value = watch(name); // Watch the field’s value

    // Update hasValue whenever the value changes (manual input or autofill)
    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className="relative mb-6">
            <input
                id={name}
                name={name}
                type={type}
                className="w-full p-3 py-4 border-[2px] border-foreground/50 focus:outline-none focus:border-foreground text-foreground transition-all duration-100 ease-linear"
                placeholder=" "
                {...register(name, rules)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onAnimationStart={(e) => {
                    // Detect Chrome’s autofill animation
                    if (e.animationName === "onAutoFillStart") {
                        setHasValue(true);
                    }
                }}
            />
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                    isFocused || hasValue
                        ? "top-0 text-xs text-foreground"
                        : "top-1/2 text-base text-foreground"
                } transform ${
                    errors[name] ? "-translate-y-1/2" : "-translate-y-1/2"
                }`}
            >
                {label}
            </label>
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1 absolute">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;
