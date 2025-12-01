'use client';

import { useState } from 'react';
import { initialRecommendations, Category, Recommendation } from '@/app/lib/data';
import { RecommendationCard } from '@/components/recommendation-card';
import { AddRecommendationForm } from '@/components/add-recommendation-form';
import { BookOpen, MonitorPlay, Headphones, UserPlus } from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('read');
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [editingItem, setEditingItem] = useState<Recommendation | null>(null);

  const filteredRecommendations = recommendations.filter(
    (item) => item.category === activeCategory
  );

  const handleAddRecommendation = (newRec: Omit<Recommendation, 'id'>) => {
    const recommendation: Recommendation = {
      ...newRec,
      id: Math.random().toString(36).substr(2, 9),
    };
    setRecommendations([recommendation, ...recommendations]);
  };

  const handleEditRecommendation = (id: string, updatedRec: Omit<Recommendation, 'id'>) => {
    setRecommendations(recommendations.map(item =>
      item.id === id ? { ...updatedRec, id } : item
    ));
    setEditingItem(null);
  };

  const handleEditClick = (item: Recommendation) => {
    setEditingItem(item);
  };

  const handleCloseForm = () => {
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Logo */}
              <img src="/logo-full.png" alt="Feedforward AI" className="h-12 w-auto object-contain" />
            </div>
            <h1 className="sr-only">Feedforward Advisory Network</h1>
            <p className="text-brand-navy dark:text-blue-300 font-sans text-sm tracking-wide uppercase font-semibold mt-1">
              Holiday Recommendations
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              What to Read, Watch and Listen To Over the Break
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto px-4 flex gap-6 mt-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('read')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap font-sans
              ${activeCategory === 'read'
                ? 'border-brand-gold text-brand-navy dark:border-brand-gold dark:text-white'
                : 'border-transparent text-zinc-500 hover:text-brand-navy dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
          >
            <BookOpen className="w-4 h-4" />
            What to Read
          </button>
          <button
            onClick={() => setActiveCategory('watch')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap font-sans
              ${activeCategory === 'watch'
                ? 'border-brand-gold text-brand-navy dark:border-brand-gold dark:text-white'
                : 'border-transparent text-zinc-500 hover:text-brand-navy dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
          >
            <MonitorPlay className="w-4 h-4" />
            What to Watch
          </button>
          <button
            onClick={() => setActiveCategory('listen')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap font-sans
              ${activeCategory === 'listen'
                ? 'border-brand-gold text-brand-navy dark:border-brand-gold dark:text-white'
                : 'border-transparent text-zinc-500 hover:text-brand-navy dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
          >
            <Headphones className="w-4 h-4" />
            What to Listen To
          </button>
          <button
            onClick={() => setActiveCategory('follow')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap font-sans
              ${activeCategory === 'follow'
                ? 'border-brand-gold text-brand-navy dark:border-brand-gold dark:text-white'
                : 'border-transparent text-zinc-500 hover:text-brand-navy dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
          >
            <UserPlus className="w-4 h-4" />
            Who to Follow
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {filteredRecommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} onEdit={handleEditClick} />
          ))}

          {filteredRecommendations.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No recommendations in this category yet.
            </div>
          )}
        </div>
      </main>

      <AddRecommendationForm
        onAdd={handleAddRecommendation}
        onEdit={handleEditRecommendation}
        editingItem={editingItem}
        onClose={handleCloseForm}
      />
    </div>
  );
}
