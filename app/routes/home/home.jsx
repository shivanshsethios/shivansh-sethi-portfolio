import sprTexture from '~/assets/fpv-racing-bg.png';
import { Footer } from '~/components/footer';
import { Section } from '~/components/section';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';
import Timeline from "./Timeline";
import TestimonialSlider from './TestimonialSlider';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: '',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [focued, setFocused] = useState(false);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const details = useRef();
  const timeline = useRef();
  const testimonials = useRef();
  const footer = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, details, projectTwo, timeline, testimonials, footer];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);


  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="aiotize"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Revolutionizing IoT Solutions"
        description="Empowering businesses with cutting-edge IoT technology for smarter operations"
        buttonText="Know More"
        buttonLink="https://aiotize.com/"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTexture} 2560w`,
              placeholder: sprTexture,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="aboutme"
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        isVideo={true}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="FPV Racing Pilot"
        description="As an FPV drone racing enthusiast, I am deeply passionate about the dynamic world of drones, combining technology and adrenaline to push the boundaries of speed and precision. I proudly associate myself with the Drone Racing Federation (DRF), a pioneering initiative by Aiotize, aimed at uniting drone hobbyists, pilots, and professionals on a single platform to compete and excel."
        buttonText="Know More"
        buttonLink="/projects/fpv-racing"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTexture} 2560w`,
              placeholder: sprTexture,
            },
          ],
        }}
      />
      <Section
        className={styles.profile}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        as="section"
        id="timeline"
        ref={timeline}
        // aria-labelledby={titleId}
        tabIndex={-1}
      >
        <Timeline />
      </Section>
      <Section
        className={styles.profile}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        as="section"
        id="testimonials"
        ref={testimonials}
        // aria-labelledby={titleId}
        tabIndex={-1}
      >
        <TestimonialSlider />
      </Section>
      <Section
        className={styles.profile}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        as="section"
        id="footer"
        ref={footer}
        // aria-labelledby={titleId}
        tabIndex={-1}
      >
        <Footer />
      </Section>
    </div>
  );
};
