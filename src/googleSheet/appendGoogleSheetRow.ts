import { googleSheetConstants } from '@/constants/googleSheetConstants'
import { GoogleSheetMethod } from '@/enums/googleSheetEnum'
import { Auth, google } from 'googleapis'

export type GoogleSheetClient = Auth.JWT | Auth.UserRefreshClient | Auth.BaseExternalAccountClient | Auth.Impersonated | Auth.Compute

export async function appendGoogleSheetRow(client: GoogleSheetClient, rangeOrSheetName: string, row: string[]) {
  try {
    const sheet = await google.sheets({
      version: "v4",
      auth: client,
    })

    const tableContent = await sheet.spreadsheets.values.append({
      spreadsheetId: googleSheetConstants.googleSheetId,
      range: rangeOrSheetName,
      valueInputOption: GoogleSheetMethod.ValueInputOption.RAW,
      includeValuesInResponse: true,
      insertDataOption: GoogleSheetMethod.InsertDataOption.INSERT_ROWS,
      requestBody: {
        values: [row]
      }
    })
    return tableContent
  } catch (err) {
    console.log(err)
  }
}