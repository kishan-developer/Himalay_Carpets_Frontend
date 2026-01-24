import React from "react";
import { useSearchParams } from "react-router-dom";
import { XCircle, ClipboardCopy, ClipboardCheck } from "lucide-react";
import { useState } from "react";

const PaymentFailed = () => {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get("reason");
    const [copied, setCopied] = useState(false);

    const messages = {
        payment_failed: "Your payment was declined. Please try again later.",
        authentication_failed:
            "Authentication issue. Please re-initiate the process.",
        payment_cancelled: "The payment was cancelled.",
        default: "Something went wrong with the payment.",
    };

    const readableMessage = messages[reason] || messages.default;

    const handleCopy = () => {
        if (reason) {
            navigator.clipboard.writeText(reason);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="w-full max-w-sm text-center space-y-6">
                <XCircle className="w-16 h-16 text-foreground mx-auto" />
                <h1 className="text-2xl font-semibold text-foreground">
                    Payment Failed
                </h1>
                <p className="text-sm text-foreground/70">{readableMessage}</p>

                {reason && (
                    <div className="bg-gray-100 rounded-md flex items-center justify-between px-3 py-2 font-mono text-xs text-foreground">
                        <span className="truncate max-w-[85%]">{reason}</span>
                        <button onClick={handleCopy}>
                            {copied ? (
                                <ClipboardCheck className="w-4 h-4 text-foreground" />
                            ) : (
                                <ClipboardCopy className="w-4 h-4 text-foreground" />
                            )}
                        </button>
                    </div>
                )}

                <a
                    href="/"
                    className="inline-block w-full text-white bg-foreground hover:opacity-90 transition rounded-md py-2 text-sm"
                >
                    Back to Homepage
                </a>
            </div>
        </div>
    );
};

export default PaymentFailed;
