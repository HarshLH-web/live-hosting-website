'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Head from 'next/head';
import { Inter, Orbitron, Space_Grotesk } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const AGENCY_APPLY_URL =
  'https://h5.vshowapi.com/guild/agency_invite/register/?inviter_id=29828616&c=poppo%20%20';
const DOWNLOAD_APP_URL =
  'https://invite-poppo.com/bzG7eB';
const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=917065384660&text&type=phone_number&app_absent=0';
const AGENCY_CODE = '29828616';
const TRANSLATE_COOKIE = 'googtrans';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'tl', label: 'Filipino' },
];

const POLICIES = [
  {
    text: 'Host Policy',
    url: '/Policies/POPPO HOST REGISTRATION - WEBSITE.pdf',
  },
  {
    text: 'Agency Policy',
    url: '/Policies/POPPO AGENCY POLICY - WEBSITE.pdf',
  },
  {
    text: 'Coin Seller Policy',
    url: '/Policies/Poppo Coin Trading - Website.pdf',
  },
  {
    text: 'Rocket Host and Star Host Policy',
    url: '/Policies/Poppo rocket host and star host policy - website.pdf',
  },
];

function readTranslateCookie() {
  if (typeof document === 'undefined') return 'en';

  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return 'en';

  const value = decodeURIComponent(match[1]);
  const parts = value.split('/').filter(Boolean);
  const code = parts[parts.length - 1];

  if (code && LANGUAGES.some((lang) => lang.code === code)) {
    return code;
  }

  return 'en';
}

function clearTranslateCookies() {
  const hostname = window.location.hostname;
  const expired = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const paths = ['/', window.location.pathname];
  const domains = ['', hostname, `.${hostname}`];

  for (const path of paths) {
    document.cookie = `${TRANSLATE_COOKIE}=; expires=${expired}; path=${path}`;
    for (const domain of domains) {
      if (!domain) continue;
      document.cookie = `${TRANSLATE_COOKIE}=; expires=${expired}; path=${path}; domain=${domain}`;
    }
  }
}

function writeTranslateCookie(code) {
  clearTranslateCookies();

  if (code === 'en') return;

  const value = `/en/${code}`;
  document.cookie = `${TRANSLATE_COOKIE}=${value}; path=/`;

  const hostname = window.location.hostname;
  if (hostname && hostname !== 'localhost') {
    document.cookie = `${TRANSLATE_COOKIE}=${value}; path=/; domain=${hostname}`;
  }
}

function subscribeTranslateCookie() {
  return () => {};
}

const FAQS = [
  {
    q: 'Does it cost anything to join as an agency partner?',
    a: "No. There is no fee to register as an agency partner. Compensation is performance-based, per Poppo Live's official terms.",
  },
  {
    q: 'What support do I get?',
    a: "We provide onboarding guidance and ongoing support to help you understand and follow Poppo Live's agency requirements.",
  },
  {
    q: 'How is commission paid?',
    a: "Payouts follow Poppo Live's standard schedule. Full details are shared during onboarding.",
  },
  {
    q: 'What are the requirements for creators on my team?',
    a: 'Creators must be 18 or older, complete identity verification, and follow all Poppo Live community guidelines.',
  },
  {
    q: 'What happens if a creator on my team violates platform rules?',
    a: "As the managing agency partner, you're responsible for your team's compliance. Repeated violations can result in penalties to your agency account.",
  },
];

const BENEFITS = [
  {
    num: '01',
    title: 'Onboarding Support',
    desc: 'Account setup, application submission, and understanding agency requirements.',
  },
  {
    num: '02',
    title: 'Ongoing Guidance',
    desc: 'Our team answers your questions as you manage your host roster and grow.',
  },
  {
    num: '03',
    title: 'Global Platform',
    desc: 'Poppo Live connects creators with audiences worldwide.',
  },
  {
    num: '04',
    title: 'Flexible Operations',
    desc: 'Run your agency activities on your own schedule, from your phone or laptop.',
  },
  {
    num: '05',
    title: 'Partner Community',
    desc: "Connect with other agency partners to share what's working.",
  },
];

const RULES = [
  'Everyone in your team must be at least 18 years old and complete identity verification.',
  'No adult content, hate speech, or unlawful activity is permitted. Zero-tolerance policy.',
  'As an agency partner, you are responsible for ensuring your team follows platform rules.',
  'Do not attempt to recruit creators already managed by another Poppo agency.',
  'Keep your account credentials secure.',
];

const BAR_HEIGHTS = ['35%', '55%', '40%', '80%', '60%', '95%', '50%', '70%'];

const GRADIENT = 'bg-linear-to-r from-[#00C2FF] via-[#7B2FFF] to-[#FF2E97]';
const LINK =
  'text-[#7B2FFF] font-bold underline underline-offset-2 hover:opacity-80';

function HudPanel({ children, className = '' }) {
  return (
    <div
      className={`relative bg-white border border-[#DCE3F2] rounded-md ${className}`}
    >
      <span className="absolute -top-px -left-px z-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00C2FF]" />
      <span className="absolute -bottom-px -right-px z-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FF2E97]" />
      {children}
    </div>
  );
}

function Label({ children, className = '' }) {
  return (
    <div
      className={`${orbitron.className} text-[0.66rem] uppercase tracking-[0.14em] font-bold inline-flex items-center gap-2 ${className}`}
    >
      <span className="w-[7px] h-[7px] bg-[#00C2FF] rounded-[1px] rotate-45 shrink-0" />
      {children}
    </div>
  );
}

function GradientText({ children, className = '' }) {
  return (
    <span
      className={`${GRADIENT} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

function BtnPrimary({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${orbitron.className} ${GRADIENT} inline-block text-white font-bold text-[0.8rem] tracking-[0.03em] py-[15px] px-[26px] rounded-lg no-underline shadow-[0_10px_30px_rgba(0,194,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(255,46,151,0.3)] transition duration-150 ${className}`}
    >
      {children}
    </a>
  );
}

function BtnGhost({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${orbitron.className} inline-block bg-white text-[#0B0F1E] font-bold text-[0.8rem] tracking-[0.03em] py-[15px] px-[26px] rounded-lg no-underline border-[1.5px] border-[#DCE3F2] hover:border-[#00C2FF] hover:-translate-y-0.5 transition duration-150 ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHead({ label, title }) {
  return (
    <div className="max-w-[640px] mx-auto mb-10 text-center">
      <Label className="justify-center">{label}</Label>
      <h2
        className={`${spaceGrotesk.className} text-[clamp(1.6rem,3vw,2.15rem)] text-[#0B0F1E] mt-3 font-bold`}
      >
        {title}
      </h2>
    </div>
  );
}

function NoteBox({ children, className = '' }) {
  return (
    <div
      className={`mt-[26px] border border-[#DCE3F2] border-l-[3px] border-l-[#00C2FF] rounded-r-lg py-4 px-5 text-[0.86rem] text-[#525A72] max-w-[760px] mx-auto bg-[#FAFBFF] ${className}`}
    >
      {children}
    </div>
  );
}

function Wrap({ children, className = '' }) {
  return (
    <div className={`max-w-[1120px] mx-auto px-6 relative z-1 ${className}`}>
      {children}
    </div>
  );
}

function StepNum({ children }) {
  return (
    <div
      className={`${orbitron.className} ${GRADIENT} text-[0.9rem] font-bold text-white w-[34px] h-[34px] rounded-[7px] flex items-center justify-center shrink-0`}
    >
      {children}
    </div>
  );
}

function VisualStepNum({ children }) {
  return (
    <span
      className={`${orbitron.className} ${GRADIENT} text-[0.9rem] font-bold text-white w-[30px] h-[30px] rounded-md flex items-center justify-center shrink-0`}
    >
      {children}
    </span>
  );
}

function VmPill({ children }) {
  return (
    <div className="bg-[#F0F3FA] rounded-md py-1.5 px-2 text-[0.6rem] text-[#525A72] font-semibold flex items-center gap-1.5">
      {children}
    </div>
  );
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch {
    /* ignore */
  }
  document.body.removeChild(ta);
}

export default function PoppoAgent() {
  const [openFaq, setOpenFaq] = useState(null);
  const [copied, setCopied] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const currentLang = useSyncExternalStore(
    subscribeTranslateCookie,
    readTranslateCookie,
    () => 'en'
  );
  const policyRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: LANGUAGES.map((l) => l.code).join(','),
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (policyRef.current && !policyRef.current.contains(event.target)) {
        setOpenPolicy(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setOpenLang(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const selectLanguage = (code) => {
    writeTranslateCookie(code);
    setOpenLang(false);
    window.location.reload();
  };

  const copyCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(AGENCY_CODE);
      } else {
        fallbackCopy(AGENCY_CODE);
      }
    } catch {
      fallbackCopy(AGENCY_CODE);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Head>
        <title>Become a Poppo Live Agency Partner — Live Hosting</title>
        <meta
          name="description"
          content="Become a Poppo Live agency partner with Live Hosting. Get onboarding support, guidance, and ongoing assistance as an independent agency partner."
        />
      </Head>

      <div
        className={`${inter.className} relative min-h-screen text-[#0B0F1E] leading-relaxed select-text bg-[#F3F6FC] bg-[radial-gradient(900px_500px_at_100%_-10%,rgba(123,47,255,0.08),transparent_60%),radial-gradient(700px_400px_at_-10%_20%,rgba(0,194,255,0.08),transparent_60%)] bg-fixed`}
      >
        {/* Hidden Google Translate mount */}
        <div id="google_translate_element" className="sr-only" aria-hidden />

        {/* Grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(11,15,30,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,15,30,0.035)_1px,transparent_1px)] bg-size-[42px_42px] [mask-image:radial-gradient(1000px_700px_at_50%_0%,#000_20%,transparent_75%)]"
          aria-hidden
        />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#F3F6FC]/85 backdrop-blur-[10px] border-b border-[#DCE3F2]">
          <div className="flex items-center justify-between gap-3 py-4 px-2 sm:px-6 relative z-1 max-w-[1120px] mx-auto">
            <div
              className={`${spaceGrotesk.className} flex items-center gap-2.5 font-bold text-base sm:text-[1.15rem] leading-none text-[#0B0F1E]`}
            >
              <span className={`relative w-[26px] h-[26px] rounded-md ${GRADIENT}`}>
                <span className="absolute inset-[5px] bg-white rounded-[3px]" />
              </span>
              Live Hosting
            </div>

            <div className="flex items-center gap-1 sm:gap-3">
              {/* Policy download dropdown */}
              <div className="relative" ref={policyRef}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenPolicy((v) => !v);
                    setOpenLang(false);
                  }}
                  className={`${orbitron.className} inline-flex items-center gap-1.5 font-bold text-[0.68rem] sm:text-[0.72rem] tracking-[0.04em] text-[#0B0F1E] bg-white border border-[#DCE3F2] sm:py-3 p-2 sm:px-3.5 rounded-md hover:border-[#00C2FF] transition focus-visible:outline-2 focus-visible:outline-[#00C2FF] focus-visible:outline-offset-[3px]`}
                  aria-expanded={openPolicy}
                  aria-haspopup="listbox"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                    aria-hidden
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  {/* <span className="hidden sm:inline">Policies</span> */}
                  {/* <svg
                    className={`w-3.5 h-3.5 transition-transform ${openPolicy ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg> */}
                </button>

                {openPolicy && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-[#DCE3F2] rounded-lg shadow-lg overflow-hidden z-50">
                    {POLICIES.map((policy) => (
                      <a
                        key={policy.url}
                        href={policy.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenPolicy(false)}
                        className="block px-4 py-3 text-sm text-[#0B0F1E] font-medium hover:bg-[#F3F6FC] hover:text-[#7B2FFF] border-b border-[#DCE3F2] last:border-b-0 no-underline"
                      >
                        {policy.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Language dropdown */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenLang((v) => !v);
                    setOpenPolicy(false);
                  }}
                  className="inline-flex items-center justify-center sm:py-2.5 p-2 sm:px-3 rounded-md border border-[#DCE3F2] bg-white text-[#0B0F1E] hover:border-[#00C2FF] transition focus-visible:outline-2 focus-visible:outline-[#00C2FF] focus-visible:outline-offset-[3px]"
                  aria-label="Select language"
                  aria-expanded={openLang}
                  aria-haspopup="listbox"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-languages-icon lucide-languages"
                    aria-hidden
                  >
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                </button>

                {openLang && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-[#DCE3F2] rounded-lg shadow-lg overflow-hidden z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => selectLanguage(lang.code)}
                        className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition ${
                          currentLang === lang.code
                            ? 'bg-[#F3F6FC] text-[#7B2FFF]'
                            : 'text-[#0B0F1E] hover:bg-[#F3F6FC]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={AGENCY_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${orbitron.className} font-bold text-[0.68rem] sm:text-[0.76rem] tracking-[0.04em] text-white bg-[#0B0F1E] py-[7px] sm:py-[11px] px-2 sm:px-[18px] rounded-md no-underline hover:shadow-[0_0_0_2px_#00C2FF] focus-visible:outline-2 focus-visible:outline-[#00C2FF] focus-visible:outline-offset-[3px] whitespace-nowrap`}
              >
                Apply for Agency
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-[66px] pb-[60px] relative z-1 scroll-mt-20">
          <Wrap className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div>
              <Label>Poppo Live · Agency Partner Program</Label>
              <h1
                className={`${spaceGrotesk.className} font-bold text-[clamp(2.2rem,4.2vw,3.3rem)] leading-[1.1] text-[#0B0F1E] mt-4 tracking-[-0.01em]`}
              >
                Become a <GradientText>Poppo Live</GradientText> agency partner
              </h1>
              <p className="mt-5 text-[1.04rem] text-[#525A72] max-w-[480px]">
                Manage a team of live-streaming creators on Poppo Live. Get onboarding support,
                guidance, and ongoing assistance as an independent agency partner.
              </p>
              <div className="flex gap-3.5 mt-[30px] flex-wrap items-center">
                <BtnPrimary href={AGENCY_APPLY_URL}>APPLY FOR AGENCY</BtnPrimary>
                <BtnGhost href={DOWNLOAD_APP_URL}>DOWNLOAD APP</BtnGhost>
              </div>
              <div className="mt-4 text-[0.86rem] text-[#525A72]">
                Indian users can also{' '}
                <a
                  href="https://joinluvlive.com/azNtkC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  download the Vone App
                </a>{' '}
                for Android &amp; iOS.
              </div>
              <div className="mt-5 text-[0.78rem] text-[#8891A8] max-w-[460px]">
                Live Hosting is an independent agency partner for Poppo Live — not Poppo Live
                itself.
              </div>
            </div>

            <Image 
              src="/poppo-image.png"
              alt="Poppo Live Agency Partner"
              width={500}
              height={500}
              className="w-full h-auto max-w-80 md:max-w-96 mx-auto"
            />

            {/* <HudPanel className="p-[26px]">
              <div className="flex justify-between items-center mb-5">
                <div
                  className={`${orbitron.className} text-[0.62rem] font-bold tracking-[0.05em] text-white bg-[#FF2E97] py-[5px] px-2.5 rounded flex items-center gap-[5px]`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                <div
                  className={`${orbitron.className} text-[0.62rem] font-bold text-[#525A72] bg-[#EEF1F8] py-[5px] px-2.5 rounded`}
                >
                  👁 2.4K
                </div>
              </div>
              <div className={`${spaceGrotesk.className} text-[1.2rem] font-bold mb-1.5`}>
                Your team, on air
              </div>
              <p className="text-[0.86rem] text-[#525A72] max-w-[320px] mb-5">
                Recruit hosts, guide them through onboarding, and grow your own live-streaming roster
                on Poppo Live.
              </p>
              <div className="flex items-end gap-1.5 h-[60px] mb-5">
                {BAR_HEIGHTS.map((height, i) => (
                  <span
                    key={i}
                    className={`flex-1 ${GRADIENT} rounded-t-[3px] opacity-85`}
                    style={{ height }}
                  />
                ))}
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {['FREE TO JOIN', 'WEEKLY PAYOUTS'].map((chip) => (
                  <div
                    key={chip}
                    className={`${orbitron.className} text-[0.66rem] font-bold tracking-[0.02em] border border-[#DCE3F2] rounded-md py-2 px-3 text-[#525A72]`}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </HudPanel> */}
          </Wrap>
        </section>

        {/* Getting started */}
        <section id="get-started" className="py-[68px] relative z-1 scroll-mt-20">
          <Wrap>
            <SectionHead label="Getting started" title="How to get started" />


            <div className="flex flex-col gap-3.5 max-w-[760px] mx-auto">
              {[
                {
                  num: '01',
                  title: 'Download & Sign Up',
                  body: (
                    <>
                      <a href={DOWNLOAD_APP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                        Download the Poppo Live App
                      </a>{' '}
                      and create your account.
                    </>
                  ),
                },
                {
                  num: '02',
                  title: 'Find Your ID',
                  body: 'Go to your profile in the app and copy your unique Poppo ID number.',
                },
                {
                  num: '03',
                  title: 'Submit Your Application',
                  body: (
                    <>
                      Click on{' '}
                      <a href={AGENCY_APPLY_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                      <strong>Agency Registration Link</strong>
                      </a>{' '}
                      paste your <strong>Profile ID</strong>, and click on <strong>&quot;Get&quot;</strong>. You&apos;ll receive a verification code in your app message section.
                    </>
                  ),
                },
                {
                  num: '04',
                  title: 'Finish Up',
                  body: 'Enter that verification code here and click on Submit. All set, now you become Poppo Agent.',
                },
              ].map((step) => (
                <HudPanel key={step.num} className="flex gap-[18px] items-start p-5">
                  <StepNum>{step.num}</StepNum>
                  <div>
                    <h3
                      className={`${spaceGrotesk.className} text-[1.02rem] text-[#0B0F1E] font-bold mb-1.5`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[0.92rem] text-[#525A72]">{step.body}</p>
                  </div>
                </HudPanel>
              ))}
            </div>

            <NoteBox>
              <strong className={`${orbitron.className} text-[#0B0F1E] text-[0.78rem] tracking-[0.03em]`}>
                NOTE
              </strong>{' '}
              If you&apos;re in the South Asian region (Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka, etc.), contact us on{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                WhatsApp at +91 70653 84660
              </a>{' '}
              to learn the agent registration process.
            </NoteBox>

            <div className="text-center mt-7">
              <BtnPrimary href={AGENCY_APPLY_URL}>APPLY FOR AGENCY</BtnPrimary>
            </div>
          </Wrap>
        </section>

        {/* Benefits */}
        <section id="benefits" className="pt-0 pb-[68px] relative z-1 scroll-mt-20">
          <Wrap>
            <SectionHead label="Partner benefits" title="Why partner with us" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {BENEFITS.map((b) => (
                <HudPanel key={b.num} className="py-[22px] px-4 text-center">
                  <div className={`${orbitron.className} text-[0.72rem] font-bold tracking-[0.04em]`}>
                    <GradientText>{b.num}</GradientText>
                  </div>
                  <h4
                    className={`${spaceGrotesk.className} text-[0.9rem] text-[#0B0F1E] font-bold mt-2.5 mb-1.5`}
                  >
                    {b.title}
                  </h4>
                  <p className="text-[0.78rem] text-[#525A72]">{b.desc}</p>
                </HudPanel>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Revenue */}
        <section id="revenue" className="py-[68px] relative z-1 scroll-mt-20">
          <Wrap>
            <SectionHead label="Earnings" title="Revenue share" />
            <HudPanel className="p-10 text-center">
              <p className="text-base text-[#0B0F1E] max-w-[620px] mx-auto mb-2.5 font-medium">
                Agency partners receive a revenue share based on their team&apos;s activity on the
                platform, in accordance with Poppo Live&apos;s official agency partner terms.
              </p>
              <p className="text-[0.82rem] text-[#525A72] mt-1.5 font-normal">
                Full payout structure and rates are shared directly during onboarding.
              </p>
              <p className="text-[0.82rem] text-[#525A72] mt-1.5 font-normal">
                Actual earnings vary based on host activity, engagement, and platform performance, and
                are not guaranteed.
              </p>
              <BtnPrimary
                href="https://www.joinwithconnect.com/contact-us"
                className="mt-[22px]"
              >
                CONTACT US TO KNOW MORE
              </BtnPrimary>
            </HudPanel>
          </Wrap>
        </section>

        {/* Rules */}
        <section id="rules" className="pt-0 pb-[68px] relative z-1 scroll-mt-20">
          <Wrap>
            <SectionHead label="Please read carefully" title="Platform rules" />
            <ul className="list-none grid gap-3 p-0 m-0">
              {RULES.map((rule) => (
                <li
                  key={rule}
                  className="py-[15px] px-5 text-[0.9rem] text-[#525A72] flex gap-3.5 items-start border border-[#DCE3F2] rounded-lg bg-white"
                >
                  <span className={`${orbitron.className} text-[#00C2FF] font-bold shrink-0`}>
                    {'//'}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </Wrap>
        </section>

        {/* Agency code */}
        <section id="agency-code" className="py-[68px] relative z-1 scroll-mt-20">
          <Wrap>
            <SectionHead label="Growing your team" title="Adding creators to your team" />
            <HudPanel className="p-[30px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 flex-wrap">
              <div>
                <h4
                  className={`${spaceGrotesk.className} text-[#0B0F1E] text-[1.02rem] font-bold`}
                >
                  Give new creators your Agency Code
                </h4>
                <p className="text-[0.88rem] text-[#525A72] max-w-[420px] mt-1.5">
                  Guide them to enter this code in the &quot;My Agency&quot; section of their profile
                  after signing up on the app.
                </p>
              </div>
              <button
                type="button"
                onClick={copyCode}
                className={`${orbitron.className} bg-[#FAFBFF] border-[1.5px] border-dashed rounded-lg py-3.5 px-[26px] text-[1.15rem] tracking-[0.04em] font-bold text-center cursor-pointer transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,194,255,0.35)] ${
                  copied
                    ? 'border-[#00C2FF] text-[#7B2FFF]'
                    : 'border-[#7B2FFF] text-[#7B2FFF]'
                }`}
              >
                <span
                  className={`${orbitron.className} block text-[0.6rem] tracking-[0.08em] uppercase text-[#525A72] font-bold mb-1.5`}
                >
                  Agency Code
                </span>
                {AGENCY_CODE}
                <span
                  className={`${inter.className} block text-[0.64rem] font-semibold mt-2 tracking-normal ${
                    copied ? 'text-[#00C2FF]' : 'text-[#525A72]'
                  }`}
                >
                  {copied ? 'Copied!' : 'Tap to copy'}
                </span>
              </button>
            </HudPanel>
            <NoteBox className="mt-[22px]">
              Questions? Contact our support team at{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                +91 70653 84660
              </a>
              .
            </NoteBox>
          </Wrap>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-[68px] relative z-1 scroll-mt-20">
          <Wrap>
            <SectionHead label="FAQ" title="Frequently asked questions" />
            <div className="max-w-[760px] mx-auto flex flex-col gap-2.5">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <HudPanel key={faq.q} className="py-1.5 px-5">
                    <button
                      type="button"
                      className={`${spaceGrotesk.className} flex justify-between items-center cursor-pointer font-bold text-[#0B0F1E] text-[0.98rem] w-full bg-transparent border-0 text-left py-3.5`}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`${orbitron.className} text-[#FF2E97] text-[1.2rem] shrink-0 ml-3 transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-250 text-[0.9rem] text-[#525A72] ${
                        isOpen ? 'max-h-[200px] pb-4' : 'max-h-0'
                      }`}
                    >
                      {faq.a}
                    </div>
                  </HudPanel>
                );
              })}
            </div>
          </Wrap>
        </section>

        {/* Final CTA */}
        <section className="pt-16 pb-5 text-center relative z-1" id="apply">
          <Wrap>
            <HudPanel className="py-[52px] px-8">
              <Label className="justify-center">Ready when you are</Label>
              <h2
                className={`${spaceGrotesk.className} text-[clamp(1.7rem,3.2vw,2.4rem)] text-[#0B0F1E] font-bold`}
              >
                Ready to build your agency?
              </h2>
              <p className="text-[#525A72] mt-2.5 max-w-[440px] mx-auto">
                Apply now and our team will guide you through onboarding.
              </p>
              <div className="flex gap-3.5 mt-[26px] flex-wrap items-center justify-center">
                <BtnPrimary href={AGENCY_APPLY_URL}>APPLY FOR AGENCY</BtnPrimary>
                <BtnGhost href={DOWNLOAD_APP_URL}>DOWNLOAD APP</BtnGhost>
              </div>
              <div className="mt-5 text-[0.88rem] text-[#525A72]">
                Or reach us directly at{' '}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                  +91 70653 84660
                </a>
              </div>
            </HudPanel>
          </Wrap>
        </section>

        {/* Footer */}
        <footer className="py-10 pb-[50px] border-t border-[#DCE3F2] mt-4 relative z-1">
          <Wrap className="max-w-[740px] text-center">
            <p className="text-[0.8rem] text-[#8891A8] leading-[1.7] mb-2.5">
              <strong className="text-[#0B0F1E]">About Us</strong>
            </p>
            <p className="text-[0.8rem] text-[#8891A8] leading-[1.7] mb-2.5">
              Live Hosting is an independent talent management company operated by Abhijeet.
              We are not owned by, or legally affiliated with, the corporate owners of Poppo Live. We
              operate as a third-party agency partner, helping independent creators and agency
              operators understand and follow Poppo Live&apos;s official program requirements.
            </p>
            <p className="text-[0.8rem] text-[#8891A8] leading-[1.7] mb-2.5">
              We do not guarantee application approval or specific earnings. Outcomes depend on your
              own effort, your team&apos;s activity, and adherence to platform policies.
            </p>

            <div className="flex justify-center gap-5 mt-5 text-[0.8rem] flex-wrap">
              <a
                href="https://www.joinwithconnect.com/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#525A72]"
              >
                Contact Us
              </a>
              <a
                href="https://www.joinwithconnect.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#525A72]"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.joinwithconnect.com/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#525A72]"
              >
                Terms &amp; Conditions
              </a>
            </div>
            <div
              className={`${orbitron.className} mt-4 text-[0.68rem] text-[#AAB2C6] text-center tracking-[0.04em]`}
            >
              © 2026 Live Hosting — ALL RIGHTS RESERVED
            </div>
          </Wrap>
        </footer>
      </div>
    </>
  );
}
