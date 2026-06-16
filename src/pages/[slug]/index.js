import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogModal from "@/components/BlogModal";
import { processBlogPageContent } from "@/lib/processBlogContent";
import BlogForm from "@/components/BlogForm";

function BlogDetailPage({ blog, tableOfContents, contentBlocks }) {
  const [isTocOpen, setIsTocOpen] = useState(false);

  if (!blog) return <p>Loading...</p>;

  let h2Counter = 0;

  return (
    <>
      {/* <Head>
                <title>{`${blog.metaTitle} | LH Talent Agency`}</title>
                <meta name="description" content={blog.metaDescription} />
                <link rel="canonical" href={`${blog.canonicalUrl}`} />
                <meta name="keywords" content={blog.metaKeywords?.join(", ") || ""} />
                <meta property="og:url" content={`https://livehosting.xyz.com/${blog.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.metaTitle} />
                <meta property="og:site_name" content="LH Talent Agency" />
                <meta property="og:description" content={blog.metaDescription} />
                <meta property="og:image" content={blog.coverImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="livehosting.xyz.com" />
                <meta property="twitter:url" content={`https://livehosting.xyz.com/${blog.slug}`} />
                <meta name="twitter:title" content={blog.metaTitle} />
                <meta name="twitter:description" content={blog.metaDescription} />
                <meta name="twitter:image" content={blog.coverImage} />
                <script type="application/ld+json">
                    {JSON.stringify(blog.blogSchema)}
                </script>
            </Head> */}

      <Header />

      <div
        id="blog-container"
        className="w-[95%] lg:w-[90%] max-w-7xl mx-auto pb-28 pt-4 lg:pt-24 lg:mt-24 lg:pb-28 bg-gray-50 border-x border-gray-200"
      >
        <div className="relative mx-2 lg:mx-16 h-52 lg:h-72 rounded-xl overflow-hidden">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={blog.desktopBannerImage}
            />

            <img
              src={blog.mobileBannerImage}
              alt={blog.title}
              className="absolute inset-0 w-full! h-full! m-0! p-0! object-cover! max-w-full!"
            />
          </picture>

          <div
            className="absolute inset-0"
            style={{
              boxShadow: "inset 0px 0px 400px 54px rgba(0,0,0,0.66)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1
              className="text-3xl font-bold max-w-176 text-white text-center px-2"
              style={{ textDecoration: "none" }}
            >
              {blog.title}
            </h1>
          </div>
        </div>

        {tableOfContents.length > 0 && (
          <div className="mb-4 lg:mb-8 mt-4 lg:mt-6 px-4 lg:px-6 pt-1 pb-2 bg-black/10 rounded-lg mx-2 lg:mx-16">
            <p
              className={`font-semibold mb-[2px] pt-[7px] lg:mb-2 lg:pt-3 text-[#DE0400] cursor-pointer flex items-center justify-between text-[1.15rem]! lg:text-[1.35rem]!`}
              onClick={() => setIsTocOpen(!isTocOpen)}
            >
              Table of Contents
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 min-w-5 ${
                  isTocOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </p>
            <nav
              style={{
                maxHeight: isTocOpen ? "1000px" : "0",
                overflow: "hidden",
                paddingBottom: isTocOpen ? "10px" : "0",
                transition: "max-height 0.4s ease",
              }}
            >
              {tableOfContents.map((heading) => {
                if (heading.level === "h2") h2Counter++;
                return (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block mb-2 ${
                      heading.level === "h3"
                        ? "ml-4 lg:ml-6 text-sm lg:text-base"
                        : "text-base lg:text-lg font-medium"
                    }`}
                    style={{ color: "black" }}
                  >
                    {heading.level === "h3" ? (
                      <span className="text-sm lg:text-base">
                        {heading.text}
                      </span>
                    ) : (
                      <span className="text-base lg:text-lg font-medium">
                        {h2Counter}. {heading.text}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        )}

        <div className="text-gray-700 px-4 lg:px-16">
          {contentBlocks.map((block, index) => {
            if (block.type === "form") {
              if (!blog.formRequired || !blog.selectedFields?.length) {
                return null;
              }

              return (
                <BlogForm
                  key={`form-${index}`}
                  fields={blog.selectedFields}
                  className="my-8 mx-auto"
                />
              );
            }

            if (block.type === "image") {
              return (
                <div key={`image-${index}`} className="my-4">
                  <BlogModal
                    imageSrc={block.src}
                    imageAlt={block.alt}
                    className={block.className}
                    width="w-full lg:max-w-[80%] mx-auto cursor-pointer"
                  />
                </div>
              );
            }

            return (
              <div
                key={`content-${index}`}
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  try {
    // const res = await axios.get("http://localhost:8000/api/live-hosting-blogs/selected-fields");
    const res = await axios.get(
      "https://webpanel.store/api/live-hosting-blogs/selected-fields",
    );
    const blogs = res.data.filter((blog) => blog.toPublish);

    const paths = blogs.map((blog) => ({
      params: { slug: blog.slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    // const response = await axios.get(`http://localhost:8000/api/live-hosting-blogs/${slug}`);
    const response = await axios.get(
      `https://webpanel.store/api/live-hosting-blogs/${slug}`,
    );
    const { tableOfContents, contentBlocks } = processBlogPageContent(
      response.data.content,
    );

    return {
      props: {
        blog: response.data,
        tableOfContents,
        contentBlocks,
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      notFound: true,
    };
  }
}

export default BlogDetailPage;
