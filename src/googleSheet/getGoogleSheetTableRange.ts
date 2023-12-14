import { googleSheetConstants } from '@/constants/googleSheetConstants'
import { GoogleSheetMethod } from '@/enums/googleSheetEnum'
import { Auth, google } from 'googleapis'

const { JWT, UserRefreshClient, BaseExternalAccountClient, Impersonated, Compute } = Auth

export type GoogleSheetClient = Auth.JWT | Auth.UserRefreshClient | Auth.BaseExternalAccountClient | Auth.Impersonated | Auth.Compute

export async function getRangeFromGoogleSheet(client: GoogleSheetClient, rangeOrSheetName: string) {
  try {
    const sheet = await google.sheets({
      version: "v4",
      auth: client,
    })

    const tableContent = await sheet.spreadsheets.values.get({
      spreadsheetId: googleSheetConstants.googleSheetId,
      range: rangeOrSheetName,
      dateTimeRenderOption: GoogleSheetMethod.DateTimeRenderOption.FORMATTED_STRING,
      majorDimension: GoogleSheetMethod.MajorDimension.ROWS,
      valueRenderOption: GoogleSheetMethod.ValueRenderOption.FORMATTED_VALUE
    })
    return tableContent
  } catch (err) {
    console.log(err)
  }
}