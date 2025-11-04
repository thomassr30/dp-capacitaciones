'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Company {
  id: string;
  name: string;
  logo: string;
}

// Lista completa de empresas que han confiado en las capacitaciones
const allCompanies: Company[] = [
  {
    id: '1',
    name: 'Hospital Clínico Universidad de Chile',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=Hospital+UC',
  },
  {
    id: '2',
    name: 'Clínica Las Condes',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=Clinica+LC',
  },
  {
    id: '3',
    name: 'Cruz Roja Chilena',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=Cruz+Roja',
  },
  {
    id: '4',
    name: 'Mutual de Seguridad',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=Mutual',
  },
  {
    id: '5',
    name: 'ACHS',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=ACHS',
  },
  {
    id: '6',
    name: 'IST',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=IST',
  },
  {
    id: '7',
    name: 'Bomberos de Chile',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=Bomberos',
  },
  {
    id: '8',
    name: 'Minera Escondida',
    logo: 'https://via.placeholder.com/200x100/0EA5E9/FFFFFF?text=Minera',
  },
];

// Función para seleccionar 4 empresas aleatorias
function getRandomCompanies(companies: Company[], count: number): Company[] {
  const shuffled = [...companies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  // Seleccionar 4 empresas aleatorias al montar el componente
  useEffect(() => {
    setCompanies(getRandomCompanies(allCompanies, 4));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (logosRef.current.length === 0) return;

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

      // Animación de los logos con stagger
      gsap.fromTo(
        logosRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [companies]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !logosRef.current.includes(el)) {
      logosRef.current.push(el);
    }
  };

  return (
    <section
      id="empresas"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="companies-grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#companies-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Confían en Nosotros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresas e instituciones que han capacitado a sus equipos con
            nosotros
          </p>
        </div>

        {/* Companies Grid - Solo 4 empresas aleatorias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.id}
              ref={addToRefs}
              className="group bg-background rounded-xl p-6 flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 aspect-video"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
