import React, { useRef, useEffect, useState } from 'react';
import { Image } from '~/components/image';
// import profileImg from '~/assets/Aiotize_logo.png';

const TimelineItem = ({ date, index, title, description, company, location, imgSrc }) => {
  const itemRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile view based on window width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width breakpoint as needed
    };

    // Initial check and event listener
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("timeline-item--active")) {
            entry.target.classList.add("timeline-item--active");
          }
        });
      },
      { threshold: 1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div className="timeline-item" data-text={date} ref={itemRef}>
      {
        isMobile || index % 2 != 0 ? (
          <div className="timeline__content">
            <div className='timeline__content-content'>
              <div className="timeline__content-image">
                <Image
                  reveal
                  delay={100}
                  placeholder={imgSrc}
                  srcSet={`${imgSrc} 100w, ${imgSrc}  20w`}
                  width={360}
                  height={1080}
                  alt="Me smiling like a goofball at the Qwilr office in Sydney"
                />
              </div>
              <div className='timeline__content-content2'>

                <h2 className="timeline__content-title">{title}</h2>
                <h2 className="timeline__content-company">{company}</h2>
              </div>
            </div>
            <p className="timeline__content-desc">{description}</p>
          </div>
        ) : (
          <div className="timeline__content">
            <div className='timeline__content-content-left'>
              <div className='timeline__content-content2-left'>

                <h2 className="timeline__content-title">{title}</h2>
                <h2 className="timeline__content-company">{company}</h2>
              </div>
              <div className="timeline__content-image">
                <Image
                  reveal
                  delay={100}
                  placeholder={imgSrc}
                  srcSet={`${imgSrc} 100w, ${imgSrc}  20w`}
                  width={360}
                  height={1080}
                  alt="Me smiling like a goofball at the Qwilr office in Sydney"
                />
              </div>
            </div>
            <p className="timeline__content-desc">{description}</p>
          </div>
        )
      }
    </div >
  );
};

export default TimelineItem;