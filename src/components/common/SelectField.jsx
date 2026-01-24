import React, { useEffect, useRef, useState } from "react";

const SelectField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    options = [],
    readOnly = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(value);
    const selectRef = useRef(null);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
    };

    useEffect(() => {
        if (selectRef.current) {
            setHasValue(selectRef.current.value !== "");
        }
    }, []);

    return (
        <div className="relative mb-6">
            <select
                {...register(name, {
                    ...rules,
                    onBlur: (e) => {
                        handleBlur(e);
                        if (rules.onBlur) rules.onBlur(e);
                    },
                })}
                ref={(e) => {
                    register(name, rules).ref(e);
                    selectRef.current = e;
                }}
                id={name}
                name={name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-3 py-4 border-[2px] border-gray-400 focus:outline-none focus:border-gray-800 text-gray-700 bg-white appearance-none transition-all duration-100 ease-linear capitalize"
                defaultValue={value}
                disabled={readOnly}
            >
                <option className="" value="" disabled hidden></option>
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt?.value}
                        disabled={opt.disabled}
                    >
                        {opt?.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${isFocused || hasValue
                    ? "top-0 text-xs text-black"
                    : "top-1/2 text-base text-gray-600"
                    } transform -translate-y-1/2`}
            >
                {label}
            </label>
            {errors?.[name] && (
                <p className="text-red-500 text-xs mt-1 absolute">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};

export default SelectField;
