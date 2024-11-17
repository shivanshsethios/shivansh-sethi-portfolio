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
    title: "Founder at Aiotize",
    description: "Leading Aiotize as Founder, my journey is fueled by a passion for leveraging the Internet of Things to revolutionize drone logistics. At Aiotize, we're not just developing technology; we're crafting smarter ecosystems for delivery services.",
    date: "August 2018 - Present",
    dateSmall: "Aug '18 - Present",
    company: "Aiotize",
    location: "Chandigarh, Chandigarh, India",
    imgSrc: "",
  },
  {
    title: "Product Specialist for Drone Logistics Solution at JungleWorks",
    description: "Worked on drone logistics solutions, handling various aspects of product management and integration.",
    date: "August 2018 - February 2019",
    dateSmall: "Aug '18 - Feb '19",
    company: "JungleWorks",
    location: "Chandigarh, India",
    imgSrc: "",
  },
  {
    title: "Application Engineer at HCL Technologies",
    description: "Worked as an Incident Manager with Hosting Integration Team, overseeing the application lifecycle development.",
    date: "May 2017 - July 2018",
    dateSmall: "May '17 - Jul '18",
    company: "HCL Technologies",
    location: "Sector 126 SEZ NOIDA, India",
    imgSrc: "",
  },
  {
    title: "Software Developer Intern at Capgemini",
    description: "Interned at Capgemini, working with Java, HTML, CSS, and SQL/PL-SQL.",
    date: "December 2016 - April 2017",
    dateSmall: "Dec '16 - Apr '17",
    company: "Capgemini",
    location: "Pune, Maharashtra, India",
    imgSrc: "",
  },
  {
    title: "Event Manager at Picadily Hotels",
    description: "Organized events, concerts, and festive events under the proprietorship of The 5th Chapter.",
    date: "December 2010 - March 2015",
    dateSmall: "Dec '10 - Mar '15",
    company: "Picadily Hotels",
    location: "Chandigarh Area, India",
    imgSrc: "",
  },
  {
    title: "Bachelor's in Electronics and Communications Engineering",
    description: "Completed Bachelor's in Electronics and Communications Engineering at Chitkara University.",
    date: "2012 - 2016",
    dateSmall: "'12 - '16",
    company: "Chitkara University",
    location: "India",
    imgSrc: "",
  },
  {
    title: "Higher Secondary (Non-Medical) at St. Peter's School Chandigarh",
    description: "Completed Higher Secondary Education with a focus on Non-Medical subjects.",
    date: "2010 - 2012",
    dateSmall: "'10 - '12",
    company: "St. Peter's School Chandigarh",
    location: "Chandigarh, India",
    imgSrc: "",
  },
  {
    title: "High School (Science) at St. Stephen's School Chandigarh",
    description: "Completed High School Education with a focus on Science subjects.",
    date: "1998 - 2010",
    dateSmall: "'98 - '10",
    company: "St. Stephen's School Chandigarh",
    location: "Chandigarh, India",
    imgSrc: "",
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