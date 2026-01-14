import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { User } from 'lucide-react';

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Automated Financial Tracking",
        excerpt: "How AI is revolutionizing the way we track personal and business expenses, moving beyond manual spreadsheets to intelligent automation.",
        author: "Sarah Chen",
        date: "Jan 12, 2026",
        category: "Technology",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Understanding Email Metadata for Better Security",
        excerpt: "Deep dive into how we use email signatures and metadata to verify the authenticity of financial transaction notifications.",
        author: "Michael Ross",
        date: "Jan 8, 2026",
        category: "Security",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "Tax Season Prep: Getting Your Digital Receipts in Order",
        excerpt: "Tips and tricks for organizing your digital receipts and email confirmations before tax season arrives.",
        author: "Jessica Williams",
        date: "Dec 28, 2025",
        category: "Finance",
        readTime: "4 min read"
    },
    {
        id: 4,
        title: "New Feature: Multi-Currency Support",
        excerpt: "Announcing full support for over 150 currencies. Automatically convert and normalize transactions to your base currency.",
        author: "David Kim",
        date: "Dec 15, 2025",
        category: "Product",
        readTime: "3 min read"
    },
    {
        id: 5,
        title: "Why Immutable Financial Records Matter",
        excerpt: "Explaining our 'Confirm & Store' philosophy and why maintaining an immutable audit trail is crucial for financial data integrity.",
        author: "Alex Thompson",
        date: "Nov 30, 2025",
        category: "Architecture",
        readTime: "6 min read"
    },
    {
        id: 6,
        title: "MailLedger raises Seed Round",
        excerpt: "We're excited to announce our latest funding round to accelerate our mission of automating financial intelligence.",
        author: "Team MailLedger",
        date: "Nov 15, 2025",
        category: "Company",
        readTime: "2 min read"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">MailLedger Blog</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Insights, updates, and thoughts on finance, automation, and technology.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-indigo-600 transition-colors">
                                    <a href="#">{post.title}</a>
                                </h3>
                                <p className="text-slate-600 mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-slate-100 p-2 rounded-full">
                                            <User className="w-4 h-4 text-slate-500" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-slate-900">{post.author}</p>
                                            <p className="text-slate-500 text-xs">{post.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Signup (Optional) */}
                <div className="mt-20 bg-indigo-600 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
                    <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Get the latest updates, articles, and resources delivered weekly to your inbox.
                    </p>
                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
