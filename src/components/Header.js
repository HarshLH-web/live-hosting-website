'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import ScrollAnimation from './Scrollbar';

function Header() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMobileRegistrationOpen, setIsMobileRegistrationOpen] = useState(false);
  const [isMobileSupportOpen, setIsMobileSupportOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownVariants = {
    open: {
      maxHeight: '240px',
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    closed: {
      maxHeight: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const arrowVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const registrationDropdownRef = useRef(null);
  const supportDropdownRef = useRef(null);
  const mobileRegistrationDropdownRef = useRef(null);
  const mobileSupportDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      if (
        registrationDropdownRef.current &&
        !registrationDropdownRef.current.contains(event.target)
      ) {
        setIsRegistrationOpen(false);
      }

      if (
        supportDropdownRef.current &&
        !supportDropdownRef.current.contains(event.target)
      ) {
        setIsSupportOpen(false);
      }

      if (
        mobileRegistrationDropdownRef.current &&
        !mobileRegistrationDropdownRef.current.contains(event.target)
      ) {
        setIsMobileRegistrationOpen(false);
      }

      if (
        mobileSupportDropdownRef.current &&
        !mobileSupportDropdownRef.current.contains(event.target)
      ) {
        setIsMobileSupportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');

    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full text-black transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm lg:border-b lg:border-gray-200'
          : 'bg-transparent lg:border-b lg:border-transparent'
      }`}
    >
      <div className="max-w-[90%] lg:max-w-[95%] xl:max-w-[85%] mx-auto sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="LH Talent Agency - logo"
              className="h-16 w-16 2xl:h-20 2xl:w-20"
              width={80}
              height={80}
            />
          </Link>
        </div>

        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-10 h-10 flex flex-col items-center justify-center group lg:hidden p-1 rounded-full bg-[#DE0402]"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded mt-1 transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded mt-1 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className={`lg:hidden fixed top-20 right-0 w-full nav-gradient h-full z-20 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col items-center py-8 space-y-4">
            <Link
              href="/"
              className="text-base hover:text-gray-400 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="h-px w-48 bg-gray-300" />
            <Link
              href="/about-us"
              className="text-base hover:text-gray-400 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="h-px w-48 bg-gray-300" />
            <Link
              href="/our-services"
              className="text-base hover:text-gray-400 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <div className="h-px w-48 bg-gray-300" />

            <div
              className="group relative text-base hover:text-gray-400 font-semibold"
              ref={mobileRegistrationDropdownRef}
            >
              <button
                onClick={() => setIsMobileRegistrationOpen(!isMobileRegistrationOpen)}
                className="flex items-center justify-center mx-auto"
              >
                Registration
                <motion.svg
                  className="w-4 h-4 transform inline-flex mb-1 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial="closed"
                  animate={isMobileRegistrationOpen ? 'open' : 'closed'}
                  variants={arrowVariants}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <motion.div
                className="overflow-hidden bg-white rounded-2xl text-black w-56 text-center"
                initial="closed"
                animate={isMobileRegistrationOpen ? 'open' : 'closed'}
                variants={dropdownVariants}
              >
                <Link
                  href="/become-live-streamer"
                  className="block px-4 py-2 text-base hover:text-gray-400 font-semibold whitespace-nowrap"
                  onClick={() => {
                    setIsMobileRegistrationOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Become Live Streamer
                </Link>
                <div className="h-px w-40 mx-auto bg-gray-300" />
                <Link
                  href="/become-host-recruiter"
                  className="block px-4 py-2 text-base hover:text-gray-400 font-semibold"
                  onClick={() => {
                    setIsMobileRegistrationOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Become Streamer Agency
                </Link>
                <div className="h-px w-40 mx-auto bg-gray-300" />
                <Link
                  href="/influencer-registration"
                  className="block px-4 py-2 text-base hover:text-gray-400 font-semibold"
                  onClick={() => {
                    setIsMobileRegistrationOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Influencer Registration
                </Link>
              </motion.div>
            </div>

            <div className="h-px w-48 bg-gray-300" />
            <Link
              href="/blogs"
              className="text-base hover:text-gray-400 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <div className="h-px w-48 bg-gray-300" />

            <div
              className="group relative text-base hover:text-gray-400 font-semibold"
              ref={mobileSupportDropdownRef}
            >
              <button
                onClick={() => setIsMobileSupportOpen(!isMobileSupportOpen)}
                className="flex items-center justify-center mx-auto"
              >
                Support
                <motion.svg
                  className="w-4 h-4 transform inline-flex mb-1 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial="closed"
                  animate={isMobileSupportOpen ? 'open' : 'closed'}
                  variants={arrowVariants}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <motion.div
                className="overflow-hidden bg-white rounded-2xl mt-2 text-black w-48 text-center"
                initial="closed"
                animate={isMobileSupportOpen ? 'open' : 'closed'}
                variants={dropdownVariants}
              >
                <Link
                  href="/support"
                  className="block px-4 py-2 text-base hover:text-gray-400"
                  onClick={() => {
                    setIsMobileSupportOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Contact Us
                </Link>
                <div className="h-px w-40 mx-auto bg-gray-300" />
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-base hover:text-gray-400"
                  onClick={() => {
                    setIsMobileSupportOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  FAQ
                </Link>
              </motion.div>
            </div>

            <button
              className="bg-[#DE0402] text-white rounded-full font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/live-streaming-jobs" className="flex items-center gap-2 py-3 px-6">
                Apply Now
                <Image src="/arrow-white.svg" className="h-6" alt="White Arrow" width={20} height={20} />
              </Link>
            </button>
          </nav>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 ">
          <Link
            href="/"
            className={`text-base lg:text-lg font-semibold relative group transition-all duration-300 ${
              pathname === '/' ? 'text-[#000000]' : 'text-[#363636]'
            }`}
          >
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DE0402] group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/about-us"
            className={`text-base lg:text-lg font-semibold relative group transition-all duration-300 ${
              pathname === '/about-us' ? 'text-[#000000]' : 'text-[#363636]'
            }`}
          >
            <span>About</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DE0402] group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/our-services"
            className={`text-base lg:text-lg font-semibold relative group transition-all duration-300 ${
              pathname === '/our-services' ? 'text-[#000000]' : 'text-[#363636]'
            }`}
          >
            <span>Services</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DE0402] group-hover:w-full transition-all duration-300" />
          </Link>

          <div
            className="group relative text-base lg:text-lg font-semibold"
            onMouseEnter={() => setIsRegistrationOpen(true)}
            onMouseLeave={() => setIsRegistrationOpen(false)}
            ref={registrationDropdownRef}
          >
            <button className="flex items-center relative group transition-all duration-300 text-[#363636] hover:text-[#000000] py-3">
              <span>Registration</span>
              <motion.svg
                className="w-4 h-4 transform inline-flex mb-1 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial="closed"
                animate={isRegistrationOpen ? 'open' : 'closed'}
                variants={arrowVariants}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
              <span className="absolute bottom-2.5 left-0 w-0 h-0.5 bg-[#DE0402] group-hover:w-full transition-all duration-300" />
            </button>

            <div
              className={`${
                isRegistrationOpen ? 'block' : 'hidden'
              } absolute top-9 -left-10 w-56 bg-linear-to-b from-[#FEFEFC] to-[#F9F6E3] mt-2 text-black rounded-[0rem_0rem_1rem_1rem] overflow-hidden text-center z-10`}
            >
              <Link
                href="/become-live-streamer"
                className="block px-4 py-3 text-base hover:text-white font-semibold hover:bg-[#DE0402] transition-all duration-300"
                onClick={() => setIsRegistrationOpen(false)}
              >
                Become Live Streamer
              </Link>
              <Link
                href="/become-host-recruiter"
                className="block px-4 py-3 text-base hover:text-white font-semibold hover:bg-[#DE0402] transition-all duration-300"
                onClick={() => setIsRegistrationOpen(false)}
              >
                Become Streamer Agency
              </Link>
              <Link
                href="/influencer-registration"
                className="block px-4 py-3 text-base hover:text-white font-semibold hover:bg-[#DE0402] transition-all duration-300"
                onClick={() => setIsRegistrationOpen(false)}
              >
                Influencer Registration
              </Link>
            </div>
          </div>

          <Link
            href="/blogs"
            className={`text-base lg:text-lg font-semibold relative group transition-all duration-300 ${
              pathname === '/blogs' ? 'text-[#000000]' : 'text-[#363636]'
            }`}
          >
            <span>Blogs</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DE0402] group-hover:w-full transition-all duration-300" />
          </Link>

          <div
            className="group relative text-base font-semibold"
            onMouseEnter={() => setIsSupportOpen(true)}
            onMouseLeave={() => setIsSupportOpen(false)}
            ref={supportDropdownRef}
          >
            <button className="flex items-center relative group transition-all duration-300 text-[#363636] hover:text-[#000000] py-3">
              <span>Support</span>
              <motion.svg
                className="w-4 h-4 transform inline-flex mb-1 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial="closed"
                animate={isSupportOpen ? 'open' : 'closed'}
                variants={arrowVariants}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
              <span className="absolute bottom-2.5 left-0 w-0 h-0.5 bg-[#DE0402] group-hover:w-full transition-all duration-300" />
            </button>
            <div
              className={`${
                isSupportOpen ? 'block' : 'hidden'
              } absolute top-9 -left-14 w-48 bg-linear-to-b from-[#FEFEFC] to-[#F9F6E3] rounded-[0rem_0rem_1rem_1rem] mt-2 text-black overflow-hidden z-10`}
            >
              <Link
                href="/support"
                className="block px-6 py-3 text-base hover:text-white hover:bg-[#DE0402] whitespace-nowrap text-center transition-all duration-300"
                onClick={() => setIsSupportOpen(false)}
              >
                Customer Support
              </Link>
              <Link
                href="/faq"
                className="block px-6 py-3 text-base hover:text-white hover:bg-[#DE0402] whitespace-nowrap text-center transition-all duration-300"
                onClick={() => setIsSupportOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>

          <Link
            href="/live-streaming-jobs"
            className="py-2 xl:py-3 px-6 bg-[#DE0402] hover:bg-white text-white hover:text-[#DE0402] rounded-full font-semibold flex items-center gap-2 transition duration-300 border-2 border-[#DE0402]"
          >
            Apply Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 z-10 transition-transform duration-300 ease-out group-hover:scale-x-125 origin-left"
            >
              <path
                d="M4 12H20M20 12L16 8M20 12L16 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </nav>
      </div>

      {/* <ScrollAnimation /> */}
    </header>
  );
}

export default Header;

