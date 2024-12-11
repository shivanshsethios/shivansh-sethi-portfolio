import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import client from './SanityClient';
import { Image } from '~/components/image';
import imageUrlBuilder from '@sanity/image-url';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from '~/hooks';
import { Link as RouterLink, useLoaderData } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { formatDate } from '~/utils/date';
import { classes, cssProps } from '~/utils/style';
import styles from './articles.module.css';

function truncate(length, input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const words = input.split(/\s+/);
  if (words.length <= length) {
    return input;
  }

  return words.slice(0, length).join(' ') + '...';
}

const builder = imageUrlBuilder(client);

const urlFor = (source) => builder.image(source);

function ArticlesPost({ index, post }) {
  const [hovered, setHovered] = useState(false);
  const banner = './2022-01-06.jpg'
  const [dateTime, setDateTime] = useState(null);
  const reduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  let {
    featured,
    _createdAt: createdAt,
    _rev: revision,
    _id: id,
    slug,
    image: {
      _type: imageType,
      asset: { _ref: imageRef, _type: assetType } = {}
    } = {},
    publishedAt,
    _type: postType,
    link,
    body,
    title,
    _updatedAt: updatedAt
  } = post || {};

  if (featured) {
    body = truncate(55, body);
    title = truncate(10, title);
  }

  useEffect(() => {
    setDateTime(formatDate(publishedAt));
  }, [publishedAt, dateTime]);

  const imageUrl = imageRef ? urlFor({ _type: 'image', asset: { _ref: imageRef } }).url() : banner;

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Featured
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={imageUrl}
            alt=""
            role="presentation"
          />
        </div>
      )}
      {
        link ? (
          <RouterLink
            unstable_viewTransition
            prefetch="intent"
            to={link}
            target='_blank'
            className={styles.postLink}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.postDetails}>
              <div aria-hidden className={styles.postDate}>
                <Divider notchWidth="64px" notchHeight="8px" />
                {`${dateTime} | ${slug}`}
              </div>
              {!featured && <>
                <div className={styles.article_container}>
                  <div className={styles.article_container_image}>
                    <div className={styles.article_inner_container_image}>
                      <img src={imageUrl} className={styles.article_image} />
                    </div>
                  </div>
                  <div className={styles.article_container_content}>
                    <Heading as="h2" level={featured ? 2 : 4}>
                      {title}
                    </Heading>
                    <Text size={featured ? 'l' : 's'} as="p">
                      {body}
                    </Text>
                  </div>
                </div>
              </>
              }
              {
                featured && <>
                  <Heading as="h2" level={featured ? 2 : 4}>
                    {title}
                  </Heading>
                  <Text size={featured ? 'l' : 's'} as="p">
                    {body}
                  </Text>
                </>}
              <div className={styles.postFooter}>
                <Button secondary iconHoverShift icon="chevron-right" as="div">
                  {slug === "Video" ? "Watch Video" : "Read article"}
                </Button>
              </div>
            </div>
          </RouterLink>
        ) : (
          <div
            unstable_viewTransition
            prefetch="intent"
            className={styles.postLink}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.postDetails}>
              <div aria-hidden className={styles.postDate}>
                <Divider notchWidth="64px" notchHeight="8px" />
                {`${dateTime} | ${slug}`}
              </div>
              {!featured && <>
                <div className={styles.article_container}>
                  <div className={styles.article_container_image}>
                    <div className={styles.article_inner_container_image}>
                      <img src={imageUrl} className={styles.article_image} />
                    </div>
                  </div>
                  <div className={styles.article_container_content}>
                    <Heading as="h2" level={featured ? 2 : 4}>
                      {title}
                    </Heading>
                    <Text size={featured ? 'l' : 's'} as="p">
                      {body}
                    </Text>
                  </div>
                </div>
              </>
              }
              {
                featured && <>
                  <Heading as="h2" level={featured ? 2 : 4}>
                    {title}
                  </Heading>
                  <Text size={featured ? 'l' : 's'} as="p">
                    {body}
                  </Text>
                </>}
            </div>
          </div>
        )
      }
    </article>
  );
}

function SkeletonPost({ index }) {
  return (
    <article
      aria-hidden="true"
      className={classes(styles.post, styles.skeleton)}
      data-featured="false"
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Coming soon...
          </div>
          <Heading
            className={styles.skeletonBone}
            as="h2"
            level={4}
            style={{ height: 24, width: '70%' }}
          />
          <Text
            className={styles.skeletonBone}
            size="s"
            as="p"
            style={{ height: 90, width: '100%' }}
          />
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              Read more
            </Button>
            <Text className={styles.timecode} size="s">
              00:00:00:00
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Articles() {
  const { width } = useWindowSize();
  const [posts, setPosts] = useState([])
  const [featuredPostb, setFeaturedPost] = useState({})
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;
  useEffect(() => {
    client
      .fetch('*[_type == "post"]')
      .then((data) => {
        const featuredPosta = data.filter(post => post.featured);
        const posts = data.filter(post => !post.featured);
        const sortedPosts = posts.sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB - dateA;
        });
        setPosts(sortedPosts)
        setFeaturedPost(featuredPosta[0])
      })
      .catch(console.error);
  }, []);

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={5} as="h1">
        <DecoderText text="Latest articles" />
      </Heading>
      <Barcode className={styles.barcode} />
    </header>
  );

  const postList = (
    <div className={styles.list}>
      {!isSingleColumn && postsHeader}

      {posts.map((post, index) => (
        <ArticlesPost key={index} index={index} post={post} />
      ))}
      {Array(1)
        .fill()
        .map((skeleton, index) => (
          <SkeletonPost key={index} index={index} />
        ))}
    </div>
  );

  const featuredPost = <ArticlesPost index={1} post={featuredPostb} />;

  return (
    <article className={styles.articles}>
      <Section className={styles.content}>
        {!isSingleColumn && (
          <div className={styles.grid}>
            {postList}
            {featuredPost}
          </div>
        )}
        {isSingleColumn && (
          <div className={styles.grid}>
            {postsHeader}
            {featuredPost}
            {postList}
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
}

function Barcode({ className }) {
  return (
    <svg
      className={className}
      width="153"
      height="20"
      fill="currentColor"
      viewBox="0 0 153 20"
    >
      <path
        fillOpacity=".6"
        d="M153 0v20h-2V0h2Zm-4 0v20h-4V0h4Zm-6 0v20h-2V0h2Zm-4 4v3h-2V4h2Zm-5 0V0h3v4h-3Zm-2 0h2v6h-2V4Zm0 0h-2V0h2v4Zm-4-4v4h-4v5h-2v4h-5V9h3V6h-5V0h13Zm-11 13v3h-2v-3h2Zm-4-13v6h-2v4h2v4h-2v2h2v4h-4V0h4Zm-6 4V0h-2v4h2Zm-1 6V7h-4V4h-2V0h-2v4h-2V0H86v4h-2v3h-2v2h-2v4h6v3h-2v4h6v-4h-2v-3h-2V9h-2V7h4V4h3v9h2v7h7v-4h-5v-3h-2V9h2V7h3v3h2v4h6v-4ZM74 7v3h-2v2h2v8h-4V0h8v5h-3V4h-3v3h2Zm28 13h4v-4h-4v4Zm28-6v-4h-2v6h2v4h2v-6h-2Zm9 2v-6h-2v6h-2v4h4v-4Zm-12 4v-4h-4v4h4ZM0 20h2V0H0v20Zm4 0h4V0H4v20Zm6 0h2V0h-2v20Zm5 0h7V0h-7v20Zm12 0h-3V0h3v20Zm5 0h3v-4h5v-6h-5V6h7V3h3V0h-7v3h-3V0h-3v20ZM52 3v3h-3v3h-4V6h1V3h6Zm23 13h6v4h-6v-4Zm-29-6v3h3v-3h3v3h-2v6h-3v-3h-2v-3h-2v-3h3Zm8 6v3h-2v-3h2Zm3 0v3h2v-3h2v-3h-2v3h-2Zm0 0v-6h-3v6h3Zm4-7V6h2V0h-2v6h-2v3h2Zm5-3v3h-2V6h2Zm2 0h-2V3h2v3Zm-9-3V0h-2v3h2Z"
      />
    </svg>
  );
}
