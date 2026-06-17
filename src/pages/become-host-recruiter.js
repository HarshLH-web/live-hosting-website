import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import BlogForm from "@/components/BlogForm";
import Link from "next/link";
export default function BecomeHostRecruiter() {
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
          Register with LH Talent Agency and become a Streamer Agency
        </title>
        <meta
          name="description"
          content="Start your live streaming agency today! Recruit talented streamers, influencers & broadcasters for lucrative income. Be a part of the streaming revolution."
        />
      </Head>

      <Header />
      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          Become Host Recruiter
        </h1>
      </div>

      <BlogForm fields={fields} className="mt-12 lg:mt-20" />
      <div className="w-[90%] max-w-4xl mx-auto py-12 lg:px-10 space-y-3 lg:space-y-5">
        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
          Are you good at managing a team or are you a talent acquisition
          company or simply want to start earning through commissions?This is
          the right platform.
        </p>

        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
          Become a host recruiting agency with us and enjoy the work from your
          preferred place. Your commission will be based on the earnings of the
          total hosts.
        </p>

        <Link
          href="/apply-now"
          className="bg-[#DE0402] text-base lg:text-lg w-fit text-white py-2 px-6 rounded-full font-medium flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]"
        >
          Current Hirings
        </Link>
      </div>

      <section className="bg-[#FFF7E9] py-12 lg:py-20">
        <div className="w-[90%] max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold uppercase">
            HOST RECRUITER AGENCY
          </h2>

          <div className="space-y-1 lg:space-y-1 mt-3 lg:mt-5">
            <p className="font-semibold text-lg lg:text-xl lg:leading-[1.35]">
              Launch Your Live Streaming Business
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              Start your career in the live-streaming industry and hire talented
              streamers for the applications. The Agency should manage all the
              hosts well and provide all the guidance related to the streaming
              process, policies, and regulations. The Agent should maintain a
              healthy professional relationship with the hosts.
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              The Agency can choose to work full-time or part-time from their
              preferred locations.
            </p>
            <p className="font-semibold text-lg lg:text-xl lg:leading-[1.35]">
              <Link href='#' className="text-[#000000] hover:underline">Click here</Link> to check all the details related to the Agencies.
            </p>

            <div className="h-px bg-[#2F2F2F23] my-4 lg:my-6 w-full"></div>
            <p className="font-semibold text-lg lg:text-xl lg:leading-[1.35]">
              The Business Dynamics
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              The live-streaming applications contract with agencies to bring
              new talent and manage the ongoing relationship with the streamers.
              The commission is calculated based on referrals and the total
              earnings of hosts. The rule is simple here- increase the number of
              broadcasters, their total earnings will increase, and so will the
              agencies&apos; commission.
            </p>

            <div className="h-px bg-[#2F2F2F23] my-4 lg:my-6 w-full"></div>
            <p className="font-semibold text-lg lg:text-xl lg:leading-[1.35]">
              Your Path To Prosperity
            </p>
            <p className="text-base lg:text-lg lg:leading-[1.35]">
              Start your live-streaming journey with LH Talent Agency and
              welcome all the possibilities of making a profession through
              streaming. Join our agency and be a part of the community where
              your talent and creativity can expand your wings into the world of
              live-streaming.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
