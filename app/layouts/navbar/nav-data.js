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
    label: 'X',
    url: `https://x.com/shivanshsethi13`,
    icon: 'x',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
