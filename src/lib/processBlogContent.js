import { JSDOM } from "jsdom";

export const BLOG_FORM_PLACEHOLDER = "Blog Form Here";

function isBlogFormPlaceholder(element) {
    return element.textContent?.trim() === BLOG_FORM_PLACEHOLDER;
}

function processImages(document, htmlContent) {
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

function htmlToContentBlocks(document, processedContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = processedContent;

    return Array.from(tempDiv.children).map((element) => {
        if (isBlogFormPlaceholder(element)) {
            return { type: "form" };
        }

        if (element.id?.startsWith("blog-image-")) {
            return {
                type: "image",
                src: element.getAttribute("data-src"),
                alt: element.getAttribute("data-alt"),
                className: element.getAttribute("data-class"),
            };
        }

        return { type: "html", html: element.outerHTML };
    });
}

export function processBlogPageContent(content) {
    if (!content) {
        return { tableOfContents: [], contentBlocks: [] };
    }

    const dom = new JSDOM("<!DOCTYPE html><body></body>");
    const { document } = dom.window;

    const parserDom = new JSDOM(content);
    const headings = Array.from(parserDom.window.document.querySelectorAll("h2, h3"));

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

    const processedContent = processImages(document, tempDiv.innerHTML);
    const contentBlocks = htmlToContentBlocks(document, processedContent);

    return { tableOfContents, contentBlocks };
}
