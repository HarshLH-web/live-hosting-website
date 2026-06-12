"use client";  // Ensure it's a client component

import { useMemo, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

function processBlogContent(content) {
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

    return { tableOfContents, contentWithIds: tempDiv.innerHTML };
}

export default function BlogDetail({ blog }) {
    const [isTocOpen, setIsTocOpen] = useState(false);
    const blogContent = blog?.content;

    const { tableOfContents, contentWithIds } = useMemo(() => {
        if (!blogContent || typeof window === "undefined") {
            return { tableOfContents: [], contentWithIds: null };
        }
        return processBlogContent(blogContent);
    }, [blogContent]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="w-[90%] mx-auto mb-48 mt-7 lg:mt-16 lg:mb-44">
            <h1 className="text-3xl font-bold mb-4 text-center max-w-3xl mx-auto">{blog.title}</h1>

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
                <div className="mb-4 px-4 pt-1 pb-2 bg-gray-200 rounded-lg">
                    <p
                        className="font-semibold mb-2 pt-3 text-[#DE0400] cursor-pointer flex items-center justify-between"
                        onClick={() => setIsTocOpen(!isTocOpen)}
                    >
                        Table of Contents
                        <svg
                            className={`w-6 h-6 transform transition-transform duration-300 ${
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
                    <nav style={{ maxHeight: isTocOpen ? "1000px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                        {tableOfContents.map((heading) => (
                            <a key={heading.id} href={`#${heading.id}`} className="block mb-2 text-black">
                                {heading.text}
                            </a>
                        ))}
                    </nav>
                </div>
            )}

            {/* Blog Content */}
            {contentWithIds && (
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentWithIds) }} />
            )}
        </div>
    );
}
