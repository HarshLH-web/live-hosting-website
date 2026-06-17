import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogForm from "@/components/BlogForm";
function Support() {
  const [formValues, setFormValues] = useState({
    countryCode: "+91", // Initialize with default country code
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
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

//   useEffect(() => {
//     let cancelled = false;

//     fetch("https://webpanel.store/api/country-codes")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (cancelled) return;
//         if (!Array.isArray(data)) {
//           throw new Error("Unexpected API response");
//         }
//         const formatted = data
//           .filter((c) => c.name && c.code)
//           .map((c) => ({
//             label: c.name,
//             value: c.code,
//           }))
//           .sort((a, b) => a.label.localeCompare(b.label));
//         setCountryCodes(formatted);
//       })
//       .catch((error) => {
//         console.error("Error fetching country codes:", error);
//       });

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Ensure country code is set (use default +91 if not selected)
//     const countryCode = formValues.countryCode || "+91";

//     // Get IP address
//     const ipAddress = await fetch("https://api.ipify.org?format=json")
//       .then((response) => response.json())
//       .then((data) => data.ip);

//     const fullNumber = countryCode + formValues.phone;

//     // Prepare the form data
//     const dataToSend = {
//       name: formValues.name || "",
//       email: formValues.email || "",
//       phone: fullNumber || "",
//       country: formValues.country || "",
//       message: formValues.message || "",
//       ip_address: ipAddress,
//       page_url: window.location.href,
//     };

//     try {
//       const response = await fetch(
//         "https://webpanel.store/api/live-hosting-formData",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToSend),
//         },
//       );

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Form successfully submitted:", result);
//         alert("Form submitted successfully");
//         setFormValues({}); // Reset form after successful submission
//       } else {
//         console.error("Error submitting form:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error sending form data:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

  const fields = [  
    { id: 1, type: "text", placeholder: "Enter your name", value: "name", required: true },
    { id: 2, type: "email", placeholder: "Enter your email", value: "email", required: true },
    { id: 3, type: "number", placeholder: "Enter your number", value: "phone", required: true },
    { id: 4, type: "text", placeholder: "Enter your country", value: "country", required: true },
    { id: 5, type: "textarea", placeholder: "Your message", value: "message", required: true },
  ];

  return (
    <>
    <Head>
        <title>LH Talent Agency - Contact US</title>
        <meta name="description" content="Contact Us Get In Touch With LH Talent Agency, You Can Simply Connect Us Through Filling This Form Or Drop Your Queries To The Given Mail. We Will Assist You Shortly." />
    </Head>
      <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          Contact Us
        </h1>
      </div>
      <div className="mt-8 lg:mt-24 w-[90%] max-w-3xl mx-auto py-6">
        <h2 className="text-2xl lg:text-4xl font-semibold text-center">
          Get In Touch With Us
        </h2>
        <p className="text-center text-base text-[#363636] my-2 max-w-xl mx-auto px-2">
          You can simply connect us through filling this form or drop your
          queries to the given mail. We will assist you shortly.
        </p>
            <BlogForm fields={fields} className="mt-8" />
      </div>

      <div className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center py-16">
        <Image
          src="/clock.svg"
          alt="Get quick response"
          className="w-32"
          width={100}
          height={100}
        />
        <h3 className="text-2xl lg:text-4xl font-bold text-center">
          Available: Monday To Saturday{" "}
        </h3>

        <h3 className="text-2xl lg:text-4xl text-[#DE0402] font-bold text-center">
          10AM - 6PM IST
        </h3>

        <a
          href="https://api.whatsapp.com/send/?phone=7065384660&text&type=phone_number&app_absent=0"
          className="text-base bg-[#FFF5F4] my-2 w-full max-w-sm border border-[#DE0402] rounded-full whitespace-nowrap py-3 text-center mt-6"
        >
          <span className="font-bold">WhatsApp:</span> +917065384660
        </a>

        <a
          href="mailto:support@lhtalentagency.com"
          className="text-base bg-[#FFF5F4] my-2 w-full max-w-sm border border-[#DE0402] rounded-full whitespace-nowrap py-3 text-center"
        >
          <span className="font-bold">Email:</span> support@lhtalentagency.com
        </a>
      </div>
      <Footer />
    </>
  );
}

export default Support;
