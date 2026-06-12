// import React from 'react'
'use client';
import axios from 'axios';
import { format } from 'date-fns';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from "next/head";
import useBlogStore from '@/store/useBlogStore';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// const BreadcrumbSchema = 
// {
//   "@context": "https://schema.org/", 
//   "@type": "BreadcrumbList", 
//   "itemListElement": [{
//     "@type": "ListItem", 
//     "position": 1, 
//     "name": "Home",
//     "item": "https://lhtalentagency.com/"  
//   },{
//     "@type": "ListItem", 
//     "position": 2, 
//     "name": "Blogs",
//     "item": "https://lhtalentagency.com/blogs"  
//   }]
// }


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
    [blogs, endIndex]
  );
  const hasMore = blogs.length > 0 && endIndex < blogs.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const threshold = window.innerWidth < 768 ? 1000 : 400; // Smaller threshold for mobile
      const bottomPosition = document.documentElement.offsetHeight - threshold;

      if (scrollPosition >= bottomPosition) {
        if (hasMore && !isLoading) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading]);

  // Array of predefined background colors
  const bgColors = ["bg-[#FFEDE0]", "bg-[#E0F7FA]", "bg-[#E8F5E9]", "bg-[#FFF3E0]", "bg-[#EBF8C1]"];
  // console.log(isBlogLoading)
  return (
    <>
    <Head>
      <title>LH Talent Agency Blog: Tips for Streamers</title>
      <meta name="description" content="LH Talent Agency's blog page provides you with all the needed information with updated details, insights, and tips about the live streaming industry. Explore Now!" />
      <meta name="keywords" content="Explore the opportunities in the live streaming industry, Step-by-step Guide to become a streaming agent, Guide for creating agency as a streamer" />
      {/* <!-- Facebook Meta Tags --> */}
      {/* <meta property="og:url" content="https://lhtalentagency.com/blogs" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="LH Talent Agency Blog: Tips for Streamers" />
      <meta property="og:site_name" content="LH Talent Agency" />
      <meta property="og:description" content="LH Talent Agency's blog page provides you with all the needed information with updated details, insights, and tips about the live streaming industry. Explore Now!" />
      <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/e04db76e-b344-45d3-a4fd-bfcc6a3bb231.jpg?token=wthbG12ZawSlhgRHgv7eK3o8ISBCVVFjtJJJjz_EZl4&height=650&width=1200&expires=33277340250" /> */}

      {/* <!-- Twitter Meta Tags --> */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="lhtalentagency.com" />
      <meta property="twitter:url" content="https://lhtalentagency.com/blogs" />
      <meta name="twitter:title" content="LH Talent Agency Blog: Tips for Streamers" />
      <meta name="twitter:description" content="LH Talent Agency's blog page provides you with all the needed information with updated details, insights, and tips about the live streaming industry. Explore Now!" />
      <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/e04db76e-b344-45d3-a4fd-bfcc6a3bb231.jpg?token=wthbG12ZawSlhgRHgv7eK3o8ISBCVVFjtJJJjz_EZl4&height=650&width=1200&expires=33277340250" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://lhtalentagency.com/blogs" />
      <script type="application/ld+json">
        {JSON.stringify(BreadcrumbSchema)}
      </script> */}
    </Head>

    <Header />
    <div className='blog-bg'>
      <h1 className='text-white text-4xl lg:text-6xl font-bold uppercase'>Blogs</h1>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto mt-8 lg:mt-16 mb-48 lg:mb-44 w-[90%] max-w-7xl'>
      {isLoading && page === 1 ? (
        <p className="col-span-full text-center text-lg text-gray-600">Loading...</p>
      ) : displayedBlogs.length > 0 ? displayedBlogs.map((blog) => (
        <div key={blog._id} className='rounded-lg overflow-hidden'>
         <Link href={`/blogs/${blog.slug}`} key={blog._id} className="block" onClick={() => setIsBlogLoading(true)}>
          <div>
            <Image src={blog.coverImage} alt={blog.title} className='w-full h-52 object-cover' width={1000} height={1000} />
          </div>
          <div key={blog._id} className='bg-white border border-gray-200 cursor-pointer p-4 rounded-b-lg'>
            <div className='flex items-center justify-start gap-2 mb-2 flex-wrap'>
              {blog.tags.map((tag, index) => {
                const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
                return <p key={index} className={`text-xs text-[#DE0402] font-medium ${randomBg} px-3 py-1 rounded-full`}>{tag}</p>
              })}
            </div>
            <h2 className='text-xl lg:text-2xl font-semibold'>{blog.title}</h2>
            {/* {const formattedDate = format(new Date(blog.createdAt), 'MMMM d, yyyy')} */}
            <p className='text-sm font-medium text-[#D24F4F] my-1'>By {blog.author} on {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
            <p className='text-base text-[#00000080]'>{blog.coverText.length > 80 ? `${blog.coverText.substring(0, 80)}....` : blog.coverText}</p>
          <button className='bg-white hover:bg-[#DE0402] text-[#DE0402] hover:text-white border-2 transition-all duration-300 border-[#DE0402] px-4 py- rounded-full mt-3'>Read More</button>
          </div>

          </Link>
        </div>
        )) : <p className="col-span-full text-center text-lg text-gray-600">No blogs found</p>}
      
      {isLoading && page > 1 && (
        <div className="col-span-full flex justify-center py-4">
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
        </div>
      )}
    </div>
    {isBlogLoading  && <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
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
    </div>}
    <Footer />
    </>
  )
}

export default Blogs