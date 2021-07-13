import { IonItem, IonButton } from '@ionic/react'

import { CSVDownloader as ReactCSVDownloader, jsonToCSV } from 'react-papaparse'
import { data } from '../datasource/data'

type CSVDownloaderProps = {
  data: any[]
}

export const CSVDownloader = ({}: CSVDownloaderProps) => {
  return (
    <ReactCSVDownloader data={jsonToCSV(data)} type='button' filename={'data'} bom={true}>
      <IonItem lines='none'>
        <IonButton color='primary' size='large' slot='end'>
          Export
        </IonButton>
      </IonItem>
    </ReactCSVDownloader>
  )
}
