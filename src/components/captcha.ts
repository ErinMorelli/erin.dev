import { getCaptchaUrl, SITE_KEY } from '../constants';

export default class Captcha {
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
      throw new Error('Unable to get reCaptcha token');
    }
    return token;
  };

  execute = async (captchaId: string) => {
    await window.grecaptcha.execute(captchaId);
    return await this.getToken(captchaId);
  };

  render = (elem: HTMLElement) =>
    window.grecaptcha.render(elem, {
      sitekey: SITE_KEY,
      size: 'invisible',
      badge: 'inline'
    }, true);

  reset = (captchaId: string) => window.grecaptcha.reset(captchaId);

  init = (fn: () => void) => {
    let script = document.createElement("script");
    window.handleCaptchaLoaded = fn;
    script.src = getCaptchaUrl('handleCaptchaLoaded');
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
