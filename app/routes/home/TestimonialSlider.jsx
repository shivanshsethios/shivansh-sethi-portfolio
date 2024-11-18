import React, { useState, useEffect, useRef } from 'react';
import './TestimonialSlider.css';
import { cssProps } from '~/utils/style';
import styles from './project-summary.module.css';
import katakana from './katakana.svg';

const testimonials = [
  {
    name: 'Shalini Garg',
    role: 'Application Developer at CIBC',
    message: 'Shivansh is a motivated, forward-thinking and also an intelligent CEO who has lots of knowledge in his field. Broad-minded CEO- his exceptional work flow, skills, ingenuity and comprehension of change requests made the project a dream. He is a wonderful person to work with, and has exceptional expertise in leadership, coaching and motivation.',
    date: 'June 19, 2019',
    connection: 'Worked with Shivansh on the same team',
    imgSrc: './Shalini Garg.jpeg',
    linkedin: 'https://www.linkedin.com/in/shalini-garg-35a753161',
  },
  {
    name: 'Ankit Saha',
    role: 'Account Executive at Bazaarvoice',
    message: 'Shivansh is an extremely talented and creative person. Also great mentorship skills. Great to have a senior like him.',
    date: 'January 19, 2019',
    connection: 'Shivansh was senior to Ankit but didn\'t manage him directly',
    imgSrc: './Ankit Saha.jpeg',
    linkedin: 'https://www.linkedin.com/in/ankit-saha-959839150/',
  },
  {
    name: 'Malvika Diwan',
    role: 'Fulfilment & Experience @ Meesho',
    message: 'Shivansh has been my colleague in JungleWorks. He is a very dedicated and persistent person. Striving to achieve the best is one of his strengths and this shall take him a long way in his career. All in all he is a very good person who motivates others as well. All the luck and wishes to you. All the very best!! Cheers!',
    date: 'January 18, 2019',
    connection: 'Shivansh was senior to Malvika but didn\'t manage her directly',
    imgSrc: './Malvika Diwan.jpeg',
    linkedin: 'https://www.linkedin.com/in/malvika-diwan/',
  },
  {
    name: 'Aritra Kumar Pal',
    role: 'Analyst at HCL Technologies',
    message: 'One of the best mind I have came across in HCL. A true out of the box thinker. It was a great experience to work with you.',
    date: 'January 9, 2019',
    connection: 'Aritra Kumar managed Shivansh directly',
    imgSrc: './Aritra Kumar Pal.jpeg',
    linkedin: 'https://www.linkedin.com/in/aritra-kumar-pal-72140a178/',
  },
  {
    name: 'Randhir Kumar Singh',
    role: 'CEO and Founder at Hilly Cottages and Resorts Pvt. Ltd.',
    message: 'Shivansh is very bright and has highly futuristic insight in AI based IOT tools, has state of the art solutions in multiple domains..!!! Ex. Smart Homes, Smart Roads, Smart Factories, Smart factories etc. Wishing him all the best in all his future endeavors..!!',
    date: 'July 30, 2018',
    connection: 'Worked with Shivansh but on different teams',
    imgSrc: './Randhir Kumar Singh.jpeg',
    linkedin: 'https://www.linkedin.com/in/randhir-kumar-singh-295a75153/',
  },
  {
    name: 'Chitrarth Sahai',
    role: 'Assistant Manager at KPMG',
    message: 'I have worked for almost an year with Shivansh and he is a headstrong guy who is technically strong and never gives up on pending tasks, he has always met his deliverables on time and tries to help others. For a short span of time, he became the cohesive cog in our team. Cheers mate for a bright future!',
    date: 'July 29, 2018',
    connection: 'Worked with Shivansh on the same team',
    imgSrc: './Chitrarth Sahai.jpeg',
    linkedin: 'https://www.linkedin.com/in/chitrarth-sahai-615084115/',
  },
  {
    name: 'Shivam Anand',
    role: 'Senior Product Specialist',
    message: 'Shivansh\'s determination and his percipience for technology is astounding.',
    date: 'July 29, 2018',
    connection: 'Worked with Shivansh but on different teams',
    imgSrc: './Shivam Anand.jpeg',
    linkedin: 'https://www.linkedin.com/in/shivam-anand-835964119',
  },
];

function renderKatakana(device, visible) {
  return (
    <svg
      type="project"
      data-visible={true}
      data-light={false}
      style={cssProps({ opacity: 1 })}
      className={styles.svg3}
      data-device={device}
      viewBox="0 0 166 125"
    >
      <use href={`${katakana}#testimonials`} />
    </svg>
  );
}


const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Automatically change testimonial every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("testimonial-slider--active")) {
            entry.target.classList.add("testimonial-slider--active");
          }
        });
      },
      { threshold: 1 }
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
    <>
      <div ref={headerRef} className="testimonial-slider">
        {renderKatakana("laptop", true)}
        <div className="testimonial-container" onClick={() => window.open(testimonials[currentIndex].linkedin, '_blank')} style={{ cursor: 'pointer' }}>
          <p className="testimonial-text">"{testimonials[currentIndex].message}"</p>
          <img className="testimonial-image" src={testimonials[currentIndex].imgSrc} />
          <h3 className="testimonial-author">{testimonials[currentIndex].name}</h3>
          <p className="testimonial-role">{testimonials[currentIndex].role}</p>
        </div>
      </div>
    </>
  );
};

export default TestimonialSlider;