import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Listings — Investment & Residential Properties | PropertyCalc",
  description:
    "Browse 2,500+ real estate listings across all 50 states. Find investment properties, single-family homes, multi-family units, commercial spaces, and land. List your property starting free.",
};

const listings = [
  {
    address: "4812 Shoal Creek Blvd",
    city: "Austin",
    state: "TX",
    zip: "78756",
    price: 485000,
    beds: 3,
    baths: 2,
    sqft: 1840,
    type: "Single Family",
    daysOnMarket: 6,
    slug: "4812-shoal-creek-blvd-austin-tx",
    highlight: false,
  },
  {
    address: "1923 Tennyson St",
    city: "Denver",
    state: "CO",
    zip: "80212",
    price: 625000,
    beds: 4,
    baths: 3,
    sqft: 2460,
    type: "Single Family",
    daysOnMarket: 12,
    slug: "1923-tennyson-st-denver-co",
    highlight: false,
  },
  {
    address: "780 NE 69th St",
    city: "Miami",
    state: "FL",
    zip: "33138",
    price: 1250000,
    beds: 6,
    baths: 4,
    sqft: 4200,
    type: "Multi-Family",
    daysOnMarket: 3,
    slug: "780-ne-69th-st-miami-fl",
    highlight: true,
  },
  {
    address: "3401 Commonwealth Ave",
    city: "Charlotte",
    state: "NC",
    zip: "28205",
    price: 339900,
    beds: 3,
    baths: 2,
    sqft: 1560,
    type: "Single Family",
    daysOnMarket: 18,
    slug: "3401-commonwealth-ave-charlotte-nc",
    highlight: false,
  },
  {
    address: "2718 SE Hawthorne Blvd",
    city: "Portland",
    state: "OR",
    zip: "97214",
    price: 899000,
    beds: 0,
    baths: 2,
    sqft: 3800,
    type: "Commercial",
    daysOnMarket: 27,
    slug: "2718-se-hawthorne-blvd-portland-or",
    highlight: false,
  },
  {
    address: "15630 N 7th St",
    city: "Phoenix",
    state: "AZ",
    zip: "85022",
    price: 175000,
    beds: 0,
    baths: 0,
    sqft: 43560,
    type: "Land",
    daysOnMarket: 41,
    slug: "15630-n-7th-st-phoenix-az",
    highlight: false,
  },
];

const propertyTypes = ["All Types", "Single Family", "Multi-Family", "Commercial", "Land"];
const priceRanges = ["Any Price", "Under $200K", "$200K–$500K", "$500K–$1M", "$1M+"];
const locations = ["All Locations", "Austin, TX", "Denver, CO", "Miami, FL", "Charlotte, NC", "Portland, OR", "Phoenix, AZ"];

function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US");
}

function typeBadgeClass(type: string) {
  switch (type) {
    case "Multi-Family":
      return "badge badge-brand";
    case "Commercial":
      return "badge badge-navy";
    case "Land":
      return "badge badge-sage";
    default:
      return "badge badge-sage";
  }
}

export default function ListingsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="badge badge-brand mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 11-1.06 1.06l-.22-.22V19.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-3.75h-3V19.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-6.13l-.22.22a.75.75 0 11-1.06-1.06l8.69-8.69z" />
              </svg>
              Real Estate Listings
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Real Estate Listings
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Browse investment properties, residential homes, commercial spaces, and land
              across all 50 states. Updated daily with new opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              <span className="font-semibold text-white">2,500+</span>
              <span className="text-slate-400">Active Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage-500" />
              <span className="font-semibold text-white">All 50</span>
              <span className="text-slate-400">States Covered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span className="font-semibold text-white">Investment Properties</span>
              <span className="text-slate-400">Highlighted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Filter Bar */}
        <div className="card p-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Buy/Rent Toggle */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                Listing Type
              </label>
              <div className="flex rounded-lg overflow-hidden border border-slate-200">
                <span className="flex-1 text-center py-2.5 text-sm font-semibold bg-navy-950 text-white">
                  Buy
                </span>
                <span className="flex-1 text-center py-2.5 text-sm font-medium bg-warm-50 text-slate-500">
                  Rent
                </span>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                Property Type
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                Price Range
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
                {priceRanges.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                Location
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {listings.map((listing) => (
            <div
              key={listing.slug}
              className={`card group flex flex-col overflow-hidden ${
                listing.highlight ? "ring-2 ring-brand-500 ring-offset-2" : ""
              }`}
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-navy-100 to-warm-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-navy-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
                {listing.highlight && (
                  <span className="absolute top-3 left-3 badge badge-brand">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    Investment Property
                  </span>
                )}
                <span className="absolute top-3 right-3 text-xs font-semibold bg-white/90 backdrop-blur-sm text-navy-700 px-2 py-1 rounded-full">
                  {listing.daysOnMarket}d on market
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={typeBadgeClass(listing.type)}>{listing.type}</span>
                  <span className="text-xl font-black text-navy-950">{formatPrice(listing.price)}</span>
                </div>

                <h3 className="text-lg font-bold text-navy-950 leading-snug">
                  {listing.address}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {listing.city}, {listing.state} {listing.zip}
                </p>

                {/* Details */}
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                  {listing.beds > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                      </svg>
                      {listing.beds} bd
                    </span>
                  )}
                  {listing.baths > 0 && (
                    <span>{listing.baths} ba</span>
                  )}
                  <span>{listing.type === "Land" ? (listing.sqft / 43560).toFixed(1) + " acres" : listing.sqft.toLocaleString() + " sqft"}</span>
                </div>

                <div className="mt-auto pt-4">
                  <Link
                    href={`/listings/${listing.slug}`}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2 text-sm"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List Your Property CTA */}
        <section className="bg-section-warm rounded-2xl overflow-hidden mb-16">
          <div className="p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="badge badge-brand mb-4">For Sellers & Landlords</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                List Your Property
              </h2>
              <p className="mt-3 text-slate-500 leading-relaxed">
                Reach thousands of qualified buyers and investors actively searching for
                their next property. Two plans to match your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="card p-6 text-center">
                <h3 className="text-lg font-bold text-navy-950">Basic Listing</h3>
                <div className="mt-3">
                  <span className="text-3xl font-black text-navy-950">Free</span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-600 text-left">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Standard listing placement
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Up to 10 photos
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Basic analytics
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    30-day listing period
                  </li>
                </ul>
                <button className="btn-secondary w-full mt-6">List for Free</button>
              </div>

              {/* Featured Plan */}
              <div className="card-elevated p-6 text-center ring-2 ring-brand-500 ring-offset-2">
                <span className="badge badge-brand mb-2">Most Popular</span>
                <h3 className="text-lg font-bold text-navy-950">Featured Listing</h3>
                <div className="mt-3">
                  <span className="text-3xl font-black text-gradient">$49</span>
                  <span className="text-sm text-slate-400 ml-1">/listing</span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-600 text-left">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Priority placement in search
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Up to 50 photos + virtual tour
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Detailed analytics & lead tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    90-day listing + auto-renewal
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Featured badge & highlighted card
                  </li>
                </ul>
                <button className="btn-primary w-full mt-6">Get Featured</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
