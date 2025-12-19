import { Recommendation } from '@/app/lib/data';
import { ExternalLink, CheckCircle2, User } from 'lucide-react';

interface RecommendationCardProps {
    item: Recommendation;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-all duration-200 relative group">
            {/* Edit Button */}


            <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider
              ${item.category === 'read' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
              ${item.category === 'watch' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : ''}
              ${item.category === 'listen' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : ''}
              ${item.category === 'follow' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : ''}
            `}>
                            {item.category}
                        </span>
                        {item.followRegularly && (
                            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                Follow Regularly
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 group"
                        >
                            {item.title}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                        </a>
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.notes}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                <User className="w-3 h-3" />
                <span>Recommended by <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.recommendedBy}</span></span>
            </div>
        </div>
    );
}
