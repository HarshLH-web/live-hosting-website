'use client';
import Image from 'next/image';
import Link from 'next/link';
    import  { useState } from 'react';
    import { useRouter } from 'next/navigation';

function Footer() {
 
  // Add state for search input
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/blogs?tag=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <footer className="bg-linear-to-t from-[#000000] to-[#01041B] text-white pt-16 pb-5 lg:border-b-4 border-[#DE0402]">
      <div className="w-full lg:w-[95%] max-w-360 mx-auto flex flex-col lg:flex-row lg:justify-between gap-8 px-6 lg:px-0">
        {/* Contact Section - First on mobile */}
        <div className='lg:text-left relative lg:w-[30%] lg:min-w-[370px] 2xl:min-w-[500px] flex flex-col lg:flex-row justify-start items-start gap-4 2xl:gap-8'>
          <Image src="/lh-logo-white.png" alt="Logo" width={500} height={500}  className='mb-4 lg:mb-0 w-28 h-28 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40' />

          <div>
            <p className="text-white text-2xl lg:text-3xl font-semibold mb-2 lg:mb-4">Contact</p>

            <div className='space-y-2'>
            <div className='flex items-center'>
              <span className='bg-white w-1 h-1 rounded-full inline-block mr-2'></span>
            <Link href='#' className="text-white block md:inline transform hover:translate-x-2 hover:text-[#ff2e2b] transition duration-300">Call/Whatsapp: +917065384660</Link>
            </div>
            <div className='flex items-center'>
              <span className='bg-white w-1 h-1 rounded-full inline-block mr-2'></span>
            <Link href='#' className="text-white block md:inline transform hover:translate-x-2 hover:text-[#ff2e2b] transition duration-300">Email: support@lhtalentagency.com</Link>
            </div>
            </div>

             <div className="mt-6 mb-6 flex items-center justify-center text-white relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-[90%] lg:w-full pl-4 py-3 text-[#000000] rounded-full border-2 border-[#ffffff] bg-[#ffffff] focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}


            />
            <button 
              onClick={handleSearch}
              className=" border-2 border-[#ffffff] text-[#000000] bg-[#ffffff] hover:scale-110 transition-all duration-300 p-[6px] rounded-full absolute right-[23px] lg:right-[8px]"
              aria-label="Search"
            >
              <Image src="/search.svg" alt="White Arrow" className='w-4 h-4' width={16} height={16} />
            </button>


          </div>
          </div>
     
        </div>

        <div className='w-full lg:min-w-px lg:w-px lg:h-60 h-px bg-white/25'></div>

        {/* Quick Links Section - Second on mobile */}
        <div className="lg:pb-12 whitespace-nowrap lg:w-[15%] lg:min-w-[180px] 2xl:min-w-[200px]">
          <p className="text-2xl lg:text-3xl font-semibold mb-2 lg:mb-4">Quick Links</p>
          <div className="flex flex-col lg:flex-row md:gap-4 xl:gap-16 justify-start lg:pr-8 xl:pr-16">
            <div className="space-y-2 flex flex-col">

           
            {
              [
                {
                  title: 'Blogs',
                  href: '/blogs'
                },
                {
                  title: 'Join as Agent',
                  href: '/about-talent-agency'
                },
                {
                  title: 'Join as Streamer',
                  href: '/become-live-streamer'
                },
                {
                  title: 'Register as Influencer',
                  href: '/become-live-streamer'
                },
                {
                  title: 'About Us',
                  href: '/about-talent-agency'
                },
                {
                  title: 'Streamer Tips',
                  href: '/become-live-streamer'
                }
              ].map((item, index) => (
                <>
                <div key={index} className='flex items-center'>
                  <span className='bg-white w-1 h-1 rounded-full inline-block mr-2'></span>
                <Link href={item.href} className="text-white block md:inline transform hover:translate-x-2 hover:text-[#ff2e2b] transition duration-300">{item.title}</Link>
                </div>
                {/* <div className="h-px bg-[#242424] last:hidden"></div> */}
                </>
                
            ))} 
            </div>
          </div>
        </div>

        <div className='w-full lg:min-w-px lg:w-px lg:h-60 h-px bg-white/25'></div>


        {/* Blog Links Section - Third on mobile */}
        <div className="pb-12 whitespace-nowrap lg:w-[30%]">
          <p className="text-2xl lg:text-3xl font-semibold mb-2 lg:mb-4">Blog</p>

          <div className="space-y-2 flex flex-col lg:max-w-[80%]">
             {[
              {
                title: 'Succeed on Poppo Live',
                href: '/blogs/tango-agency-registration'
              },
              {
                title: 'How to Become a poppo App Agency',
                href: '/blogs/become-poppo-live-host-and-earn-money'
              },
              {
                title: 'Poppo Live App features & benefits',
                href: '/blogs/how-poppo-app-agency-earn-money'
              },
              {
                title: 'Increasing Demand of Influencers',
                href: '/blogs/joyo-live-agency'
              },
              {
                title: 'How to Become a poppo App Agency',
                href: '/blogs/how-to-trade-coins-in-poppo-live'
              },
              {
                title: 'How to Register as a Niki Live Agent',
                href: '/blogs/how-to-trade-coins-in-poppo-live'
              }
             ].map((item, index) => (
              <>
              <div key={index} className='flex items-center'>
                <span className='bg-white w-1 min-w-1 min-h-1 h-1 rounded-full inline-block mr-2'></span>
               <Link href={item.href} className="text-white transform hover:translate-x-2 hover:text-[#ff2e2b] transition duration-300 block md:inline">{item.title}</Link>
              </div>
              {/* <div className="h-px bg-[#242424] last:hidden"></div> */}
              </>
             ))}
            </div>
        </div>
      </div>

      {/* Copyright and Social Links - Last on both mobile and desktop */}
      <div className="border-t border-gray-800 pt-4 text-center lg:text-left order-4 flex justify-between items-center max-w-4/5 mx-auto ">
        <p className="text-sm text-white font-semibold">
          &copy; 2025 LH Talent Agency. All rights reserved.
        </p>

        <div className="flex justify-center space-x-4">
                {[
                  { icon: '/facebook.svg', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61557976949556' },
                  { icon: '/instagram.svg', label: 'Instagram', href: 'https://www.instagram.com/lhtalentagency/' },
                  { icon: '/twitter.svg', label: 'Twitter', href: 'https://www.linkedin.com/company/live-hosting-agency/' },
                  { icon: '/youtube.svg', label: 'YouTube', href: 'https://www.youtube.com/channel/UCMJduDDm_mOpsPQI9AD0Wlw' }
                ].map(({ icon, label, href }) => (
                  <a 
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-gray-400 hover:text-white transform hover:-translate-y-1 transition-transform duration-300"
                    rel="noopener noreferrer"
                  >
                    <Image 
                      src={icon}
                      alt={label}
                      className="w-8 h-8"
                      width={1000}
                      height={40}
                    />
                  </a>
                ))}
              </div>
      </div>
    </footer>
  );
}

export default Footer;