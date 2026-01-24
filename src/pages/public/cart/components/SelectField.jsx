import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const SelectField = ({ label, name, options, rules = {} }) => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    const value = watch(name); // Watch the field’s value

    useEffect(() => {
        const selectElement = document.getElementById(name);
        if (selectElement) {
            selectElement.addEventListener("animationstart", (e) => {
                // Detect Chrome’s autofill animation
                if (e.animationName === "onAutoFillStart") {
                    // Trigger a change event to update the form state
                    selectElement.dispatchEvent(
                        new Event("change", { bubbles: true })
                    );
                }
            });
        }
    }, [name]);

    return (
        <div className="relative mb-6">
            <select
                id={name}
                name={name}
                className="w-full p-3 py-4 border-[2px] border-foreground/50 focus:outline-none focus:border-foreground text-foreground transition-all duration-100 ease-linear bg-white"
                {...register(name, rules)}
            >
                <option value="" disabled>
                    Select {label}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                    value
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

export default SelectField;
