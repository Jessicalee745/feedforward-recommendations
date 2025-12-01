export type Category = 'read' | 'watch' | 'listen' | 'follow';

export interface Recommendation {
    id: string;
    category: Category;
    recommendedBy: string;
    followRegularly: boolean;
    title: string;
    link: string;
    notes: string;
}

export const initialRecommendations: Recommendation[] = [
    // READ
    {
        id: '1',
        category: 'read',
        recommendedBy: 'Adam Davidson',
        followRegularly: false,
        title: 'Vibe Coding: Building Production-Grade Software With GenAI, Chat, Agents, and Beyond',
        link: '#', // Placeholder as link was "Audio and paperback here"
        notes: 'Call outs to many folks across the expert network',
    },
    {
        id: '2',
        category: 'read',
        recommendedBy: 'Jessica Johnston',
        followRegularly: false,
        title: 'AI Myths series - by Adam Davidson',
        link: '#', // Placeholder "Series posted in Discord here"
        notes: 'At the request of several members, Adam created a series of Fact Checks on common fears/myths/viral news stories about AI.',
    },
    {
        id: '3',
        category: 'read',
        recommendedBy: 'Jessica Johnston',
        followRegularly: false,
        title: '2025 AI Adoption Report',
        link: '#', // Placeholder "Wharton study here"
        notes: 'A good counter to the MIT "study" - (note the quotes, and refernce the Myths series above!), with real evidence on the impact of GenAI investments',
    },
    {
        id: '4',
        category: 'read',
        recommendedBy: 'Jessica Johnston',
        followRegularly: true,
        title: 'One Useful Thing',
        link: '#', // Placeholder "Substack here"
        notes: 'Obvi!',
    },
    // WATCH
    {
        id: '5',
        category: 'watch',
        recommendedBy: 'Jessica Johnston',
        followRegularly: false,
        title: 'How to be Fearless in the Age of AI - Fei Fei Li in conversation w. Reid Hoffman',
        link: '#', // Placeholder "From Masters of Scale - opening talk here"
        notes: "I really enjoyed this conversation. I am so interested in both her story (read her book, too!) and what she's building with Marble (World Labs).",
    },
    // LISTEN
    {
        id: '6',
        category: 'listen',
        recommendedBy: 'Jessica Johnston',
        followRegularly: true,
        title: 'Feedforward Podcast',
        link: 'https://Feedforward.fm',
        notes: 'Great conversations from across the year',
    },
    {
        id: '7',
        category: 'listen',
        recommendedBy: 'Jessica Johnston',
        followRegularly: true,
        title: 'AI Daily Brief',
        link: '#', // Placeholder "The AI Daily Brief: AI News and Analysis"
        notes: 'A favorite among members and experts',
    },
];
