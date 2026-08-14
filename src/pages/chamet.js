'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Bricolage_Grotesque, Public_Sans, Space_Mono } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const REGISTRATION_URL =
  'https://h5.schamet.com/webH5/inviteAgent/bind.html?companyId=3338';
const DASHBOARD_URL = 'https://agent.ichamet.com/';
const WHATSAPP_URL =
  'https://wa.me/919650889239?text=Hi%2C%20I%20have%20registered%20as%20a%20Chamet%20agency.%20My%20Agent%20ID%20is%3A';
const WHATSAPP_QUESTION_URL =
  'https://wa.me/919650889239?text=Hi%2C%20I%20have%20a%20question%20about%20the%20Chamet%20agency%20program.';
const CHILL_CHAT_URL =
  'https://play.google.com/store/apps/details?id=com.bite.chillchat';
const CHAMET_APP_URL =
  'https://play.google.com/store/apps/details?id=com.hkfuliao.chamet';
const METWALLET_URL = 'https://www.arripayment.com/before-login';

function readConsentNeeded() {
  if (typeof window === 'undefined') return false;
  try {
    return !localStorage.getItem('conect_consent');
  } catch {
    return true;
  }
}

function subscribeConsent() {
  return () => {};
}

const BEFORE_START = [
  'A mobile number you can receive a code on right now',
  'A password you will remember for the dashboard',
  'An identity document for verification later',
  'About five minutes, without interruption',
];

const REGISTRATION_STEPS = [
  {
    num: '01',
    title: 'Open the registration page',
    body: (
      <>
        Go to{' '}
        <a
          className="text-[#3B1F4A] font-semibold underline underline-offset-[3px]"
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chamet&apos;s agency registration page
        </a>
        . Opening it through this link connects your new agency to Conect for support.
      </>
    ),
  },
  {
    num: '02',
    title: 'Enter your mobile number',
    body: 'Use the number you want permanently linked to the agency account. Changing it later is not simple, so choose carefully.',
  },
  {
    num: '03',
    title: 'Request the verification code',
    body: 'Tap Send. A one-time code arrives on WhatsApp or as a text message, usually within a minute.',
  },
  {
    num: '04',
    title: 'Enter the code and set a password',
    body: 'Type the code, then create a password and confirm it. Save the password somewhere safe you will need it every time you log in.',
  },
  {
    num: '05',
    title: 'Register and log in',
    body: (
      <>
        Tap Register, then sign in at the{' '}
        <a
          className="text-[#3B1F4A] font-semibold underline underline-offset-[3px]"
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chamet agency dashboard
        </a>
        . Your Agent ID is shown on the dashboard once you are in.
      </>
    ),
  },
  {
    num: '06',
    title: 'Send us your Agent ID',
    body: 'Message your Agent ID to our team so we can verify the account and start your onboarding. This is the step people forget.',
    action: (
      <a
        className={`${publicSans.className} inline-flex items-center justify-center gap-2 font-semibold text-sm py-2.5 px-4.5 rounded-md bg-[#E8446F] text-white no-underline hover:bg-[#cf3760] transition mt-3.5 active:translate-y-px`}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
        Send Agent ID on WhatsApp
      </a>
    ),
  },
];

const REQUIREMENTS = [
  {
    text: (
      <>
        <strong className="text-[#181521] font-semibold">18 years or older.</strong> This applies
        to you and to every host you bring onto your team, without exception.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-[#181521] font-semibold">Valid identity document.</strong> You and
        your hosts must be able to complete Chamet&apos;s identity check.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-[#181521] font-semibold">A working mobile number.</strong> Needed
        for the verification code and for account recovery later.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-[#181521] font-semibold">Agreement to Chamet&apos;s community rules.</strong>{' '}
        You are responsible for your hosts following them.
      </>
    ),
  },
];

const SUPPORT_CELLS = [
  {
    title: 'Guided registration',
    desc: 'We stay with you on WhatsApp through the six steps below and check your details before you submit.',
    icon: 'folder',
  },
  {
    title: 'Dashboard walkthrough',
    desc: 'A plain explanation of the agent dashboard: adding hosts, reading their activity, and where the settings sit.',
    icon: 'card',
  },
  {
    title: 'Host onboarding help',
    desc: 'How to add hosts to your agency, what verification they need, and what the platform expects from them.',
    icon: 'users',
  },
  {
    title: 'Rules, kept current',
    desc: 'Chamet updates its requirements from time to time. We tell you what changed and what it means for your team.',
    icon: 'shield',
  },
  {
    title: 'Global reach',
    desc: 'Chamet is used across many countries and languages, so your hosts are not limited to one region.',
    icon: 'globe',
  },
  {
    title: 'Your own hours',
    desc: 'You run your agency from a phone or laptop, on whatever schedule suits you. There is no shift or roster.',
    icon: 'clock',
  },
];

const WHAT_IS = [
  'An independent agency partnership on Chamet, a live video chat platform, listed in India as Chill Chat.',
  'You recruit hosts, add them to your agency, and support them.',
  "Chamet pays agencies based on their team's activity, under Chamet's own published terms.",
  'Registration is free and you keep full control of your own account.',
];

const WHAT_IS_NOT = [
  'Not a salaried job, and not employment with Chamet or with Conect.',
  'Not a fixed or guaranteed income. Nothing is earned if your team is not active.',
  'Not an investment, and we never ask you to pay a joining fee or deposit.',
  'Not run by Chamet. Conect is an independent partner, not the platform owner.',
];

const HOST_STEPS = [
  {
    num: '01',
    title: 'Send the invitation from your dashboard',
    body: (
      <>
        Open the host invitation link in your{' '}
        <a
          className="text-[#3B1F4A] font-semibold underline underline-offset-[3px]"
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          agency dashboard
        </a>{' '}
        and share it with the person joining. An invitation sent any other way will not attach them
        to your agency.
      </>
    ),
  },
  {
    num: '02',
    title: 'They verify a phone number or email address',
    body: 'The host opens the link and confirms a mobile number or email address with a one-time code.',
  },
  {
    num: '03',
    title: 'They download the app',
    body: 'Chill Chat in India, Chamet elsewhere. Both are on the Google Play Store and both connect to the same account.',
    extra: (
      <div className="flex flex-wrap gap-2.5 mt-3.5">
        <BtnPlum href={CHILL_CHAT_URL} small>
          Chill Chat <Flag>India</Flag>
        </BtnPlum>
        <BtnLine href={CHAMET_APP_URL} small>
          Chamet <Flag quiet>Other countries</Flag>
        </BtnLine>
      </div>
    ),
  },
  {
    num: '04',
    title: 'They log in with the verified details',
    body: 'The host signs in using exactly the number or email they verified in step two. A different one creates a separate account that is not linked to your agency.',
  },
  {
    num: '05',
    title: 'They complete face verification',
    body: 'Inside the app: Profile, then My Earnings, then Withdraw, then Face Verification. This is Chamet\'s identity check. It confirms the person is a real adult, and until it is done the account is not fully active.',
  },
];

const METWALLET_PART1 = [
  {
    num: '01',
    title: 'Log in to the app',
    body: 'Open Chill Chat or Chamet and sign in with the same mobile number and password you used for agency registration.',
  },
  {
    num: '02',
    title: 'Open the wallet screen',
    body: 'Go to Profile, then Beans, then Withdraw, then MetWallet.',
  },
  {
    num: '03',
    title: 'Enter your email address',
    body: 'Choose the email option and enter an address you can open right away. A verification code is sent to it.',
  },
  {
    num: '04',
    title: 'Confirm the code and set a password',
    body: 'Enter the code from your email, create a password, confirm it, then tap Authorize. The wallet is now created and linked to your account.',
  },
];

const METWALLET_PART2 = [
  {
    num: '05',
    title: 'Log in to MetWallet',
    body: (
      <>
        Go to{' '}
        <a
          className="text-[#3B1F4A] font-semibold underline underline-offset-[3px]"
          href={METWALLET_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          the MetWallet site
        </a>{' '}
        and sign in with the email address and password you just set.
      </>
    ),
  },
  {
    num: '06',
    title: 'Basic verification',
    body: 'Enter your full name, date of birth, and address. Use details that match your identity document exactly a mismatch is the usual reason verification is rejected.',
  },
  {
    num: '07',
    title: 'Second stage',
    body: 'Upload the front of your government-issued identity document.',
  },
  {
    num: '08',
    title: 'Final stage',
    body: 'Upload the back of the same document. Once this is approved your wallet is fully verified and withdrawals are open.',
  },
];

const FAQS = [
  {
    q: 'Is there any fee to register?',
    a: 'No. Registering as a Chamet agency partner is free, and Conect does not charge for onboarding or support. If anyone asks you for a joining fee, deposit, or training payment in our name, do not pay it message us and we will confirm.',
  },
  {
    q: 'Am I employed by Chamet or by Conect?',
    a: 'Neither. You register your own independent agency account. There is no salary, no contract of employment, and no fixed hours. You decide how much you do and when.',
  },
  {
    q: 'How does agency payment work?',
    a: "Chamet pays agencies based on the activity of the hosts on their team, following Chamet's published agency terms. The rates are set by Chamet, not by us, and we go through the current numbers with you during onboarding. What you receive depends entirely on your team's activity, and nothing is guaranteed.",
  },
  {
    q: 'Do I need experience to start?',
    a: 'No. Most people register with no background in this. What matters more is being able to find and keep in touch with hosts, and being consistent with them. We cover the platform side.',
  },
  {
    q: 'How long does verification take?',
    a: 'It varies. Once you send us your Agent ID we usually confirm the same day, and we tell you if Chamet needs anything further from you.',
  },
  {
    q: 'What is Chamet?',
    a: 'Chamet is a live video chat application where users talk with hosts by video chat and text. Hosts join through an agency, and the agency handles their onboarding and day-to-day support.',
  },
  {
    q: 'Is Chill Chat the same as Chamet?',
    a: 'Yes. In India the application is listed on the Play Store as Chill Chat, while the agency side still runs under the Chamet name. It is one platform, one agency dashboard, and one registration the steps on this page apply either way. If you searched for Chill Chat agency registration, you are in the right place.',
  },
  {
    q: 'Can I register hosts before my agency is verified?',
    a: 'No. The host invitation link only appears inside a working agency dashboard, so your own registration has to be finished first. Get your Agent ID verified with us, then start inviting.',
  },
  {
    q: 'Can I take on a host who is already with another agency?',
    a: 'No. Chamet does not allow hosts to be moved between agencies, and attempting it can get both accounts penalised. A host already registered under someone else has to stay there.',
  },
  {
    q: 'Do I have to set up MetWallet straight away?',
    a: 'You can register your agency without it, but nothing can be withdrawn until MetWallet is created, linked, and verified. Verification can take a few days, so it is better to finish it in your first week than to wait until you need it.',
  },
  {
    q: 'Is there a minimum withdrawal amount?',
    a: 'Yes. MetWallet sets a minimum, currently ten United States dollars. The amount and the processing times are set by the platform, not by us, and can change.',
  },
  {
    q: 'Which countries can register?',
    a: 'Chamet accepts agencies from many countries. If you are unsure about yours, message us before you start and we will check.',
  },
  {
    q: 'I already have an agency account. Can I still get support?',
    a: 'If your account is registered under another agency partner we cannot take it over that is set at registration. Message us anyway and we will tell you honestly what your options are.',
  },
];

function Wrap({ children, className = '' }) {
  return (
    <div className={`max-w-270 mx-auto px-5 min-[860px]:px-8 ${className}`}>{children}</div>
  );
}

function Label({ children, quiet = false, className = '' }) {
  return (
    <span
      className={`${spaceMono.className} text-[11px] font-bold tracking-[0.16em] uppercase ${
        quiet ? 'text-[#8B8296]' : 'text-[#E8446F]'
      } ${className}`}
    >
      {children}
    </span>
  );
}

function BtnSolid({ href, children, className = '', small = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${publicSans.className} inline-flex items-center justify-center gap-2 font-semibold rounded-md border-[1.5px] border-transparent bg-[#E8446F] text-white no-underline hover:bg-[#cf3760] transition active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-[#E8446F] focus-visible:outline-offset-[3px] ${
        small ? 'py-2.5 px-4.5 text-sm' : 'py-3.5 px-6 text-[15px]'
      } ${className}`}
    >
      {children}
    </a>
  );
}

function BtnPlum({ href, children, className = '', small = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${publicSans.className} inline-flex items-center justify-center gap-2 font-semibold rounded-md border-[1.5px] border-transparent bg-[#3B1F4A] text-white no-underline hover:bg-[#4d2b60] transition active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-[#E8446F] focus-visible:outline-offset-[3px] ${
        small ? 'py-2.5 px-4.5 text-sm' : 'py-3.5 px-6 text-[15px]'
      } ${className}`}
    >
      {children}
    </a>
  );
}

function BtnLine({ href, children, className = '', small = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${publicSans.className} inline-flex items-center justify-center gap-2 font-semibold rounded-md border-[1.5px] border-[rgba(24,21,33,0.13)] bg-transparent text-[#3B1F4A] no-underline hover:border-[#3B1F4A] transition active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-[#E8446F] focus-visible:outline-offset-[3px] ${
        small ? 'py-2.5 px-4.5 text-sm' : 'py-3.5 px-6 text-[15px]'
      } ${className}`}
    >
      {children}
    </a>
  );
}

function Flag({ children, quiet = false }) {
  return (
    <span
      className={`${spaceMono.className} text-[10px] font-bold tracking-widest uppercase px-1.75 py-0.5 rounded ml-1.5 ${
        quiet ? 'bg-[rgba(24,21,33,0.13)] text-[#544C61]' : 'bg-[#E8446F] text-white'
      }`}
    >
      {children}
    </span>
  );
}

function SectionHead({ label, title, description, quiet = true }) {
  return (
    <div className="mb-8.5">
      <Label quiet={quiet}>{label}</Label>
      <h2
        className={`${bricolage.className} font-extrabold tracking-[-0.02em] leading-[1.1] text-[28px] min-[860px]:text-[34px] mt-3`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[#544C61] text-base">{description}</p>
      )}
    </div>
  );
}

function StepList({ steps }) {
  return (
    <div className="border-t border-[rgba(24,21,33,0.13)]">
      {steps.map((step) => (
        <div
          key={step.num}
          className="grid grid-cols-[30px_1fr] min-[860px]:grid-cols-[60px_1fr] gap-4 min-[860px]:gap-6 py-5.5 min-[860px]:py-6.5 border-b border-[rgba(24,21,33,0.13)]"
        >
          <div
            className={`${spaceMono.className} font-bold text-[13px] text-[#E8446F] pt-0.5`}
          >
            {step.num}
          </div>
          <div>
            <h3
              className={`${bricolage.className} font-extrabold text-[17px] tracking-[-0.02em] leading-[1.1] mb-1.5`}
            >
              {step.title}
            </h3>
            <p className="text-[14.5px] text-[#544C61]">{step.body}</p>
            {step.extra}
            {step.action}
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckIcon({ className = 'min-w-4.5 min-h-4.5 w-4.5 h-4.5 mt-1 md:mt-0.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#E8446F" strokeWidth="1.8" />
      <path
        d="M8.5 12.2l2.4 2.4 4.6-4.8"
        stroke="#E8446F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4.25 h-4.25 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.2 1.3-1.9 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.5-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l.9-1.1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.4.1.1.1.8-.2 1.5Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4.25 h-4.25 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4.25 h-4.25 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="w-8.5 h-8.5 rounded-[9px] bg-[#3B1F4A] flex items-center justify-center shrink-0">
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 16a7 7 0 0 1 14 0"
          stroke="#E8446F"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function DownloadCallout({ children, buttons }) {
  return (
    <div className="mt-6 lg:mt-12 bg-white border-[1.5px] border-[rgba(24,21,33,0.13)] border-l-[5px] border-l-[#E8446F] rounded-xl py-4.5 px-5 max-w-270 mx-auto">
      <div className="flex items-start gap-2.5">
        <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3l7.5 3.2v5c0 4.4-3.1 8.1-7.5 9.3-4.4-1.2-7.5-4.9-7.5-9.3v-5L12 3Z"
            stroke="#E8446F"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[14.5px] text-[#544C61]">{children}</p>
      </div>
      {buttons && <div className="flex flex-wrap gap-2.5 mt-4">{buttons}</div>}
    </div>
  );
}

function HonestList({ items }) {
  return (
    <ul className="list-none m-0 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="text-[14.5px] text-[#544C61] py-2 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-4 before:w-2.25 before:h-0.375 before:bg-[#8B8296]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SupportIcon({ type }) {
  const cls = 'w-5.5 h-5.5 mb-8.75';
  if (type === 'folder') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 17V7a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" stroke="#E8446F" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === 'card') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="#E8446F" strokeWidth="1.8" />
        <path d="M3.5 9.5h17M9 14h6" stroke="#E8446F" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'users') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="8.5" r="3.2" stroke="#E8446F" strokeWidth="1.8" />
        <circle cx="17" cy="9.5" r="2.4" stroke="#E8446F" strokeWidth="1.8" />
        <path d="M3 19c0-3 2.6-5 6-5s6 2 6 5" stroke="#E8446F" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'shield') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l7.5 3.2v5c0 4.4-3.1 8.1-7.5 9.3-4.4-1.2-7.5-4.9-7.5-9.3v-5L12 3Z" stroke="#E8446F" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'globe') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v18M5 8h14M5 16h14" stroke="#E8446F" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="#E8446F" strokeWidth="1.8" />
      <path d="M12 7.5v5l3 1.8" stroke="#E8446F" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ChametAgencyRegistration() {
  const [consentDismissed, setConsentDismissed] = useState(false);
  const consentNeeded = useSyncExternalStore(
    subscribeConsent,
    readConsentNeeded,
    () => false
  );
  const consentOpen = consentNeeded && !consentDismissed;

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args) {
      window.dataLayer.push(args);
    };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500,
    });

    try {
      const saved = localStorage.getItem('conect_consent');
      if (saved === 'granted') {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setConsent = (value) => {
    try {
      localStorage.setItem('conect_consent', value);
    } catch {
      /* ignore */
    }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }
    setConsentDismissed(true);
  };

  return (
    <>
      <Head>
        <title>Chamet Agency Registration | Register Your Agency Account</title>
        <meta
          name="description"
          content="Chamet agency registration in six steps, for Chamet and Chill Chat in India. Free to register, guided by the Conect onboarding team, Agent ID verified the same day. 18 years and over only."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://connectwithapps.com/chamet" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chamet Agency Registration | Conect" />
        <meta
          property="og:description"
          content="Register your Chamet agency account in six steps. Free, guided, and verified the same day. 18 years and over only."
        />
        <meta property="og:url" content="https://connectwithapps.com/chamet" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%233B1F4A'/><path d='M9 19a7 7 0 0 1 14 0' stroke='%23E8446F' stroke-width='3' fill='none' stroke-linecap='round'/></svg>"
        />
      </Head>

      <div
        className={`${publicSans.className} bg-[#F7F4EF] text-[#181521] text-base leading-relaxed antialiased pb-19 min-[860px]:pb-0 ${
          consentOpen ? 'consent-open' : ''
        }`}
      >
        <header className="sticky top-0 z-60 bg-[#F7F4EF] border-b border-[rgba(24,21,33,0.13)]">
          <nav className="flex items-center justify-between gap-4 max-w-270 mx-auto py-3 px-5 min-[860px]:px-8">
            <a href="#top" className="flex items-center gap-2.75 no-underline text-inherit">
              <BrandMark />
              <span>
                <span
                  className={`${bricolage.className} block font-extrabold text-[17px] tracking-[-0.02em]`}
                >
                  Conect
                </span>
                <span
                  className={`${spaceMono.className} block text-[10px] tracking-widest uppercase text-[#8B8296] mt-px`}
                >
                  Chamet partner program
                </span>
              </span>
            </a>
            <BtnPlum href={REGISTRATION_URL} small>
              Start registration
            </BtnPlum>
          </nav>
        </header>

        <main id="top">
          {/* Hero */}
          <section className="py-14 min-[860px]:py-19.5 pb-11 min-[860px]:pb-15.5 border-b border-[rgba(24,21,33,0.13)]">
            <Wrap className="min-[860px]:grid min-[860px]:grid-cols-[1.15fr_0.85fr] min-[860px]:gap-12 min-[860px]:items-start">
              <div>
                <Label>Official registration steps · Independent partner</Label>
                <h1
                  className={`${bricolage.className} font-extrabold text-[38px] min-[860px]:text-[54px] tracking-[-0.02em] leading-[1.1] my-4.5`}
                >
                  <em className="not-italic text-[#3B1F4A]">Chamet agency</em> registration
                </h1>
                <p className="text-[17px] text-[#544C61] max-w-[50ch]">
                  Open a Chamet agency account in six steps. Conect guides you through the form,
                  checks your details before you submit, and verifies your Agent ID once you are
                  through.
                </p>



                <div className="flex flex-wrap gap-2.75 mt-1.75">
                  <BtnSolid href={REGISTRATION_URL}>
                    Start registration
                    <ArrowIcon />
                  </BtnSolid>
                  <BtnLine href="#steps">Read the six steps first</BtnLine>
                </div>

                <div className="flex flex-wrap gap-x-5.5 gap-y-2.5 mt-6.5 pt-5 border-t border-[rgba(24,21,33,0.07)]">
                  {[
                    'Free to register',
                    'Takes about five minutes',
                    '18 years and over only',
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-[13.5px] text-[#544C61]"
                    >
                      <CheckIcon />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <aside className="relative bg-[#3B1F4A] text-white rounded-[14px] p-6 min-[860px]:p-[32px_30px] overflow-hidden mt-10 min-[860px]:mt-0">
                <div
                  className="absolute -right-17.5 -bottom-22.5 w-57.5 h-57.5 rounded-full border-5.5 border-[rgba(232,68,111,0.22)] pointer-events-none"
                  aria-hidden
                />
                <Label className="text-[#F5A8BE]!">Before you start</Label>
                <h2
                  className={`${bricolage.className} font-extrabold text-[19px] tracking-[-0.02em] leading-[1.1] my-3.5 relative z-1`}
                >
                  Keep these ready
                </h2>
                <ul className="list-none m-0 p-0 relative z-1">
                  {BEFORE_START.map((item, i) => (
                    <li
                      key={item}
                      className={`flex gap-2.75 py-2.75 text-[14.5px] text-white ${
                        i === 0 ? 'pt-0' : 'border-t border-white/16'
                      }`}
                      style={{color: '#FFFFFF'}}
                    >
                      <svg
                        className="w-4.25 h-4.25 shrink-0 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          stroke="#F5A8BE"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Wrap>
            
            <Wrap>
            <DownloadCallout
                  buttons={
                    <>
                      <BtnPlum href={CHILL_CHAT_URL}>
                        <DownloadIcon />
                        Download Chill Chat <Flag>India</Flag>
                      </BtnPlum>
                      <BtnLine href={CHAMET_APP_URL}>
                        <DownloadIcon />
                        Download Chamet <Flag quiet>Other countries</Flag>
                      </BtnLine>
                    </>
                  }
                >
                  <>
                    <strong className="text-[#181521] font-semibold">
                      In India, Chamet is listed as Chill Chat.
                    </strong>{' '}
                    Same platform, same agency dashboard, same registration steps only the Play
                    Store listing is different. Download the one for your country.
                  </>
                </DownloadCallout>
            </Wrap>
          </section>


          {/* Steps */}
          <section className="py-15 min-[860px]:py-21" id="steps">
            <Wrap>
              <SectionHead
                label="The process"
                title="How Chamet agency registration works"
                description="Registration happens on Chamet's own page. Follow these six steps in order and the whole thing takes about five minutes."
              />
              <StepList steps={REGISTRATION_STEPS} />
            </Wrap>
          </section>

          {/* Requirements */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="requirements">
            <Wrap>
              <SectionHead
                label="Eligibility"
                title="Who can register"
                description="These are Chamet's requirements, not ours. Accounts that do not meet them get removed by the platform."
              />
              <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-3">
                {REQUIREMENTS.map((req, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 min-[860px]:px-4.5 bg-white border border-[rgba(24,21,33,0.13)] rounded-[10px] text-[14.5px] text-[#544C61]"
                  >
                    <CheckIcon />
                    <span>{req.text}</span>
                  </div>
                ))}
              </div>
            </Wrap>
          </section>

          {/* Support */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="support">
            <Wrap>
              <SectionHead
                label="After registration"
                title="What happens once you are registered"
                description="Registering is the easy part. What follows is setting up the dashboard, adding your first hosts, and keeping the account in good standing. That is where we stay involved."
              />
              <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-px bg-[rgba(24,21,33,0.13)] border border-[rgba(24,21,33,0.13)] rounded-xl overflow-hidden">
                {SUPPORT_CELLS.map((cell) => (
                  <div key={cell.title} className="bg-[#F7F4EF] py-6 px-5.5">
                    <SupportIcon type={cell.icon} />
                    <h3
                      className={`${bricolage.className} font-extrabold text-[16.5px] tracking-[-0.02em] leading-[1.1] mb-1.75`}
                    >
                      {cell.title}
                    </h3>
                    <p className="text-[14.5px] text-[#544C61]">{cell.desc}</p>
                  </div>
                ))}
              </div>
            </Wrap>
          </section>

          {/* Honest block */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="honest">
            <Wrap>
              <div className="bg-[#EFE9E1] rounded-[14px] p-6 min-[860px]:p-[40px_38px]">
                <Label quiet>Before you apply</Label>
                <h2
                  className={`${bricolage.className} font-extrabold text-[26px] tracking-[-0.02em] leading-[1.1] mt-3`}
                >
                  Read this part first
                </h2>
                <p className="mt-3 text-[#544C61] max-w-[56ch] text-[15.5px]">
                  We would rather you decide with the full picture than register and find out later.
                </p>
                <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-6.5 min-[860px]:gap-2.75 mt-5.5">
                  <div>
                    <h3
                      className={`${bricolage.className} font-extrabold text-[15px] tracking-[-0.02em] mb-3 flex items-center gap-2`}
                    >
                      <CheckIcon className="w-4.5 h-4.5" />
                      What this is
                    </h3>
                    <HonestList items={WHAT_IS} />
                  </div>
                  <div>
                    <h3
                      className={`${bricolage.className} font-extrabold text-[15px] tracking-[-0.02em] mb-3 flex items-center gap-2`}
                    >
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="9" stroke="#3B1F4A" strokeWidth="1.8" />
                        <path d="M9 9l6 6M15 9l-6 6" stroke="#3B1F4A" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      What this is not
                    </h3>
                    <HonestList items={WHAT_IS_NOT} />
                  </div>
                </div>
              </div>
            </Wrap>
          </section>

          {/* Hosts */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="hosts">
            <Wrap>
              <SectionHead
                label="For your team"
                title="How host registration works"
                description="Once your agency is verified you can bring hosts onto your team. Hosts have to be invited from inside your agency dashboard there is no way to add someone from outside it, so this is the order to follow."
              />
              <StepList steps={HOST_STEPS} />
              <DownloadCallout>
                <>
                  <strong className="text-[#181521] font-semibold">Your responsibility as the agency.</strong>{' '}
                  Every host you invite must be 18 or over and must pass face verification in their
                  own name no shared accounts, no registering on someone else&apos;s behalf. Hosts
                  must follow Chamet&apos;s community guidelines while streaming. If a host on your
                  team breaks those rules, the platform can remove them and act against your agency
                  as well.
                </>
              </DownloadCallout>
            </Wrap>
          </section>

          {/* MetWallet */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="metwallet">
            <Wrap>
              <SectionHead
                label="Payouts"
                title="Setting up MetWallet"
                description="MetWallet is the wallet Chamet pays through. Nothing can be withdrawn until it is created and linked, so do this early rather than on the day you first need it. Agent commission and host earnings go to separate MetWallet accounts."
              />
              <h3
                className={`${bricolage.className} font-extrabold text-[17px] tracking-[-0.02em] mb-1.5`}
              >
                Part one create the wallet inside the app
              </h3>
              <p className="text-[14.5px] text-[#544C61] mb-2">
                Use the same mobile number and password as your agency account, or the wallet will
                not link.
              </p>
              <StepList steps={METWALLET_PART1} />
              <h3
                className={`${bricolage.className} font-extrabold text-[17px] tracking-[-0.02em] mt-9 mb-1.5`}
              >
                Part two verify the wallet on MetWallet&apos;s own site
              </h3>
              <p className="text-[14.5px] text-[#544C61] mb-2">
                Creating the wallet is not enough on its own. Verification happens on MetWallet&apos;s
                website, in three stages.
              </p>
              <StepList steps={METWALLET_PART2} />
              <DownloadCallout>
                <>
                  <strong className="text-[#181521] font-semibold">Where your documents go.</strong>{' '}
                  Identity documents are uploaded on MetWallet&apos;s own website, never to Conect and
                  never through this page. We will never ask you to send an identity document, a
                  password, or a verification code over WhatsApp or email if anyone does, it is
                  not us. Your MetWallet password should be different from your agency password.
                </>
              </DownloadCallout>
              <div className="mt-6.5">
                <BtnLine href={METWALLET_URL}>Open MetWallet</BtnLine>
              </div>
            </Wrap>
          </section>

          {/* FAQ */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="faq">
            <Wrap>
              <SectionHead label="Questions" title="Asked most often" />
              <div className="border-t border-[rgba(24,21,33,0.13)]">
                {FAQS.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-b border-[rgba(24,21,33,0.13)]"
                  >
                    <summary
                      className={`${bricolage.className} cursor-pointer list-none py-4.75 pr-8.5 relative font-semibold text-base tracking-[-0.01em] focus-visible:outline-[3px] focus-visible:outline-[#E8446F] focus-visible:outline-offset-[3px] rounded [&::-webkit-details-marker]:hidden after:content-[''] after:absolute after:right-1.5 after:top-6.5 after:w-2.25 after:h-2.25 after:border-r-2 after:border-b-2 after:border-[#E8446F] after:rotate-45 after:transition-transform group-open:after:rotate-[-135deg] group-open:after:top-7.25`}
                    >
                      {faq.q}
                    </summary>
                    <p className="text-[15px] text-[#544C61] pb-5">{faq.a}</p>
                  </details>
                ))}
              </div>
            </Wrap>
          </section>

          {/* Contact */}
          <section className="pt-0 pb-15 min-[860px]:pb-21" id="contact">
            <Wrap>
              <div className="bg-[#3B1F4A] text-white rounded-[14px] py-9 px-6.5 min-[860px]:py-12 min-[860px]:px-11">
                <Label className="text-[#F5A8BE]!">Talk to a person</Label>
                <h2
                  className={`${bricolage.className} font-extrabold text-[26px] tracking-[-0.02em] leading-[1.1] mt-3 mb-3`}
                >
                  Ask before you register
                </h2>
                <p className="text-white/82 text-[15.5px]">
                  If anything above is unclear, message us first. A real person from our onboarding
                  team answers, and there is no obligation to register afterwards.
                </p>
                <div className="flex flex-wrap gap-2.75 mt-6">
                  <a
                    href={WHATSAPP_QUESTION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${publicSans.className} inline-flex items-center justify-center gap-2 font-semibold text-[15px] py-3.5 px-6 rounded-md bg-white text-[#3B1F4A] no-underline hover:bg-[#EFE9E1] transition active:translate-y-px`}
                  >
                    <WhatsAppIcon />
                    Message on WhatsApp
                  </a>
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${publicSans.className} inline-flex items-center justify-center gap-2 font-semibold text-[15px] py-3.5 px-6 rounded-md bg-transparent text-white border-[1.5px] border-white/40 no-underline hover:border-white transition active:translate-y-px`}
                  >
                    Start registration
                  </a>
                </div>
                <div className="mt-7 pt-5.5 border-t border-white/18 grid grid-cols-1 min-[860px]:grid-cols-3 gap-3.5">
                  <a
                    href="https://wa.me/919650889239"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[14.5px] text-white/90 no-underline hover:text-white hover:underline"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4h2L10 8l-2 1.5c.9 2.2 2.3 3.6 4.5 4.5L14 12l4 1.5v2a1.5 1.5 0 0 1-1.5 1.5C10.6 17 5 11.4 5 5.5Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
                    </svg>
                    +91 96508 89239
                  </a>
                  <a
                    href="mailto:support@connectwithapps.com"
                    className="flex items-center gap-2.5 text-[14.5px] text-white/90 no-underline hover:text-white hover:underline"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="#fff" strokeWidth="1.7" />
                      <path d="M4 7l8 6 8-6" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
                    </svg>
                    support@connectwithapps.com
                  </a>
                  <span className="flex items-center gap-2.5 text-[14.5px] text-white/90">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.5" stroke="#fff" strokeWidth="1.7" />
                    </svg>
                    Bhiwadi, Rajasthan, India
                  </span>
                </div>
              </div>
            </Wrap>
          </section>
        </main>

        <footer className="border-t border-[rgba(24,21,33,0.13)] py-9.5 pb-11 mt-5">
          <Wrap>
            <p className="text-[13px] text-[#8B8296] leading-[1.7]">
              <strong className="text-[#544C61] font-semibold">
                Conect is an independent agency partner.
              </strong>{' '}
              This website is operated by Conect and is not owned by, operated by, or officially
              affiliated with Chamet or its parent company. Chamet and its logo are the property of
              their respective owners and are referred to here only to describe the platform we
              work with.
              <br />
              <br />
              We do not guarantee registration approval or any level of income. Agency payments are
              set and made by Chamet under its own published terms, and what a partner receives
              depends on the activity of their host team. Registration is free we never charge a
              joining fee, deposit, or training fee.
              <br />
              <br />
              Agency partners and every host on their team must be 18 years of age or older and able
              to complete identity verification. This program is not open to anyone under 18.
            </p>
            <div className="mt-6.5 pt-5 border-t border-[rgba(24,21,33,0.07)] flex flex-wrap gap-3.5 justify-between text-[13px] text-[#8B8296]">
              <span>© 2026 Conect · Bhiwadi, Rajasthan, India</span>
              <div className="flex flex-wrap gap-4.5">
                <Link href="/privacy" className="no-underline hover:text-[#181521] hover:underline">
                  Privacy policy
                </Link>
                <Link href="/terms" className="no-underline hover:text-[#181521] hover:underline">
                  Terms of use
                </Link>
                <Link href="/contact" className="no-underline hover:text-[#181521] hover:underline">
                  Contact
                </Link>
                <a href="#faq" className="no-underline hover:text-[#181521] hover:underline">
                  Questions
                </a>
              </div>
            </div>
          </Wrap>
        </footer>

        {/* Sticky mobile bar */}
        {!consentOpen && (
          <div className="fixed left-0 right-0 bottom-0 z-70 bg-[#F7F4EF] border-t border-[rgba(24,21,33,0.13)] p-2.5 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] flex gap-2.5 min-[860px]:hidden">
            <BtnLine href="https://wa.me/919650889239" className="flex-1! py-3.25! px-3! text-[14.5px]!">
              WhatsApp
            </BtnLine>
            <BtnSolid href={REGISTRATION_URL} className="flex-1! py-3.25! px-3! text-[14.5px]!">
              Start registration
            </BtnSolid>
          </div>
        )}

        {/* Consent banner */}
        {consentOpen && (
          <div
            className="fixed left-0 right-0 bottom-0 z-90 bg-[#3B1F4A] text-white py-4.5 px-5 pb-[calc(18px+env(safe-area-inset-bottom))] shadow-[0_-14px_34px_-20px_rgba(0,0,0,0.5)]"
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
          >
            <div className="max-w-270 mx-auto grid gap-4 min-[860px]:grid-cols-[1fr_auto] min-[860px]:items-center min-[860px]:gap-7">
              <p className="text-sm leading-relaxed text-white/86 max-w-[70ch]">
                We use cookies to see which pages and advertisements work, and to show our
                advertisements again elsewhere. You can accept these or continue with only the
                cookies needed to run the site. Read our{' '}
                <Link href="/privacy" className="text-[#F5A8BE]">
                  privacy policy
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setConsent('denied')}
                  className={`${publicSans.className} inline-flex items-center justify-center font-semibold text-sm py-2.75 px-5 rounded-md bg-transparent text-white border-[1.5px] border-white/40 cursor-pointer hover:border-white transition`}
                >
                  Only essential
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('granted')}
                  className={`${publicSans.className} inline-flex items-center justify-center font-semibold text-sm py-2.75 px-5 rounded-md bg-white text-[#3B1F4A] border-[1.5px] border-transparent cursor-pointer hover:bg-[#EFE9E1] transition`}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
