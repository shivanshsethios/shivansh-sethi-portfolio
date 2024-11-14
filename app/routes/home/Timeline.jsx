import React from 'react';
import TimelineItem from './TimelineItem.jsx';
import './Timeline.css';
import { cssProps } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './project-summary.module.css';

// const timelineData = [
//   {
//     date: "1881",
//     title: "1881",
//     description: "He was born in 1881 (probably in the spring) in Salonica, then an Ottoman city, now in Greece. His father Ali Riza, a customs official turned lumber merchant, died when Mustafa was still a boy. His mother Zubeyde, a devout and strong-willed woman, raised him and his sister.",
//     imgSrc: "http://i.cdn.ensonhaber.com/resimler/diger/ataturk_3473.jpg",
//   },
//   {
//     date: "1893",
//     title: "1893",
//     description: "First enrolled in a traditional religious school, he soon switched to a modern school. In 1893, he entered a military high school where his mathematics teacher gave him the second name Kemal (meaning perfection) in recognition of young Mustafa's superior achievement.",
//     imgSrc: "http://gazetemanifesto.com/wp-content/uploads/2015/11/mustafa-kemal.jpg",
//   },
//   // Add more timeline events here following the same structure
// ];


const timelineData = [
  {
    title: "Founder at Aiotize",
    description: "Leading Aiotize as Founder, my journey is fueled by a passion for leveraging the Internet of Things to revolutionize drone logistics. At Aiotize, we're not just developing technology; we're crafting smarter ecosystems for delivery services.",
    date: "August 2018 - Present",
    company: "Aiotize",
    location: "Chandigarh, Chandigarh, India",
    imgSrc: "",
  },
  {
    title: "Product Specialist for Drone Logistics Solution at JungleWorks",
    description: "Worked on drone logistics solutions, handling various aspects of product management and integration.",
    date: "August 2018 - February 2019",
    company: "JungleWorks",
    location: "Chandigarh, India",
    imgSrc: "",
  },
  {
    title: "Application Engineer at HCL Technologies",
    description: "Worked as an Incident Manager with Hosting Integration Team, overseeing the application lifecycle development.",
    date: "May 2017 - July 2018",
    company: "HCL Technologies",
    location: "Sector 126 SEZ NOIDA, India",
    imgSrc: "",
  },
  {
    title: "Software Developer Intern at Capgemini",
    description: "Interned at Capgemini, working with Java, HTML, CSS, and SQL/PL-SQL.",
    date: "December 2016 - April 2017",
    company: "Capgemini",
    location: "Pune, Maharashtra, India",
    imgSrc: "",
  },
  {
    title: "Event Manager at Picadily Hotels",
    description: "Organized events, concerts, and festive events under the proprietorship of The 5th Chapter.",
    date: "December 2010 - March 2015",
    company: "Picadily Hotels",
    location: "Chandigarh Area, India",
    imgSrc: "",
  },
  {
    title: "Bachelor's in Electronics and Communications Engineering",
    description: "Completed Bachelor's in Electronics and Communications Engineering at Chitkara University.",
    date: "2012 - 2016",
    company: "Chitkara University",
    location: "India",
    imgSrc: "",
  },
  {
    title: "Higher Secondary (Non-Medical) at St. Peter's School Chandigarh",
    description: "Completed Higher Secondary Education with a focus on Non-Medical subjects.",
    date: "2010 - 2012",
    company: "St. Peter's School Chandigarh",
    location: "Chandigarh, India",
    imgSrc: "",
  },
  {
    title: "High School (Science) at St. Stephen's School Chandigarh",
    description: "Completed High School Education with a focus on Science subjects.",
    date: "1998 - 2010",
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
  return (
    <div className="timeline-container">
      <header className="timeline-header">
      {renderKatakana('laptop', true)}
      </header>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <TimelineItem 
            key={index} 
            date={item.date} 
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