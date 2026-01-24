import React from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import Heading from "../home/components/Heading";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import axios from "axios";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import toast from "react-hot-toast";
function ResetPassword() {
    // Getting TOken  If Token Exit Then Render  Form For Chnage PAssword
    const { token } = useParams();

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    const emailValue = watch("email");
    // fucntion for handling  Reset Link send
    const handleSendLink = async (data) => {
        const toastId = toast.loading("Please Wait..");
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}auth/forgot-password-token`,
                data
            );
            if (res.data.success) {
                toast.success("Reset Link Sent on Your Email");
                reset();
            }
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };
    // fucntion for handling Password change
    const handleResetPassword = async (data) => {
        const toastId = toast.loading("Please Wait..");
        try {
            const res = await axios.put(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }auth/forgot-password/${token}`,
                data
            );
            if (res.data.success) {
                toast.success("Your Password Changed successfully");
                reset();
            }
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };
    if (token)
        return (
            <div>
                <div className="boxedContainer px-8 md:w-[40%]  h-auto py-6">
                    <Heading text={"Reset Your Password"} />
                    <form
                        className="flex flex-col gap-2 mt-6"
                        onSubmit={handleSubmit(
                            (data) => handleResetPassword(data),
                            (err) => console.log(err)
                        )}
                    >
                        <InputField
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
                        <InputField
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
                        <Button text="Reset Password" type={"submit"} />
                    </form>
                    <h1 className="text-sm text-center mt-3">
                        Back to{" "}
                        <Link
                            to={"/login"}
                            className="underline text-xs text-gray-600 cursor-pointer"
                        >
                            Login
                        </Link>
                    </h1>
                </div>
            </div>
        );
    return (
        <div>
            <div className="boxedContainer px-8 md:w-[40%]  h-auto py-6">
                <Heading text={"Reset Password"} />
                <form
                    className="flex flex-col gap-2 mt-6"
                    onSubmit={handleSubmit(
                        (data) => handleSendLink(data),
                        (err) => console.log(err)
                    )}
                >
                    <h1 className="text-sm text-gray-400 mb-3 text-center">
                        We will send you an email to reset your password
                    </h1>
                    <InputField
                        value={emailValue}
                        register={register}
                        name={"email"}
                        type="email"
                        label={"Email Or Username*"}
                        errors={errors}
                        rules={{
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Please enter a valid email address",
                            },
                        }}
                    />
                    <Button text="Send Link" type={"submit"} />
                </form>
                <h1 className="text-sm text-center mt-3">
                    Back to{" "}
                    <Link
                        to={"/login"}
                        className="underline text-xs text-gray-600 cursor-pointer"
                    >
                        Login
                    </Link>
                </h1>
            </div>
        </div>
    );
}

export default ResetPassword;