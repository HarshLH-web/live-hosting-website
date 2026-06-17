// import React from 'react'
"use client";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import useBlogStore from "@/store/useBlogStore";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Blogs() {
  const { blogs, isLoading, fetchBlogs } = useBlogStore();
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { query } = router;
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs(query.tag || null);
  }, [query, fetchBlogs]);

  const endIndex = page * blogsPerPage;
  const displayedBlogs = useMemo(
    () => (blogs.length > 0 ? blogs.slice(0, endIndex) : []),
    [blogs, endIndex],
  );
  const hasMore = blogs.length > 0 && endIndex < blogs.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const threshold = window.innerWidth < 768 ? 1000 : 400; // Smaller threshold for mobile
      const bottomPosition = document.documentElement.offsetHeight - threshold;

      if (scrollPosition >= bottomPosition) {
        if (hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  // Array of predefined background colors
  const bgColors = [
    "bg-[#FFEDE0]",
    "bg-[#E0F7FA]",
    "bg-[#E8F5E9]",
    "bg-[#FFF3E0]",
    "bg-[#EBF8C1]",
  ];
  // console.log(isBlogLoading)
  return (
    <>
      <Head>
        <title>LH Talent Agency posts blogs, related to the live-streaming.</title>
        <meta
          name="description"
          content="LH talent Agency post blogs on regular basis to share all the information related to the world of live-streaming and their collaborated applications."
        />
      </Head>

      <Header />

      <div className="heading-bg text-center border-b-2 border-[#DE0402]">
        <h1 className="text-black text-4xl lg:text-6xl font-extrabold uppercase pt-16 pb-20 lg:pb-20 lg:pt-36 lg:px-6 w-fit mx-auto border-b-4 border-[#DE0402]">
          Blogs
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto mt-8 lg:mt-16 mb-48 lg:mb-44 w-[90%] max-w-7xl">
        {isLoading && page === 1 ? (
          <p className="col-span-full text-center text-lg text-gray-600">
            Loading...
          </p>
        ) : displayedBlogs.length > 0 ? (
          displayedBlogs.map((blog) => (
            <div key={blog._id} className="rounded-lg overflow-hidden">
              <Link
                href={`/${blog.slug}`}
                key={blog._id}
                className="block"
                onClick={() => setIsBlogLoading(true)}
              >
                <div>
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                    width={1000}
                    height={1000}
                  />
                </div>
                <div
                  key={blog._id}
                  className="bg-white border border-gray-200 cursor-pointer p-4 rounded-b-lg"
                >
                  <div className="flex items-center justify-start gap-2 mb-2 flex-wrap">
                    {blog.tags.map((tag, index) => {
                      const randomBg =
                        bgColors[Math.floor(Math.random() * bgColors.length)];
                      return (
                        <p
                          key={index}
                          className={`text-xs text-[#DE0402] font-medium ${randomBg} px-3 py-1 rounded-full`}
                        >
                          {tag}
                        </p>
                      );
                    })}
                  </div>
                  <h2 className="text-xl lg:text-2xl font-semibold">
                    {blog.title}
                  </h2>
                  {/* {const formattedDate = format(new Date(blog.createdAt), 'MMMM d, yyyy')} */}
                  <p className="text-sm font-medium text-[#D24F4F] my-1">
                    By {blog.author} on{" "}
                    {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                  </p>
                  <p className="text-base text-[#00000080]">
                    {blog.coverText.length > 80
                      ? `${blog.coverText.substring(0, 80)}....`
                      : blog.coverText}
                  </p>
                  <button className="bg-white hover:bg-[#DE0402] text-[#DE0402] hover:text-white border-2 transition-all duration-300 border-[#DE0402] px-4 py- rounded-full mt-3">
                    Read More
                  </button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-600">
            No blogs found
          </p>
        )}

        {isLoading && page > 1 && (
          <div className="col-span-full flex justify-center py-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div
                className="absolute w-full h-full rounded-full animate-spin"
                style={{
                  background: "conic-gradient(transparent, red, transparent)",
                  maskImage: "radial-gradient(transparent 50%, black 54%)",
                  WebkitMaskImage:
                    "radial-gradient(transparent 50%, black 54%)",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {isBlogLoading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div
              className="absolute w-full h-full rounded-full animate-spin"
              style={{
                background: "conic-gradient(transparent, red, transparent)",
                maskImage: "radial-gradient(transparent 50%, black 54%)",
                WebkitMaskImage: "radial-gradient(transparent 50%, black 54%)",
              }}
            ></div>
          </div>

          {/* <Image src="/loading.gif" alt="Loading" className='w-16' width={1000} height={1000} /> */}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Blogs;
