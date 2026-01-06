import { useEffect } from 'react';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical?: string;
  structuredData?: object;
  noindex?: boolean;
}

/**
 * SEO Component for dynamic meta tag management
 * Updates page-specific meta tags for better search engine optimization
 */
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Update document title
    if (config.title) {
      document.title = config.title;
      updateMetaTag('name', 'title', config.title);
      updateMetaTag('property', 'og:title', config.ogTitle || config.title);
      updateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
    }

    // Update description
    if (config.description) {
      updateMetaTag('name', 'description', config.description);
      updateMetaTag('property', 'og:description', config.ogDescription || config.description);
      updateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
    }

    // Update keywords
    if (config.keywords) {
      updateMetaTag('name', 'keywords', config.keywords);
    }

    // Update canonical URL
    if (config.canonical) {
      updateLinkTag('canonical', config.canonical);
    }

    // Update Open Graph URL
    if (config.ogUrl) {
      updateMetaTag('property', 'og:url', config.ogUrl);
      updateMetaTag('name', 'twitter:url', config.ogUrl);
    }

    // Add structured data if provided
    if (config.structuredData) {
      addStructuredData(config.structuredData);
    }

    // Handle noindex pages
    if (config.noindex) {
      updateMetaTag('name', 'robots', 'noindex, nofollow');
    }
  }, [config]);
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(attribute: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Update or create a link tag
 */
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.href = href;
}

/**
 * Add structured data (JSON-LD) to the page
 */
function addStructuredData(data: object) {
  // Remove existing dynamic structured data
  const existing = document.querySelector('script[data-dynamic-seo="true"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-dynamic-seo', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Base URL for canonical URLs and structured data
const BASE_URL = 'https://typemaster-ai.replit.app';

/**
 * Generate common WebApplication structured data
 */
function getWebAppSchema(pageName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': `TypeMasterAI ${pageName}`,
    'description': description,
    'url': BASE_URL,
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '2847',
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

/**
 * Page-specific SEO configurations - Updated January 2026
 */
export const SEO_CONFIGS = {
  home: {
    title: 'Free Typing Test | TypeMasterAI - Check Your WPM & Typing Speed Online',
    description: 'Test your typing speed in 60 seconds! Free online typing test with real-time WPM calculator, accuracy tracker, AI-powered analytics, multiplayer racing, code typing mode for developers, and 23+ languages. No signup required.',
    keywords: 'typing test, typing speed test, wpm test, words per minute test, free typing test, typing speed, online typing test, typing test wpm, 1 minute typing test, typing accuracy test, typing game, typing practice, monkeytype alternative, code typing test, multiplayer typing race',
    canonical: `${BASE_URL}/`,
    ogUrl: `${BASE_URL}/`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${BASE_URL}/#webapp`,
          'name': 'TypeMasterAI',
          'url': BASE_URL,
          'description': 'Free online typing test with AI-powered analytics, code typing mode, and multiplayer racing.',
          'applicationCategory': ['EducationalApplication', 'UtilitiesApplication'],
          'operatingSystem': 'Any',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '2847' },
        },
        {
          '@type': 'WebSite',
          'url': BASE_URL,
          'name': 'TypeMasterAI',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${BASE_URL}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
      ],
    },
  },
  test: {
    title: '1 Minute Typing Speed Test | Free WPM Calculator - TypeMasterAI',
    description: 'Take a quick 1-minute typing speed test and get instant WPM results. Track your accuracy, view detailed analytics, and compare with global averages. No signup required.',
    keywords: '1 minute typing test, typing speed test, wpm calculator, typing test 60 seconds, free typing test, online typing speed test, check typing speed',
    canonical: `${BASE_URL}/test`,
    ogUrl: `${BASE_URL}/test`,
  },
  codeMode: {
    title: 'Code Typing Test for Programmers | 20+ Languages - TypeMasterAI',
    description: 'Improve your coding speed with our specialized code typing test. Practice typing in JavaScript, Python, Java, C++, TypeScript, Go, Rust, and 15+ more languages with syntax highlighting.',
    keywords: 'code typing test, programming typing test, coding speed test, developer typing practice, javascript typing test, python typing test, coding wpm, programmer typing speed',
    canonical: `${BASE_URL}/code-mode`,
    ogUrl: `${BASE_URL}/code-mode`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'TypeMasterAI Code Typing Mode',
      'description': 'Specialized code typing test for programmers with 20+ programming languages',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web Browser',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
      'featureList': ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift'],
    },
  },
  multiplayer: {
    title: 'Multiplayer Typing Race | Compete Live Online - TypeMasterAI',
    description: 'Join real-time multiplayer typing races and compete against players worldwide. Race to type the fastest, see live WPM updates, ELO ratings, and climb the rankings!',
    keywords: 'multiplayer typing race, typing game online, competitive typing, typeracer alternative, online typing competition, typing race multiplayer, typing battle',
    canonical: `${BASE_URL}/multiplayer`,
    ogUrl: `${BASE_URL}/multiplayer`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      'name': 'TypeMasterAI Multiplayer Racing',
      'description': 'Real-time multiplayer typing race game',
      'genre': 'Educational',
      'gamePlatform': 'Web Browser',
      'numberOfPlayers': { '@type': 'QuantitativeValue', 'minValue': 2, 'maxValue': 10 },
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    },
  },
  leaderboard: {
    title: 'Global Typing Speed Leaderboard | Top WPM Rankings - TypeMasterAI',
    description: 'View the fastest typists in the world! Browse global and code typing leaderboards, filter by language, and compete for the top spot.',
    keywords: 'typing leaderboard, fastest typists, typing speed rankings, wpm leaderboard, typing competition rankings, best typists, world record typing speed',
    canonical: `${BASE_URL}/leaderboard`,
    ogUrl: `${BASE_URL}/leaderboard`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'TypeMasterAI Typing Speed Leaderboard',
      'description': 'Global rankings of fastest typists by WPM',
      'itemListOrder': 'https://schema.org/ItemListOrderDescending',
    },
  },
  analytics: {
    title: 'Typing Analytics & Performance Insights | AI-Powered - TypeMasterAI',
    description: 'Get detailed typing analytics with keystroke heatmaps, finger usage stats, WPM trends, accuracy metrics, and AI-powered personalized recommendations to improve faster.',
    keywords: 'typing analytics, typing statistics, keystroke analysis, typing performance, wpm tracking, typing improvement insights, finger usage analysis',
    canonical: `${BASE_URL}/analytics`,
    ogUrl: `${BASE_URL}/analytics`,
  },
  profile: {
    title: 'Your Typing Profile & Progress | Track Improvement - TypeMasterAI',
    description: 'View your typing history, track progress over time, earn achievements, manage badges, and monitor your typing speed improvement journey.',
    keywords: 'typing profile, typing progress, typing history, typing achievements, track typing speed, typing improvement',
    canonical: `${BASE_URL}/profile`,
    ogUrl: `${BASE_URL}/profile`,
  },
  stressTest: {
    title: 'Stress Typing Test | Challenge Your Focus Under Pressure - TypeMasterAI',
    description: 'Test your typing skills under pressure with visual distractions, screen shake, glitch effects, and more. Multiple difficulty levels from beginner to impossible.',
    keywords: 'stress typing test, hard typing test, typing test with distractions, challenging typing test, focus test, typing under pressure',
    canonical: `${BASE_URL}/stress-test`,
    ogUrl: `${BASE_URL}/stress-test`,
    structuredData: getWebAppSchema('Stress Test Mode', 'Test your typing under pressure with visual distractions'),
  },
  dictationTest: {
    title: 'Dictation Typing Test | Improve Listening & Typing - TypeMasterAI',
    description: 'Practice dictation typing to improve both listening and typing skills. Hear sentences spoken aloud and type what you hear with real-time accuracy feedback.',
    keywords: 'dictation test, listening typing test, transcription practice, audio typing test, dictation practice, typing from audio',
    canonical: `${BASE_URL}/dictation-test`,
    ogUrl: `${BASE_URL}/dictation-test`,
  },
  learn: {
    title: 'Learn Touch Typing | Free Typing Lessons - TypeMasterAI',
    description: 'Learn touch typing with our comprehensive free lessons. Master proper finger placement, build muscle memory, and increase your typing speed systematically.',
    keywords: 'learn touch typing, typing lessons, typing tutorial, learn to type, typing course free, touch typing guide, keyboard lessons',
    canonical: `${BASE_URL}/learn`,
    ogUrl: `${BASE_URL}/learn`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Touch Typing Fundamentals',
      'description': 'Learn touch typing with free comprehensive lessons',
      'provider': { '@type': 'Organization', 'name': 'TypeMasterAI', 'url': BASE_URL },
      'isAccessibleForFree': true,
      'educationalLevel': 'Beginner',
    },
  },
  faq: {
    title: 'FAQ | Frequently Asked Questions - TypeMasterAI',
    description: 'Find answers to common questions about TypeMasterAI typing tests. Learn about WPM calculation, typing speed improvement, features, languages, and more.',
    keywords: 'typing test faq, wpm questions, typing speed help, how to type faster, monkeytype alternative questions, typing test help',
    canonical: `${BASE_URL}/faq`,
    ogUrl: `${BASE_URL}/faq`,
  },
};
