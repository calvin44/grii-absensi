import { NextApiRequest, NextApiResponse } from 'next'
import { googleAuth } from '@/googleSheet/auth'
import { getRangeFromGoogleSheet, GoogleSheetClient } from '@/googleSheet/getGoogleSheetTableRange'
import { convertToObjects } from '@/googleSheet/convertTableToObject'

interface ErrorResponse {
  error: string
  message: string
}

interface SuccessResponse {
  data: any
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

    const client: GoogleSheetClient = await googleAuth()
    const googleSheetTable: GoogleSheetTable | null = await getRangeFromGoogleSheet(client, 'Absensi GRII Taipei 2024')

    if (!googleSheetTable) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'GoogleSheet API Error, please check the log',
      })
    }

    const successResponse: SuccessResponse = {
      data: googleSheetTable.data.values,
    }

    const objectTable = convertToObjects(successResponse)

    return res.status(200).json({ data: successResponse })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please check the server logs.',
    })
  }
}
