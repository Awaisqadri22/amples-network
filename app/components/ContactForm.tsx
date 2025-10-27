interface ContactFormProps {
  t: {
    hero: {
      formTitle: string;
      form: {
        fullName: string;
        companyName: string;
        serviceType: string;
        propertyType: string;
        phone: string;
        email: string;
        area: string;
        address: string;
        date: string;
        submit: string;
        placeholders: {
          name: string;
          company: string;
          phone: string;
          email: string;
          area: string;
          address: string;
        };
        services: {
          select: string;
          residential: string;
          commercial: string;
          deep: string;
          move: string;
          postConstruction: string;
          carpet: string;
          window: string;
          other: string;
        };
        properties: {
          select: string;
          apartment: string;
          house: string;
          condo: string;
          office: string;
          retail: string;
          warehouse: string;
          other: string;
        };
      };
    };
  };
}

export default function ContactForm({ t }: ContactFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.hero.formTitle}</h2>
      <form className="space-y-6">
        {/* Name/Company Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t.hero.form.fullName} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
              placeholder={t.hero.form.placeholders.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              {t.hero.form.companyName}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
              placeholder={t.hero.form.placeholders.company}
            />
          </div>
        </div>

        {/* Service Type */}
        <div className="form-group">
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            {t.hero.form.serviceType} *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
          >
            <option value="">{t.hero.form.services.select}</option>
            <option value="residential">{t.hero.form.services.residential}</option>
            <option value="commercial">{t.hero.form.services.commercial}</option>
            <option value="deep">{t.hero.form.services.deep}</option>
            <option value="move">{t.hero.form.services.move}</option>
            <option value="post-construction">{t.hero.form.services.postConstruction}</option>
            <option value="carpet">{t.hero.form.services.carpet}</option>
            <option value="window">{t.hero.form.services.window}</option>
            <option value="other">{t.hero.form.services.other}</option>
          </select>
        </div>

        {/* Housing Type */}
        <div className="form-group">
          <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-2">
            {t.hero.form.propertyType} *
          </label>
          <select
            id="housingType"
            name="housingType"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
          >
            <option value="">{t.hero.form.properties.select}</option>
            <option value="apartment">{t.hero.form.properties.apartment}</option>
            <option value="house">{t.hero.form.properties.house}</option>
            <option value="condo">{t.hero.form.properties.condo}</option>
            <option value="office">{t.hero.form.properties.office}</option>
            <option value="retail">{t.hero.form.properties.retail}</option>
            <option value="warehouse">{t.hero.form.properties.warehouse}</option>
            <option value="other">{t.hero.form.properties.other}</option>
          </select>
        </div>

        {/* Phone and Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t.hero.form.phone} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
              placeholder={t.hero.form.placeholders.phone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t.hero.form.email} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
              placeholder={t.hero.form.placeholders.email}
            />
          </div>
        </div>

        {/* Square Meter Area */}
        <div className="form-group">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
            {t.hero.form.area} *
          </label>
          <input
            type="number"
            id="area"
            name="area"
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
            placeholder={t.hero.form.placeholders.area}
          />
        </div>

        {/* City/Address */}
        <div className="form-group">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            {t.hero.form.address} *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
            placeholder={t.hero.form.placeholders.address}
          />
        </div>

        {/* Date Picker */}
        <div className="form-group">
          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
            {t.hero.form.date}
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <span className="flex items-center justify-center">
            {t.hero.form.submit}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}

