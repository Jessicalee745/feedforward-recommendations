import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '@/app/lib/sheets';
import { Category } from '@/app/lib/data';

export async function GET() {
    try {
        const sheetData = await getRecommendations();

        // Map sheet data to Recommendation format
        const recommendations = sheetData.map((row) => ({
            id: row.id,
            category: row.category as Category,
            recommendedBy: row.recommended_by,
            title: row.title,
            link: row.link,
            notes: row.notes,
            followRegularly: row.follow_regularly === 'true',
        }));

        return NextResponse.json({ recommendations });
    } catch (error) {
        console.error('Error in GET /api/recommendations:', error);
        return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    return NextResponse.json({ error: 'Submissions are currently disabled.' }, { status: 403 });
}

export async function PUT(request: NextRequest) {
    return NextResponse.json({ error: 'Updates are currently disabled.' }, { status: 403 });
}
