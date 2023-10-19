import { getCaptchaUrl, SITE_KEY } from '../constants';

export default class Captcha {
  static CLASS_NAME = 'g-recaptcha-response';

  isLoaded = ()  =>
    typeof window !== 'undefined' && typeof window.grecaptcha !== 'undefined';

  getToken = async (captchaId: string) => {
    const getToken = () => window.grecaptcha.getResponse(captchaId);

    let tries = 5;
    let token = getToken();

    const waitTilNotNull = async () => {
      while (token === '' && tries > 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, 100)
        });
        tries -= 1;
        token = getToken();
      }
    };

    await waitTilNotNull();

    if (token === '') {
      throw new Error('Unable to get reCAPTCHA token');
    }
    return token;
  };

  execute = async (captchaId: string) => {
    await window.grecaptcha.execute(captchaId);
    return await this.getToken(captchaId);
  };

  render = (elem: HTMLElement): string => {
    const captchaId = window.grecaptcha.render(elem, {
      sitekey: SITE_KEY,
      size: 'invisible',
      badge: 'inline'
    }, true);
    const ariaElem = elem.getElementsByClassName(Captcha.CLASS_NAME).item(0);
    ariaElem.setAttribute('aria-hidden', 'true');
    ariaElem.setAttribute('aria-label', 'reCAPTCHA');
    return captchaId;
  }

  reset = (captchaId: string) => window.grecaptcha.reset(captchaId);

  init = (fn: () => void) => {
    const script = document.createElement("script");
    window.handleCaptchaLoaded = fn;
    script.src = getCaptchaUrl('handleCaptchaLoaded');
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
