import { useState } from "react";
import { X } from "lucide-react";

const WithdrawModal = ({ onClose }) => {
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState([
        { type: "text", name: "Account Holder Name", value: "" },
        { type: "text", name: "Bank Name", value: "" },
        { type: "number", name: "Account Number", value: "" },
        { type: "text", name: "Account Type", value: "" },
        { type: "text", name: "SWIFT", value: "" },
        { type: "text", name: "Branch", value: "" },
    ]);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmission = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = [];
        if (!amount || parseInt(amount) <= 0) {
            newErrors.push("Please enter a valid amount");
        }
        for (const field of account) {
            if (!field.value.trim()) {
                newErrors.push(`Please fill in the ${field.name} field`);
            }
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const confirm = window.confirm("Are you sure you want to submit?");
        if (!confirm) return;

        // Simulate successful submission
        setErrors([]);
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4">
            <div className="bg-white sm:rounded-lg shadow-2xl w-full max-w-lg h-screen sm:h-auto flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 sm:rounded-t-lg flex items-center justify-between">
                    <h3 className="font-semibold text-lg truncate">Withdraw Funds</h3>
                    <button
                        onClick={onClose}
                        className="ml-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Success State */}
                {submitted ? (
                    <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">Withdrawal Request Submitted</h4>
                        <p className="text-sm text-gray-500">Your request has been received and is being processed.</p>
                        <button
                            onClick={onClose}
                            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmission} className="flex flex-col items-start gap-4 p-4 overflow-y-auto">

                        {/* Error Messages */}
                        {errors.length > 0 && (
                            <div className="w-full bg-red-50 border border-red-200 rounded-md p-3">
                                {errors.map((err, i) => (
                                    <p key={i} className="text-sm text-red-600">{err}</p>
                                ))}
                            </div>
                        )}

                        {/* Amount Field */}
                        <div className="grid grid-cols-[2fr_3fr] items-center gap-2 w-full">
                            <label className="text-sm font-medium text-gray-800">Amount</label>
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                placeholder="Enter amount"
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400"
                                required
                            />
                        </div>

                        {/* Account Fields */}
                        {account.map((field, index) => (
                            <div key={index} className="grid grid-cols-[2fr_3fr] items-center gap-2 w-full">
                                <label className="text-sm font-medium text-gray-800">{field.name}</label>
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) =>
                                        setAccount((prev) =>
                                            prev.map((c, i) => (i === index ? { ...c, value: e.target.value } : c))
                                        )
                                    }
                                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400"
                                />
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 mt-4 rounded-md"
                        >
                            Apply for Withdrawal
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default WithdrawModal;