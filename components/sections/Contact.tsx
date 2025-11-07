'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Función para capitalizar cada palabra (Primera letra mayúscula)
  const capitalizeWords = (text: string): string => {
    return text
      .split(' ')
      .map(word => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir el mensaje de WhatsApp con los datos del formulario
    const phoneNumber = '56991477863';

    // Formatear datos antes de enviar
    const formattedName = capitalizeWords(formData.name.trim());
    const formattedEmail = formData.email.toLowerCase().replace(/\s+/g, '');
    const formattedPhone = formData.phone.trim();

    // Mapear el subject a texto legible
    const subjectMap: { [key: string]: string } = {
      general: 'Consulta general',
      courses: 'Información sobre cursos',
      enterprise: 'Capacitación empresas',
      certification: 'Certificación',
      other: 'Otro',
    };

    // Construir mensaje dinámicamente solo con campos completados
    let message = `Hola, mi nombre es ${formattedName}

*Motivo:* ${subjectMap[formData.subject]}`;

    if (formattedEmail) {
      message += `\n\n*Email:* ${formattedEmail}`;
    }

    if (formattedPhone) {
      message += `\n${formattedEmail ? '' : '\n'}*Teléfono:* ${formattedPhone}`;
    }

    message += `\n\n*Mensaje:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank');

    // Mostrar confirmación temporal
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Manejar casos especiales por campo
    if (name === 'email') {
      // Email: convertir a minúsculas y remover espacios en tiempo real
      setFormData({
        ...formData,
        [name]: value.toLowerCase().replace(/\s+/g, ''),
      });
    } else if (name === 'name') {
      // Nombre: capitalizar en tiempo real mientras escribe
      setFormData({
        ...formData,
        [name]: capitalizeWords(value),
      });
    } else if (name === 'phone') {
      // Teléfono: permitir eliminar todo, incluso el +56
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePhoneFocus = () => {
    // Añadir +56 automáticamente cuando el usuario hace foco en el campo
    if (formData.phone === '') {
      setFormData({
        ...formData,
        phone: '+56 ',
      });
    }
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600">
            Estamos aquí para responder tus preguntas
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Envíanos un mensaje
            </h3>

            {submitted && (
              <div className="mb-6 p-4 bg-[#25D366]/10 border border-[#25D366] rounded-lg flex items-center">
                <svg
                  className="w-5 h-5 text-[#25D366] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-[#25D366] font-medium">
                  Redirigiendo a WhatsApp...
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handlePhoneFocus}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Motivo de consulta
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="general">Consulta general</option>
                  <option value="courses">Información sobre cursos</option>
                  <option value="enterprise">Capacitación empresas</option>
                  <option value="certification">Certificación</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white rounded-lg font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
