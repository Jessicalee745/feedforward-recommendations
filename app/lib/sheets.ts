import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost'
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

export interface SheetRecommendation {
    id: string;
    category: string;
    recommended_by: string;
    title: string;
    link: string;
    notes: string;
    follow_regularly: string;
    created_at: string;
}

export async function getRecommendations(): Promise<SheetRecommendation[]> {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A2:H', // Start from row 2 to skip headers
        });

        const rows = response.data.values || [];

        return rows.map((row) => ({
            id: row[0] || '',
            category: row[1] || '',
            recommended_by: row[2] || '',
            title: row[3] || '',
            link: row[4] || '',
            notes: row[5] || '',
            follow_regularly: row[6] || 'false',
            created_at: row[7] || new Date().toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

export async function addRecommendation(recommendation: Omit<SheetRecommendation, 'id' | 'created_at'>): Promise<boolean> {
    try {
        const id = Date.now().toString();
        const created_at = new Date().toISOString();

        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:H',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    id,
                    recommendation.category,
                    recommendation.recommended_by,
                    recommendation.title,
                    recommendation.link,
                    recommendation.notes,
                    recommendation.follow_regularly,
                    created_at,
                ]],
            },
        });

        return true;
    } catch (error) {
        console.error('Error adding recommendation:', error);
        return false;
    }
}

export async function updateRecommendation(id: string, recommendation: Omit<SheetRecommendation, 'id' | 'created_at'>): Promise<boolean> {
    try {
        // First, find the row with this ID
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:A',
        });

        const ids = response.data.values || [];
        const rowIndex = ids.findIndex((row) => row[0] === id);

        if (rowIndex === -1) {
            console.error('Recommendation not found');
            return false;
        }

        // Update the row (rowIndex + 1 because sheet rows are 1-indexed, +1 more for header row)
        const sheetRow = rowIndex + 2;

        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: `Sheet1!B${sheetRow}:G${sheetRow}`, // Update columns B-G (excluding id and created_at)
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    recommendation.category,
                    recommendation.recommended_by,
                    recommendation.title,
                    recommendation.link,
                    recommendation.notes,
                    recommendation.follow_regularly,
                ]],
            },
        });

        return true;
    } catch (error) {
        console.error('Error updating recommendation:', error);
        return false;
    }
}
