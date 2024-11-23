import backgroundSpr from '~/assets/fpv-racing-bg.png';
import backgroundSpr2 from '~/assets/fpv-racing-bg2.png';
import img1 from '~/assets/fpv-racing-img1.png';
import img2 from '~/assets/fpv-racing-img2.png';
import video from `~/assets/spr-motion.webm`
import video2 from `~/assets/video1.webm`
import video3 from `~/assets/video2.webm`
import { useScrollToHash, useWindowSize } from '~/hooks';
import { Footer } from '~/components/footer';
import { Button } from '~/components/button';
import { useState, useEffect } from 'react';
import { Image } from '~/components/image';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Suspense, lazy, useMemo } from 'react';
import { media } from '~/utils/style';
import styles from './fpv-racing.module.css';

const title = 'Chasing adrenaline and milliseconds in FPV racing';
const description =
  'FPV drone racing is my passion — a perfect blend of adrenaline and technology that I truly love. Proudly representing the Drone Racing Federation (DRF), an innovative initiative by Aiotize, I’m part of a community uniting hobbyists, pilots, and pros to compete, connect, and push the limits of speed and precision.';
const roles = [
  'Art Direction',
  'UX and UI Design',
  'Front End Development',
  'Motion Design',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const FpvRacing = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const windowSize = useWindowSize();
  const themes = ['dark', 'light'];
  const isMobile = windowSize.width <= 730;

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSpr} 2160w`}
          placeholder={backgroundSpr}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.facebook.com/droneracingfederation?mibextid=LQQJ4d"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <Image
              raised
              reveal
              className={styles.video}
              srcSet={`${img1} 1280w, ${img1} 2560w`}
              width={1280}
              height={800}
              placeholder={img1}
              alt=""
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>
                  Why Drones?
                </ProjectSectionHeading>
                <ProjectSectionText>
                  Drones are the ultimate operatives—precise, efficient, and loyal. They execute without hesitation, follow commands without fail, and maintain absolute discretion, safeguarding the identity of their controllers.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={
                  isDark
                    ? `${video3} 260w, ${video3} 520w`
                    : `${video3} 260w, ${video3} 520w`
                }
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? video3
                    : video3
                }
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={
                  isDark
                    ? `${video2} 260w, ${video2} 520w`
                    : `${video2} 260w, ${video2} 520w`
                }
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? video2
                    : video2
                }
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <ProjectSection padding="top">
        {isMobile ? (
          <>
          <div className={styles.mobile_image_container}>

            <Image
              raised
              reveal
              className={styles.video}
              srcSet={`${img1} 1280w, ${img1} 2560w`}
              width={1280}
              height={800}
              placeholder={img1}
              alt=""
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            <Image
              raised
              reveal
              className={styles.video}
              srcSet={`${video} 1280w, ${video} 2560w`}
              width={1280}
              height={800}
              placeholder={video}
              alt=""
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
              </div>
          </>
        ) : (
          <ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage1}
                srcSet={
                  isDark
                    ? `${img2} 260w, ${img2} 520w`
                    : `${img2} 260w, ${img2} 520w`
                }
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? img2
                    : img2
                }
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className={styles.sidebarImage2}
                srcSet={
                  isDark
                    ? `${video} 260w, ${video} 520w`
                    : `${video} 260w, ${video} 520w`
                }
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? video
                    : video
                }
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionContent>
        )}
      </ProjectSection>

      <Footer />
    </>
  );
};
