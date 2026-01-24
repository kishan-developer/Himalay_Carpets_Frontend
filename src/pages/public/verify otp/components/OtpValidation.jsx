import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import authApis from "../../../../services/api/auth/auth.apis";
import { handleAxiosError } from "../../../../utils/handleAxiosError";
import Button from "../../../../components/common/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpValidation = ({ userData }) => {
    const navigate = useNavigate();
    // State for OTP digits and loading
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    // State for resend OTP timer
    const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minutes = 300 seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    // Refs for input fields to handle focusing
    const inputRefs = useRef([]);

    // Auto-focus the first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Handle the countdown timer for resend OTP
    useEffect(() => {
        if (secondsRemaining <= 0) {
            setIsResendDisabled(false);
            return;
        }

        const timer = setInterval(() => {
            setSecondsRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [secondsRemaining]);

    // Format the remaining time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Handle input change for each digit
    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Allow only digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus the next input if a digit is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle key down events (e.g., backspace)
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle pasting OTP
    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split("");
            setOtp(newOtp);
            inputRefs.current[5].focus(); // Focus the last input
        }
    };

    // Handle OTP submission
    const handleSubmit = async () => {
        const enteredOtp = otp.join("");

        // Validate that all OTP fields are filled
        if (enteredOtp.length !== 6) {
            throw new Error("Please enter a 6-digit OTP");
        }

        setIsLoading(true);

        try {
            console.log("User Registration data ->", {
                ...userData,
                otp: enteredOtp,
            });
            // Directly call the register API with userData and OTP
            const response = await authApis.register({
                ...userData,
                otp: enteredOtp,
            });
            toast.success(
                "Your account has been successfully created! Please check your email for a confirmation link."
            );
            navigate("/login");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Resend OTP
    const handleResendOtp = async () => {
        setIsResendDisabled(true);
        setSecondsRemaining(300); // Reset the timer to 5 minutes

        try {
            // Placeholder for your API call to resend OTP
            const response = await authApis.sendOtp(userData);
            // You will handle the success toast and error handling
        } catch (error) {
            // You will handle the error
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4"
        >
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg font-semibold uppercase text-foreground mb-4"
            >
                Enter OTP
            </motion.h2>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                    <motion.input
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-9 md:w-15 lg:w-[3.9rem] h-12 text-center text-xl border-[2px] border-foreground/50 focus:outline-none focus:border-foreground text-foreground transition-all duration-100 ease-linear"
                    />
                ))}
            </div>

            {/* Verify Button (Black, Full-Width) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full"
            >
                <Button
                    onSubmitHandler={handleSubmit}
                    text="Verify"
                    disabled={isLoading}
                />
            </motion.div>

            {/* Resend OTP Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col items-center mt-4 w-full"
            >
                {isResendDisabled ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-sm text-foreground mb-2"
                    >
                        Resend OTP in {formatTime(secondsRemaining)}
                    </motion.p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="w-full"
                    >
                        <button
                            disabled={isResendDisabled}
                            onClick={handleResendOtp}
                            className="w-full bg-transparent border-[2px] border-foreground/50 text-foreground hover:bg-gray-100 disabled:opacity-50 h-12 px-6 "
                        >
                            Resend OTP
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default OtpValidation;
