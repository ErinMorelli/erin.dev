declare global {
  interface Window {
    grecaptcha?: {
      render: (el: HTMLElement, props: Record<string, unknown>, inherit?: boolean) => string;
      execute: (id: string) => Promise<void>;
      reset: (id: string) => void;
      getResponse: (id: string) => string;
    };
    handleCaptchaLoaded: () => void;
  }
}

type BaseType<T> = {
  blurb?: string;
  content: Array<T>;
}

export type AboutType = BaseType<string>;

export type SkillType = {
  title: string;
  iconName: string;
};
export type SkillsType = BaseType<SkillType>;

export type ProjectType = {
  title: string;
  repo: string;
  description: string;
  link: string;
};
export type ProjectsType = BaseType<ProjectType>;

export type SocialType = {
  title: string;
  link: string;
  iconName: string;
};
export type SocialsType = BaseType<SocialType>;


