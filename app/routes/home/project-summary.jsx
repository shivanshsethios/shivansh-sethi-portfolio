import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { deviceModels } from '~/components/model/device-models';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Image } from '~/components/image';
import { useTheme } from '~/components/theme-provider';
import video from `~/assets/fpv-racing-bg.png`
import imgSrc from "~/assets/Aiotize_logo_large.png"
import imgSrc2 from "~/assets/expo.png"
import imgSrc3 from "~/assets/iim-a.png"
import imgSrc4 from "~/assets/iim-b.png"
import { Transition } from '~/components/transition';
import { Loader } from '~/components/loader';
import { useWindowSize } from '~/hooks';
import { Suspense, lazy, useState } from 'react';
import { cssProps, media } from '~/utils/style';
import { useHydrated } from '~/hooks/useHydrated';
import katakana from './katakana.svg';
import styles from './project-summary.module.css';
import { DecoderText } from '~/components/decoder-text';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

const PitchEmbed = () => {
  return (
    <iframe
      src="https://pitch.com/embed-link/r9hetz"
      allow="fullscreen; clipboard-write"
      allowFullScreen
      width="100%"
      height="100%"
      style={{ border: 0 }}
    ></iframe>
  );
};

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  isVideo,
  index,
  title,
  description,
  model,
  katakanavisible,
  buttonText,
  buttonLink,
  imgsrc,
  alternate,
  knowmore,
  custom,
  customdivider,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(true);
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const isHydrated = useHydrated();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  function handleModelLoad() {
    setModelLoaded(true);
  }

  function renderkatakana(device, visible) {
    return (
      <svg
        type="project"
        data-visible={visible && modelLoaded}
        data-light={theme === 'light'}
        style={cssProps({ opacity: svgOpacity })}
        className={id === "aiotize" ? styles.svg_aiotize : styles.svg_fpv}
        data-device={device}
        viewBox="0 0 751 136"
      >
        <use href={id === "aiotize" ? `${katakana}#aiotize-project` : `${katakana}#aiotize-fpv`} />
      </svg>
    );
  }

  function renderDetails(visible, custom, customdivider) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <div className={styles.tagText} data-visible={visible}>
            <DecoderText text={id.startsWith('aiotize') ? (custom ? customdivider : "Aiotize") : "Drone Racing"} start={visible} delay={500} />
          </div>
        </div>
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        {knowmore && <div className={styles.button} data-visible={visible}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            <DecoderText text={buttonText} start={visible} delay={500} />
          </Button>
        </div>}
      </div>
    );
  }

  function renderPreview(visible, alternate, katakanavisible, imgsrc) {
    // console.log(katakanavisible)
    return (
      <div className={alternate ? styles.preview2 : styles.preview}>
        {model.type === 'laptop' && (
          <>
            {/* <div className={id.startsWith === "aiotize" ? styles.hero__content_image : styles.hero__content_image2}> */}
            <div
              className={
                id?.startsWith('aiotize')
                  ? id?.startsWith('aiotize-2')
                    ? styles.hero__content_image3
                    : styles.hero__content_image
                  : styles.hero__content_image2
              }
            >
              {
                id === "project-2" ? (
                  <Image
                    reveal
                    delay={100}
                    // className={styles.video}
                    srcSet={`${video} 1280w, ${video} 2560w`}
                    width={1280}
                    height={800}
                    placeholder={video}
                    alt=""
                    sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
                  />
                ) : (
                  <Image
                    reveal
                    delay={100}
                    placeholder={
                      imgsrc
                        ? imgsrc === '~/assets/expo.png'
                          ? imgSrc2
                          : imgsrc === '~/assets/iim-b.png'
                            ? imgSrc3
                            : imgSrc4
                        : imgSrc
                    }
                    srcSet={`${imgsrc
                        ? imgsrc === '~/assets/expo.png'
                          ? imgSrc2
                          : imgsrc === '~/assets/iim-b.png'
                            ? imgSrc3
                            : imgSrc4
                        : imgSrc
                      } 100w, ${imgsrc
                        ? imgsrc === '~/assets/expo.png'
                          ? imgSrc2
                          : imgsrc === '~/assets/iim-b.png'
                            ? imgSrc3
                            : imgSrc4
                        : imgSrc
                      } 20w`}
                    width={360}
                    height={1080}
                    alt=""
                  />
                )
              }
              { katakanavisible && renderkatakana('laptop', visible)}
            </div>
          </>
        )}
        {model.type === 'phone' && (
          <>
            {renderkatakana('phone', visible)}
            <div className={styles.model} data-device="phone">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                    showDelay={300}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.phone,
                        position: { x: -0.6, y: 1.1, z: 0 },
                        texture: {
                          ...model.textures[0],
                          sizes: phoneSizes,
                        },
                      },
                      {
                        ...deviceModels.phone,
                        position: { x: 0.6, y: -0.5, z: 0.3 },
                        texture: {
                          ...model.textures[1],
                          sizes: phoneSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Section
      className={id.startsWith('aiotize') ? styles.summary : styles.summary2}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div
        className={
          id?.startsWith('aiotize')
            ? id?.startsWith('aiotize-2')
              ? styles.content3
              : styles.content
            : styles.content2
        }
      >
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible, custom, customdivider)}
                  {renderPreview(visible, alternate, katakanavisible, imgsrc)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible, alternate, katakanavisible, imgsrc)}
                  {renderDetails(visible, custom, customdivider)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
