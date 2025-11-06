import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://centrocapacitacionsalud.cl"),
  title: {
    default: "DL Capacitaciones",
    template: "%s | DL Capacitaciones",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
  },
  description:
    "Capacitaciones certificadas en Soporte Vital Básico (SVB), Trauma, Primeros Auxilios y Emergencias. Instructores clínicos expertos, metodología hands-on y práctica. Más de 5,000 profesionales formados. Cursos presenciales y mixtos en Santiago, Valparaíso y Concepción.",
  keywords: [
    "capacitación en salud",
    "soporte vital básico",
    "SVB Chile",
    "curso SVB",
    "primeros auxilios Chile",
    "curso trauma",
    "RCP certificado",
    "DEA capacitación",
    "cursos certificados salud",
    "TENS capacitación",
    "paramédico curso",
    "enfermería emergencias",
    "control hemorragias",
    "inmovilización selectiva",
    "vías venosas periféricas",
    "canalización VVP",
    "curso primeros auxilios Santiago",
    "capacitación emergencias médicas",
    "instructor clínico",
    "certificación profesional salud",
  ],
  authors: [{ name: "Centro de Capacitación en Salud" }],
  creator: "Centro de Capacitación en Salud",
  publisher: "Centro de Capacitación en Salud",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://centrocapacitacionsalud.cl",
    siteName: "Centro de Capacitación en Salud",
    title:
      "Centro de Capacitación en Salud | Cursos Certificados SVB, Trauma y Emergencias",
    description:
      "Capacitaciones certificadas en Soporte Vital Básico (SVB), Trauma, Primeros Auxilios y Emergencias. Más de 5,000 profesionales formados. Cursos presenciales y mixtos.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Centro de Capacitación en Salud - Cursos Certificados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Centro de Capacitación en Salud | Cursos Certificados SVB, Trauma y Emergencias",
    description:
      "Capacitaciones certificadas en Soporte Vital Básico, Trauma, Primeros Auxilios y Emergencias. +5,000 profesionales formados.",
    images: ["/og-image.jpg"],
    creator: "@centrocapacitacion",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://centrocapacitacionsalud.cl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
