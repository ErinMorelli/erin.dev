import { useState } from 'preact/compat';
import { JSX } from 'preact';
import { send } from '@emailjs/browser';
import { EmailJS } from '../constants';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const buttonTimeout = 2000;
  const defaultButtonText = 'Send';
  const defaultFormValues: ContactFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  const [buttonText, setButtonText] = useState<JSX.Element|string>(defaultButtonText);
  const [isSending, setIsSending] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>(defaultFormValues);

  const resetForm = () => {
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

    setIsSending(true);
    setButtonText(<>Sending <i class="icon-spin5 animate-spin" /></>);

    send(EmailJS.SERVICE, EmailJS.TEMPLATE, formValues, EmailJS.USER_ID)
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
  };

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
          required
        />
        <button
          type="submit"
          class="button inverse"
          disabled={isSending}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
