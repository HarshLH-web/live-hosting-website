import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

function getInitialFormValues(fields) {
    const initialValues = {};
    fields.forEach((field) => {
        if (field.value === "phone") {
            initialValues.countryCode = "+91";
        }
        initialValues[field.value] = "";
    });
    return initialValues;
}

function BlogForm({ fields, className }) {
    const fieldsKey = fields.map((field) => field.id).join(",");
    const [formFieldsKey, setFormFieldsKey] = useState(fieldsKey);
    const [formValues, setFormValues] = useState(() => getInitialFormValues(fields));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countryCodes, setCountryCodes] = useState([]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    if (formFieldsKey !== fieldsKey) {
        setFormFieldsKey(fieldsKey);
        setFormValues(getInitialFormValues(fields));
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        fetch("https://restcountries.com/v3.1/all?fields=name,idd")
            .then((response) => response.json())
            .then((data) => {
                if (cancelled) return;
                const formatted = data
                    .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
                    .map((c) => ({
                        label: c.name.common,
                        value: `${c.idd.root}${c.idd.suffixes[0]}`,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                setCountryCodes(formatted);
            })
            .catch((error) => {
                console.error("Error fetching country codes:", error);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare form data with combined phone number
            const submitData = { ...formValues };
            
            // Validate and combine phone number with country code
            if (submitData.phone) {
                // Ensure country code is set (use default +91 if not selected)
                const countryCode = submitData.countryCode || "+91";
                
                // Combine country code with phone number
                submitData.phone = `${countryCode}${submitData.phone}`;
                // Remove the separate countryCode field as it's now combined
                delete submitData.countryCode;
            }

            const response = await fetch("/api/formData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...submitData,
                    page_url: typeof window !== "undefined" ? window.location.href : "",
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Form successfully submitted:", result);
                alert("Form submitted successfully");
                setFormValues({}); // Reset form after submission
            } else {
                console.error("Error submitting form:", response.statusText);
            }
        } catch (error) {
            console.error("Error sending form data:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle field value change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className={`w-full mx-auto lg:w-[80%] max-w-sm bg-linear-to-b from-[#FEFEFC] to-[#F9F6E3] border border-[#DFDFDF] rounded-3xl ${className}`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mx-auto">
            {fields.map((field) => (
                <div key={field.id} className="relative">
                    {field.type === "textarea" ? (
                    // 🟢 Case 1: Textarea
                    <div className="relative">
                        <textarea
                        id={field.value}
                        name={field.value}
                        value={formValues[field.value] || ""}
                        placeholder=" "
                        onChange={handleInputChange}
                        required={field.required}
                        className="peer block w-full min-h-40 py-2 px-4 rounded-3xl border border-[#DFDFDF] bg-white focus:outline-none focus:ring-1 focus:ring-[#DE0402] focus:border-transparent"
                        />
                        <label
                        htmlFor={field.value}
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white rounded-full px-2 peer-focus:px-2 peer-focus:text-[#DE0402] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                        >
                        {field.placeholder}
                        </label>
                    </div>
                    ) : field.value === "phone" ? (
                    // 🟢 Case 2: Custom dropdown + phone input
                    <div className="flex items-center relative">
                        {/* Custom Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                        <div
                            tabIndex={0}
                            onClick={() => setOpen(!open)}
                            onKeyDown={(e) => {
                            if (/^[a-zA-Z]$/.test(e.key) && open) {
                                const idx = countryCodes.findIndex((c) =>
                                c.label.toLowerCase().startsWith(e.key.toLowerCase())
                                );
                                if (idx !== -1) {
                                const el = document.getElementById(`country-option-${idx}`);
                                el?.scrollIntoView({ block: "nearest" });
                                }
                            }
                            }}
                            className="w-20 py-2 px-3 border border-gray-300 bg-white rounded-l-full cursor-pointer flex items-center justify-between focus:ring-1 focus:ring-[#DE0402]"
                        >
                            <span>{formValues.countryCode || "+91"}</span>
                            <svg
                            className="w-4 h-4 text-gray-500 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </div>

                        {/* Dropdown List */}
                        {open && (
                            <div className="absolute left-0 mt-1 w-72 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                            {countryCodes.map((country, index) => (
                                <div
                                id={`country-option-${index}`}
                                key={index}
                                onClick={() => {
                                    setFormValues({ ...formValues, countryCode: country.value });
                                    setOpen(false);
                                }}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                {country.label} {country.value}
                                </div>
                            ))}
                            </div>
                        )}
                        </div>

                        {/* Phone Input */}
                        <div className="relative flex-1">
                        <input
                            id="phone"
                            type="number"
                            name="phone"
                            value={formValues.phone || ""}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                            className="w-full py-2 px-2 rounded-r-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#DE0402] focus:border-transparent peer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <label
                            htmlFor="phone"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white rounded-full px-2 peer-focus:px-2 peer-focus:text-[#DE0402] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            {field.placeholder}
                        </label>
                        </div>
                    </div>
                    ) : (
                    // 🟢 Case 3: Normal inputs
                    <div className="relative">
                        <input
                        id={field.value}
                        type={field.type}
                        name={field.value}
                        value={formValues[field.value] || ""}
                        placeholder=" "
                        onChange={handleInputChange}
                        required={field.required}
                        className="peer block w-full py-2 px-4 rounded-3xl border border-[#DFDFDF] bg-white focus:outline-none focus:ring-1 focus:ring-[#DE0402] focus:border-transparent"
                        />
                        <label
                        htmlFor={field.value}
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white rounded-full px-2 peer-focus:px-2 peer-focus:text-[#DE0402] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                        >
                        {field.placeholder}
                        </label>
                    </div>
                    )}
                </div>
            ))}


                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        marginTop: "0.5rem",
                        backgroundColor: isSubmitting ? "#ccc" : "#DE0402",
                        color: "white",
                        borderRadius: "2rem",
                        transition: "all 0.3s",
                        border: "2px solid #DE0402",

                    }}
                    onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = "transparent") && (e.target.style.color = "#DE0402")}
                    onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = "#DE0402") && (e.target.style.color = "white")}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default BlogForm;

BlogForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            required: PropTypes.bool,
        })
    ).isRequired,
    className: PropTypes.string,
};
