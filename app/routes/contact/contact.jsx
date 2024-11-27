import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useNavigation } from '@remix-run/react';
import styles from './contact.module.css';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';
import WhatsAppButton from '~/components/WhatsAppButton';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

export const Contact = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [sending, setSending] = useState(false)
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const { state } = useNavigation();
  const form = useRef();

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
      url: 'https://calendly.com/aiotize',
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true)
    emailjs
      .sendForm('service_jh0nhxx', 'template_vvw35vq', form.current, {
        publicKey: '-68U5QIzJFIJcISYG',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setEmailSent(true);
          setSending(false)
        },
        (error) => {
          console.log('FAILED...', error.text);
          setSending(false)
        },
      );
  };

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!emailSent} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            unstable_viewTransition
            className={styles.form}
            ref={form}
            onSubmit={sendEmail}
          >
            {/* <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            /> */}
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="user_email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              <DecoderText delay={800} text={'Send Message'} />
            </Button>
          </Form>
        )}
      </Transition>
      <Transition unmount in={emailSent}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you ASAP
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Transition unmount in={true} timeout={1600}>
        {({ status, nodeRef }) => (
          <>
            <Form
              className={styles.form2}
            >
              <Divider
                className={styles.divider}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
              />
              <Heading
                className={styles.title}
                data-status={status}
                level={3}
                as="h1"
                style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
              >
                <DecoderText text="Book a Meeting" start={status !== 'exited'} delay={300} />
              </Heading>
              <Button
                className={`${styles.button2} btn-inline`}
                data-status={status}
                data-sending={false}
                style={getDelay(tokens.base.durationM, initDelay)}
                disabled={false}
                loading={false}
                loadingText="Sending..."
                icon="send"
                onClick={handleClick}
                type="submit"
              >
                <DecoderText delay={0} text="Use Calendly" />
              </Button>
            </Form>
            <WhatsAppButton />
          </>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
