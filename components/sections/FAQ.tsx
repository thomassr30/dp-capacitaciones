'use client';

import { useState } from 'react';

const faqs = [
  {
    question: '¿Cuáles son los requisitos para inscribirse?',
    answer:
      'Los requisitos varían según el curso. Para cursos básicos como SVB y Primeros Auxilios, no se requiere experiencia previa. Para cursos avanzados como VVP, se requiere ser profesional o técnico de la salud.',
  },
  {
    question: '¿Qué incluye el curso?',
    answer:
      'Todos nuestros cursos incluyen: material teórico descargable, práctica con simuladores y maniquíes, evaluación teórico-práctica, certificado digital y físico, y acceso a contenido de repaso por 6 meses.',
  },
  {
    question: '¿Ofrecen cursos in-company para empresas?',
    answer:
      'Sí, diseñamos programas a medida para empresas, brigadas de emergencia y organizaciones. Incluimos diagnóstico de brechas, logística in-situ y reportes para auditorías. Contacta a nuestro equipo comercial.',
  },
  {
    question: '¿Qué debo llevar el día del curso?',
    answer:
      'Trae ropa cómoda que permita movimiento (para prácticas en el suelo), calzado cerrado, agua y snacks. Nosotros proporcionamos todo el material médico y simuladores.',
  },
  {
    question: '¿Puedo reprogramar mi inscripción?',
    answer:
      'Sí, puedes reprogramar hasta 48 horas antes del inicio del curso sin costo adicional. Reprogramaciones con menos de 48 horas tienen un cargo del 20% del valor del curso.',
  },
  {
    question: '¿Tienen política de devolución?',
    answer:
      'Ofrecemos devolución del 100% si cancelas con más de 7 días de anticipación. Entre 7 y 3 días: 50% de devolución. Menos de 3 días: no hay devolución, pero puedes reprogramar.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Resuelve tus dudas antes de inscribirte
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
