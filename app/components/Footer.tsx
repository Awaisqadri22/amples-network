interface FooterProps {
  t: {
    footer: {
      tagline: string;
      terms: string;
      privacy: string;
      copyright: string;
    };
  };
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">{t.footer.tagline}</p>
          </div>
          <div className="flex space-x-6">
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

