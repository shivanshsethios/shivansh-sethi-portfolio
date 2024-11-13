import React from 'react';
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';

const TimelineItem = ({ date, title, description, company, location, imgSrc }) => {
  return (
    <div className="timeline-item" data-text="FATHER OF THE TURKS">
      <div className="timeline__content">
        {/* <h6 className="timeline__content-title">{title}</h6> */}
        <Heading
          level={3}
          as="h2"
          // className="timeline__content-title"
          data-visible={true}
          id={title}
        >
          {title}
        </Heading>
        <h2 className="timeline__content-title">{date}</h2>
        <p className="timeline__content-desc">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;