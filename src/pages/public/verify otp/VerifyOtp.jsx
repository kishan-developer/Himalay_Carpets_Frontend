import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import OtpValidation from "./components/OtpValidation";
import Heading from "../home/components/Heading";

function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location?.state;
    const email = userData?.email;

    // Handle successful OTP verification

    if (!email) {
        return <Navigate to={"/"} replace />;
    }
    return (
        <div className="boxedContainer px-8 md:w-[60%] lg:w-[40%] py-8 h-auto ">
            <Heading text={"Verify OTP"} />
            <p className="text-sm text-foreground my-6 text-center ">
                An OTP has been sent to{" "}
                <span className="lowercase   font-medium">{email}</span>. Please
                enter it below to verify your account.
            </p>
            <OtpValidation userData={userData} email={email} />
        </div>
    );
}

export default VerifyOtp;
