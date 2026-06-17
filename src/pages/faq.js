import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

const faqs = [
  {
    question: "What is Streamer?",
    answer:
      "A streamer is a person who shares any information through live streaming with a global audience. The information can be related to sports, gaming, news, fashion, and many more. <br /> With LH Talent Agency, a live-streamer can generate income through live-streaming, video-calling, and chatting for various live-streaming applications. With us, streamers are also known as hosts.",
  },
  {
    question: "How much can I earn as a Streamer?",
    answer:
      "The best streamer can make up to $50/day streaming for 4-6 hours per day, which will be up to $1500/month. <br />If you have a talent and want to show that to the world, this platform is for you where you can earn through live-streaming.",
  },
  {
    question: "What Is Live Streaming Apps?",
    answer:
      "Live-streaming Apps are social media applications, where anyone can connect with people globally. On these apps, users can share their talent through live-streaming and video calling. <br /> Register with us as a Host, start monetizing your content, and build a career in the live-streaming industry.",
  },
  {
    question: "Can I stop streaming after becoming an official streamer?",
    answer:
      "Yes, it&rsquo;s totally up to the user, when he/she wants to discontinue the streaming.",
  },
  {
    question: "What are the requirements to become an contracted streamer?",
    answer:
      "Here are the requirements:<ul class='list-disc list-inside'><li style='font-size: 16px;'>A host should be 18+ years old.</li><li style='font-size: 16px;'>Some applications only recruit female hosts.</li><li style='font-size: 16px;'>A host should have a talent that can entertain the audience and able to get rewards from the viewers.</li></ul>",
  },
  {
    question: "Do I need to have huge followers list to become a host?",
    answer:
      "There is no requirement for existing followers to become official hosts. Any new user can start streaming and earning.",
  },
  {
    question: "Is there any fix time to stream?",
    answer:
      "The timing is flexible here, a user can live-streaming any time of the day as per their convenience. The only important point here is that one must complete the monthly hour requirement to get their income.",
  },
  {
    question: "How to earn money through hosting on live streaming apps?",
    answer:
      "There will be targets based on every month. The level will depend on streaming duration and received gifts. Once a host makes both the target in a month they get their salary credited. Our team representative will provide you with all the details of this process. For any further queries contact us on <a href='https://wa.me/917065384660' class='text-[#DE0402]'>+91 7065384660</a>",
  },
  {
    question: "What skills are accepted to become an official host?",
    answer:
      "The most important skill is to engage the audience during your live-streaming. Hosts are allowed to perform any set of skills such as talking, dancing, singing, comedy, mimicry, cooking, fitness, education, make-up, etc. There are some restrictions on public streamings such as pyrography, drugs, alcohol, and smoking. You can&rsquo;t mislead and show violent content on streaming.",
  },
];

export default function FAQ() {
  return (
    <>
    <Head>
        <title>Live Streaming Talent Agency - Frequently Asked Questions</title>
        <meta name="description" content="FAQ- What are Live Streaming Apps? Live Streaming applications are the entertainment industry. LH Talent Agency works with live-streaming apps." />
    </Head>
      <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          FAQ&rsquo;s
        </h1>
      </div>
      <div className=" py-8 lg:py-16">
        <div className="mx-auto w-[90%] max-w-3xl text-center">
          {/* <h2 className="text-[#252525] text-4xl lg:text-6xl font-extrabold uppercase lg:leading-[1.15]">Frequently Asked <br /> Questions</h2>
        <p className="text-[#5C5C5C] text-base lg:text-xl font-medium mt-4">Find answers to common questions about your live-streaming journey.
        Explore the FAQs and get ready to start with us! We’re here to help you every step of the way.</p> */}
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
      <Footer />
    </>
  );
}
