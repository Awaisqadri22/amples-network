'use client';

import Link from 'next/link';
import Image from 'next/image';
import QuoteForm from '../../components/QuoteForm';

export default function MoveOutCleaningDetails() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left side - 70% Text Content */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                What is included in a moving cleaning?
              </h1>
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg text-justify">
                  In the vast majority of household moves, the <Link href="/move-out-cleaning" className="text-cyan-600 hover:text-cyan-700 underline font-semibold transition-colors">move-out cleaning</Link>, or move-out cleaning as it is sometimes called, is a mandatory part that you, as the moving party, must handle. It can come as a requirement from your landlord or as something regulated in your sales agreement when selling a villa or condominium. The idea of ​​a move-out cleaning is to make the home as clean as possible before the next resident moves in their belongings. Cleaning the entire home and all surfaces is important for home maintenance and can also increase the lifespan of any appliances. In this article, we will go over what is included in a move-out cleaning and also give you tips for your move-out cleaning and what might be good to think about.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  What is included in a moving-in cleaning of a villa or apartment?
                </h2>
                <p className="text-lg text-justify">
                  When transferring a villa or apartment, the responsibility for the move-out cleaning is often regulated in the purchase agreement. Generally, this means that you as the seller are responsible for the cleaning, but that the buyer is responsible for the inspection when the keys are handed over. Sometimes it may also be written down when you must make any comments on the cleaning at the latest.
                </p>
                <p className="text-lg text-justify">
                  Below are some parts that are included in a moving cleaning:
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  Moving out cleaning of garage
                </h3>
                <p className="text-lg text-justify">
                  During a move-in cleaning, the garage should often be swept, the windows polished and cleaned, and open surfaces wet-mopped or wiped.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  Moving cleaning of oven
                </h3>
                <p className="text-lg text-justify">
                  Oven cleaning is an important and often time-consuming part of a move-in cleaning. During a move-in cleaning, the inside of the oven should be cleaned, but the oven door and any oven trays should also be cleaned.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  Moving window cleaning
                </h3>
                <p className="text-lg text-justify">
                  During a normal move-in cleaning, the home&apos;s windows should be cleaned and polished, both the outside, the inside and any intermediate windows. Therefore, window cleaning is included in a move-in cleaning.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  Moving-out cleaning of balcony
                </h3>
                <p className="text-lg text-justify">
                  If you have a regular balcony, it should be swept and any railings wiped down. If the balcony is also glazed, window cleaning should also be carried out on the balcony.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  Moving cleaning of bathrooms
                </h3>
                <p className="text-lg text-justify">
                  The bathroom, together with the kitchen, is the most extensive part of the move-out cleaning. Cleaning of drains should not normally be included in a move-out cleaning, but is recommended to be carried out by a certified operator. However, it is not uncommon for water traps to be cleaned * (Customer is responsible for cleaning water traps that require dismantling) . Floor drains are also usually cleaned superficially.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  What is not included in moving cleaning?
                </h2>
                <p className="text-lg text-justify">
                  Most of the interior of the house is included in a moving house cleaning. However, the garden is not included as part of the moving house cleaning. Nor is the facade, roof washing or cleaning of garden paths included in a regular moving house cleaning. We recommend that you read more about the requirements for moving house cleaning .
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Preparations for a moving cleaning
                </h2>
                <p className="text-lg text-justify">
                  What distinguishes a moving house cleaning from a regular general cleaning or a viewing cleaning may be that you clean certain appliances, among other things, but also that the cleaning is carried out in an unfurnished home. This makes it easier to access surfaces that may be difficult to reach in a furnished home and therefore the cleaning can also be done even more thoroughly. The absolute best way to prepare for a moving house cleaning is, sadly enough, to keep your home clean on an ongoing basis. By cleaning continuously, you will reduce the risk of ingrained dirt, something that both wears down the surface layer and takes time to remove when it is time to move. Limescale on shower walls, for example, is an example of ingrained dirt that can be very difficult to remove completely during a moving house cleaning, if it has not previously been cleaned continuously. Get in the habit of using a water squeegee, if not after every shower, then at least once a week.
                </p>
                <p className="text-lg text-justify">
                  Emptying your home of all your belongings and furniture is one thing you need to do before your move-in cleaning, but it probably goes without saying. Some other tips we have are that you set a reminder to defrost the fridge and freezer before cleaning. This can take a few hours to do, which can significantly extend the time of your cleaning if it is not prepared the night before. Remember to put a towel and a bowl where the water can seep out of the freezer so that the floor does not suffer from water damage.
                </p>
                <p className="text-lg text-justify">
                  One last reminder is to remember to leave the lights on in your home, especially during the winter months. With good lighting, you will find it much easier to spot stains and dirt in your home.
                </p>
                <p className="text-lg text-justify">
                  We also recommend that you use good cleaning materials and agents for cleaning. There are many different environmentally friendly alternatives today as well. The difference between a good oven cleaning agent and a less good one can sometimes be summed up to hours.
                </p>
              </div>
            </div>

            {/* Right side - 30% Form */}
            <div className="lg:col-span-3">
              <QuoteForm idPrefix="details" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

