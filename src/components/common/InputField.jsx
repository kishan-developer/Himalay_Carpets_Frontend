import React from "react";

const InputField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    type = "text",
    readOnly = false,

}) => {
    return (
        <div className="input-wrapper capitalize">
            <input
                {...register(name, rules)}
                type={type}
                id={name}
                name={name}
                defaultValue={value}
                placeholder=" "
                className="input-field capitalize"
                readOnly={readOnly}

            />
            <label htmlFor={name} className="input-label capitalize">
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

export default InputField;
