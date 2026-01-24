import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import Heading from "../home/components/Heading";
import { Link, useNavigate } from "react-router-dom";
import authApis from "../../../services/api/auth/auth.apis";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import authEndpoints from "../../../services/endpoints/auth/auth.endpoints";
import toast from "react-hot-toast";

function SignUp() {
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();

    const firstNameValue = watch("firstName");
    const lastNameValue = watch("lastName");
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const confirmPasswordValue = watch("confirmPassword");
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    // Handle form submission and redirect to OTP page
    const onSubmit = async (userdata) => {
        alert("onSubmit click")
        console.log(userdata);
        const toastId = toast.loading("Please wait...");
        
        setIsCreatingAccount(true);
        try {
            const res = await authApis.sendOtp(userdata);
            console.log(res);
            toast.success(
                "An OTP has been successfully sent to your email address."
            );
            navigate("/verify-otp", { state: { ...userdata } });
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
            setIsCreatingAccount(false);
        }
    };

    // Animation variants for staggered input fields
    const inputVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: i * 0.1 },
        }),
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="boxedContainer px-8 md:w-[40%] py-8 h-auto"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Heading text={"Register"} />
                </motion.div>
                <form
                    className="flex flex-col gap-3 mt-6"
                    onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
                >
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <InputField
                            value={firstNameValue}
                            register={register}
                            name={"firstName"}
                            type="text"
                            label={"Enter your name*"}
                            errors={errors}
                            rules={{
                                required: "First name is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "First name must be at least 3 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        "First Name must not exceed 20 characters",
                                },
                            }}
                        />
                    </motion.div>
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <InputField
                            value={lastNameValue}
                            register={register}
                            name={"lastName"}
                            type="text"
                            label={"Enter Your Last name*"}
                            errors={errors}
                            rules={{
                                required: "Last name is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Last name must be at least 3 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        "Last Name must not exceed 20 characters",
                                },
                            }}
                        />
                    </motion.div>
                    <motion.div
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <InputField
                            value={emailValue}
                            register={register}
                            name={"email"}
                            type="email"
                            label={"Email*"}
                            errors={errors}
                            rules={{
                                required: "Email is required.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            }}
                        />
                    </motion.div>
                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <InputField
                            label="Phone*"
                            name="phone"
                            type="tel"
                            register={register}
                            errors={errors}
                            rules={{
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message:
                                        "Phone number must be exactly 10 digits",
                                },
                            }}
                        />
                    </motion.div>
                    <motion.div
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <InputField
                            value={passwordValue}
                            register={register}
                            name={"password"}
                            type="password"
                            label={"Password*"}
                            errors={errors}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        "Password must not exceed 20 characters",
                                },
                            }}
                        />
                    </motion.div>
                    <motion.div
                        custom={5}
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <InputField
                            value={confirmPasswordValue}
                            register={register}
                            name={"confirmPassword"}
                            type="password"
                            label={"Confirm Password*"}
                            errors={errors}
                            rules={{
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords must match",
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link
                            to={"/login"}
                            className="text-right underline text-sm cursor-pointer"
                        >
                            Already have an account?...
                        </Link>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="text-xs text-foreground"
                    >
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        privacy policy.
                    </motion.span>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Button
                            text="Register"
                            type={"submit"}
                            disabled={isCreatingAccount}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        />
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}

export default SignUp;
