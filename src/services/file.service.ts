import {File} from '@ionic-native/file'

export function convertToCSV(array: any[]): any {
    let csv: string = ''
    let line: string = ''

    let SpT: number = array[0].length
    let anzahlTeams: number = array.length

    //Header
    for (let i = 0; i < anzahlTeams; i++) {
      if (line != '') line += ';'
      line += "Team " + (i + 1)
    }
    csv += line + '\r\n';

    //Teams
    for (let i = 0; i < SpT; i++) {
      line = ''
      for (let j = 0; j < anzahlTeams; j++) {
        if (line != '') line += ';'
        
        line += array[j][i]
        
      }
      csv += line + '\r\n'
    }

    return csv
  }

 export async function saveAsCSV(csv: any) {

    var fileName: any = "exported.csv"
    File.writeFile(File.externalRootDirectory, fileName, csv, {
        replace: true
    })
      .then(
      _ => {
        alert('Success ;-)' + File.dataDirectory)
      }
      )
      .catch(
      err => {

           File.writeExistingFile(File.externalRootDirectory, fileName, csv)
          .then(
          _ => {
        alert('Success ;-)' + File.dataDirectory)
          }
          )
          .catch(
          err => {
            alert('Failure' + File.dataDirectory)
          }
          )
      }
      )

  } 