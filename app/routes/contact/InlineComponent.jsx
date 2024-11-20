import { useEffect } from 'react';
import "./InlineComponent.css"
const InlineComponent = () => {
  useEffect(() => {
    const linkStyles = document.createElement('link');
    linkStyles.href = 'https://assets.calendly.com/assets/external/widget.css';
    linkStyles.rel = 'stylesheet';
    document.head.appendChild(linkStyles);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(linkStyles);
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    Calendly.initPopupWidget({
      url: 'https://calendly.com/ujjwalpath2002',
    });
  };

  return (
    <a href="#" onClick={handleClick} className='btn-inline'>
      Use Calendly
    </a>
  );
};

export default InlineComponent;