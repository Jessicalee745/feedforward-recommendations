import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations, addRecommendation, updateRecommendation } from '@/app/lib/sheets';
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
    try {
        const body = await request.json();

        const success = await addRecommendation({
            category: body.category,
            recommended_by: body.recommendedBy,
            title: body.title,
            link: body.link || '',
            notes: body.notes || '',
            follow_regularly: body.followRegularly ? 'true' : 'false',
        });

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to add recommendation' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in POST /api/recommendations:', error);
        return NextResponse.json({ error: 'Failed to add recommendation' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        const success = await updateRecommendation(body.id, {
            category: body.category,
            recommended_by: body.recommendedBy,
            title: body.title,
            link: body.link || '',
            notes: body.notes || '',
            follow_regularly: body.followRegularly ? 'true' : 'false',
        });

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to update recommendation' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in PUT /api/recommendations:', error);
        return NextResponse.json({ error: 'Failed to update recommendation' }, { status: 500 });
    }
}
