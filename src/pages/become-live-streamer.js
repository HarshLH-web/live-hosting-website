import BlogForm from "@/components/BlogForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";

export default function BecomeLiveStreamer() {
  const fields = [
    {
      id: 1,
      type: "text",
      placeholder: "Enter your name",
      value: "name",
      required: true,
    },
    {
      id: 2,
      type: "text",
      placeholder: "Enter your gender",
      value: "gender",
      required: true,
    },
    {
      id: 3,
      type: "email",
      placeholder: "Enter your email",
      value: "email",
      required: true,
    },
    {
      id: 4,
      type: "number",
      placeholder: "Enter your number",
      value: "phone",
      required: true,
    },
    {
      id: 5,
      type: "text",
      placeholder: "Enter your country",
      value: "country",
      required: true,
    },
    {
      id: 6,
      type: "textarea",
      placeholder: "Your message",
      value: "message",
      required: true,
    },
  ];
  return (
    <>
      <Head>
        <title>
          Become A Streamer - Live Streaming & 1v1 App Jobs - LH Agency
        </title>
        <meta
          name="description"
          content="Become live streamer - Apply official broadcasting for video streaming, 1v1 , game stream & audio stream apps. LH Agency is hiring Hosts"
        />
      </Head>
      <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          Become Live Streamer
        </h1>
      </div>

      <BlogForm fields={fields} className="mt-12 lg:mt-20" />
      <div className="w-[90%] max-w-4xl mx-auto py-12 lg:px-10 space-y-3 lg:space-y-5">
        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
          LH Talent Agency recruits streamers for multiple live-streaming
          applications based in various countries like India, Pakistan, the
          Philippines, the USA, Africa, Europe, and many more.
        </p>

        <ul className="list-disc list-inside max-w-96 mx-auto">
          <li className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium">
            A Talent to show it to the world
          </li>
          <li className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium">
            Communicatively engage the audience.
          </li>
        </ul>

        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
          If you are confident in showing your skills globally, then take a step
          today!Fill out the above form to become an official streamer with LH
          Talent Agency.Explore the possibilities of making live-streaming a
          profession.
        </p>

        <Link href="/apply-now" className="bg-[#DE0402] text-base lg:text-lg w-fit text-white py-2 px-6 rounded-full font-medium flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]">
          Current Hirings
        </Link>
      </div>

      <section className="bg-[#FFF7E9] py-12 lg:py-20">
        <div className="w-[90%] max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold uppercase">
            WHY CHOOSE LIVE-STREAMING AS A CAREER?
          </h2>

          <div className="space-y-1 lg:space-y-1 mt-3 lg:mt-5">
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              <span className="font-semibold">A Stage for your Talent:</span> A
              live-streaming application is your stage to show your talent.
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              <span className="font-semibold">Opportunities:</span>{" "}
              Live-streaming offers you endless opportunities to explore your
              potential.
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              <span className="font-semibold">Flexibility:</span> Have the
              flexibility to work from your preferred place and time.
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              <span className="font-semibold">Monetization:</span> You can earn
              from your content, through live-streaming and other reward
              structures.
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              <span className="font-semibold">Explore the world:</span>{" "}
              Interacting globally with different people will help you to
              explore diverse cultures.
            </p>
          </div>
        </div>

        <div className="h-px bg-[#2F2F2F23] my-8 lg:my-12 w-full max-w-6xl mx-auto"></div>

        <div className="w-[90%] max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold">
            Benefits of LH Talent Agency:
          </h2>

          <ul className="space-y-1 lg:space-y-1 mt-3 lg:mt-5 list-disc pl-6">
            <li className="text-base lg:text-lg lg:leading-[1.35] font-medium">
              LH Talent Agency is a leading talent recruitment agency globally.
            </li>
            <li className="text-base lg:text-lg lg:leading-[1.35] font-medium">
              It connects you with various live-streaming applications and helps
              you to grow.
            </li>
            <li className="text-base lg:text-lg lg:leading-[1.35] font-medium">
              The Agency will maintain a healthy and professional relationship.
            </li>
            <li className="text-base lg:text-lg lg:leading-[1.35] font-medium">
              It offers constant guidance and support throughout to improve your
              productivity.
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
