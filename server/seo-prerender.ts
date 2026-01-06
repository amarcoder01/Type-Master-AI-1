/**
 * SEO Pre-rendering Module for Search Engine Crawlers
 * Injects proper meta tags for crawlers that don't execute JavaScript
 */

import fs from 'node:fs';
import path from 'node:path';
import type { Request, Response, NextFunction } from 'express';
import { getSEOConfig, BASE_URL_CONST } from './seo-routes';

// List of known crawler user agents
const CRAWLER_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'slurp', // Yahoo
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'slackbot',
  'discordbot',
  'applebot',
  'gptbot',
  'chatgpt-user',
  'anthropic-ai',
  'claude-web',
  'perplexitybot',
  'google-extended',
  'ahrefsbot',
  'semrushbot',
  'mj12bot',
  'dotbot',
  'screaming frog',
  'rogerbot',
  'embedly',
  'quora link preview',
  'pinterest',
  'redditbot',
  'sogou',
  'exabot',
  'ia_archiver',
  'archive.org_bot',
];

/**
 * Check if the request is from a search engine crawler
 */
export function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler));
}

/**
 * Generate meta tags HTML for a route
 */
function generateMetaTags(config: ReturnType<typeof getSEOConfig>, path: string): string {
  if (!config) {
    return '';
  }

  const ogImage = `${BASE_URL_CONST}/opengraph.jpg`;
  const robotsContent = config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const hreflang = (() => {
    // Spanish localized page: include es/en/x-default
    if (path.startsWith('/es/')) {
      const esHref = `${BASE_URL_CONST}${path}`;
      const enHref = `${BASE_URL_CONST}/`;
      return `\n    <link rel="alternate" hreflang="es" href="${esHref}" />\n    <link rel="alternate" hreflang="en" href="${enHref}" />\n    <link rel="alternate" hreflang="x-default" href="${enHref}" />`;
    }
    // English home route: advertise Spanish alternate
    if (path === '/') {
      const esHref = `${BASE_URL_CONST}/es/typing-test`;
      const enHref = `${BASE_URL_CONST}/`;
      return `\n    <link rel="alternate" hreflang="es" href="${esHref}" />\n    <link rel="alternate" hreflang="x-default" href="${enHref}" />`;
    }
    // Other pages: default x-default only
    return `\n    <link rel=\"alternate\" hreflang=\"x-default\" href=\"${BASE_URL_CONST}/\" />`;
  })();

  return `
    <title>${escapeHtml(config.title)}</title>
    <meta name="title" content="${escapeHtml(config.title)}" />
    <meta name="description" content="${escapeHtml(config.description)}" />
    <meta name="keywords" content="${escapeHtml(config.keywords)}" />
    <meta name="robots" content="${robotsContent}" />
    <link rel="canonical" href="${escapeHtml(config.canonical)}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${config.ogType || 'website'}" />
    <meta property="og:url" content="${escapeHtml(config.canonical)}" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="TypeMasterAI" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(config.canonical)}" />
    <meta name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    ${hreflang}
  `;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function generateStructuredDataScript(path: string, config: ReturnType<typeof getSEOConfig> | null): string {
  if (!config) return '';

  const base = BASE_URL_CONST;

  const scriptTag = (obj: any) =>
    `<script type="application/ld+json" data-dynamic-seo="true">${JSON.stringify(obj)}</script>`;

  if (path === '/') {
    const graph = [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: 'TypeMasterAI - Free Online Typing Test',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${base}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: 'TypeMasterAI',
        url: base,
        logo: {
          '@type': 'ImageObject',
          url: `${base}/icon-512x512.png`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'TypeMasterAI',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ];
    return scriptTag({ '@context': 'https://schema.org', '@graph': graph });
  }

  if (path === '/multiplayer' || path === '/typing-games') {
    return scriptTag({
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: config.title,
      description: config.description,
      applicationCategory: 'Game',
      gamePlatform: 'Web Browser',
      author: { '@type': 'Organization', name: 'TypeMasterAI', url: base },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    });
  }

  if (path === '/leaderboard' || path === '/code-leaderboard' || path === '/stress-leaderboard') {
    return scriptTag({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: config.title,
      description: config.description,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
    });
  }

  if (path === '/learn') {
    return scriptTag({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Touch Typing Fundamentals',
      description: 'Comprehensive touch typing course with multi-level curriculum.',
      provider: { '@type': 'Organization', name: 'TypeMasterAI', url: base },
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
    });
  }

  if (path === '/faq') {
    return scriptTag({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I test my typing speed?', acceptedAnswer: { '@type': 'Answer', text: 'Visit TypeMasterAI, start typing, and see real-time WPM and accuracy.' } },
        { '@type': 'Question', name: 'Is TypeMasterAI free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, it is 100% free with unlimited tests and features.' } },
      ],
    });
  }

  if (path === '/dictation-test' || path === '/dictation-mode') {
    return scriptTag({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.dictation-text'] },
    });
  }

  const softwareAppPages = new Set([
    '/code-mode',
    '/typing-practice',
    '/wpm-test',
    '/keyboard-test',
    '/typing-certificate',
    '/1-minute-typing-test',
    '/3-minute-typing-test',
    '/5-minute-typing-test',
  ]);
  if (softwareAppPages.has(path)) {
    return scriptTag({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: config.title,
      description: config.description,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    });
  }

  return scriptTag({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    description: config.description,
    url: config.canonical,
  });
}

/**
 * Inject meta tags into HTML template
 */
function injectMetaTags(html: string, metaTags: string): string {
  // Find the existing title and meta tags to replace
  // We'll replace the content inside <head> after the charset meta

  // Replace existing title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    '' // Remove existing title, we'll add ours
  );

  // Remove existing meta description, keywords, robots, canonical
  html = html.replace(/<meta\s+name="title"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="keywords"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="robots"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  
  // Remove existing OG tags
  html = html.replace(/<meta\s+property="og:type"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:url"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:title"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:image"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:image:width"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:image:height"[^>]*>/gi, '');
  
  // Remove existing Twitter tags
  html = html.replace(/<meta\s+name="twitter:card"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:url"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:title"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:image"[^>]*>/gi, '');

  // Insert our meta tags after the viewport meta tag
  html = html.replace(
    /(<meta\s+name="viewport"[^>]*>)/i,
    `$1\n    ${metaTags}`
  );

  return html;
}

/**
 * Create the SEO pre-rendering middleware
 */
export function createSEOPrerender(distPath: string) {
  // Read the HTML template once at startup
  let htmlTemplate: string | null = null;

  return async (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.headers['user-agent'] || '';
    
    // Only process for crawlers
    if (!isCrawler(userAgent)) {
      return next();
    }

    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }

    // Skip static assets
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt)$/i)) {
      return next();
    }

    try {
      // Read template if not cached
      if (!htmlTemplate) {
        const indexPath = path.resolve(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          htmlTemplate = fs.readFileSync(indexPath, 'utf-8');
        } else {
          return next();
        }
      }

      // Get SEO config for this route
      const seoConfig = getSEOConfig(req.path);
      
      if (!seoConfig) {
        // For crawlers, return a proper 404 with noindex to avoid soft-404 issues
        const notFoundHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="robots" content="noindex, nofollow" /><title>404 Not Found</title></head><body>Not Found</body></html>`;
        res.set('Content-Type', 'text/html');
        res.set('Vary', 'User-Agent, Accept-Language');
        res.set('X-Robots-Tag', 'noindex, nofollow');
        return res.status(404).send(notFoundHtml);
      }

      // Generate and inject meta tags (and JSON-LD structured data)
      const metaTags = generateMetaTags(seoConfig, req.path);
      const structured = generateStructuredDataScript(req.path, seoConfig);
      const html = injectMetaTags(htmlTemplate, metaTags + (structured ? `\n    ${structured}` : ''));

      res.set('Content-Type', 'text/html');
      res.set('Vary', 'User-Agent, Accept-Language');
      res.set('X-Robots-Tag', seoConfig.noindex ? 'noindex' : 'index');
      return res.send(html);
    } catch (error) {
      console.error('[SEO Prerender] Error:', error);
      return next();
    }
  };
}

