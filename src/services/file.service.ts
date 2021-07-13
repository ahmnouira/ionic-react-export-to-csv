import { File } from '@ionic-native/file'

export async function saveAsCSV(csv: any) {
  var fileName: any = 'data.csv'

  File.writeFile(File.dataDirectory, fileName, csv, {
    replace: true,
  })
    .then((_) => {
      alert('Success ;-)' + File.dataDirectory)
    })
    .catch((err) => {
      File.writeExistingFile(File.dataDirectory, fileName, csv)
        .then((_) => {
          alert('Success ;-)' + File.dataDirectory)
        })
        .catch((err) => {
          alert('Failure' + File.dataDirectory)
        })
    })
}
