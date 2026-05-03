import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title = 'Petromin Express UAE - Expert Car Care & Maintenance Services',
  description = 'Professional car maintenance and repair services in UAE. Fast oil changes, brake services, AC checks, battery replacements, and more. 6 branches across Dubai, Sharjah, Abu Dhabi, and RAK. Open 9 AM - 10 PM daily.',
  keywords = 'car service UAE, oil change Dubai, car maintenance UAE, auto repair Dubai, Petromin Express, car service Sharjah, Abu Dhabi car service, brake service UAE, battery replacement Dubai, AC service UAE',
  ogImage = '/logo-header.webp',
  ogType = 'website',
  canonicalUrl,
}: SEOProps) {
  const siteUrl = 'https://petrominexpress.ae';
  const fullTitle = title.includes('Petromin') ? title : `${title} | Petromin Express UAE`;
  const canonical = canonicalUrl || `${siteUrl}${window.location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Petromin Express UAE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      <link rel="canonical" href={canonical} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AutoRepair',
          name: 'Petromin Express UAE',
          description,
          url: siteUrl,
          telephone: '+971565012716',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'AE',
            addressRegion: 'Dubai',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '22:00',
          },
          areaServed: [
            'Dubai',
            'Sharjah',
            'Abu Dhabi',
            'Ras Al Khaimah',
          ],
        })}
      </script>
    </Helmet>
  );
}
