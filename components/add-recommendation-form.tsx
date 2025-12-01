'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Category, Recommendation } from '@/app/lib/data';

interface AddRecommendationFormProps {
    onAdd: (recommendation: Omit<Recommendation, 'id'>) => void;
    onEdit: (id: string, recommendation: Omit<Recommendation, 'id'>) => void;
    editingItem: Recommendation | null;
    onClose: () => void;
}

export function AddRecommendationForm({ onAdd, onEdit, editingItem, onClose }: AddRecommendationFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        category: 'read' as Category,
        recommendedBy: '',
        title: '',
        link: '',
        notes: '',
        followRegularly: false,
    });

    // When editingItem changes, open the form and populate it
    useEffect(() => {
        if (editingItem) {
            setFormData({
                category: editingItem.category,
                recommendedBy: editingItem.recommendedBy,
                title: editingItem.title,
                link: editingItem.link,
                notes: editingItem.notes,
                followRegularly: editingItem.followRegularly,
            });
            setIsOpen(true);
        }
    }, [editingItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            onEdit(editingItem.id, formData);
        } else {
            onAdd(formData);
        }

        handleClose();
    };

    const handleClose = () => {
        setIsOpen(false);
        setFormData({
            category: 'read',
            recommendedBy: '',
            title: '',
            link: '',
            notes: '',
            followRegularly: false,
        });
        onClose();
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
            >
                <Plus className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white">
                    {editingItem ? 'Edit Recommendation' : 'Add Recommendation'}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent p-2.5 text-sm"
                            >
                                <option value="read">Read</option>
                                <option value="watch">Watch</option>
                                <option value="listen">Listen</option>
                                <option value="follow">Follow</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Name</label>
                            <input
                                type="text"
                                required
                                value={formData.recommendedBy}
                                onChange={(e) => setFormData({ ...formData, recommendedBy: e.target.value })}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent p-2.5 text-sm"
                                placeholder="Jane Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent p-2.5 text-sm"
                            placeholder="Book, Article, or Podcast Title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Link</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent p-2.5 text-sm"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent p-2.5 text-sm min-h-[100px]"
                            placeholder="Why do you recommend this?"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="follow"
                            checked={formData.followRegularly}
                            onChange={(e) => setFormData({ ...formData, followRegularly: e.target.checked })}
                            className="rounded border-zinc-300"
                        />
                        <label htmlFor="follow" className="text-sm text-zinc-600 dark:text-zinc-400">
                            I follow this regularly
                        </label>
                    </div>

                    <div className="pt-4">
                        <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                            {editingItem ? 'Save Changes' : 'Submit Recommendation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
