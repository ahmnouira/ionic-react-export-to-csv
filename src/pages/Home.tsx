import * as React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonInput,
  IonGrid,
  IonRow,
} from '@ionic/react'
import './Home.css'
import { isPlatform } from '@ionic/react'
import { jsonToCSV, readString } from 'react-papaparse'
import { data } from '../datasource/data'
import { saveAsCSV } from '../services/file.service'
import { openCSVFile } from '../services/fileOpener.service'

type webCSVType = {
  isWeb: boolean
  data?: any
}

const Home: React.FC = () => {
  const [csvData, setCSVData] = React.useState<any[]>([])
  const [headerRow, setHeaderRow] = React.useState<any[]>([])

  const [webCSV, setWebCSV] = React.useState<webCSVType>({
    isWeb: false,
  })

  React.useEffect(() => {
    loadCSV()
  }, [])

  const extractData = (res: string) => {
    let csvData = res || ''
    readString(csvData, {
      complete: (parsedData) => {
        const p = parsedData as any
        setHeaderRow(p.data.splice(0, 1)[0])
        setCSVData(parsedData.data)
      },
    })
  }

  const loadCSV = () => {
    extractData(jsonToCSV(data))
  }

  const handleExport = async () => {
    let csv = jsonToCSV({
      fields: headerRow,
      data: csvData,
    })

    let blob = new Blob([csv], {
      type: 'text/csv',
    })

    if (isPlatform('cordova')) {
      try {
        const saved = await saveAsCSV(blob)
        if (saved) {
          await openCSVFile(saved.nativeURL)
      
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      setWebCSV({
        isWeb: true,
        data: URL.createObjectURL(blob),
      })
    }
  }

  const renderHeader = headerRow.map((header, index) => {
    return <th key={index}>{header}</th>
  })

  const reanderRows = csvData.map((row: any[], rowIndex) => {
    return (
      <tr key={rowIndex}>
        {row.map((data, dataIndex) => {
          return (
            <td key={dataIndex} className='data-col'>
              <IonInput type='text' value={csvData[rowIndex][dataIndex]} />
            </td>
          )
        })}
      </tr>
    )
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle></IonTitle>
          <IonButtons slot='start'>
            <IonButton onClick={handleExport}>Export</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollX>
        <IonGrid>
          <IonRow>
            <table className='styled-table'>
              <thead>
                <tr>{renderHeader}</tr>
              </thead>
              <tbody>{reanderRows}</tbody>
            </table>
          </IonRow>
        </IonGrid>
        {webCSV && webCSV.isWeb && webCSV.data ? (
          <a href={webCSV.data} download={'data.csv'} style={{ fontSize: 34, color: 'red' }}>
            Download data
          </a>
        ) : null}
      </IonContent>
    </IonPage>
  )
}

export default Home
