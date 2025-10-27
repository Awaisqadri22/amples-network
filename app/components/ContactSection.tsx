interface ContactSectionProps {
  t: {
    contact: {
      title: string;
      phone: string;
      email: string;
      hours: string;
      hoursText: string;
    };
  };
}

export default function ContactSection({ t }: ContactSectionProps) {
  const hoursArray = t.contact.hoursText.split('\n');

  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">{t.contact.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">{t.contact.phone}</h3>
            <p className="text-gray-600">(555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">{t.contact.email}</h3>
            <p className="text-gray-600">info@cleanpro.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">{t.contact.hours}</h3>
            <p className="text-gray-600">
              {hoursArray.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < hoursArray.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

