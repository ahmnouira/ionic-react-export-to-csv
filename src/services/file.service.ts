import { File } from '@ionic-native/file'

export async function saveAsCSV(csv: Blob) {
  var fileName: any = 'data.csv'
  return await File.writeFile(File.dataDirectory, fileName, csv, {
    replace: true,
  })
}
