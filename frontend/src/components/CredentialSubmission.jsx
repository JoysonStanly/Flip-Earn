import { useState } from "react";
import { X, CirclePlus } from "lucide-react";

const CredentialSubmission = ({ onClose, listing }) => {
    const [newField, setNewField] = useState("");
    const [credential, setCredential] = useState([
        { type: "email", name: "Email", value: "" },
        { type: "password", name: "Password", value: "" },
    ]);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const handleAddField = () => {
        const name = newField.trim();
        if (!name) {
            setErrors(["Please enter a field name"]);
            return;
        }
        setCredential((prev) => [...prev, { type: "text", name, value: "" }]);
        setNewField("");
        setErrors([]);
    };

    const handleSubmission = (e) => {
        e.preventDefault();

        const newErrors = [];

        if (credential.length === 0) {
            newErrors.push("Please add at least one field");
        }

        for (const cred of credential) {
            if (!cred.value.trim()) {
                newErrors.push(`Please fill in the ${cred.name} field`);
            }
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const confirm = window.confirm(
            "Credential will be verified & changed post submission. Are you sure you want to submit?"
        );
        if (!confirm) return;

        setErrors([]);
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4">
            <div className="bg-white sm:rounded-lg shadow-2xl w-full max-w-lg h-screen sm:h-auto flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 sm:rounded-t-lg flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{listing?.title}</h3>
                        <p className="text-sm text-indigo-100 truncate">
                            Adding Credentials for {listing?.username} on {listing?.platform}
                        </p>
                    </div>
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
                        <h4 className="text-lg font-semibold text-gray-800">Credentials Submitted</h4>
                        <p className="text-sm text-gray-500">
                            Your credentials have been submitted and will be verified shortly.
                        </p>
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

                        {/* Credential Fields */}
                        {credential.map((cred, index) => (
                            <div key={index} className="grid grid-cols-[2fr_3fr_1fr] items-center gap-2 w-full">
                                <label className="text-sm font-medium text-gray-800">{cred.name}</label>
                                <input
                                    type="text"
                                    value={cred.value}
                                    onChange={(e) =>
                                        setCredential((prev) =>
                                            prev.map((c, i) => (i === index ? { ...c, value: e.target.value } : c))
                                        )
                                    }
                                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400"
                                />
                                <X
                                    className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
                                    onClick={() =>
                                        setCredential((prev) => prev.filter((_, i) => i !== index))
                                    }
                                />
                            </div>
                        ))}

                        {/* Add More Fields */}
                        <div className="flex items-center gap-2">
                            <input
                                value={newField}
                                onChange={(e) => setNewField(e.target.value)}
                                type="text"
                                placeholder="field name ..."
                                className="outline-none border-b border-gray-200"
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddField())}
                            />
                            <button
                                type="button"
                                onClick={handleAddField}
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
                            >
                                <CirclePlus className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 mt-4 rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CredentialSubmission;