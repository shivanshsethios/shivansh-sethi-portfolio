import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import styles from './contact.module.css';
import emailjs from '@emailjs/browser';
import InlineComponent from './InlineComponent';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export const Contact = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [sending, setSending] = useState(false)
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const { state } = useNavigation();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true)
    emailjs
      .sendForm('service_lozxotf', 'template_br5betm', form.current, {
        publicKey: 'kRZ7SrqYPPfbRmMD7',
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
              I’ll get back to you within a couple days, sit tight
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
                className={styles.button2}
                data-status={status}
                data-sending={sending}
                style={getDelay(tokens.base.durationM, initDelay)}
                disabled={sending}
                loading={sending}
                loadingText="Sending..."
                icon="send"
                type="submit"
              >
                <InlineComponent />
              </Button>
            </Form>
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
