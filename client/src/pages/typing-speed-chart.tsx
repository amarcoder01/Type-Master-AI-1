import { Link } from 'wouter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Activity, Calculator, ArrowRight, Video } from 'lucide-react';
import { useSEO } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthorBio } from '@/components/author-bio';

const speedDistributionData = [
    { range: '0-20', count: 15, label: 'Beginner' },
    { range: '20-40', count: 35, label: 'Average' },
    { range: '40-60', count: 30, label: 'Above Avg' },
    { range: '60-80', count: 15, label: 'Fast' },
    { range: '80-100', count: 4, label: 'Pro' },
    { range: '100+', count: 1, label: 'Elite' },
];

const COLORS = ['#94a3b8', '#3b82f6', '#22d3ee', '#818cf8', '#c084fc', '#f472b6'];

export default function TypingSpeedChartPage() {
    useSEO({
        title: 'Typing Speed Chart & Distribution Graph | WPM Statistics - TypeMasterAI',
        description: 'Visual typing speed chart showing global WPM distribution. See where you rank among typists worldwide. Infographics and data for 2026 standards.',
        keywords: 'typing speed chart, wpm distribution graph, typing speed percentile, wpm chart, average typing speed graph, typing performance chart',
        canonical: 'https://typemasterai.com/typing-speed-chart',
        ogUrl: 'https://typemasterai.com/typing-speed-chart',
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Global Typing Speed Distribution Chart',
            image: 'https://typemasterai.com/opengraph.jpg',
            author: {
                '@type': 'Organization',
                name: 'TypeMasterAI'
            },
            description: 'Visual analysis of global typing speed distribution showing that the average falls between 30-40 WPM.',
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-slate-800/50 rounded-full mb-6 border border-slate-700">
                        <Activity className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-sm text-slate-300">Data Visualization</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Typing Speed <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Distribution Chart</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        See the global distribution of typing speeds. Where does your WPM fall on the bell curve?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="/">
                            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 shadow-lg shadow-purple-500/20" data-testid="button-check-rank">
                                Check My Rank
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Chart Section */}
            <section className="container mx-auto px-4 py-8">
                <Card className="max-w-5xl mx-auto bg-slate-900/80 border-slate-800 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-white text-2xl flex items-center">
                            <TrendingUp className="mr-2 text-cyan-400" />
                            Global WPM Distribution
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Percentage of typists in each speed range (Based on global data)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={speedDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis
                                        dataKey="range"
                                        stroke="#94a3b8"
                                        label={{ value: 'Words Per Minute (WPM)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        label={{ value: '% of Typists', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#1e293b' }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Bar dataKey="count" name="Percentage" radius={[4, 4, 0, 0]}>
                                        {speedDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Analysis Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-3">The "Average" Trap</h3>
                        <p className="text-slate-300">
                            Most people cluster around <strong>35-45 WPM</strong>. This is the speed of "casual" typing. Breaking past this requires moving from "visual typing" (looking at keys) to "touch typing" (muscle memory).
                        </p>
                    </div>
                    <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-3">The Elite 1%</h3>
                        <p className="text-slate-300">
                            Typing above <strong>100 WPM</strong> places you in the top 1% of typists globally. At this speed, you are typing at the speed of thought, which is a massive productivity booster for developers and writers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Chart Data Breakdown</h2>
                    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 mb-12">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800">
                                <tr>
                                    <th className="p-4 text-slate-300 font-semibold">Speed Range (WPM)</th>
                                    <th className="p-4 text-slate-300 font-semibold">Skill Level</th>
                                    <th className="p-4 text-slate-300 font-semibold text-right">Population %</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {speedDistributionData.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 text-white font-medium">{row.range}</td>
                                        <td className="p-4 text-cyan-400">{row.label}</td>
                                        <td className="p-4 text-slate-300 text-right">{row.count}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <AuthorBio />
                </div>
            </section>

            {/* Comparison CTA */}
            <section className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-2xl mx-auto">
                    <Calculator className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-4">Calculate Your Percentile</h2>
                    <p className="text-slate-300 mb-8">
                        Take a 1-minute test to find out exactly where you sit on this chart.
                    </p>
                    <Link href="/">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6">
                            Start Speed Test
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
