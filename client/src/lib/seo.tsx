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
 * Includes cleanup to remove dynamic structured data on unmount
 */
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Store original title for potential cleanup
    const originalTitle = document.title;

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
      const canonicalUrl = config.canonical.startsWith('http')
        ? config.canonical
        : `${BASE_URL}${config.canonical.startsWith('/') ? '' : '/'}${config.canonical}`;
      updateLinkTag('canonical', canonicalUrl);
    }

    // Update Open Graph URL
    if (config.ogUrl) {
      const ogUrl = config.ogUrl.startsWith('http')
        ? config.ogUrl
        : `${BASE_URL}${config.ogUrl.startsWith('/') ? '' : '/'}${config.ogUrl}`;
      updateMetaTag('property', 'og:url', ogUrl);
      updateMetaTag('name', 'twitter:url', ogUrl);
    }

    // Add structured data if provided
    if (config.structuredData) {
      addStructuredData(config.structuredData);
    }

    // Handle noindex pages
    if (config.noindex) {
      updateMetaTag('name', 'robots', 'noindex, nofollow');
    }

    // Cleanup function to remove dynamic structured data on unmount
    // This prevents stale SEO data when navigating between pages in SPA
    return () => {
      const dynamicScript = document.querySelector('script[data-dynamic-seo="true"]');
      if (dynamicScript) {
        dynamicScript.remove();
      }
      // Restore original title if it was changed
      // Page-specific meta tags are left as they get overwritten by next page
    };
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
const BASE_URL = 'https://typemasterai.com';

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
 * Generate FAQPage structured data
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * Generate Product/Service comparison structured data
 */
export function getComparisonSchema(productName: string, competitors: string[], features: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': productName,
    'description': `${productName} comparison with ${competitors.join(', ')}`,
    'brand': {
      '@type': 'Brand',
      'name': 'TypeMasterAI',
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '2847',
    },
  };
}

/**
 * Generate HowTo structured data
 */
export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'totalTime': totalTime || 'PT5M',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': '0',
    },
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
    })),
  };
}

/**
 * Generate SoftwareApplication structured data for landing pages
 */
export function getSoftwareAppSchema(name: string, description: string, features: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': name,
    'description': description,
    'applicationCategory': ['EducationalApplication', 'UtilitiesApplication'],
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'bestRating': '5',
      'ratingCount': '2847',
    },
    'featureList': features,
    'author': {
      '@type': 'Organization',
      'name': 'TypeMasterAI',
      'url': BASE_URL,
    },
  };
}

/**
 * Page-specific SEO configurations - Updated January 2026
 */
/**
 * Generate SpeakableSpecification structured data for voice search
 */
export function getSpeakableSchema(cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': cssSelectors,
    },
  };
}

/**
 * Generate Course structured data
 */
export function getCourseSchema(name: string, description: string, providerName: string = 'TypeMasterAI') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': name,
    'description': description,
    'provider': {
      '@type': 'Organization',
      'name': providerName,
      'url': BASE_URL
    },
    'isAccessibleForFree': true,
    'educationalLevel': 'Beginner',
  };
}

/**
 * Generate VideoGame structured data
 */
export function getVideoGameSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    'name': name,
    'description': description,
    'genre': ['Educational', 'Arcade', 'Typing'],
    'gamePlatform': 'Web Browser',
    'applicationCategory': 'Game',
    'numberOfPlayers': {
      '@type': 'QuantitativeValue',
      'minValue': 1,
      'maxValue': 10,
    },
    'author': {
      '@type': 'Organization',
      'name': 'TypeMasterAI',
      'url': BASE_URL,
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
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
          '@type': ['WebApplication', 'SoftwareApplication'],
          '@id': `${BASE_URL}/#webapp`,
          'name': 'TypeMasterAI',
          'alternateName': ['TypeMaster AI Typing Test', 'TypeMaster', 'Type Master AI', 'Typing Speed Test'],
          'url': BASE_URL,
          'description': 'Advanced AI-powered typing test platform with real-time WPM measurement, accuracy tracking, code typing mode for developers, multiplayer racing, and personalized analytics across 23+ languages.',
          'applicationCategory': ['UtilitiesApplication', 'EducationalApplication', 'GameApplication'],
          'applicationSubCategory': 'Typing Practice',
          'operatingSystem': 'Any',
          'browserRequirements': 'Requires JavaScript and HTML5 support',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'priceValidUntil': '2026-12-31'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'bestRating': '5',
            'worstRating': '1',
            'ratingCount': '2847',
            'reviewCount': '1523'
          },
          'isAccessibleForFree': true,
          'featureList': [
            "Real-time WPM calculation",
            "Accuracy percentage tracking",
            "AI-generated typing content",
            "Code typing mode (20+ languages)",
            "Multiplayer typing race",
            "Keystroke heatmaps & analytics",
            "Finger usage statistics",
            "AI personalized insights",
            "23+ language support",
            "Daily challenges & achievements",
            "Progressive Web App (PWA)",
            "Global leaderboards"
          ],
          'softwareVersion': '2.0.0',
          'author': { '@id': `${BASE_URL}/#organization` },
          'publisher': { '@id': `${BASE_URL}/#organization` },
          'creator': { '@id': `${BASE_URL}/#organization` },
          'inLanguage': ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ko", "ar", "hi"],
          'screenshot': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/opengraph.jpg`,
            'caption': 'TypeMasterAI - Free Online Typing Speed Test'
          }
        },
        {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          'name': 'TypeMasterAI',
          'url': BASE_URL,
          'logo': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/icon-512x512.png`,
            'width': 512,
            'height': 512,
            'caption': 'TypeMasterAI Logo'
          },
          'image': `${BASE_URL}/icon-512x512.png`,
          'description': 'TypeMasterAI provides free AI-powered typing tests with real-time analytics, code typing mode, and multiplayer racing.',
          'email': 'support@typemasterai.com',
          'sameAs': [
            'https://twitter.com/replit',
            'https://github.com/replit'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          'url': BASE_URL,
          'name': 'TypeMasterAI - Free Online Typing Test',
          'publisher': { '@id': `${BASE_URL}/#organization` },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${BASE_URL}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${BASE_URL}/#breadcrumb`,
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL }
          ]
        },
        {
          '@type': 'HowTo',
          '@id': `${BASE_URL}/#howto`,
          'name': 'How to Test and Improve Your Typing Speed',
          'description': 'Learn how to accurately measure your typing speed in WPM and improve your typing skills using TypeMasterAI.',
          'totalTime': 'PT5M',
          'tool': { '@type': 'HowToTool', 'name': 'TypeMasterAI Typing Test' },
          'step': [
            { '@type': 'HowToStep', 'position': 1, 'name': 'Visit TypeMasterAI', 'text': 'Go to typemasterai.com in your web browser.', 'url': BASE_URL },
            { '@type': 'HowToStep', 'position': 2, 'name': 'Select test duration', 'text': 'Choose from 15s, 30s, 1min, 3min, or 5min.' },
            { '@type': 'HowToStep', 'position': 3, 'name': 'Start typing', 'text': 'Type the displayed paragraph. WPM is calculated in real-time.' },
            { '@type': 'HowToStep', 'position': 4, 'name': 'View results', 'text': 'See your WPM, accuracy, and detailed analytics.' },
            { '@type': 'HowToStep', 'position': 5, 'name': 'Track progress', 'text': 'Save results and compete on the leaderboard.' }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': `${BASE_URL}/#faq`,
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How do I test my typing speed?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Simply visit TypeMasterAI and start typing. Your WPM and accuracy are calculated in real-time.' }
            },
            {
              '@type': 'Question',
              'name': 'What is a good typing speed?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Average is 40 WPM. 50-80 WPM is good, 80-95 very good, and 100+ expert.' }
            },
            {
              '@type': 'Question',
              'name': 'Is TypeMasterAI free?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, TypeMasterAI is 100% free with unlimited tests and features.' }
            },
            {
              '@type': 'Question',
              'name': 'What is code typing mode?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'A mode for programmers to practice typing code in 20+ languages like Python and JavaScript.' }
            },
            {
              '@type': 'Question',
              'name': 'How does multiplayer work?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Join a room and race against others in real-time to type the same paragraph.' }
            }
          ]
        },
        {
          '@type': 'ItemList',
          '@id': `${BASE_URL}/#features`,
          'name': 'TypeMasterAI Features',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Real-time WPM' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Code Typing Mode' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Multiplayer Racing' },
            { '@type': 'ListItem', 'position': 4, 'name': 'AI Analytics' },
            { '@type': 'ListItem', 'position': 5, 'name': '23+ Languages' }
          ]
        },
        // Speakable Specification
        {
          '@type': 'WebPage',
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', '.wpm-display', '.accuracy-display'],
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
    structuredData: getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Typing Test', url: `${BASE_URL}/test` }]),
  },
  codeMode: {
    title: 'Code Typing Test for Programmers | 20+ Languages - TypeMasterAI',
    description: 'Improve your coding speed with our specialized code typing test. Practice typing in JavaScript, Python, Java, C++, TypeScript, Go, Rust, and 15+ more languages with syntax highlighting.',
    keywords: 'code typing test, programming typing test, coding speed test, developer typing practice, javascript typing test, python typing test, coding wpm, programmer typing speed',
    canonical: `${BASE_URL}/code-mode`,
    ogUrl: `${BASE_URL}/code-mode`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          'name': 'TypeMasterAI Code Typing Mode',
          'description': 'Specialized code typing test for programmers with 20+ programming languages',
          'applicationCategory': 'DeveloperApplication',
          'operatingSystem': 'Web Browser',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'featureList': ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift'],
        },
        getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Code Mode', url: `${BASE_URL}/code-mode` }]),
      ]
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
      '@graph': [
        getVideoGameSchema('TypeMasterAI Multiplayer Racing', 'Real-time multiplayer typing race game where you compete to type paragraphs the fastest.'),
        getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Multiplayer', url: `${BASE_URL}/multiplayer` }]),
      ]
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
    structuredData: getSpeakableSchema(['.dictation-text', '.transcription-area']),
  },
  learn: {
    title: 'Learn Touch Typing | Free Typing Lessons - TypeMasterAI',
    description: 'Learn touch typing with our comprehensive free lessons. Master proper finger placement, build muscle memory, and increase your typing speed systematically.',
    keywords: 'learn touch typing, typing lessons, typing tutorial, learn to type, typing course free, touch typing guide, keyboard lessons',
    canonical: `${BASE_URL}/learn`,
    ogUrl: `${BASE_URL}/learn`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        getCourseSchema('Touch Typing Fundamentals', 'Comprehensive touch typing course with 5 levels of mastery.'),
        getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Learn', url: `${BASE_URL}/learn` }]),
      ]
    },
  },
  faq: {
    title: 'FAQ | Frequently Asked Questions - TypeMasterAI',
    description: 'Find answers to common questions about TypeMasterAI typing tests. Learn about WPM calculation, typing speed improvement, features, languages, and more.',
    keywords: 'typing test faq, wpm questions, typing speed help, how to type faster, monkeytype alternative questions, typing test help',
    canonical: `${BASE_URL}/faq`,
    ogUrl: `${BASE_URL}/faq`,
    structuredData: getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'FAQ', url: `${BASE_URL}/faq` }]),
  },
  // New SEO Landing Pages
  typingPractice: {
    title: 'Free Typing Practice Online | Improve Your Speed - TypeMasterAI',
    description: 'Practice typing online for free with TypeMasterAI. Build muscle memory, improve accuracy, and increase your WPM with our AI-powered typing practice exercises.',
    keywords: 'typing practice, typing practice online, free typing practice, practice typing, typing exercises, improve typing speed, typing drills, keyboard practice',
    canonical: `${BASE_URL}/typing-practice`,
    ogUrl: `${BASE_URL}/typing-practice`,
    structuredData: getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Typing Practice', url: `${BASE_URL}/typing-practice` }]),
  },
  wpmTest: {
    title: 'WPM Test - Check Your Words Per Minute | Free Online - TypeMasterAI',
    description: 'Take a free WPM test and measure your typing speed in words per minute. Get accurate results with our professional-grade WPM calculator and detailed analytics.',
    keywords: 'wpm test, words per minute test, wpm calculator, check wpm, typing wpm, wpm speed test, how fast do i type, wpm checker, words per minute calculator',
    canonical: `${BASE_URL}/wpm-test`,
    ogUrl: `${BASE_URL}/wpm-test`,
    structuredData: getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'WPM Test', url: `${BASE_URL}/wpm-test` }]),
  },
  typingGames: {
    title: 'Typing Games Online | Fun & Free - TypeMasterAI',
    description: 'Play free typing games online and improve your typing speed while having fun. Race against others, complete challenges, and climb the leaderboard!',
    keywords: 'typing games, typing games online, free typing games, fun typing games, typing race game, keyboard games, typing game for kids, typing practice games',
    canonical: `${BASE_URL}/typing-games`,
    ogUrl: `${BASE_URL}/typing-games`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        getVideoGameSchema('TypeMasterAI Typing Games Collection', 'A collection of fun typing games to improve speed and accuracy.'),
        getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Typing Games', url: `${BASE_URL}/typing-games` }]),
      ]
    },
  },
  keyboardTest: {
    title: 'Online Keyboard Test | Check All Keys Work - TypeMasterAI',
    description: 'Test your keyboard online for free. Check if all keys are working, test key response time, and verify your keyboard layout. Works with any keyboard type.',
    keywords: 'keyboard test, keyboard tester, online keyboard test, test keyboard, keyboard checker, key test, check keyboard keys, keyboard test online',
    canonical: `${BASE_URL}/keyboard-test`,
    ogUrl: `${BASE_URL}/keyboard-test`,
    structuredData: getSoftwareAppSchema('Online Keyboard Tester', 'Utility to test keyboard keys functionality', ['Key Response Time', 'Multi-key Rollover', 'Layout Detection']),
  },
  typingCertificate: {
    title: 'Typing Certificate | Get Certified Speed Results - TypeMasterAI',
    description: 'Earn a verified typing certificate with your WPM and accuracy scores. Download shareable certificates for job applications, schools, and professional use.',
    keywords: 'typing certificate, typing speed certificate, wpm certificate, typing test certificate, professional typing certificate, typing certification, verified typing results',
    canonical: `${BASE_URL}/typing-certificate`,
    ogUrl: `${BASE_URL}/typing-certificate`,
    structuredData: getBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Certificate', url: `${BASE_URL}/typing-certificate` }]),
  },
};
