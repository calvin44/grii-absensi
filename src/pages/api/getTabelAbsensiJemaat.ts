import { NextApiRequest, NextApiResponse } from 'next'
import { googleAuth } from '@/googleSheet/auth'
import { getRangeFromGoogleSheet, GoogleSheetClient } from '@/googleSheet/getGoogleSheetTableRange'
import { ConvertToObjectsReturn, convertToObjects } from '@/googleSheet/convertTableToObject'

interface ErrorResponse {
  error: string
  message: string
}

interface SuccessResponse {
  tableContent: ConvertToObjectsReturn["tableContent"] | []
}

type ResponseData = SuccessResponse | ErrorResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed', message: 'Only GET requests are allowed.' })
    }
    const googleSheetSheetName = "Absensi GRII Taipei 2024"
    const client: GoogleSheetClient = await googleAuth()
    const googleSheetTable = await getRangeFromGoogleSheet(client, googleSheetSheetName)

    if (!googleSheetTable) throw new Error("No GoogleSheet table found")

    // handle no data / empty table
    const googleSheetTableValues = googleSheetTable.data.values
    if (!googleSheetTableValues) return res.status(200).json({ tableContent: [] })

    const tableContent: ConvertToObjectsReturn["tableContent"] = convertToObjects(googleSheetTableValues).tableContent

    return res.status(200).json({ tableContent: tableContent })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please check the server logs.',
    })
  }
}
