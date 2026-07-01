// Content for About cards, Tech Stack (with real logos), and the Experience list.
// Tech logos: devicon (multicolor) + simpleicons. Institution logos: Clearbit,
// with a lettered fallback badge if the image fails to load (see BrandLogo).

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
const SI = 'https://cdn.simpleicons.org/';
// Reliable real logos for schools/companies via Google's favicon service.
const fav = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const greeting = 'HI! MY NAME IS ROHAN.';

export const education = [
  {
    org: 'Olentangy Berlin High School',
    badge: 'OB',
    logo: fav('olentangy.k12.oh.us'),
    title: 'High School Diploma',
    detail: 'Class of 2027 · GPA 3.92 / 4.47W · AP Scholar w/ Distinction',
  },
  {
    org: 'Ohio State University',
    badge: 'OSU',
    logo: fav('osu.edu'),
    title: 'Dual-Enrolled Student',
    detail: 'Linear Algebra · Calc 3 · Engineering Statistics · Macroeconomics',
  },
];

export const awardsActivities = [
  { text: '2nd Place — Scrapyard Hackathon', logo: '', badge: 'S' },
  { text: '4th Place — NextHacks @ Carnegie Mellon', logo: fav('cmu.edu'), badge: 'CMU' },
  { text: 'AP Scholar with Distinction · pursuing 10+ AP exams', logo: fav('collegeboard.org'), badge: 'AP' },
];

export const techStack = [
  {
    group: 'Language', color: '#57d98a',
    items: [
      { n: 'Java', i: DEV + 'java/java-original.svg' },
      { n: 'Python', i: DEV + 'python/python-original.svg' },
      { n: 'JavaScript', i: DEV + 'javascript/javascript-original.svg' },
      { n: 'SQL (Postgres)', i: DEV + 'postgresql/postgresql-original.svg' },
      { n: 'HTML/CSS', i: DEV + 'html5/html5-original.svg' },
      { n: 'Bash', i: DEV + 'bash/bash-original.svg' },
    ],
  },
  {
    group: 'Libraries & Frameworks', color: '#b06bf0',
    items: [
      { n: 'NumPy', i: DEV + 'numpy/numpy-original.svg' },
      { n: 'Pandas', i: DEV + 'pandas/pandas-original.svg' },
      { n: 'Scikit-learn', i: DEV + 'scikitlearn/scikitlearn-original.svg' },
      { n: 'TensorFlow', i: DEV + 'tensorflow/tensorflow-original.svg' },
      { n: 'PyTorch', i: DEV + 'pytorch/pytorch-original.svg' },
      { n: 'React', i: DEV + 'react/react-original.svg' },
      { n: 'Node.js', i: DEV + 'nodejs/nodejs-original.svg' },
      { n: 'Next.js', i: DEV + 'nextjs/nextjs-original.svg' },
      { n: 'Django REST', i: DEV + 'django/django-plain.svg' },
      { n: 'Flask', i: DEV + 'flask/flask-original.svg' },
    ],
  },
  {
    group: 'ML & Data', color: '#f0b86b',
    items: [
      { n: 'OpenAI API', i: SI + 'openai' },
      { n: 'Claude API', i: SI + 'anthropic' },
      { n: 'Supervised / Unsupervised', i: '' },
      { n: 'Time-series', i: '' },
      { n: 'Feature engineering', i: '' },
    ],
  },
  {
    group: 'Tools', color: '#6bb6f0',
    items: [
      { n: 'Git', i: DEV + 'git/git-original.svg' },
      { n: 'REST APIs', i: '' },
      { n: 'Docker', i: DEV + 'docker/docker-original.svg' },
      { n: 'Postman', i: DEV + 'postman/postman-original.svg' },
      { n: 'Linux/Unix', i: DEV + 'linux/linux-original.svg' },
      { n: 'npm', i: DEV + 'npm/npm-original-wordmark.svg' },
      { n: 'Vercel', i: DEV + 'vercel/vercel-original.svg' },
      { n: 'MCP', i: '' },
    ],
  },
];

// Experience = clean vertical list (logo · org · Present/date · role).
export const experiences = [
  {
    org: 'Ohio State University',
    role: 'Dual-Enrolled Student · STEM coursework',
    logo: fav('osu.edu'), badge: 'OSU', present: true,
  },
  {
    org: 'AP Research — Independent Study',
    role: 'Author · Visor LLM-vs-advisor backtesting framework',
    logo: '', badge: 'V', date: '2025 – 2026',
  },
];
