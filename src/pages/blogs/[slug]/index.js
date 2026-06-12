import axios from "axios";
import Head from "next/head";
import { useMemo, useState, useSyncExternalStore } from "react";
import DOMPurify from "isomorphic-dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogModal from "@/components/BlogModal";

function processImages(htmlContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const images = tempDiv.querySelectorAll("img");
    images.forEach((img, index) => {
        const imgSrc = img.getAttribute("src");
        const imgAlt = img.getAttribute("alt") || "Blog image";
        const imgClass = img.getAttribute("class") || "";
        const imageId = `blog-image-${index}`;
        const placeholder = document.createElement("div");
        placeholder.innerHTML = `<div id="${imageId}" data-src="${imgSrc}" data-alt="${imgAlt}" data-class="${imgClass}"></div>`;
        img.parentNode.replaceChild(placeholder.firstChild, img);
    });

    return tempDiv.innerHTML;
}

function processBlogPageContent(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3"));

    const tableOfContents = headings.map((heading, index) => {
        const cleanText = heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        return {
            id: `heading-${cleanText}-${index}`,
            text: heading.textContent.replace(/^\d+\.?\s*/, ""),
            originalText: heading.textContent,
            level: heading.tagName.toLowerCase(),
        };
    });

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    tableOfContents.forEach((heading) => {
        const headingElements = tempDiv.querySelectorAll(heading.level);
        for (const element of headingElements) {
            if (element.textContent.trim() === heading.originalText.trim()) {
                element.innerHTML = `<span id="${heading.id}" style="scroll-margin-top: 150px; display: block;">${element.innerHTML}</span>`;
                break;
            }
        }
    });

    const contentWithIds = tempDiv.innerHTML;
    const processedContent = processImages(contentWithIds);

    return { tableOfContents, contentWithIds, processedContent };
}

function subscribeToViewport(callback) {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
}

function getIsMobileSnapshot() {
    return window.innerWidth < 768;
}

function BlogDetailPage({ blog }) {
    const [isTocOpen, setIsTocOpen] = useState(false);
    const blogContent = blog?.content;
    const isMobile = useSyncExternalStore(
        subscribeToViewport,
        getIsMobileSnapshot,
        () => false
    );

    const { tableOfContents, processedContent } = useMemo(() => {
        if (!blogContent || typeof window === "undefined") {
            return { tableOfContents: [], contentWithIds: "", processedContent: "" };
        }
        return processBlogPageContent(blogContent);
    }, [blogContent]);

    // Function to render processed content with ImageModal components
    const renderProcessedContent = () => {
        if (!processedContent) return null;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = processedContent;

        // Find all image placeholders and replace them with ImageModal components
        const imagePlaceholders = tempDiv.querySelectorAll("[id^='blog-image-']");
        
        // Convert to array and process
        const elements = Array.from(tempDiv.children);
        
        return elements.map((element, index) => {
            if (element.id && element.id.startsWith('blog-image-')) {
                const imgSrc = element.getAttribute('data-src');
                const imgAlt = element.getAttribute('data-alt');
                const imgClass = element.getAttribute('data-class');
                
                return (
                    <div key={`image-${index}`} className="my-4">
                        <BlogModal 
                            imageSrc={imgSrc}
                            imageAlt={imgAlt}
                            className={imgClass}
                            width="w-full lg:max-w-[80%] mx-auto cursor-pointer"
                        />
                    </div>
                );
            } else {
                return (
                    <div 
                        key={`content-${index}`}
                        dangerouslySetInnerHTML={{ __html: element.outerHTML }}
                    />
                );
            }
        });
    };

    if (!blog) return <p>Loading...</p>;

    let h2Counter = 0;

    return (
        <>
            <Head>
                <title>{`${blog.metaTitle} | LH Talent Agency`}</title>
                <meta name="description" content={blog.metaDescription} />
                <link rel="canonical" href={`${blog.canonicalUrl}`} />
                <meta name="keywords" content={blog.metaKeywords?.join(", ") || ""} />
                <meta property="og:url" content={`https://lhtalentagency.com/blogs/${blog.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.metaTitle} />
                <meta property="og:site_name" content="LH Talent Agency" />
                <meta property="og:description" content={blog.metaDescription} />
                <meta property="og:image" content={blog.coverImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="lhtalentagency.com" />
                <meta property="twitter:url" content={`https://lhtalentagency.com/blogs/${blog.slug}`} />
                <meta name="twitter:title" content={blog.metaTitle} />
                <meta name="twitter:description" content={blog.metaDescription} />
                <meta name="twitter:image" content={blog.coverImage} />
                <script type="application/ld+json">
                    {JSON.stringify(blog.blogSchema)}
                </script>
            </Head>

            <Header />

            <div id="blog-container" className="w-[95%] lg:w-[90%] max-w-7xl mx-auto pb-48 pt-4 lg:pt-16 lg:pb-44 bg-gray-50 border-x border-gray-200 mb-[-130px]">
                <div className="mx-2 lg:mx-16 flex items-center justify-between h-52 lg:h-72 bg-cover bg-center bg-no-repeat rounded-xl" style={{boxShadow: 'inset 0px 0px 400px 54px rgba(0,0,0,0.66)',backgroundImage: `url(${isMobile ? blog.mobileBannerImage : blog.desktopBannerImage})`}}>
                    <h1 className="text-3xl font-bold max-w-176 mx-auto text-white text-center px-2" style={{textDecoration: "none"}}>{blog.title}</h1>
                </div>

                {tableOfContents.length > 0 && (
                    <div className="mb-4 lg:mb-8 mt-4 lg:mt-6 px-4 lg:px-6 pt-1 pb-2 bg-black/10 rounded-lg mx-2 lg:mx-16">
                        <p
                            className={`font-semibold mb-[2px] pt-[7px] lg:mb-2 lg:pt-3 text-[#DE0400] cursor-pointer flex items-center justify-between`}
                            style={{ fontSize: isMobile ? "1.15rem" : "1.35rem" }}
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                                            <span className="text-sm lg:text-base">{heading.text}</span>
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
                    {renderProcessedContent()}
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getStaticPaths() {
    try {
      const res = await axios.get("https://webpanel.store/api/blogs/selected-fields");
      const blogs = res.data.filter(blog => blog.toPublish);
  
      const paths = blogs.map(blog => ({
        params: { slug: blog.slug },
      }));
  
      return {
        paths,
        fallback: "blocking", // Enables dynamic SSG for new slugs
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
        const response = await axios.get(`https://webpanel.store/api/blogs/${slug}`);
        return {
            props: {
                blog: response.data,
            },
            // optional: enable if blogs might change occasionally
            // revalidate: 60 * 60 * 24 // Revalidate every 24 hours
        };
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return {
            notFound: true,
        };
    }
}

export default BlogDetailPage;
