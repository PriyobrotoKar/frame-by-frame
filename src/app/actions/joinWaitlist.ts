"use server";
import { WaitlistForm, waitlistFormSchema } from "@/lib/schema";
import { GoogleAuth } from "google-auth-library";

import { google } from "googleapis";

const keys = JSON.parse(process.env.CREDS!);

export const joinWaitlist = async (data: WaitlistForm) => {
  const { data: parsedData, success } = waitlistFormSchema.safeParse(data);
  const sheetId = process.env.SHEET_ID!;

  if (!success) {
    console.error("Invalid data");
    throw new Error("Invalid data");
  }

  const auth = new GoogleAuth({
    credentials: keys,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const range = "Sheet1";

  const values = [[parsedData.name, parsedData.email]];

  try {
    const data = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });
    console.log("Data appended:", data);
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
};
