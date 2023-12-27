import { AddProfilRequest } from '@/pages/api/addProfilJemaat'

export function convertTableObjectToArray(tableContent: AddProfilRequest, headerArray: (keyof AddProfilRequest)[]): string[] {
  const arrayRow: string[] = headerArray.map(header => {
    const rowValue = tableContent[header] || "" // Use default value when property is missing
    return String(rowValue) // Convert to string to ensure the array contains strings
  })

  return arrayRow
}
