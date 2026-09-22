import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />

         {/* WhatsApp Chatbot */}
        {/* <Script
            type="text/javascript"
            src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
            id="aisensy-wa-widget"
            widget-id="aabov7"
            strategy="beforeInteractive"
      /> */}

<div className="fixed bottom-6 right-6 z-50">
          <div
            id="lh-chat-popup"
            className="absolute bottom-17 right-0 w-[300px] md:w-[350px] rounded-[12px] overflow-hidden transition-all duration-300 ease-out opacity-0 translate-x-4 pointer-events-none"
          >
            <div className="flex items-center justify-between gap-2 bg-[#0A5F54] text-white px-4 py-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                  src="/lh-logo-white.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-10 rounded-full"
                />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium leading-none">
                    LH Talent Agency
                  </p>
                  <p className="text-xs">online</p>
                </div>
              </div>
              <button
                id="lh-chat-close"
                type="button"
                aria-label="Close chat popup"
                className="mb-4 mr-2 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 492 492"
                  fill="#d3d3d3"
                  className="w-3 h-3"
                >
                  <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"
                  />
                </svg>
              </button>
            </div>

            <div
              className="bg-[#E5DDD5] w-full min-h-30 h-40 pt-4 pl-6 bg-repeat bg-bottom"
              style={{ backgroundImage: "url('/chat-box-bg.svg')" }}
            >
              <div className="relative bg-white w-3/4 rounded-[0_12px_12px_12px] py-2.5 px-4">
                <div className="absolute -top-0 left-[-10px] w-0 h-0 border-t-[12px] border-t-white border-r-[12px] border-r-transparent rotate-90"></div>

                <p className="text-sm font-medium text-[#848484] mb-1">
                  LH Talent Agency
                </p>

                <p className="text-sm">Hi,</p>
                <p className="text-sm">How can I help you?</p>
              </div>
            </div>

            <div className="bg-white w-full flex items-center justify-center py-4">
              <a id="lh-start-chat-btn"
                href="https://api.whatsapp.com/send?phone=919650889239&text=Welcome%20To%20LH%20Talent%20Agency.%20Let%20me%20know%20How%20May%20I%20Help%20You%3F" target="_blank" rel="noopener noreferrer"
                className="text-center text-white bg-[#4DC247] rounded-full px-4 py-2 cursor-pointer hover:shadow-lg transition-all duration-300 w-4/5 mx-auto"
              >
                <p className="text-base font-medium">Start Chat</p>
              </a>
            </div>
          </div>

          <button
            id="lh-chat-btn"
            type="button"
            className="bg-[#4DC247] flex items-center justify-center rounded-full gap-1 text-white px-4 py-2.5 cursor-pointer hover:shadow-lg transition-all duration-300 ease-out"
          >
            <Image
              src="/wa-icon.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-8 h-8"
            />
            <span
              id="lh-chat-btn-label"
              className="text-base font-medium overflow-hidden whitespace-nowrap transition-all duration-300 ease-out opacity-100 max-w-[120px]"
            >
              Chat with us
            </span>
          </button>
        </div>


        <Script
          id="lh-chat-popup-toggle"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function byId(id) { return document.getElementById(id); }
                var popup = byId('lh-chat-popup');
                var btn = byId('lh-chat-btn');
                var label = byId('lh-chat-btn-label');
                var close = byId('lh-chat-close');

                if (!popup || !btn || !label || !close) return;

                function openPopup() {
                  popup.classList.remove('opacity-0', 'translate-x-4', 'pointer-events-none');
                  popup.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');

                  btn.classList.remove('px-4', 'gap-1');
                  btn.classList.add('px-2.5', 'gap-0');

                  label.classList.remove('opacity-100', 'max-w-[120px]');
                  label.classList.add('opacity-0', 'max-w-0');
                }

                function closePopup() {
                  popup.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
                  popup.classList.add('opacity-0', 'translate-x-4', 'pointer-events-none');

                  btn.classList.remove('px-2.5', 'gap-0');
                  btn.classList.add('px-4', 'gap-1');

                  label.classList.remove('opacity-0', 'max-w-0');
                  label.classList.add('opacity-100', 'max-w-[120px]');
                }

                btn.addEventListener('click', function () {
                  if (popup.classList.contains('opacity-0')) openPopup();
                  else closePopup();
                });

                close.addEventListener('click', function (e) {
                  e.preventDefault();
                  closePopup();
                });

                closePopup();
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
