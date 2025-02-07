"use server";
import { WaitlistForm, waitlistFormSchema } from "@/lib/schema";
import { GoogleAuth } from "google-auth-library";

import { google } from "googleapis";

const keys = JSON.parse(process.env.CREDS!);

export const joinWaitlist = async (data: WaitlistForm) => {
  const { data: parsedData, success } = waitlistFormSchema.safeParse(data);

  if (!success) {
    return { error: "Invalid data" };
  }

  const auth = new GoogleAuth({
    credentials: keys,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const sheetId = process.env.SHEET_ID!;
  const range = "Sheet1";

  const values = [[parsedData.name, parsedData.email]];

  sheets.spreadsheets.values
    .append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    })
    .then(({ data }) => {
      console.log("Data appended:", data);
    })
    .catch((error) => {
      throw error;
    });
};
