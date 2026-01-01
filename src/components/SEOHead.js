import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  article = null,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://ummah-news-hub.com';
  const siteName = process.env.REACT_APP_SITE_NAME || 'Ummah News Hub';
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE || `${siteUrl}/og-image.jpg`;
  const twitterHandle = process.env.REACT_APP_TWITTER_HANDLE || '@ummah_news';

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Comprehensive Muslim Community News`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image || defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || siteName} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="Global" />
      <meta name="geo.placename" content="Global Muslim Community" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#dc3545" />

      {/* Structured Data for Articles */}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": title,
            "description": description,
            "image": imageUrl,
            "author": {
              "@type": "Person",
              "name": author || "Ummah News Hub Staff"
            },
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": fullUrl
            },
            "articleSection": section,
            "keywords": tags.join(", "),
            "url": fullUrl
          })}
        </script>
      )}

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          "name": siteName,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": "Comprehensive news platform covering the global Muslim community",
          "sameAs": [
            "https://twitter.com/ummah_news",
            "https://facebook.com/ummah-news-hub"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Editorial",
            "email": "editorial@ummah-news-hub.com"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;