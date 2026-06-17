import BlogForm from "@/components/BlogForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";

export default function InfluencerRegistration() {
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
            <title>Register with LH Talent Agency as an Influencer or a Streamer</title>
            <meta name="description" content="Join our team, LH Talent Agency as an influencer or a streamer. We, a talent agency for streamers, are hiring talented streamers with audience-engaging skills." />
        </Head>
        <Header />
        <div className="heading-bg text-center border-b-2 border-[#DE0402]">
            <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
                Influencer Registration
            </h1>
        </div>
         

        <BlogForm fields={fields} className="mt-12 lg:mt-20" />
      <div className="w-[90%] max-w-4xl mx-auto py-12 lg:px-10 space-y-3 lg:space-y-5">
        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
        In recent years, social media influencers have gained tremendous popularity and become an admired profession. LH Talent Agency also collaborates with content creators of all levels, micro, macro, or popular for branding and promotions
        </p>

        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
        The influencers create authenticity amongst the audience for the products or services they advertise, which helps the brand to reach the right set of market.
        LH Talent Agency is a platform where we connect the brands with the influencers or vice-versa. We work both ways. We help brands market their product through influencers and create awareness. A brand will gain popularity and trust with influencer marketing.
        </p>
        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
        For the influencers, we connect them with the right companies to expand their opportunities. The content creator can reach a wide audience and grow their community through marketing. They enhance their creativity and also get the opportunity to generate income.
        </p>
        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
        LH Talent Agency links brands and influencers to all categories or niches as per their respective industry.
        </p>
        <p className="text-lg lg:text-xl lg:leading-[1.35] text-[#363636] font-medium text-center">
        Expand your reach.<br />Join Our Team of Influencer Network
        </p>

        <Link
          href="/apply-now"
          className="bg-[#DE0402] text-base lg:text-lg w-fit text-white py-2 px-6 rounded-full font-medium flex items-center gap-2 transition duration-300 border-2 border-[#DE0402] mx-auto mt-4 lg:mt-6 hover:bg-transparent hover:text-[#DE0402]"
        >
          Contact Us
        </Link>
      </div>
            <Footer />
        </>
    );
}