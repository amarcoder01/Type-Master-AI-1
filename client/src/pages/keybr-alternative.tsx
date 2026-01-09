import { Link } from 'wouter';
import { Check, X, Zap, Code, Users, TrendingUp, Brain, Trophy, Keyboard } from 'lucide-react';
import { useSEO } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AuthorBio } from '@/components/author-bio';

export default function KeybrAlternativePage() {
    useSEO({
        title: 'Keybr Alternative | TypeMasterAI - Better Adaptive Typing Lessons',
        description: 'Searching for a Keybr alternative? TypeMasterAI features advanced AI adaptive learning, real-time code typing practice, multiplayer racing, and a modern UI. Start your free practice now!',
        keywords: 'keybr alternative, keybr vs typemaster, adaptive typing test, typing practice online, keybr competitor, touch typing practice, learn to type free',
        canonical: 'https://typemasterai.com/keybr-alternative',
        ogUrl: 'https://typemasterai.com/keybr-alternative',
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'TypeMasterAI',
            description: 'Advanced AI-powered typing tutor and test platform similar to Keybr but with modern features.',
            brand: {
                '@type': 'Brand',
                name: 'TypeMasterAI'
            },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
            }
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto px-4 pt-20 pb-16">
                <Breadcrumbs items={[{ label: 'Keybr Alternative', href: '/keybr-alternative' }]} />

                {/* Hero Section */}
                <section className="max-w-4xl mx-auto text-center pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-slate-800/50 rounded-full mb-4 sm:mb-6 border border-slate-700">
                        <Keyboard className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mr-2" />
                        <span className="text-xs sm:text-sm text-slate-300">Modern Touch Typing Practice</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
                        The Modern <span className="text-cyan-400">Keybr Alternative</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-3 sm:mb-4 px-2">
                        Adaptive AI learning with a interface from this decade.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                        TypeMasterAI improves on Keybr's core concept with advanced analytics, code modes, and a community-driven multiplayer experience.
                    </p>
                    <Link href="/learn">
                        <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 w-full sm:w-auto shadow-lg shadow-cyan-500/20" data-testid="button-try-typemaster-hero">
                            <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                            Start Adaptive Practice
                        </Button>
                    </Link>
                </section>

                {/* Comparison Table */}
                <section className="max-w-6xl mx-auto py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                        TypeMasterAI vs Keybr - Feature Showdown
                    </h2>

                    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden shadow-xl">
                        <table className="w-full">
                            <thead className="bg-slate-900/80">
                                <tr>
                                    <th className="text-left p-6 text-white font-semibold w-1/3">Feature</th>
                                    <th className="text-center p-6 text-cyan-400 font-semibold w-1/3 text-lg">TypeMasterAI</th>
                                    <th className="text-center p-6 text-slate-400 font-semibold w-1/3">Keybr</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                <tr className="bg-cyan-900/10 hover:bg-cyan-900/20 transition-colors">
                                    <td className="p-6 text-white font-medium">Adaptive AI Learning</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" strokeWidth={3} /></td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-green-500/70 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-white">Modern UX/UI</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" /></td>
                                    <td className="text-center p-6"><X className="h-6 w-6 text-red-500/50 mx-auto" /></td>
                                </tr>
                                <tr className="bg-cyan-900/10 hover:bg-cyan-900/20 transition-colors">
                                    <td className="p-6 text-white font-medium">Code Typing Mode (Python, JS, etc.)</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" strokeWidth={3} /></td>
                                    <td className="text-center p-6"><X className="h-6 w-6 text-red-500/50 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-white">Multiplayer Racing</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" /></td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-green-500/70 mx-auto" /></td>
                                </tr>
                                <tr className="bg-cyan-900/10 hover:bg-cyan-900/20 transition-colors">
                                    <td className="p-6 text-white font-medium">Detailed Finger Analytics</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" strokeWidth={3} /></td>
                                    <td className="text-center p-6"><X className="h-6 w-6 text-red-500/50 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-white">No Registration Required</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" /></td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-green-500/70 mx-auto" /></td>
                                </tr>
                                <tr className="bg-cyan-900/10 hover:bg-cyan-900/20 transition-colors">
                                    <td className="p-6 text-white font-medium">Achievements & Gamification</td>
                                    <td className="text-center p-6"><Check className="h-6 w-6 text-cyan-400 mx-auto" strokeWidth={3} /></td>
                                    <td className="text-center p-6"><X className="h-6 w-6 text-red-500/50 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Why Switch Section */}
                <section className="max-w-6xl mx-auto py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                        Why Switch to TypeMasterAI?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
                            <CardHeader>
                                <Brain className="h-12 w-12 text-cyan-400 mb-4" />
                                <CardTitle className="text-white">Smart Adaptive Engine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">
                                    Just like Keybr, our engine tracks your keystrokes. But we go further by integrating AI to explain <em>why</em> you are making mistakes and how to fix them specifically.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors">
                            <CardHeader>
                                <Code className="h-12 w-12 text-purple-400 mb-4" />
                                <CardTitle className="text-white">Real-World Coding</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">
                                    Keybr uses generated nonsense words. We let you practice on real code snippets from popular open-source projects in 10+ programming languages.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors">
                            <CardHeader>
                                <Trophy className="h-12 w-12 text-green-400 mb-4" />
                                <CardTitle className="text-white">Engaging Progression</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">
                                    Don't get bored staring at a grey screen. unlock badges, climb leaderboards, and see your stats visualize beautifully as you improve.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* SEO Content */}
                <section className="max-w-4xl mx-auto py-16">
                    <article className="prose prose-invert prose-cyan max-w-none">
                        <h2 className="text-3xl font-bold text-white">Is TypeMasterAI the Keybr Killer?</h2>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            <strong>Keybr</strong> has been a staple for learning touch typing for years, famous for its algorithm that generates nonsense words to force you to learn key positions. However, its interface hasn't changed much in a decade.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            <strong>TypeMasterAI</strong> was built to solve the same problem—teaching touch typing without looking—but using modern web technologies and AI. We believe learning should be engaging, beautiful, and socially connected.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8">The "Real Words" Advantage</h3>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            While Keybr focuses on phonetic combinations, TypeMasterAI balances this with <strong>real-world vocabulary</strong> and <strong>syntax</strong>. This ensures that the muscle memory you build is immediately applicable to writing emails, documents, or code.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8">FAQ: Keybr vs TypeMasterAI</h3>

                        <h4 className="text-xl font-semibold text-cyan-400 mt-6">Is TypeMasterAI free?</h4>
                        <p className="text-lg text-slate-300">
                            Yes, 100% free. No ads, no paywalls for essential features.
                        </p>

                        <h4 className="text-xl font-semibold text-cyan-400 mt-6">Does it have a dark mode?</h4>
                        <p className="text-lg text-slate-300">
                            Yes, a modern dark mode is the default, designed to reduce eye strain during long practice sessions.
                        </p>

                        <h4 className="text-xl font-semibold text-cyan-400 mt-6">Can I import my data?</h4>
                        <p className="text-lg text-slate-300">
                            Currently, we don't support direct imports from Keybr, but our placement test will quickly calibrate the difficulty to your current skill level.
                        </p>

                        <div className="text-center mt-12">
                            <Link href="/learn">
                                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg px-12 py-6 rounded-full" data-testid="button-start-adaptive-bottom">
                                    <Keyboard className="mr-2 h-6 w-6" />
                                    Start Free Practice Now
                                </Button>
                            </Link>
                        </div>

                        <AuthorBio />
                    </article>
                </section>

            </div>
        </div>
    );
}
