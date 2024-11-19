import config from '~/config.json';

export const navLinks = [
  {
    label: 'Aiotize',
    pathname: '/#aiotize',
  },
  {
    label: 'About Me',
    pathname: '/#aboutme',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Linkedin',
    url: `https://www.linkedin.com/in/${config.linkedin}`,
    icon: 'linkedin',
  },
  {
    label: 'Facebook',
    url: `https://www.facebook.com/${config.facebook}`,
    icon: 'facebook',
  },
  {
    label: 'X',
    url: `https://x.com/${config.x}`,
    icon: 'x',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];