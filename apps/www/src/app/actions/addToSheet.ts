'use server';
import { google } from 'googleapis';
import auth from '@/lib/googleAuth';

const sheetId = process.env.SHEET_ID!;

export const addToSheet = async (data: Record<string, string>) => {
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  const range = 'Sheet1';

  const values = [Object.values(data)];

  try {
    const data = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });
    console.log('Data appended:', data);
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
};
