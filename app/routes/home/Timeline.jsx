import React, { useRef, useEffect } from 'react';
import TimelineItem from './TimelineItem.jsx';
import './Timeline.css';
import { cssProps } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './project-summary.module.css';
import { Divider } from '~/components/divider/divider.jsx';
import { DecoderText } from '~/components/decoder-text/decoder-text.jsx';
import useMediaQuery from '~/utils/screensize.js';

const timelineData = [
  {
    title: "Founder",
    description: "Leading Aiotize as Founder, my journey is fueled by a passion for leveraging the Internet of Things to revolutionize drone logistics. At Aiotize, we're not just developing technology; we're crafting smarter ecosystems for delivery services.",
    date: "August 2018 - Present",
    dateSmall: "Aug '18 - Present",
    company: "Aiotize",
    location: "Chandigarh, Chandigarh, India",
    imgSrc: "/Aiotize_logo.png",
  },
  {
    title: "Product Specialist",
    description: "Worked on drone logistics solutions, handling various aspects of product management and integration.",
    date: "August 2018 - February 2019",
    dateSmall: "Aug '18 - Feb '19",
    company: "JungleWorks",
    location: "Chandigarh, India",
    imgSrc: "/JungleWorks_logo.png",
  },
  {
    title: "Application Engineer",
    description: "Worked as an Incident Manager with Hosting Integration Team, overseeing the application lifecycle development.",
    date: "May 2017 - July 2018",
    dateSmall: "May '17 - Jul '18",
    company: "HCL Technologies",
    location: "Sector 126 SEZ NOIDA, India",
    imgSrc: "/HCLTech_logo.png",
  },
  {
    title: "Software Developer Intern",
    description: "Interned at Capgemini, working with Java, HTML, CSS, and SQL/PL-SQL.",
    date: "December 2016 - April 2017",
    dateSmall: "Dec '16 - Apr '17",
    company: "Capgemini",
    location: "Pune, Maharashtra, India",
    imgSrc: "/Capgemini.png",
  },
  {
    title: "Event Manager",
    description: "Organized events, concerts, and festive events under the proprietorship of The 5th Chapter.",
    date: "December 2010 - March 2015",
    dateSmall: "Dec '10 - Mar '15",
    company: "Picadily Hotels",
    location: "Chandigarh Area, India",
    imgSrc: "/PiccadillyHotels_logo.png",
  },
  {
    title: "Bachelor's in ECE",
    description: "Completed Bachelor's in Electronics and Communications Engineering at Chitkara University.",
    date: "2012 - 2016",
    dateSmall: "'12 - '16",
    company: "Chitkara University",
    location: "India",
    imgSrc: "/Chitkara_logo.png",
  },
  {
    title: "Higher Secondary",
    description: "Completed Higher Secondary Education with a focus on Non-Medical subjects.",
    date: "2010 - 2012",
    dateSmall: "'10 - '12",
    company: "St. Peter's School",
    location: "Chandigarh, India",
    imgSrc: "/School_logo.png",
  }
];

function renderKatakana(device, visible) {
  return (
    <svg
      type="project"
      data-visible={true}
      data-light={false}
      style={cssProps({ opacity: 1 })}
      className={styles.svg2}
      data-device={device}
      viewBox="0 0 751 136"
    >
      <use href={`${katakana}#timeline`} />
    </svg>
  );
}

const Timeline = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("timeline-header--active")) {
            entry.target.classList.add("timeline-header--active");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div className="timeline-container">
      <header ref={headerRef} className="timeline-header" arria-hidden="true">
        {renderKatakana('laptop', true)}
      </header>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <TimelineItem 
            key={index}
            date={isSmallScreen ? item.dateSmall : item.date} 
            index={index}
            title={item.title} 
            description={item.description} 
            company={item.company} 
            location={item.location} 
            imgSrc={item.imgSrc} 
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;