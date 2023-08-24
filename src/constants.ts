export const EmailJS = {
  USER_ID: import.meta.env.VITE_EMAILJS_USER_ID,
  KEY: import.meta.env.VITE_EMAILJS_KEY,
  TEMPLATE: import.meta.env.VITE_EMAILJS_TEMPLATE,
  SERVICE: import.meta.env.VITE_EMAILJS_SERVICE,
};

export const GITHUB_USERNAME = 'ErinMorelli';
export const GITHUB_LOGO_ROOT= `https://raw.githubusercontent.com/${GITHUB_USERNAME}`;
export const GITHUB_LOGO_PATH= 'mainline/logo.png';

export const SIMPLE_ICON_ROOT= 'https://cdn.simpleicons.org';

export const getGitHubLogo = (repo: string) =>
  `${GITHUB_LOGO_ROOT}/${repo}/${GITHUB_LOGO_PATH}`;

export const getSimpleIcon = (iconName: string) =>
  `${SIMPLE_ICON_ROOT}/${iconName}`;
