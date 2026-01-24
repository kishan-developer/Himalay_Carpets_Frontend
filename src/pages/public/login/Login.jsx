import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../home/components/Heading";
import authApis from "../../../services/api/auth/auth.apis";
import { useDispatch, useSelector } from "react-redux";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { clearUser, setToken, setUser } from "../../../redux/slices/userSlice";
import toast from "react-hot-toast";
import getCookieByName from "../../../utils/getCookie";
import { clearCart } from "../../../redux/slices/cartSlice";
import { clearOrders } from "../../../redux/slices/orderSlice";
import { clearCategory } from "../../../redux/slices/categorySlice";
import { clearProducts } from "../../../redux/slices/productSlice";
import { clearWishlist } from "../../../redux/slices/wishListSlice";

function Login() {
    const token =
        useSelector((state) => state?.user?.token) ||
        localStorage.getItem("token");
    const role = useSelector((state) => state?.user?.user?.role);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Animation variants for staggered input fields
    const inputVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: i * 0.1 },
        }),
    };

    async function loginHandler(loginCredentials) {
        setIsLoading(true);
        try {
            // dispatch(clearUser());
            // dispatch(clearCart());
            // dispatch(clearOrders());
            // dispatch(clearCategory());
            // dispatch(clearProducts());
            // dispatch(clearWishlist());

            console.log("Login loginCredentials", loginCredentials);
            const userData = await authApis.login(loginCredentials);
            dispatch(setUser(userData?.user));
            localStorage.setItem("token", userData.token);
            dispatch(setToken(userData?.token));
            toast.success(`Welcome ${userData?.user?.firstName}`);
            if (userData?.user?.role === "admin") {
                return navigate("/admin/overview");
            }
            return navigate("/account/dashboard");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    }
    if (token && role) {
        if (role === "admin") {
            return navigate("/admin/overview");
        } else {
            return navigate("/account/dashboard");
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="boxedContainer md:w-[40%] py-8 h-auto px-8"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Heading text={"Login"} />
            </motion.div>
            <form
                className="flex flex-col gap-3 mt-6"
                onSubmit={handleSubmit(loginHandler)}
            >
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={inputVariants}
                >
                    <InputField
                        register={register}
                        name={"email"}
                        type="email"
                        label={"Email Or Username*"}
                        errors={errors}
                        value={emailValue}
                        rules={{
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Please enter a valid email address",
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
                        register={register}
                        name={"password"}
                        type="password"
                        label={"Password*"}
                        errors={errors}
                        value={passwordValue}
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="items-center flex justify-between text-foreground"
                >
                    <div>
                        <Link
                            to={"/reset-password"}
                            className="text-sm underline cursor-pointer"
                        >
                            Lost Password ?
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Button
                        text="Login"
                        type={"submit"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h1 className="mx-auto text-center text-foreground text-[16px]">
                        No account yet?..{" "}
                        <Link
                            to={"/sign-up"}
                            className="text-sm capitalize underline cursor-pointer"
                        >
                            Create Account
                        </Link>
                    </h1>
                </motion.div>
            </form>
        </motion.div>
    );
}

export default Login;
