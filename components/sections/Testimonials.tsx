'use client';

import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Marcela Vallejos',
    role: '',
    company: '',
    quote:
      'Excelentes profesionales. 100% recomendados. Enseñan de manera clara, sencilla y práctica, lo que permite aplicar de inmediato los conocimientos en el área de la salud. Una experiencia de aprendizaje realmente valiosa.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    role: 'Paramédico',
    company: 'SAMU Metropolitano',
    quote:
      'Instructores con experiencia real que te enseñan lo que realmente importa en terreno.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Enfermera',
    company: 'Clínica Las Condes',
    quote:
      'El mejor curso de trauma que he tomado. Simulaciones muy realistas y feedback valioso.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-hero-dark to-[#0d1829] text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Lo que dicen nuestros alumnos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Historias reales de profesionales que elevaron su práctica clínica
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
