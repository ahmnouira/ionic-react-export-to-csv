import { File } from '@ionic-native/file'

export async function saveAsCSV(csv: Blob) {
  var fileName: any = 'data.csv'
  return await File.writeFile(File.dataDirectory, fileName, csv, {
    replace: true,
  })
}

export async function resolveFile(path: string) {
  return await File.resolveLocalFilesystemUrl(path)
}

export async function readFile(path: string) {
  return await File.readAsDataURL(path, 'data.csv')
}
