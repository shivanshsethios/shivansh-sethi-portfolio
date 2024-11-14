import React, { useRef, useEffect } from 'react';

const TimelineItem = ({ date, title, description, company, location, imgSrc }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("timeline-item--active")) {
            entry.target.classList.add("timeline-item--active");
          }
        });
      },
      { threshold: 0.1 }
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
      <div className="timeline__content">
        <h2 className="timeline__content-title">{title}</h2>
        <p className="timeline__content-desc">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;