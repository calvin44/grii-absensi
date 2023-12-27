import { ConvertToObjectsReturn } from './convertTableToObject';

export function getLastIdFromTable(table: ConvertToObjectsReturn["tableContent"]) {
  try {
    const lastRow = table[table.length - 1]
    return Number(lastRow["id"])
  } catch (err) {
    console.log(err)
  }
}