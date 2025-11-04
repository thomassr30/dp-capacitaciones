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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Centro de Capacitación en Salud',
    description: 'Capacitaciones certificadas en Soporte Vital Básico, Trauma, Primeros Auxilios y Emergencias',
    url: 'https://centrocapacitacionsalud.cl',
    logo: 'https://centrocapacitacionsalud.cl/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+56-9-XXXX-XXXX',
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

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
