import React from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, ClipboardCopy, ClipboardCheck } from "lucide-react";
import { useState } from "react";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (reference) {
            navigator.clipboard.writeText(reference);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="w-full max-w-sm text-center space-y-6">
                <CheckCircle2 className="w-16 h-16 text-foreground mx-auto" />
                <h1 className="text-2xl font-semibold text-foreground">
                    Payment Successful
                </h1>
                <p className="text-sm text-foreground/70">
                    Thank you for your payment. Your transaction was processed
                    successfully.
                </p>

                {reference && (
                    <div className="bg-gray-100 rounded-md flex items-center justify-between px-3 py-2 font-mono text-xs text-foreground">
                        <span className="truncate max-w-[85%]">
                            {reference}
                        </span>
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
                    Go to Homepage
                </a>
            </div>
        </div>
    );
};

export default PaymentSuccess;
