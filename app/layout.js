import './globals.css';
import { DM_Sans, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import { profile } from '@/data/profile';
import TiltCards from '@/components/TiltCards';

const sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-src',
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mono',
});

// Pixel/voxel font — reserved JUST for the hero name (.hero-name).
const pixel = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-pixel-src',
});

export const metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable} ${pixel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        {children}
        <TiltCards />
      </body>
    </html>
  );
}
