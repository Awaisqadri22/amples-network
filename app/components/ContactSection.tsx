export default function ContactSection() {
  const hoursArray = 'Mon-Fri: 8AM-6PM\nSat-Sun: 9AM-4PM'.split('\n');

  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Get In Touch</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">Phone</h3>
            <p className="text-gray-600">(555) 133-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">Email</h3>
            <p className="text-gray-600">info@cleanpro.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">Hours</h3>
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

