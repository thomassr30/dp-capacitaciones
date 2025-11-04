'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  span?: string; // Para hacer algunas imágenes más grandes
}

// Imágenes de ejemplo relacionadas con capacitación en salud
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    alt: 'Práctica de RCP en maniquí',
    category: 'Soporte Vital Básico',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    alt: 'Estudiantes en práctica de primeros auxilios',
    category: 'Primeros Auxilios',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    alt: 'Instructor enseñando técnicas de emergencia',
    category: 'Capacitación',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    alt: 'Práctica con desfibrilador DEA',
    category: 'Soporte Vital Básico',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=800&q=80',
    alt: 'Equipo de estudiantes en simulación',
    category: 'Trauma',
    span: 'md:col-span-2',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1581595220975-119360b2b1db?w=800&q=80',
    alt: 'Práctica de inmovilización',
    category: 'Inmovilización',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80',
    alt: 'Certificación de estudiantes',
    category: 'Certificaciones',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
    alt: 'Práctica de canalización venosa',
    category: 'Vías Venosas',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (imagesRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animación escalonada de las imágenes
      gsap.fromTo(
        imagesRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start',
            ease: 'power2.out',
          },
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="gallery-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Nuestras Capacitaciones
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experiencias reales de aprendizaje práctico con equipamiento
            profesional
          </p>
        </div>

        {/* Gallery Grid - Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              ref={addToRefs}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                image.span || ''
              }`}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Overlay with category */}
              <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/90 via-hero-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-lg mb-1">
                    {image.category}
                  </p>
                  <p className="text-gray-200 text-sm">{image.alt}</p>
                </div>
              </div>

              {/* Category Badge - Always visible */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                <span className="text-xs font-semibold text-primary">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after gallery */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            ¿Quieres ser parte de nuestra próxima capacitación?
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Ver Cursos Disponibles
          </a>
        </div>
      </div>
    </section>
  );
}
