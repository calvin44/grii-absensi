import { NextApiRequest, NextApiResponse } from 'next'
import { googleAuth } from '@/googleSheet/auth'
import { getRangeFromGoogleSheet, GoogleSheetClient } from '@/googleSheet/getGoogleSheetTableRange'
import { ConvertToObjectsReturn, convertToObjects } from '@/googleSheet/convertTableToObject'
import { getLastIdFromTable } from '@/googleSheet/getLastIdFromTable'
import { convertTableObjectToArray } from '@/googleSheet/convertTableObjectToArray'
import { appendGoogleSheetRow } from '@/googleSheet/appendGoogleSheetRow'

interface ErrorResponse {
  error: string
  message: string
}

interface SuccessResponse {
  status: "Success" | "Fail",
  updatedRow: AddProfilJemaat
}

export interface AddProfilRequest {
  "Tanggal Datang Gereja": string,
  "Nama Lengkap": string,
  "No HP": string,
  "Line ID": string,
  "Email": string,
  "Asal Daerah di Indonesia": string,
  "Tanggal Lahir": string,
  "Kampus": string,
  "Tempat Kerja (jika sudah bekerja)": string,
  "Pendidikan Saat Ini": string,
  "Asal Gereja": string,
  "Sudah Dibaptis": string
}

interface AddProfilJemaat extends AddProfilRequest {
  "id": string
}

type ResponseData = SuccessResponse | ErrorResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed.' })
    }

    const profilJemaat = req.body as AddProfilRequest
    const googleSheetSheetName = "Bank data jemaat GRII Taipei"
    const client: GoogleSheetClient = await googleAuth()
    const googleSheetTable = await getRangeFromGoogleSheet(client, googleSheetSheetName)

    if (!googleSheetTable) throw new Error("GoogleSheet API Error, please check the log")

    // handle no data / empty table
    const googleSheetTableValues = googleSheetTable.data.values
    if (!googleSheetTableValues) throw new Error("Empty Table")

    const tableContent: ConvertToObjectsReturn["tableContent"] = convertToObjects(googleSheetTableValues).tableContent

    // get the last id
    const lastId = getLastIdFromTable(tableContent) || 0
    const currentId = lastId + 1

    // create new object with the correct id
    const updatedProfilJemaat = { ...profilJemaat, id: currentId.toString() }

    const googleSheetHeader = googleSheetTableValues[0]
    const insertedRow = convertTableObjectToArray(updatedProfilJemaat, googleSheetHeader)

    appendGoogleSheetRow(client, googleSheetSheetName, insertedRow)

    return res.status(200).json({ status: "Success", updatedRow: updatedProfilJemaat })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please check the server logs.',
    })
  }
}
