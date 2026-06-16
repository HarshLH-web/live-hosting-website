import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
export default function AboutUs() {
  return (
    <>
      <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          About Us
        </h1>
      </div>

      <div className="w-[95%] lg:w-[90%] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-8 pt-12 lg:pt-20 pb-12">
        <div className="w-full lg:w-2/5">
          <Image
            src="/about-hero.png"
            alt="About Us"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-3/5">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold uppercase mb-3 lg:mb-6">
            LIVE HOSTING TALENT AGENCY
          </h2>
          <p className="text-base lg:text-lg lg:leading-normal">
            LH Talent Agency is a top performer agency with 20,000+ agents and
            12,000+ hosts from various countries such as India, Pakistan, the
            Philippines, the USA, Africa, Europe, and many more. We recruit
            entertaining streamers, talented influencers, and managerial agents
            for live-streaming, video-calling, and audio-chat apps. We provide
            support and guidance related to their overall performance and
            productivity. We are building a stage for all the skilled
            influencers or streamers and connecting them with their respective
            platforms to showcase their talent.
          </p>
        </div>
      </div>

      <div className="w-[95%] lg:w-[90%] max-w-7xl mx-auto text-center space-y-4 pb-12 lg:pb-20 lg:px-6 2xl:px-12">
        <p className="text-base lg:text-lg lg:leading-normal">
          At LH Talent Agency, we make sure to provide new opportunities to
          showcase their talents in the field of live-streaming and help them
          monetize their account. With adequate resources and tools, we research
          every possibility and generate various platforms for the growth of our
          streamers and agents.
        </p>

        <p className="text-base lg:text-lg lg:leading-normal">
          LH Talent Agency was incorporated in 2018 by Mr. Mahesh Bairwa (an MBA
          in Human Resource Management, a graduate in Business Studies, and a
          Digital Marketing Professional). The Agency aims to serve specifically
          in live-streaming, video calling, and voice-calling apps. With
          practical experience, we have grown a community of talented teams and
          skilled professionals which helps to increase the revenue growth of
          the applications.
        </p>

        <p className="text-base lg:text-lg lg:leading-normal">
          In the world of digital marketing, talented influencers and streamers
          are constantly finding opportunities to grow and market themselves. LH
          Talent Agency is helping them use the right platforms and encouraging
          them to enhance their content and skills. Currently, we are
          collaborating with different live-streaming apps such as Poppo Live,
          Chamet, Niki, Honeycam, Waka, Plamfy, etc., and 12,000+ active
          sub-agents globally.
        </p>
      </div>


      <div className="bg-[#FFF7E9] py-12 lg:py-20">
        <div className="w-[95%] lg:w-[90%] max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold uppercase text-center">WHAT DO WE DO?</h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-8 py-12">
                <div className="w-full lg:w-1/2">
                    <Image
                        src="/hiring-hosts.png"
                        alt="What We Do"
                        width={500}
                        height={300}
                        className="w-full h-full object-contain max-w-xl mx-auto"
                    />
                    <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-extrabold uppercase text-center mt-4 lg:mt-8 mb-3">Hiring Hosts</h3>
                    <p className="text-base lg:text-lg lg:leading-normal text-center">LH Talent Agency recruits hosts for different live-streaming platforms and guides their overall productivity. The Agency helps them to monetize their content and grow their online presence, which helps them build their career in the live-streaming industry. LH Talent Agency opens the paths for opportunities.</p>

                    <Link 
                        href="#"
                        className="bg-[#DE0402] w-fit text-white py-2 px-6 rounded-full font-semibold flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]"
                    >
                        Become Broadcaster Now!
                    </Link>
                </div>
                <div className="w-full lg:w-1/2">
                    <Image
                        src="/hiring-streamer-agents.png"
                        alt="What We Do"
                        width={500}
                        height={300}
                        className="w-full h-full object-contain max-w-xl mx-auto"
                    />
                    <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-extrabold uppercase text-center mt-4 lg:mt-8 mb-3">Hiring Streamer Agents</h3>
                    <p className="text-base lg:text-lg lg:leading-normal text-center">Individuals and talent acquisition agencies are welcome to join LH Talent Agency and hire broadcasters. The LiveHosting Agency will assist you with the process of remuneration. LH Talent Agency also provides resources for the recruitment process, and streamer management for rapid team development.</p>
                    
                    <Link 
                        href="#"
                        className="bg-[#DE0402] w-fit text-white py-2 px-6 rounded-full font-semibold flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]"
                    >
                        Become Agent Now!
                    </Link>
                </div>
            </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
