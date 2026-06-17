import Head from "next/head";
import Image from "next/image";
import appsData from "../assets/Apps.json";
import BouncyButton from "@/components/BouncyButton";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const LiveStreamingJobs = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
        <Head>
            <title>Apply Now on LH Talent Agency as Hosts and Agents</title>
            <meta name="description" content="Live Hosting Agency is currently hiring for 1v1 Host, Video streamer Hosts, Live Streamer Hosts, Audio streaming Hosts, and Talent Recruitment agencies." />
        </Head>
        <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          Apply Now
        </h1>
      </div>

      <div className="mx-auto w-[90%] max-w-6xl">
        <div
          id="wrapper"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-16 pb-20 lg:pt-12 lg:pb-28"
        >
          {appsData.map((app, index) => (
            <div
              key={index}
              ref={(el) => (dropdownRefs.current[index] = el)}
              className="w-full md:w-auto mx-auto max-w-xl border-[1px] border-[#00000012] rounded-3xl py-4 px-6 lg:px-12 lg:py-6 bg-gradient-to-b from-[#FEFEFC] to-[#F9F6E3]"
            >
              <div className="flex justify-between items-center gap-4 lg:gap-8">
                <div className="flex justify-center items-center gap-4 lg:gap-8">
                  <Image
                    src={app.logo}
                    alt={app.name}
                    width={64}
                    height={64}
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                  <h2 className="text-2xl lg:text-3xl font-medium uppercase whitespace-nowrap">
                    {app.name}
                  </h2>
                </div>
                <div className="relative" onClick={() => toggleDropdown(index)}>
                  <Image
                    src="/Download-icon.svg"
                    alt="download"
                    width={24}
                    height={24}
                    className="cursor-pointer w-5 h-5 lg:w-6 lg:h-6"
                  />
                  {openDropdownIndex === index && (
                    <div className="absolute right-0 bg-gradient-to-b from-[#FEFEFC] to-[#F9F6E3] border border-gray-300 rounded-md shadow-lg mt-2 min-w-32 lg:min-w-40">
                      <ul className="py-0">
                        {app.download.map((download, i) => (
                          <li
                            key={i}
                            className="px-2 lg:px-4 py-1 lg:py-2 hover:bg-gray-200 cursor-pointer border-b border-gray-300 last:border-b-0"
                          >
                            <a
                              href={download.url}
                              download={download.text}
                              className=" text-sm lg:text-base"
                            >
                              {download.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-[#16161612] w-full h-[1px] mt-6 mx-auto rounded-full"></div>

              <div className="flex flex-col md:flex-row items-center lg:items-start gap-8 mt-6">
                <div className="flex flex-col gap-2 w-full md:w-2/3">
                  {app.description.map((descriptionArray, i) =>
                    descriptionArray.map((description, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="flex items-start justify-start gap-2 border-b-[1px] border-[#00000012] last:border-b-0 pb-2"
                      >
                        <Image
                          src="/Apply-nowPage/apply-tick.svg"
                          alt="tick"
                          width={16}
                          height={16}
                          className="w-4 h-4 mt-1"
                        />
                        <p className="text-base">{description}</p>
                      </div>
                    )),
                  )}
                </div>
                <div className="flex justify-center items-center flex-col gap-4 w-full md:w-1/3 my-auto">
                  {app.buttons.map((button, i) => (
                    <BouncyButton
                      key={i}
                      text={button.text}
                      href={button.url}
                      className="border-2 border-[#DE0402] hover:bg-[#DE0402] bg-transparent text-[#DE0402] hover:text-white whitespace-nowrap"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LiveStreamingJobs;
