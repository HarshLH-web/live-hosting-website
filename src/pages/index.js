'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Image from "next/image";
import ScrollUpButton from "@/components/Scrollbar";
// import Testimonials from "../components/Testimonial";
// import AppsAccordion from "../components/Accordion";
// import CountUp from "react-countup";
// import Lottie from "lottie-react";
// import groupAnimation from '../assets/Group-5.json';
import dynamic from "next/dynamic";
// import { InView } from 'react-intersection-observer';
import Link from "next/link";

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// import groupAnimation from '../assets/Group-5.json';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppsAccordion from '@/components/Accordion';
const HomeSchema = 
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LH Talent Agency",
    "alternateName": "LH Talent Management Agency",
    "url": "https://lhtalentagency.com",
    "description": "LH Talent Agency's blog page provides you with all the needed information with updated details, insights, and tips about the live streaming industry. Explore Now!",
    "publisher": {
      "@type": "Organization",
      "name": "LH Talent Agency",
      "logo": "https://lhtalentagency.com/logo.png",
      "url": "https://lhtalentagency.com"
    },
    "sameAs": [
      "https://www.instagram.com/lhtalentagency/",
      "https://www.facebook.com/profile.php?id=61557976949556",
      "https://www.linkedin.com/company/live-hosting-agency"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lhtalentagency.com/blogs?tag={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const OrganizationSchema = 
  {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "LH Talent Agency",
    "alternateName": "LH Talent Management Agency",
    "url": "https://lhtalentagency.com/",
    "logo": "https://lhtalentagency.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61557976949556",
      "https://www.instagram.com/lhtalentagency/",
      "https://www.linkedin.com/company/live-hosting-agency",
      "https://www.youtube.com/@LHTalentAgency"
    ]
  }
  

  const OneStopPlatform = [
    {
      title: 'Talent Recruitment',
      description: 'LH Talent Agency constantly searches for talented streamers with audience-engaging skills. A streamer can have skills in any field such as dance, arts and crafts, make-up tutorials, cooking, fitness, etc. We provide various live-streaming applications as a platform for streamers where they can monetize their talent worldwide. The Agency also provides expert recommendations for constant improvements and growth.',
      image: '/talent-recruitment.png',
    },
    {
      title: 'Agent Partnership',
      description: 'With the constant need for hiring streamers, we need talent acquisition companies and individual agents to maintain the demand. LH Talent Agency has the biggest agent community globally, with 20,000+ active agents. These agents’ primary work is to recruit streamers and influencers for various live-streaming apps and provide support.',
      image: '/agent-partnership.png',
    },
    
    {
      title: 'Talent Management',
      description: 'With a vast knowledge of social media marketing and PPC advertisements, the Agency can thrive in mobile application installs. We help brands to market their application and increase their reach in the industry. As a talent acquisition agency, we have a large dataset of working professionals through which we can reach the right audience to drive the app downloads instantly.',
      image: '/talent-management.png',
    }
  ]

  const MarketingAndPromotions = [
    {
      title: 'Build A Global Community',
      description: 'Join LH Talent Agency, a leading live-streaming agency, and enter a world of like-minded people. We have a wide community of 20,000+ agents and 12000+ hosts globally. We collaborate with various live-streaming applications, which brings the opportunities that connect you with a global audience and spread your content worldwide. It will eventually connect you with people from different communities and help you to increase your audience reach.',
      image: '/build-a-global-community.png',
    },
    {
      title: 'Content Monetization',
      description: 'With a mission of building a supportive environment where content creators and streamers get the maximum benefit through live-streaming and monetizing their content. The LH Talent Agency has collaborated with various live-streaming platforms that offer the facility of generating income by showcasing talent and other special reward programs. All these applications have the feature of converting the reward points into real money and the streamers can withdraw them.',
      image: '/content-monetization.png',
    },
    
    {
      title: 'Work Flexibility',
      description: 'Whether you are a working professional and need a secondary source of income or a busy homemaker who wants to become financially independent. You can easily balance your personal and professional life. Work with your preferred time and location. All you need is a mobile phone with internet connectivity and you can start earning.',
      image: '/work-flexibility.png',
    }
  ]
  


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if URL has amp=1 parameter
    if (router.query.amp === '1') {
      router.replace('/404');
    }
  }, [router.query.amp, router]);

  // If amp=1, don't render the page content
  if (router.query.amp === '1') {
    return null;
  }

  return (
    <>
    
      <ScrollUpButton />
      <Header />
      <main className="h-auto w-full main relative">
        <div className="flex flex-col lg:flex-row-reverse w-full mx-auto h-full">
          {/* Banner Text */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center text-center lg:text-left 2xl:pl-12 gap-4">
          <div className='max-w-4xl lg:ml-16 2xl:ml-16 lg:py-20'>
            <h1 className="text-[35px] max-w-[300px] mx-auto sm:mx-0 sm:max-w-none sm:text-[3rem] xl:text-6xl 2xl:text-[4.25rem] leading-[1.15] sm:leading-tight uppercase font-black">
            LH Talent Agency
            </h1>
            
            <div className="flex flex-col gap-2 mt-4">
            <p className="text-base lg:text-lg 2xl:text-xl lg:pr-24 lg:leading-normal">LH Talent Agency is a top performer agency with 20,000+ agents and 12,000+ hosts from various countries such as India, Pakistan, the Philippines, the USA, Africa, Europe, and many more.</p>
            <div className='bg-black/20 h-px w-full my-2 max-w-3xl'></div>
            <p className="text-base lg:text-xl 2xl:text-xl lg:pr-24 font-semibold mt-2">We recruit entertaining streamers, influencers, and agents for live-streaming, video-calling, and audio-chat apps.</p> 
            
            <Link href="/apply-now"
          className="bg-transparent hover:bg-[#DE0402] hover:text-white text-[#DE0402] border-[#DE0402] border-2 rounded-full font-semibold  group transition duration-300 mx-auto mt-2 lg:mt-4 lg:m-0 flex items-center gap-1 w-fit relative overflow-hidden py-3 px-6"
          aria-label="Discover Now"
        >
          <span>Discover Now</span>
          <span className="relative">
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
          </span>
          </Link>
          </div>

            </div>

           


          </div>
          {/* Banner Image */}
          <div className="w-full lg:w-2/5 flex items-end">
            <Image src="/hero-image.png" alt="LH Talent Agency - live streaming - Become a streamer" className="hidden lg:block mx-auto lg:m-0 w-64 lg:w-full 2xl:w-auto" loading="lazy" width="1000" height="256" />
          </div>
        </div>

        <div>
          <Link href="/#one-stop-platform" className='cursor-pointer absolute -bottom-6 lg:-bottom-6 left-1/2 -translate-x-1/2 '>
          <Image src="/move-down-arrow.svg" alt="Banner Background" width={1000} height={1000} className="w-10 lg:w-12 h-10 lg:h-12 object-cover" />
        </Link>
        </div>
      </main>



      {/* Section 2 */}
      <section id="one-stop-platform">
        <div className="w-[90%] mx-auto bg-white pt-12 pb-12 lg:pt-24 lg:pb-20 scroll-mt-96">
          <h2 className="uppercase text-center text-black font-extrabold text-4xl md:text-5xl leading-tight md:leading-snug max-w-5xl mx-auto">One-Stop Platform For Streamers, Agents & Applications</h2>

          {/* Box Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-4 mx-auto mt-8 2xl:mt-16 max-w-7xl">

            {OneStopPlatform.map((item, index) => (
              <div key={index} className="max-w-[400px] mx-auto"> 
              <Image src={item.image} alt={item.title} width={1000} height={1000} className="w-full h-full object-contain mb-4 lg:mb-7 max-h-52 mx-auto" />
              {/* Box Content  */}
              <div className="px-8 text-center">
              <h3 className="text-2xl font-semibold">{item.title}</h3>

              {/* <div className="h-[3px] w-[50px] bg-[#DE0402] rounded-full mx-auto mt-3"></div> */}

              <p className="mt-2">{item.description}</p>
              </div>
            </div>
            ))}
          </div>

          <div className="flex justify-center">
          {/* <Link href="/our-services"  className="hover:bg-transparent hover:text-[#DE0402] bg-[#DE0402] border-[#DE0402] border-2 text-white font-medium rounded-full mt-10 lg:mt-12 mx-auto block transition duration-300 px-4 py-2" aria-label="Explore Our Services">Explore Our Services
          </Link> */}
          </div>

        </div>
      </section>

      {/* Section 3 */}
      <section className='bg-linear-to-b from-[#FFFFFF] to-[#C0C7F6]'>
        <div className="w-[90%] mx-auto pt-12 pb-12 lg:pt-12 lg:pb-20 ">
          <h2 className="uppercase text-center text-black font-extrabold text-4xl md:text-5xl leading-tight md:leading-snug max-w-5xl mx-auto">Marketing & Promotions</h2>

          {/* Box Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-4 mx-auto mt-8 2xl:mt-16 max-w-7xl">

            {MarketingAndPromotions.map((item, index) => (
              <div key={index} className="max-w-[400px] mx-auto"> 
              <Image src={item.image} alt={item.title} width={1000} height={1000} className="w-full h-full object-contain mb-4 lg:mb-7 max-h-52 mx-auto" />
              {/* Box Content  */}
              <div className="px-8 text-center">
              <h3 className="text-2xl font-semibold">{item.title}</h3>

              {/* <div className="h-[3px] w-[50px] bg-[#DE0402] rounded-full mx-auto mt-3"></div> */}

              <p className="mt-2">{item.description}</p>
              </div>
            </div>
            ))}

          </div>
          <div className="flex justify-center">
          {/* <Link href="/our-services"  className="hover:bg-transparent hover:text-[#DE0402] bg-[#DE0402] border-[#DE0402] border-2 text-white font-medium rounded-full mt-10 lg:mt-12 mx-auto block transition duration-300 px-4 py-2" aria-label="Explore Our Services">Explore Our Services
          </Link> */}
          </div>

        </div>
      </section>



        {/* Section 5 */} 
        <section className="bg-linear-to-b from-[#FFFFFF] to-[#EFB3CD] py-12 lg:py-24">
          <div className="max-w-7xl mx-auto  w-[90%]">
            {/* top text */}
            <div className="flex flex-col items-center justify-between gap-2">
              <h2 className="uppercase text-center text-black font-extrabold text-4xl lg:text-6xl 2xl:text-7xl leading-snug">Our Apps</h2>
              <p className="text-base lg:text-xl max-w-4xl text-center ">Explore our top collaborations with live streaming applications, where talent meets opportunity. Your success story begins here- let&apos;s create something big together.</p>
              {/* <Link href="/apply-now" className="bg-transparent hover:bg-[#DE0402] hover:text-white text-[#DE0402] border-[#DE0402] border-2 font-semibold group transition duration-300 mx-auto mt-4 lg:m-0 py-3 px-6 rounded-full lg:mt-0 flex items-center gap-1 w-fit relative overflow-hidden" aria-label="View All">
                  <span>View All</span>
                  <span className="relative">
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
                  </span>
                </Link> */}
            </div>
            {/* app container */}
            <div>
              <AppsAccordion />
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="collaboration-section">
          <div className="mx-auto w-[90%] max-w-6xl text-black py-12 md:py-24 text-center flex flex-col items-center justify-center gap-4">

            <h2 className="text-[30px] sm:text-[3rem] lg:text-7xl font-bold leading-[1.15] sm:leading-tight capitalize">
            Powering Creativity <br />
            <span className="inline-flex flex-col lg:flex-row items-center justify-center">Through
              <span className="inline-flex w-32 lg:w-40 items-center justify-center mx-6 my-4 lg:mt-6">
              <Image src="/gif-coll.gif" alt="Animation" unoptimized className="w-full h-full object-cover" width="128" height="128" />
            </span>
            Collaboration
            </span>
            </h2>
            <p className="text-base lg:text-3xl max-w-2xl mx-auto font-semibold">Interested in collaborating? Let&apos;s make magic happen!</p>


          <Link href="mailto:support@lhtalentagency.com" className="bg-transparent hover:bg-[#DE0402] hover:text-white text-[#DE0402] border-[#DE0402] border-2 rounded-full font-semibold flex items-center gap-1 w-fit relative overflow-hidden group transition duration-300 mx-auto py-3 px-6 lg:mt-0" aria-label="Get in Touch">
          <span>Get in Touch</span>
          <span className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 z-10 transition-transform duration-300 ease-out"
            >
              <path
                d="M4 12H20M20 12L16 8M20 12L16 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          </Link>
          </div>
        </section>
        <Footer />
    </>
  )
}