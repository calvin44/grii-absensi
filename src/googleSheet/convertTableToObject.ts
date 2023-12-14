interface GoogleSheetResponse {
  data: Array<Array<string | number>>
}

interface TableObject {
  [header: string]: string | number
}

export function convertToObjects(sheetResponse: GoogleSheetResponse): TableObject[] {
  const [headers, ...rows] = sheetResponse.data;

  return rows.map((row) => {
    const obj: TableObject = {};
    headers.forEach((header, index) => {
      obj[header as string] = row[index];
    });
    return obj;
  });
}