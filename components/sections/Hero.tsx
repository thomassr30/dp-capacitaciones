'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const vectorsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ecgLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title animation - split by words with stagger
      if (titleRef.current) {
        const words = titleRef.current.textContent?.split(' ') || [];
        titleRef.current.innerHTML = words
          .map((word) => `<span class="inline-block opacity-0">${word}</span>`)
          .join(' ');

        tl.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        });
      }

      // Subtitle animation
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        '-=0.4'
      );

      // CTA buttons animation - usando fromTo para asegurar que terminen visibles
      tl.fromTo(
        ctaRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
        },
        '-=0.4'
      );

      // Parallax effect on scroll
      if (heroRef.current) {
        // Background layer - slowest
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Vectors layer - medium speed
        gsap.to(vectorsRef.current, {
          yPercent: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Image layer - faster with subtle scale
        gsap.to(imageRef.current, {
          yPercent: 20,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Scroll indicator animation - infinite yoyo
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // ECG Heartbeat Animation - Línea que se dibuja constantemente con latidos
      if (ecgLineRef.current) {
        // Animación continua: la línea se dibuja de derecha a izquierda constantemente
        // Duración más lenta para simular ritmo cardíaco real (~60-80 BPM)
        gsap.to(ecgLineRef.current, {
          strokeDashoffset: 0,
          duration: 6, // 6 segundos para dibujar toda la línea (más lento y realista)
          ease: 'none',
          repeat: -1,
          onRepeat: () => {
            // Cuando termina de dibujar, reinicia desde el inicio
            gsap.set(ecgLineRef.current, { strokeDashoffset: 2000 });
          },
        });

        // Efecto de brillo/pulso cuando pasa por cada latido
        // Se sincroniza con la animación de dibujo
        gsap.to(ecgLineRef.current, {
          filter: 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.8)) drop-shadow(0 0 5px rgba(14, 165, 233, 0.5))',
          duration: 0.15,
          repeat: -1,
          repeatDelay: 1.05, // Pausa entre pulsos (ajustado para ~60 BPM)
          yoyo: true,
          ease: 'power2.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-hero-dark via-[#0d1829] to-[#0B1220]"
        style={{ willChange: 'transform' }}
      />

      {/* Vectors/Pattern Layer - ECG Lines */}
      <div
        ref={vectorsRef}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        {/* Animated ECG Heartbeat Line - Una sola línea centrada con latidos */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* ECG Line Única - Centrada verticalmente - Responsive */}
          <svg
            className="absolute w-full h-48 sm:h-40 md:h-32"
            viewBox="0 0 1200 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="1" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.6" />
              </linearGradient>
              <filter id="ecgGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Línea isoeléctrica (horizontal) con latidos del corazón */}
            <path
              ref={ecgLineRef}
              fill="none"
              stroke="url(#ecgGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ecgGlow)"
              d="M0,50 L150,50 L160,50 L165,48 L170,50 L175,35 L180,65 L185,50 L190,49 L195,50 L350,50 L360,50 L365,48 L370,50 L375,35 L380,65 L385,50 L390,49 L395,50 L550,50 L560,50 L565,48 L570,50 L575,35 L580,65 L585,50 L590,49 L595,50 L750,50 L760,50 L765,48 L770,50 L775,35 L780,65 L785,50 L790,49 L795,50 L950,50 L960,50 L965,48 L970,50 L975,35 L980,65 L985,50 L990,49 L995,50 L1200,50"
              className="sm:stroke-[3] md:stroke-[2.5]"
              style={{
                strokeDasharray: '2000',
                strokeDashoffset: '2000',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Image Layer */}
      <div
        ref={imageRef}
        className="absolute inset-0 bg-gradient-to-t from-hero-dark/80 via-hero-dark/40 to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
              Certificación oficial
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
              Modalidad presencial y mixta
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
              +5,000 profesionales formados
            </div>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Capacitaciones en Soporte Vital y Emergencias
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Cursos certificados, instructores clínicos, metodologías hands-on.
            Entrena habilidades críticas. Responde mejor.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#cursos"
              className="group px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-accent/50 w-full sm:w-auto"
            >
              Ver cursos
              <svg
                className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <button
              onClick={() => {
                const phoneNumber = '56912345678'; // Reemplazar con el número real
                const message = 'Hola, quisiera cotizar capacitaciones para mi empresa';
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 border border-white/30 w-full sm:w-auto"
            >
              Cotizar para empresas
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white/60 cursor-pointer">
          <span className="text-sm mb-2">Descubre más</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
