'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CourseDate {
  id: string;
  course: string;
  date: string;
  time: string;
  location: string;
  city: string;
  modality: string;
  price: string;
  availableSlots: number;
  totalSlots: number;
}

const courseDates: CourseDate[] = [
  {
    id: '1',
    course: 'Soporte Vital Básico',
    date: '15 Noviembre 2025',
    time: '09:00 - 18:00',
    location: 'Centro de Capacitación, Providencia',
    city: 'Santiago',
    modality: 'Presencial',
    price: '$85.000',
    availableSlots: 4,
    totalSlots: 20,
  },
  {
    id: '2',
    course: 'Trauma',
    date: '20 Noviembre 2025',
    time: '09:00 - 18:00',
    location: 'Centro de Capacitación, Las Condes',
    city: 'Santiago',
    modality: 'Presencial',
    price: '$120.000',
    availableSlots: 12,
    totalSlots: 15,
  },
  {
    id: '3',
    course: 'Primeros Auxilios',
    date: '22 Noviembre 2025',
    time: '14:00 - 18:00',
    location: 'Online + Práctica presencial',
    city: 'Valparaíso',
    modality: 'Mixta',
    price: '$65.000',
    availableSlots: 18,
    totalSlots: 25,
  },
  {
    id: '4',
    course: 'Control de Hemorragias',
    date: '25 Noviembre 2025',
    time: '09:00 - 15:00',
    location: 'Centro de Capacitación, Viña del Mar',
    city: 'Valparaíso',
    modality: 'Presencial',
    price: '$70.000',
    availableSlots: 8,
    totalSlots: 20,
  },
  {
    id: '5',
    course: 'Inmovilización Selectiva',
    date: '28 Noviembre 2025',
    time: '09:00 - 17:00',
    location: 'Centro de Capacitación, Providencia',
    city: 'Santiago',
    modality: 'Presencial',
    price: '$95.000',
    availableSlots: 2,
    totalSlots: 15,
  },
  {
    id: '6',
    course: 'Vías Venosas Periféricas',
    date: '02 Diciembre 2025',
    time: '09:00 - 18:00',
    location: 'Centro de Capacitación, Concepción',
    city: 'Concepción',
    modality: 'Presencial',
    price: '$110.000',
    availableSlots: 10,
    totalSlots: 12,
  },
];

export default function Calendar() {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');

  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Sticky filters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80px',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(filtersRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            duration: 0.3,
          });
        },
        onLeaveBack: () => {
          gsap.to(filtersRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            backdropFilter: 'blur(0px)',
            boxShadow: 'none',
            duration: 0.3,
          });
        },
      });

      // Cards animation
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredDates = courseDates.filter((date) => {
    const courseMatch =
      selectedCourse === 'all' || date.course === selectedCourse;
    const cityMatch = selectedCity === 'all' || date.city === selectedCity;
    const modalityMatch =
      selectedModality === 'all' || date.modality === selectedModality;
    return courseMatch && cityMatch && modalityMatch;
  });

  const uniqueCourses = Array.from(
    new Set(courseDates.map((d) => d.course))
  ).sort();
  const uniqueCities = Array.from(
    new Set(courseDates.map((d) => d.city))
  ).sort();
  const uniqueModalities = Array.from(
    new Set(courseDates.map((d) => d.modality))
  ).sort();

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="calendario"
      ref={sectionRef}
      className="py-20 bg-white relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Próximas Fechas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra el curso que necesitas y reserva tu cupo
          </p>
        </div>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="sticky top-20 z-40 bg-white rounded-xl p-6 mb-8 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Course Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Curso
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="all">Todos los cursos</option>
                {uniqueCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ciudad
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="all">Todas las ciudades</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Modality Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modalidad
              </label>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="all">Todas las modalidades</option>
                {uniqueModalities.map((modality) => (
                  <option key={modality} value={modality}>
                    {modality}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Dates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDates.length > 0 ? (
            filteredDates.map((courseDate) => {
              const slotsPercentage =
                (courseDate.availableSlots / courseDate.totalSlots) * 100;
              const isLowSlots = courseDate.availableSlots <= 5;

              return (
                <div
                  key={courseDate.id}
                  ref={addToRefs}
                  className="bg-background rounded-xl p-6 border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {courseDate.course}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {courseDate.modality}
                        </span>
                        {isLowSlots && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium animate-pulse">
                            Últimos cupos
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">
                        {courseDate.price}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">{courseDate.date}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{courseDate.time}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <span>{courseDate.location}</span>
                    </div>
                  </div>

                  {/* Slots Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Cupos disponibles</span>
                      <span className="font-semibold text-foreground">
                        {courseDate.availableSlots} de {courseDate.totalSlots}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isLowSlots ? 'bg-accent' : 'bg-secondary'
                        }`}
                        style={{ width: `${slotsPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                      Certificado al finalizar
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Material descargable
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg">
                      Inscribirme
                    </button>
                    <button className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all">
                      Más info
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">
                No hay fechas disponibles con los filtros seleccionados
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
