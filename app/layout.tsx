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
  metadataBase: new URL("https://www.dlcapacitaciones.cl/"),
  title: {
    default: "DL Capacitaciones",
    template: "%s | DL Capacitaciones",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  description:
    "Capacitaciones de Soporte Vital Básico (SVB), Trauma, Primeros Auxilios y Emergencias. Instructores expertos, metodología hands-on y práctica. Cursos presenciales.",
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
  authors: [{ name: "DL Capacitaciones" }],
  creator: "DL Capacitaciones",
  publisher: "DL Capacitaciones",
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
    url: "https://www.dlcapacitaciones.cl/",
    site_name: "DL Capacitaciones",
    siteName: "DL Capacitaciones",
    title: "DL Capacitaciones | Cursos Certificados SVB, Trauma y Emergencias",
    description:
      "Capacitaciones de Soporte Vital Básico (SVB), Trauma, Primeros Auxilios y Emergencias. Cursos presenciales.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DL Capacitaciones | Cursos Certificados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DL Capacitaciones | Cursos Certificados SVB, Trauma y Emergencias",
    description:
      "Capacitaciones de Soporte Vital Básico, Trauma, Primeros Auxilios y Emergencias. +5,000 profesionales formados.",
    images: ["/og-image.jpg"],
    creator: "@dlcapacitaciones",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://www.dlcapacitaciones.cl",
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
