import React from "react";
import { motion } from "motion/react";
const Button = ({
    icon,
    text = "Submit",
    onSubmitHandler = () => {},
    type = "button",
    disabled = false,
}) => {
    return (
        <motion.button
            type={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmitHandler}
            disabled={disabled}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-foreground px-6 font-light text-neutral-200 text-md tracking-wide w-full uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {disabled ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                />
            ) : (
                <>
                    <span>{text}</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                        <div className="relative h-full w-8 bg-white/20"></div>
                    </div>
                </>
            )}
        </motion.button>
    );
};

export default Button;
