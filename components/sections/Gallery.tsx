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

// Imágenes de capacitación en salud
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/img1.webp',
    alt: 'Práctica de RCP en maniquí',
    category: 'Soporte Vital Básico',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: '2',
    src: '/img2.webp',
    alt: 'Estudiantes en práctica de primeros auxilios',
    category: 'Primeros Auxilios',
  },
  {
    id: '3',
    src: '/img3.webp',
    alt: 'Instructor enseñando técnicas de emergencia',
    category: 'Capacitación',
  },
  {
    id: '6',
    src: '/img6.webp',
    alt: 'Equipo de estudiantes en simulación',
    category: 'Trauma',
  },
  {
    id: '7',
    src: '/img7.webp',
    alt: 'Control de hemorragia',
    category: 'Control de Hemorragia',
    span: 'md:col-span-2',
  },
  {
    id: '5',
    src: '/img5.webp',
    alt: 'Práctica de canalización venosa',
    category: 'Vías Venosas',
    span: 'md:row-span-2',
  },
  {
    id: '8',
    src: '/img8.webp',
    alt: 'Técnicas de inmovilización',
    category: 'Inmovilización',
  },
  {
    id: '9',
    src: '/img9.webp',
    alt: 'Práctica de inmovilización',
    category: 'Inmovilización',
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
      // Animación del título con efecto más dramático
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animación escalonada más llamativa con rotación y escala
      gsap.fromTo(
        imagesRef.current,
        {
          opacity: 0,
          scale: 0.7,
          y: 60,
          rotation: -5,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: 'random',
            ease: 'power2.out',
          },
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Animación continua de flotación para las imágenes
      imagesRef.current.forEach((img, index) => {
        gsap.to(img, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 2 + (index * 0.2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1,
        });
      });
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

        {/* Gallery Grid - Dynamic Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              ref={addToRefs}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                image.span || ''
              }`}
            >
              {/* Image */}
              <div className="w-full h-full overflow-hidden bg-gray-200 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Dark overlay - Always visible with transparency */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 group-hover:from-primary/80 group-hover:via-primary/40 group-hover:to-transparent transition-all duration-500"></div>

              {/* Overlay with category - Shows on hover */}
              <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
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
