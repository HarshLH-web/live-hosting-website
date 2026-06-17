import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function OurServices() {
  const CreatorManagementServices = [
    {
      title: "Talent Recruitment",
      description:
        "LH Talent Agency constantly searches for talented streamers with audience-engaging skills. A streamer can have skills in any field such as dance, arts and crafts, make-up tutorials, cooking, fitness, etc. We provide various live-streaming applications as a platform for streamers where they can monetize their talent worldwide. The Agency also provides expert recommendations for constant improvements and growth.",
      image: "/talent-recruitment.png",
    },
    {
      title: "Agent Partnership",
      description:
        "With the constant need for hiring streamers, we need talent acquisition companies and individual agents to maintain the demand. LH Talent Agency has the biggest agent community globally, with 20,000+ active agents. These agents’ primary work is to recruit streamers and influencers for various live-streaming apps and provide support.",
      image: "/agent-partnership.png",
    },

    {
      title: "Talent Management",
      description:
        "With a vast knowledge of social media marketing and PPC advertisements, the Agency can thrive in mobile application installs. We help brands to market their application and increase their reach in the industry. As a talent acquisition agency, we have a large dataset of working professionals through which we can reach the right audience to drive the app downloads instantly.",
      image: "/talent-management.png",
    },
  ];

  return (
    <>

        <Head>
            <title>Live Hosting Agency recruits talented people for live streaming.</title>
            <meta name="description" content="Live Hosting Agency offers guidance to live-streamers and sub-agents, performance improvement, and boosts apps online presence." />
        </Head>
      <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          Our Services
        </h1>
      </div>
      {/* Section 2 */}
      <div className="w-[90%] mx-auto bg-white pt-12 pb-12 lg:pt-24 lg:pb-20 scroll-mt-96">
        <h2 className="uppercase text-center text-black font-extrabold text-4xl md:text-5xl leading-tight md:leading-snug max-w-5xl mx-auto">
          Creator Management Services
        </h2>

        {/* Box Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-4 mx-auto mt-8 2xl:mt-16 max-w-7xl">
          {CreatorManagementServices.map((item, index) => (
            <div key={index} className="max-w-[400px] mx-auto">
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={1000}
                className="w-full h-full object-contain mb-4 lg:mb-7 max-h-52 mx-auto"
              />
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

      <div className="bg-[#FFF7E9] py-12 lg:py-20">
        <div className="w-[90%] max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold uppercase text-center">
            Marketing & Promotions
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-8 py-12">
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-extrabold uppercase text-center mt-4 lg:mt-8 mb-3">
                App Promotion
              </h3>
              <p className="text-base lg:text-lg lg:leading-[1.35] text-center">
                With expertise in the performance marketing and mobile streaming
                industry, we help other brands with their application promotion
                services. The focus is to escalate brand awareness amongst the
                targeted audience. We offer campaigns that create a positive
                online presence while maintaining product integrity for the
                audience in the market.
              </p>

              {/* <Link 
                        href="#"
                        className="bg-[#DE0402] w-fit text-white py-2 px-6 rounded-full font-semibold flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]"
                    >
                        Become Broadcaster Now!
                    </Link> */}
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-extrabold uppercase text-center mt-4 lg:mt-8 mb-3">
                App Downloads
              </h3>
              <p className="text-base lg:text-lg lg:leading-[1.35] text-center">
                LH Talent Agency has created a brand reach in the mobile
                streaming industry. We manage a large dataset of working
                professionals and can utilize them to boost brand application
                downloads quickly. The Agency can cover the target audience
                through social media marketing and PPC advertisements on
                multiple platforms with adequate strategies to increase the ROI.
              </p>

              {/* <Link 
                        href="#"
                        className="bg-[#DE0402] w-fit text-white py-2 px-6 rounded-full font-semibold flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]"
                    >
                        Become Agent Now!
                    </Link> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
