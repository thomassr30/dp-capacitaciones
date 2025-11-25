import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Hero from '@/components/sections/Hero';
import CoursesGrid from '@/components/sections/CoursesGrid';
import Gallery from '@/components/sections/Gallery';
import Methodology from '@/components/sections/Methodology';
import Testimonials from '@/components/sections/Testimonials';
import Companies from '@/components/sections/Companies';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'DL Capacitaciones',
    description: 'Capacitaciones certificadas en Soporte Vital Básico, Trauma, Primeros Auxilios y Emergencias',
    url: 'https://www.dlcapacitaciones.cl',
    logo: 'https://www.dlcapacitaciones.cl/logo.png',
    image: 'https://www.dlcapacitaciones.cl/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+56991487863',
      contactType: 'customer service',
      areaServed: 'CL',
      availableLanguage: 'Spanish',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '5000',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CLP',
      lowPrice: '65000',
      highPrice: '120000',
    },
  };

  const coursesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Course',
        name: 'Soporte Vital Básico (SVB)',
        description: 'Reconoce paro cardíaco, inicia RCP de alta calidad e integra DEA con seguridad',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'DL Capacitaciones',
          url: 'https://www.dlcapacitaciones.cl',
        },
        timeRequired: 'PT8H',
        educationalLevel: 'Profesional',
        inLanguage: 'es-CL',
        courseMode: 'Presencial',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: '65000',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Course',
        name: 'Trauma',
        description: 'Control de hemorragias, manejo inicial y evaluación rápida de pacientes con trauma',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'DL Capacitaciones',
          url: 'https://www.dlcapacitaciones.cl',
        },
        timeRequired: 'PT16H',
        educationalLevel: 'Profesional',
        inLanguage: 'es-CL',
        courseMode: 'Presencial',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: '95000',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Course',
        name: 'Inmovilización Selectiva',
        description: 'Técnicas de inmovilización, evaluación de lesiones y protocolos de seguridad',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'DL Capacitaciones',
          url: 'https://www.dlcapacitaciones.cl',
        },
        timeRequired: 'PT12H',
        educationalLevel: 'Profesional',
        inLanguage: 'es-CL',
        courseMode: 'Presencial',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: '80000',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Course',
        name: 'Primeros Auxilios',
        description: 'Atención inicial de emergencias, manejo de heridas, quemaduras y situaciones comunes',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'DL Capacitaciones',
          url: 'https://www.dlcapacitaciones.cl',
        },
        timeRequired: 'PT8H',
        educationalLevel: 'General',
        inLanguage: 'es-CL',
        courseMode: 'Presencial',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: '65000',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Course',
        name: 'Control de Hemorragias',
        description: 'Identificación de hemorragias, técnicas de control y uso correcto de torniquete',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'DL Capacitaciones',
          url: 'https://www.dlcapacitaciones.cl',
        },
        timeRequired: 'PT6H',
        educationalLevel: 'Profesional',
        inLanguage: 'es-CL',
        courseMode: 'Presencial',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: '70000',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Course',
        name: 'Canalización de Vías Venosas Periféricas',
        description: 'Asepsia, anatomía aplicada, técnica segura y prevención de complicaciones',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'DL Capacitaciones',
          url: 'https://www.dlcapacitaciones.cl',
        },
        timeRequired: 'PT12H',
        educationalLevel: 'Profesional',
        inLanguage: 'es-CL',
        courseMode: 'Presencial',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          price: '120000',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* JSON-LD Structured Data for SEO - Courses */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <CoursesGrid />
          <Gallery />
          <Methodology />
          <Testimonials />
          <Companies />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
