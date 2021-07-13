import { FileOpener } from '@ionic-native/file-opener'

export async function openCSVFile(path: string) {
  return FileOpener.open(path, 'text/csv')
}
