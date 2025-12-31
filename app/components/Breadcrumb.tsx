'use client';

import Link from 'next/link';

interface BreadcrumbProps {
  cityName: string;
}

export default function Breadcrumb({ cityName }: BreadcrumbProps) {
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3 text-sm">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-cyan-500 transition-all duration-200 font-medium hover:underline flex items-center group"
          >
            <svg className="w-4 h-4 mr-1.5 text-cyan-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            amples
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-semibold capitalize tracking-wide">{citySlug}</span>
        </div>
      </div>
    </div>
  );
}

