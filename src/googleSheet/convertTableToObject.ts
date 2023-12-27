interface TableObject {
  [header: string]: string | number
}{ }

export interface ConvertToObjectsReturn {
  tableContent: TableObject[],
  rowCount: number,
  columnCount: number
}

export function convertToObjects(sheetResponse: Array<Array<string | number>>): ConvertToObjectsReturn {
  const [headers, ...rows] = sheetResponse

  const tableObject = rows.map((row) => {
    const obj: TableObject = {}
    headers.forEach((header, index) => {
      obj[header as string] = row[index]
    })
    return obj
  })
  return {
    rowCount: tableObject.length,
    columnCount: headers.length,
    tableContent: tableObject
  }
}