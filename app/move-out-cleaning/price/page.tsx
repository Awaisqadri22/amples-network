import Link from 'next/link';
import Image from 'next/image';

export default function MoveOutCleaningPrice() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/amples logo.png"
                alt="Amples Logo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="/move-out-cleaning" className="text-gray-700 hover:text-cyan-500 transition-colors">
              ← Back to Move-out Cleaning
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Price of Moving House Cleaning
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700">
              Details about the price of moving house cleaning will be added here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

