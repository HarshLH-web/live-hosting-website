'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import Header from "@/components/layout/Header";
// import PoppoHeader from "../components/PoppoHeader";
// import Footer from "@/components/layout/Footer";

// const POPPO_AGENCY_CLICK = {
//   siteId: "joinwithconnect.com",
//   linkId: "https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=63534458&c=poppo%20%20",
//   pageUrl: "https://joinwithconnect.com/poppo-agency",
// } as const;

/** Track by link only: { siteId, linkId, pageUrl }. */
// function trackPoppoAgencyClickByLink() {
//   fetch("https://webpanel.store/api/connect-clickStats", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       siteId: POPPO_AGENCY_CLICK.siteId,
//       linkId: POPPO_AGENCY_CLICK.linkId,
//       pageUrl: POPPO_AGENCY_CLICK.pageUrl,
//     }),
//     keepalive: true,
//   })
//     .then(async (res) => {
//       const text = await res.text();
//       // console.log("click track status:", res.status, text);
//       if (!res.ok) throw new Error(text);
//     })
//     .catch((err) => console.error("click track failed:", err));
// }

/** Track by element id only: { siteId, elementId, pageUrl }. */
// function trackPoppoAgencyClickById(elementId: string) {
//   void fetch("https://webpanel.store/api/connect-clickStats", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       siteId: POPPO_AGENCY_CLICK.siteId,
//       elementId,
//       pageUrl: POPPO_AGENCY_CLICK.pageUrl,
//     }),
//     keepalive: true,
//   }).catch(() => {
//     /* ignore */
//   });
// }


const policyLinks = {
    poppo: [
      {
        href: "/landing-pages/Policies/POPPO AGENCY POLICY - WEBSITE.pdf",
        label: "Agency Policy",
      },
      {
        href: "/landing-pages/Policies/POPPO HOST REGISTRATION - WEBSITE.pdf",
        label: "Host Policy",
      },
      {
        href: "/landing-pages/Policies/Poppo Coin Trading - Website.pdf",
        label: "Coin Seller Policy",
      },
    ],
  };

  const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";


export default function Poppo() {
    const [showTranslator, setShowTranslator] = useState(true);
    const [hidePolicyDropdown, setHidePolicyDropdown] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     app_id: "",
//     role: "Agency",
//     country: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<
//     | { type: "success"; message: string }
//     | { type: "error"; message: string }
//     | null
//   >(null);

//   const handleFormChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRegistrationSubmit = async (
//     e: React.FormEvent<HTMLFormElement>,
//   ) => {
//     e.preventDefault();
//     setSubmitStatus(null);
//     setIsSubmitting(true);

//     try {
//       const response = await fetch("/api/connect-poppo-data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formValues),
//       });

//       const data = (await response.json().catch(() => null)) as
//         | { ok: true }
//         | { ok: false; error?: string }
//         | null;

//       if (!response.ok || !data || (data as { ok: boolean }).ok !== true) {
//         const message =
//           (data && "error" in data && data.error) ||
//           "Something went wrong. Please try again.";
//         setSubmitStatus({ type: "error", message });
//         return;
//       }

//       setSubmitStatus({
//         type: "success",
//         message: "Submitted successfully.",
//       });
//       setFormValues({
//         name: "",
//         email: "",
//         phone: "",
//         app_id: "",
//         role: "Agency Owner",
//         country: "",
//       });
//     } catch (err) {
//       const message = err instanceof Error ? err.message : "Network error";
//       setSubmitStatus({ type: "error", message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

const [isMenuOpen, setIsMenuOpen] = useState(false);

const policyDropdownRef = useRef(null);

const translateId = `google_translate_${GOOGLE_TRANSLATE_SCRIPT_ID}`;

// const currentLogo = logoConfig[logoVariant];
const currentPolicies = policyLinks.poppo;

// outside click close
useEffect(() => {
  const close = (e) => {
    const target = e.target;

    if (
      isMenuOpen &&
      policyDropdownRef.current &&
      !policyDropdownRef.current.contains(target)
    ) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", close);
  return () => document.removeEventListener("mousedown", close);
}, [isMenuOpen]);

// google translator
useEffect(() => {
  if (!showTranslator) return;

  let retryCount = 0;
  const win = window;

  const loadTranslator = () => {
    const TranslateElement = win.google?.translate?.TranslateElement;
    const targetElement = document.getElementById(translateId);

    if (!TranslateElement || !targetElement) {
      if (retryCount < 20) {
        retryCount += 1;
        setTimeout(loadTranslator, 200);
      }
      return;
    }

    if (targetElement.childElementCount > 0) {
      return;
    }

    new TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi,tl,bn",
        autoDisplay: false,
      },
      translateId,
    );
  };

  win.googleTranslateElementInit = loadTranslator;

  if (!document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      setTimeout(loadTranslator, 200);
    };
    document.body.appendChild(script);
  } else {
    loadTranslator();
  }
}, [showTranslator, translateId]);

  return (
    <>
          <header className="fixed top-0 z-50 w-full bg-white border-b">
      <div className="max-w-[90%] lg:max-w-[95%] xl:max-w-[85%] mx-auto py-2 lg:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#">
          {/* <Image
            src="/landing-pages/logo2.png"
            alt="Join with Connect Logo"
            width={200}
            height={200}
            className="w-20 md:w-20 lg:w-28 2xl:w-32 lg:pt-0 mx-auto block"
          /> */}
        </Link>

        <nav className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-6">
          <Link
            href="/poppo-agent"
            className="shrink-0 text-sm font-medium sm:text-base"
          >
            Agency
          </Link>

          {showTranslator && (
            <div className="google-translate-widget">
              <div id={translateId} />
            </div>
          )}

          {!hidePolicyDropdown && (
            <div ref={policyDropdownRef} className="relative shrink-0 mt-2">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <Image
                  src="/landing-pages/Download-icon.svg"
                  alt="Download"
                  width={20}
                  height={20}
                  className="lg:h-[22px] lg:w-[22px]"
                />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
                  {currentPolicies.map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      download
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-sm hover:bg-gray-100 ${
                        i !== currentPolicies.length - 1 ? "border-b" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

    </header>

      <main>
        <div
          className="mx-auto min-h-[90vh] flex items-center justify-center bg-cover bg-center pt-24 lg:pt-32"
          style={{
            backgroundImage: "url('/landing-pages/connect-agency/new-img/benefits-bg.webp')",
          }}
        >
          <div className="flex flex-col lg:flex-row justify-center h-auto md:px-8 lg:px-8 gap-4 lg:gap-0 w-full lg:w-[85%] max-w-6xl mx-auto pt-16 pb-16 px-4 md:pt-8">
            {/* <Image
              src="/landing-pages/logo2.png"
              alt="Join with Connect Logo"
              width={224}
              height={224}
              className="w-40 md:w-44 lg:w-48 2xl:w-56 lg:pt-0 md:pb-8 mx-auto block lg:hidden"
            /> */}
            {/* <p>Connect Tect</p> */}

            {/* Image Section */}
            {/* <div className="mb-0 xl:px-16 xl:mt-0 mx-auto lg:w-2/5 pl-8 lg:pl-0">
              <Image
                src="/landing-pages/connect-agency/banner-main.webp"
                alt="Join with Connect Banner"
                width={320}
                height={320}
                className="w-full h-full max-w-48 lg:max-w-80 2xl:max-w-80"
              />
            </div> */}

            {/* Text Section */}
            <div className="lg:text-left text-center text-white flex flex-col items-start justify-center lg:w-4/5">
              {/* <Image
                src="/landing-pages/connect-agency/logo-white.svg"
                alt="Join with Connect Logo"
                width={224}
                height={224}
                className="w-36 md:w-44 lg:w-48 2xl:w-56 lg:pt-0 md:pb-8 mx-auto hidden lg:block"
              /> */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-[40px] font-bold mb-4 lg:leading-[1.2] text-center mx-auto"
                style={{ minHeight: "2rem" }}
              >
                Become a Poppo Live Agency Partner
              </h1>

              <p
                className="mb-2 md:mb-4 text-[1rem] leading-[1.4] md:text-md lg:text-[18px] 2xl:text-[20px] text-center lg:mt-2"
                style={{ minHeight: "1.5rem" }}
              >
                Manage a team of live-streaming creators on Poppo Live. Get
                onboarding support, guidance, and ongoing assistance as an
                independent agency partner.
              </p>

              <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 mx-auto mt-3">
                <a
                  href="https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=63534458&c=poppo%20%20"
                  target="_blank"
                  rel="noopener noreferrer"
                //   onClick={trackPoppoAgencyClickByLink}
                  className="bg-linear-to-r from-[#E514F0] to-[#000899] hover:bg-white text-white mt-4 lg:mt-2 border-2 border-white px-6 py-2 rounded-full text-base lg:text-lg font-semibold mx-auto lg:mx-0 transition-all duration-300 text-center"
                >
                  Apply for Agency
                </a>
                <a
                  href="https://static.vshowapi.com/inviteNew/share?c=poppo&link_id=8096839&user_id=63534458&temp_type=1&sys_temp_id=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-linear-to-r from-[#E514F0] to-[#000899] hover:bg-white text-white mt-4 lg:mt-2 border-2 border-white px-6 py-2 rounded-full text-base lg:text-lg font-semibold mx-auto lg:mx-0 transition-all duration-300 text-center"
                >
                  Download the Poppo App
                </a>
                <a
                  href="https://invite-vone.com/azNtkC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-linear-to-r from-[#E514F0] to-[#000899] hover:bg-white text-white mt-4 lg:mt-2 border-2 border-white px-6 py-2 rounded-full text-base lg:text-lg font-semibold mx-auto lg:mx-0 transition-all duration-300 text-center"
                >
                  Download Vone App
                </a>
              </div>
              <p className="text-white/90 text-sm sm:text-base mt-4 lg:mt-6 mx-auto text-center lg:text-left leading-snug">
                Indian users can download the Vone App for Android &amp; iOS.
              </p>
            </div>
          </div>
        </div>

        <section id="registration" className="scroll-mt-8 pt-12 pb-12 px-4">
          <div className="h-fit bg-white">
            <div className="mx-auto max-w-[1250px]">
              <div className="flex flex-col md:flex-row items-center justify-center my-auto">
                <div className="sm:px-8 md:py-[5%] flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center mb-4 lg:mb-6 max-w-4xl gap-2 lg:gap-4">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-center text-black">
                      How to Get Started
                    </h2>
                    <p className="text-base lg:text-xl font-normal text-center text-[#2f2f2f]">
                      Follow these steps to apply for agency partner access on
                      Poppo Live.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Image
                      src="/landing-pages/connect-agency/agency-reg2.webp"
                      alt="Download the App and Submit your application to become an Agency"
                      width={2000}
                      height={800}
                      className="w-full my-4 lg:my-8"
                    />

                    <ol className="text-left list-decimal px-6 space-y-1">
                      <li className="text-[1rem] leading-tight md:text-lg text-left">
                        <span className="font-semibold">
                          Download &amp; Sign Up
                        </span>{" "}
                        —{" "}
                        <a
                          href="https://static.vshowapi.com/inviteNew/share?c=poppo&link_id=8096839&user_id=63534458&temp_type=1&sys_temp_id=2"
                          className="underline text-blue-700 font-semibold"
                        >
                          Download the Poppo Live App
                        </a>{" "}
                        and create your account.
                      </li>
                      <li className="text-[1rem] leading-tight md:text-lg text-left">
                        <span className="font-semibold">Find Your ID</span> — Go
                        to your profile in the app and copy your unique Poppo ID
                        number.
                      </li>
                      <li className="text-[1rem] leading-tight md:text-lg text-left">
                        <span className="font-semibold">
                          Submit Your Application
                        </span>{" "}
                        — Use the official{" "}
                        <a
                          href="https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=63534458&c=poppo%20%20"
                          target="_blank"
                          rel="noopener noreferrer"
                        //   onClick={trackPoppoAgencyClickByLink}
                          className="underline text-blue-700 font-semibold"
                        >
                          Apply for Agency Access
                        </a>{" "}
                        link, enter your ID, and follow the verification steps
                        in the app.
                      </li>
                      <li className="text-[1rem] leading-tight md:text-lg text-left">
                        <span className="font-semibold">
                          Confirm Your Application
                        </span>{" "}
                        — Enter your verification code here to complete your
                        submission.
                      </li>
                    </ol>

                    <p className="text-[1rem] leading-[1.35] md:text-lg text-left">
                      Need help with your application? Contact our support team
                      at{" "}
                      <a
                        className="text-blue-700 underline font-semibold"
                        href="https://api.whatsapp.com/send/?phone=919650889239&text&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +91 9650889239
                      </a>{" "}
                      or{" "}
                      <a
                        className="text-blue-700 underline font-semibold"
                        href="mailto:support@connectwithapps.com"
                      >
                        support@connectwithapps.com
                      </a>
                      . We&apos;re available to answer questions about the
                      onboarding process.
                    </p>

                    {/* <p className="text-[1rem] leading-[1.35] md:text-lg text-left">
                      <span className="font-semibold">Note:</span> Users in the
                      South Asian region, including Afghanistan, Bangladesh,
                      Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka, etc.,
                      need to reach{" "}
                      <span className="font-semibold">Wealth Level 3</span> to
                      become a Poppo Agent.{" "}
                      <span className="font-semibold"> Kindly contact us</span>{" "}
                      at{" "}
                      <a
                        className="text-blue-700 underline font-semibold"
                        href="https://api.whatsapp.com/send/?phone=919650889239&text&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +919650889239.
                      </a>{" "}
                      to become agent we are going to help you to reach at{" "}
                      <span className="font-semibold">Level 3</span>.
                    </p> */}
                    <a
                      href="https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=63534458&c=poppo%20%20"
                      target="_blank"
                      rel="noopener noreferrer"
                    //   onClick={trackPoppoAgencyClickByLink}
                      className="w-fit md:mt-4 bg-linear-to-r from-[#E514F0] to-[#000899] text-white px-4 lg:px-8 py-2 rounded-full text-base lg:text-lg font-semibold text-center transition-all duration-300"
                    >
                      Apply for Agency
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        {/* <section
          id="registration-form"
          className="scroll-mt-16 pt-12 pb-12 px-4 bg-linear-to-r from-[#DDCCFF] to-[#FFEDF9]"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm px-4 py-6 lg:px-8 lg:py-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-black text-center mb-2">
                Finish Up: Submit Your Details
              </h2>
              <p className="text-center text-gray-700 max-w-2xl mx-auto mb-6">
                Enter your details below. We&apos;ll send your submission to our
                system and you can continue the verification steps in the app.
              </p>

              <form
                onSubmit={handleRegistrationSubmit}
                className="max-w-3xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formValues.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Full name"
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E514F0]"
                    />
                  </div>

                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleFormChange}
                      required
                      placeholder="Email address"
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E514F0]"
                    />
                  </div>

                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formValues.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="Phone number (include country code)"
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E514F0]"
                    />
                  </div>

                  <div className="relative">
                    <input
                      id="app_id"
                      name="app_id"
                      type="text"
                      inputMode="numeric"
                      value={formValues.app_id}
                      onChange={handleFormChange}
                      required
                      placeholder="Your Poppo ID"
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E514F0]"
                    />
                  </div>

                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formValues.role}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E514F0]"
                    >
                      <option value="Agency Owner">Agency</option>
                      <option value="Recruiter/Manager">Host</option>
                      <option value="Other">User</option>
                    </select>
                  </div>

                  <div className="relative">
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formValues.country}
                      onChange={handleFormChange}
                      required
                      placeholder="Country"
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E514F0]"
                    />
                  </div>
                </div>

                {submitStatus && (
                  <div
                    className={`mt-4 text-center text-sm font-medium ${
                      submitStatus.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-linear-to-r from-[#E514F0] to-[#000899] text-white px-6 py-2.5 rounded-full text-base font-semibold text-center transition-all duration-300 disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>

                {submitStatus?.type === "success" && (
                  <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                    <h3 className="text-lg lg:text-xl font-semibold text-black mb-2">
                      Final Step: Join the Agency
                    </h3>
                    <p className="text-sm lg:text-base text-gray-700 mb-4 max-w-xl mx-auto">
                      Your details have been submitted successfully. Click the
                      button below to open the official Poppo Live agency page
                      and complete your agency joining process.
                    </p>
                    <a
                      id="agency-button-after-form-submit"
                      href="https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=63534458&c=poppo%20%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackPoppoAgencyClickById(
                          "agency-button-after-form-submit",
                        )
                      }
                      className="inline-block bg-linear-to-r from-[#E514F0] to-[#000899] text-white px-6 py-2.5 rounded-full text-base font-semibold text-center transition-all duration-300"
                    >
                      Apply for Agency
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section> */}

        <section
          id="why-partner-with-us"
          className="bg-linear-to-r from-[#DDCCFF] to-[#FFEDF9] py-20 px-4 scroll-mt-20"
        >
          <h2 className="text-2xl lg:text-5xl text-center font-bold text-black mb-2 lg:mb-4">
            Why Partner With Us
          </h2>
          <div className="container mx-auto py-8 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Onboarding Support",
                  description:
                    "We guide you through account setup, application submission, and understanding Poppo Live's agency requirements.",
                },
                {
                  title: "Ongoing Guidance",
                  description:
                    "Our team is available to answer your questions as you manage your host roster and grow your agency.",
                },
                {
                  title: "Global Platform",
                  description:
                    "Poppo Live connects creators with audiences worldwide.",
                },
                {
                  title: "Flexible Operations",
                  description:
                    "Run your agency activities on your own schedule, from your phone or laptop.",
                },
                {
                  title: "Partner Community",
                  description:
                    "Connect with other agency partners to share what's working.",
                },
                {
                  title: "Revenue Share",
                  description:
                    "Agency partners receive a revenue share based on their team's activity on the platform, in accordance with Poppo Live's official agency partner terms.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="border-2 rounded-3xl pt-6 pb-4 px-4 lg:pt-8 lg:pb-4 lg:px-4 bg-white relative"
                  style={{ borderColor: "#E514F0" }}
                >
                  <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-10 h-10 bg-linear-to-r from-[#E514F0] to-[#000899] rounded-full text-white text-center leading-10 text-lg font-bold">
                    {index + 1}
                  </div>
                  <div className="text-black text-center">
                    <h3 className="text-lg sm:text-xl leading-tight font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[1rem] sm:text-[1.15rem] text-black/50 leading-tight">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section
          id="commission-structure"
          className="bg-linear-to-l from-[#1e29f69f] to-[#FF007B] py-12 lg:py-20 px-4 scroll-mt-20"
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6 lg:mb-8 text-center">
            Revenue Share
          </h2> */}
          {/* <p className="text-white text-center text-base lg:text-lg leading-snug max-w-3xl mx-auto mb-6">
            Agency partners receive a revenue share based on their team&apos;s
            activity on the platform, in accordance with Poppo Live&apos;s
            official agency partner terms.
          </p> */}
          {/* <div className="flex flex-col md:flex-row gap-4 lg:gap-16 items-center justify-center">
            <Image
              src="/landing-pages/connect-agency/10/21/41.svg"
              alt="Agency Revenue Share Structure"
              width={600}
              height={400}
              className="w-full h-full max-w-lg"
            />
            <ul className="list-disc pl-5 space-y-1 text-white">
              <li style={{ color: "#ffffff" }}>
                <strong>Level D:</strong> 4% agency revenue (Under 2 Million
                Points)
              </li>
              <li style={{ color: "#ffffff" }}>
                <strong>Level C:</strong> 8% agency revenue (2M to 10M Points)
              </li>
              <li style={{ color: "#ffffff" }}>
                <strong>Level B:</strong> 12% agency revenue (10M to 50M Points)
              </li>
              <li style={{ color: "#ffffff" }}>
                <strong>Level A:</strong> 16% agency revenue (50M to 150M
                Points)
              </li>
              <li style={{ color: "#ffffff" }}>
                <strong>Level S:</strong> 20% agency revenue (Over 150M Points)
              </li>
            </ul>

            
          </div> */}
          {/* <div className="text-center max-w-5xl mx-auto mt-6 space-y-3">
            <p className="text-white text-base lg:text-lg leading-tight">Agency partners receive a revenue share based on their team&apos;s activity on the platform, in accordance with Poppo Live&apos;s official agency partner terms</p>
            <p className="text-white text-base lg:text-lg leading-tight">Actual earnings vary based on host activity, engagement, and platform performance, and are not guaranteed.</p>
            </div> */}
          {/* <p className="lg:mt-6 text-white text-center text-base lg:text-lg leading-tight mt-4 mb-2">
            Actual earnings vary based on host activity, engagement, and platform
            performance, and are not guaranteed.
          </p> */}

        {/* </section> */}

        <section
          id="rules"
          className="bg-white py-10 lg:py-20 flex flex-col lg:flex-row gap-4 lg:gap-16 items-center justify-center px-4 scroll-mt-20"
        >
          <Image
            src="/landing-pages/connect-agency/rules.png"
            alt="Agency Rules & Guidelines"
            width={384}
            height={384}
            className="w-full h-full lg:max-w-96 max-w-72"
          />
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold text-black lg:mb-4 mb-2">
              Platform Rules (Please Read Carefully)
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-black/90">
              <li className="text-base lg:text-lg leading-[1.35]">
                Everyone in your team must be at least{" "}
                <span className="font-semibold">18 years old</span> and complete
                identity verification.
              </li>
              <li className="text-base lg:text-lg leading-[1.35]">
                No adult content, hate speech, or unlawful activity is permitted.
                Zero-tolerance policy.
              </li>
              <li className="text-base lg:text-lg leading-[1.35]">
                As an agency partner, you are responsible for ensuring your team
                follows platform rules.
              </li>
              <li className="text-base lg:text-lg leading-[1.35]">
                Do not attempt to recruit creators already managed by another
                Poppo agency.
              </li>
              <li className="text-base lg:text-lg leading-[1.35]">
                Keep your account credentials secure.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="how-to-add-creators-to-your-team"
          className="bg-linear-to-l from-[#ffedf957] to-[#DDCCFF] rounded-3xl lg:rounded-full mt-8 mb-16 pt-6 pb-16 lg:px-12 lg:pt-8 lg:pb-14 w-[90%] lg:w-full max-w-5xl mx-auto px-4 border-2 border-[#010899] relative scroll-mt-28"
        >
          <h2
            className="text-2xl lg:text-4xl font-bold text-black max-w-2xl mx-auto mb-8 lg:mb-8 text-center bg-white rounded-full px-4 py-2"
            style={{ boxShadow: "0 4px 0px #880FCD" }}
          >
            Adding Creators to Your Team
          </h2>
          <p className="text-center text-black text-base lg:text-xl">
            Give new creators your Agency Code:{" "}
            <span className="font-bold text-black text-lg">63534458</span>
          </p>
          <p className="text-center text-black text-base lg:text-xl border-y border-black my-2 py-2 mx-auto">
            Guide them to enter this code in the{" "}
            <span className="font-semibold">&quot;My Agency&quot;</span> section
            of their profile after signing up on the app.
          </p>
          <p className="text-center text-black text-base lg:text-xl">
            Questions? Contact our support team at{" "}
            <a
              href="https://api.whatsapp.com/send/?phone=917065384660&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline font-semibold"
            >
              +91 7065384660
            </a>{" "}
            or{" "}
            {/* <a
              href="mailto:support@connectwithapps.com"
              className="text-blue-700 underline font-semibold"
            >
              support@connectwithapps.com
            </a> */}
            .
          </p>
        </section>

        <section
          id="frequently-asked-questions"
          className="bg-white mt-24 lg:mt-24 max-w-4xl w-[90%] mx-auto scroll-mt-20"
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-black mb-6 lg:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-1 divide-y divide-gray-200">
            <details className="py-2">
              <summary className="cursor-pointer font-semibold text-black text-lg">
                Does it cost anything to join as an agency partner?
              </summary>
              <p className="mt-2 text-gray-700">
                No. There is no fee to register as an agency partner.
                Compensation is performance-based, per Poppo Live&apos;s official
                terms.
              </p>
            </details>
            <details className="py-2">
              <summary className="cursor-pointer font-semibold text-black text-lg">
                What support do I get?
              </summary>
              <p className="mt-2 text-gray-700">
                We provide onboarding guidance and ongoing support to help you
                understand and follow Poppo Live&apos;s agency requirements.
              </p>
            </details>
            <details className="py-2">
              <summary className="cursor-pointer font-semibold text-black text-lg">
                How is commission paid?
              </summary>
              <p className="mt-2 text-gray-700">
                Payouts follow Poppo Live&apos;s standard schedule. Full details
                are shared during onboarding.
              </p>
            </details>
            <details className="py-2">
              <summary className="cursor-pointer font-semibold text-black text-lg">
                What are the requirements for creators on my team?
              </summary>
              <p className="mt-2 text-gray-700">
                Creators must be 18 or older, complete identity verification,
                and follow all Poppo Live community guidelines.
              </p>
            </details>
            <details className="py-2">
              <summary className="cursor-pointer font-semibold text-black text-lg">
                What happens if a creator on my team violates platform rules?
              </summary>
              <p className="mt-2 text-gray-700">
                As the managing agency partner, you&apos;re responsible for your
                team&apos;s compliance. Repeated violations can result in
                penalties to your agency account.
              </p>
            </details>
          </div>
        </section>

        <section className="text-center pt-4 lg:pt-8 px-4">
          <a
            href="https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=63534458&c=poppo%20%20"
            target="_blank"
            rel="noopener noreferrer"
            // onClick={trackPoppoAgencyClickByLink}
            className="inline-block bg-linear-to-r from-[#E514F0] to-[#000899] hover:bg-white text-white px-6 py-2 rounded-full text-base lg:text-lg font-semibold transition-all duration-300"
          >
            Apply for Agency
          </a>
        </section>

        <section
          id="about-us"
          className="bg-[radial-gradient(circle_at_58%_100%,#E514F020_0%,#ffffff_100%)] w-full mx-auto mt-8 px-4 pt-8 lg:px-6 lg:py-12 shadow-sm scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto lg:mb-16 mb-12">
            <h3 className="text-2xl lg:text-4xl font-semibold text-black mb-2 text-center">
              About Us
            </h3>
            <p className="text-base lg:text-lg text-gray-900 text-center max-w-4xl mx-auto">
            Gadhavi Consultancy is an independent talent management company (not owned by or affiliated with Poppo Live). Poppo Live is operated by its own platform provider. We only offer recruitment guidance, onboarding assistance, and compliance support for prospective Poppo Live agents and hosts. We do not guarantee approvals, earnings, or placements results depend on the platform's policies and individual performance.
            </p>
            {/* <p className="text-base lg:text-lg text-gray-900 text-center max-w-4xl mx-auto mt-4">
              We do not guarantee application approval or specific earnings.
              Outcomes depend on your own effort, your team&apos;s activity, and
              adherence to platform policies.
            </p> */}

            <div className="text-base lg:text-lg text-gray-800 text-center mt-0 space-y-1">
              {/* <p>
                <span className="font-semibold">Legal entity:</span> Connect
                Tech
              </p> */}
              {/* <p>
                <span className="font-semibold">Address:</span> Omaxe Green
                Meadow City, Bhiwadi, Rajasthan 301019
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=919650889239&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  +91 9650889239
                </a>{" "}
                ,{" "}
                <a
                  href="mailto:support@connectwithapps.com"
                  className="text-blue-700 underline"
                >
                  support@connectwithapps.com
                </a>{" "}
              </p> */}
            </div>
          </div>

          {/* <footer className="w-[95%] mx-auto lg:px-16 py-6 border border-[#E514F0] bg-linear-to-r from-[#fef1ff] via-[#fdd0ff] to-[#fef1ff] rounded-t-3xl lg:rounded-t-[40px]">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-center justify-between">
              <Image
                src="/landing-pages/logo2.png"
                alt="Join with Connect Logo"
                width={192}
                height={192}
                className="w-20 md:w-24 lg:w-28 h-auto hidden"
              />
              <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 items-center justify-between mx-auto">
                <Link
                  href="/contact-us"
                  className="text-black hover:text-gray-600 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <div className="w-px h-4 bg-[#E514F0] hidden lg:block"></div>
                <Link
                  href="/privacy-policy"
                  className="text-black hover:text-gray-600 transition-all duration-300"
                >
                  Privacy Policy
                </Link>
                <div className="w-px h-4 bg-[#E514F0] hidden lg:block"></div>
                <Link
                  href="/terms-and-conditions"
                  className="text-black hover:text-gray-600 transition-all duration-300"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <div className="border-t border-[#E514F0] my-4 max-w-[90%] lg:max-w-full mx-auto"></div>
            <div className="text-center">
              <p className="text-gray-600 text-sm leading-tight mt-4 px-4">
                © 2026 Join with Connect. All Rights Reserved.
              </p>
            </div>
          </footer> */}
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}
