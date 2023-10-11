import { JSX } from 'preact';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'preact/compat';
import { send } from '@emailjs/browser';
import { EmailJS } from '../constants';
import Captcha from './captcha';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const captcha = new Captcha();

  const buttonTimeout = 2000;
  const defaultButtonText = 'Send';
  const defaultFormValues: ContactFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  }

  const captchaRef = useRef<HTMLDivElement>();

  const [captchaId, setCaptchaId] = useState<string|null>(null);
  const [buttonText, setButtonText] = useState<JSX.Element|string>(defaultButtonText);
  const [isSending, setIsSending] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>(defaultFormValues);

  const captchaReady = useMemo(
    () => captcha.isLoaded() && captchaId !== null,
    [captchaId]
  );

  const resetForm = () => {
    if (captchaReady) { captcha.reset(captchaId); }
    setIsSending(false);
    setTimeout(() => setButtonText(defaultButtonText), buttonTimeout);
  }

  const handleOnInput = (inputName: keyof ContactFormValues) =>
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => {
      setFormValues({
        ...formValues,
        [inputName]: currentTarget.value
      });
    };

  const errorHandler = () => {
    setButtonText(<>Not sent! <i class="icon-attention-circled" /></>);
    resetForm();
  };

  const successHandler = () => {
    setFormValues({...defaultFormValues});
    setButtonText(<>Sent! <i class="icon-ok-circled" /></>);
    resetForm();
  };

  const handleOnSubmit = (e: Partial<Event>) => {
    e.preventDefault();
    if (!captchaReady) { return; }

    setIsSending(true);
    setButtonText(<>Sending <i class="icon-spin5 animate-spin" /></>);

    captcha.execute(captchaId).then((token) => {
      const params = {
        ...formValues,
        [Captcha.CLASS_NAME]: token
      };

      send(EmailJS.SERVICE, EmailJS.TEMPLATE, params, EmailJS.USER_ID)
        .then((res) => {
          if (res.status !== 200) {
            console.debug(res);
            errorHandler();
          } else {
            successHandler();
          }
        })
        .catch((err) => {
          console.debug(err);
          errorHandler();
        });
    });
  };

  const handleCaptchaLoaded = useCallback(
    () => {
      if (captcha.isLoaded() && captchaId === null) {
        const cid = captcha.render(captchaRef.current);
        setCaptchaId(cid);
      }
    },
    [captchaId]
  );

  useEffect(() => {
    captcha.init(handleCaptchaLoaded);
  }, []);

  return (
    <form id="contact-form" onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="firstName" class="sr-only">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name*"
          value={formValues.firstName}
          onInput={handleOnInput('firstName')}
          disabled={isSending}
          autocomplete="given-name"
          aria-required={true}
          required
        />
        <label htmlFor="lastName" class="sr-only">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name*"
          value={formValues.lastName}
          onInput={handleOnInput('lastName')}
          disabled={isSending}
          autocomplete="family-name"
          aria-required={true}
          required
        />
        <label htmlFor="email" class="sr-only">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email*"
          value={formValues.email}
          onInput={handleOnInput('email')}
          disabled={isSending}
          autocomplete="email"
          aria-required={true}
          required
        />
      </div>
      <div>
        <label htmlFor="message" class="sr-only">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="Message*"
          value={formValues.message}
          onInput={handleOnInput('message')}
          disabled={isSending}
          autocomplete="off"
          aria-required={true}
          required
        />
        <button
          type="submit"
          class="button inverse"
          disabled={isSending || !captchaReady}
        >
          {buttonText}
        </button>
        <div ref={captchaRef} class="g-recaptcha" />
      </div>
    </form>
  );
}
