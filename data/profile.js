// Central profile / "About" facts. Items flagged `placeholder: true` are
// waiting on info from Rohan — search for PLACEHOLDER to find them all.

export const profile = {
  name: 'Rohan Nalam',
  // PLACEHOLDER: confirm/replace tagline
  tagline: 'Builder · Dual-enrolled OSU student · Olentangy Berlin ’27',
  lede: [
    "I'm a high-school builder from Delaware, OH, dual-enrolled at Ohio State, ",
    "shipping developer tools and AI infrastructure. I like systems that turn ",
    "messy real-world data — logs, video, markets — into something clean and queryable.",
  ].join(''),
  email: 'rohannalam1@gmail.com',
  location: 'Delaware, OH',
  github: { label: 'github.com/rohannalam', href: 'https://github.com/rohannalam' },
  // PLACEHOLDER: add your LinkedIn URL
  linkedin: { label: 'add LinkedIn', href: '', placeholder: true },
  // Optional extra links — fill or delete
  links: [
    // { label: 'twitter/x', href: '' },
    // { label: 'résumé (pdf)', href: '' },
    // { label: 'devpost', href: '' },
  ],
};

// Rows rendered with dotted leader lines in the About section.
export const aboutRows = [
  { label: 'Location', value: 'Delaware, OH' },
  { label: 'School', value: 'Olentangy Berlin HS — Class of 2027' },
  { label: 'College', value: 'Dual-enrolled, Ohio State University' },
  { label: 'GPA', value: '3.92 unweighted · 4.47 weighted' },
  { label: 'Focus', value: 'AP CS A, AP Physics C, Calc BC, AP Stats' },
  { label: 'OSU coursework', value: 'Foundations 1, Linear Algebra, Calc 3, Eng. Statistics, Macroeconomics' },
  { label: 'Honors', value: 'AP Scholar with Distinction · pursuing 10+ AP exams' },
  { label: 'Interests', value: 'developer tools, AI infra, markets' },
];
