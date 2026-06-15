'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

const AppsAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(2); // POPPO expanded by default
  const [isMobile, setIsMobile] = useState(false);

  const toggleAccordion = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    {
      title: 'TAKA LIVE',
      heading: 'TAKA LIVE',
      description: 'Discover the world of fun and non-stop entertainment.',
      hostBtnText:'Taka Live Host',
      hostBtnURL:'https://os8.me/24zN5s',
      agentBtnText:'Taka Live Agent',
      agentBtnURL:'https://os8.me/3d7xXZ',
      bgimg: '/honeycam-bg.png',
      imgUrl: '/Apply-nowPage/taka-logo.png',
    },
    {
      title: 'CHAMET',
      heading: 'CHAMET APP',
      description: 'Build great connections without language barriers.',
      hostBtnText:'Chamet Host',
      hostBtnURL:'https://chametappagency.com/#host',
      agentBtnText:'Chamet Agent',
      agentBtnURL:'https://chametappagency.com/#agent',
      bgimg: '/chamet-bg.webp',
      imgUrl: '/Chamet-Live.webp',
  },
    {
      title: 'POPPO LIVE',
      heading: 'POPPO LIVE',
      description: 'Make live-streaming and group interactions playful.',
      hostBtnText:'Poppo Host',
      hostBtnURL:'/become-poppo-live-host-and-earn-money',
      agentBtnText:'Poppo Agent',
      agentBtnURL:'https://poppoagencyregistration.com/register/become-poppo-agent',
      bgimg: '/poppo-bg.webp',
      imgUrl: '/Poppo-Live.webp',
    },
    {
      title: 'NIKI LIVE',
      heading: 'NIKI LIVE',
      description: 'A fun live-streaming application with a global reach.',
      hostBtnText:'Niki Host',
      hostBtnURL:'https://nikiliveagent.com/#host',
      agentBtnText:'Niki Agent',
      agentBtnURL:'https://nikiliveagent.com/#agent',
      bgimg: '/niki-bg.webp',
      imgUrl: '/Niki-live.webp',
    },
    {
      title: 'CRUSH LIVE',
      heading: 'CRUSH LIVE',
      description: 'A streaming app with video calling features.',
      hostBtnText:'Crush Live Host',
      hostBtnURL:'/crush-agency-registration#crush-live-host-registration-process',
      agentBtnText:'Crush Live Agent',
      agentBtnURL:'/crush-agency-registration#crush-live-agency-registration-process',
      bgimg: '/joyo-bg.png',
      imgUrl: '/Apply-nowPage/crush-logo.png',
    },
    
  ];

  return (
    <div className="w-full lg:w-[80%] 2xl:w-full mx-auto px-2 py-12">
      <div id="accordion" className="flex flex-col md:flex-row items-stretch h-180 md:h-120 lg:h-100 2xl:h-120 rounded-3xl overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`accordion-item flex-1 relative cursor-pointer overflow-hidden transition-all duration-300 ease-in-out border-y border-x-0 lg:border-x lg:border-y-0 border-transparent last:border-t lg:last:border lg:last:border-l first:border-b lg:first:border-r lg:first:border-l lg:first:border-b first:border-t last:border-b ${
              activeIndex === index ? 'flex-5 md:flex-7' : 'flex-1'
            }`}
            onMouseEnter={() => toggleAccordion(index)}
            onMouseLeave={() => toggleAccordion(index)}
          >
            <div className="relative w-full h-full">
              <Image src={section.bgimg} alt={`Image ${index + 1}`} className="w-full h-full object-cover" width={1000} height={1000} />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="absolute inset-0 text-white flex flex-col items-center justify-center">
            
              <h3
                className={`text-2xl md:text-3xl font-semibold whitespace-nowrap tracking-wide transition-all delay-100 duration-0 md:rotate-270
                ${
                  activeIndex === index ? 'opacity-0' : 'opacity-100 mt-[275px] md:mt-[300px]'
                }
                `}
                style={{
                  marginTop: activeIndex !== index && index === 0 && isMobile ? '220px' : ''
                }}
              >
                {section.title}
              </h3>
              <Image src={section.imgUrl} alt={`${section.title} - Logo`} width={65} height={65} className={`h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl absolute left-6 md:bottom-8 md:left-auto transition-all delay-0 duration-100 ${
                  activeIndex === index ? 'opacity-0' : 'opacity-100'
                }`} />

              <div
                className={`detail-content text-center transition-all delay-100 duration-100 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image src={section.imgUrl} alt={`${section.title} - Logo`} width={65} height={65} className="h-16 w-16 rounded-xl mx-auto mb-2" />
                <h4 className="text-xl md:text-2xl font-semibold">{section.heading}</h4>
                <p className="mt-2 text-base lg:text-lg px-4">{section.description}</p>
                <div className="mt-4 flex flex-col lg:flex-row gap-4 items-center justify-center">
                  {section.hostBtnText && (
                    <a href={section.hostBtnURL} className="px-4 py-2 bg-transparent border border-[#FFE9DF] hover:bg-[#FFE9DF] hover:text-[#DE0400] transition duration-300 rounded-3xl" aria-label={`Become ${section.hostBtnText}`}>       
                        Become {section.hostBtnText}
                    </a>
                  )}
                  <a href={section.agentBtnURL} className="px-4 py-2 bg-transparent border border-[#FFE9DF] hover:bg-[#FFE9DF] hover:text-[#DE0400] transition duration-300 rounded-3xl" aria-label={`Become ${section.agentBtnText}`}>
                    Become {section.agentBtnText}
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppsAccordion;
