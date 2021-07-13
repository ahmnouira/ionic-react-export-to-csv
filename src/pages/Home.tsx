import * as React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonInput } from '@ionic/react';
import {TableData} from '../components/TableData';
import './Home.css';
import {isPlatform} from '@ionic/react'
import {jsonToCSV, readString} from 'react-papaparse'
import { data } from '../datasource/data';
import { saveAsCSV } from '../services/file.service';

const Home: React.FC = () => {

  const [csvData, setCSVData] = React.useState<any[]>([])
  const [headerRow, setHeaderRow] = React.useState<any[]>([])


  React.useEffect(() => {
      loadCSV()
  }, [])


  const  extractData = (res: string)  => {
    let csvData = res || '';
 
    readString(csvData, {
      complete: parsedData => {
        const p  = parsedData as any
        setHeaderRow(p.data.splice(0, 1)[0]);
        setHeaderRow(parsedData.data);
      }
    });
  }

  const loadCSV = () => {
    extractData(jsonToCSV(data))
  }



  const handleExport = async  () => {

    let csv = jsonToCSV({
      fields: headerRow,
      data: csvData
    });

    if (isPlatform('cordova')) {
      const  saved =  await saveAsCSV(csv)
    } else {
        // Dummy implementation for Desktop download purpose
        let blob = new Blob([csv]);
        let a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'newdata.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

  }

  const renderHeader = headerRow.map((header, index) => {

    return (
      <td key={index}>

        <b>{{ header }}</b>
        </td>
    )
  })

  const reanderRows = csvData.map((row: any[], rowIndex) => {
    return(
      <tr key={rowIndex}> 
          {row.map((data, dataIndex) => {
            return <td key={dataIndex} className='data-col'>
                <IonInput type="text" value={csvData[rowIndex][dataIndex]} />
            </td>
          })}
      </tr>
    )
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Export</IonTitle>
          <IonButtons slot="start">
      <IonButton onClick={handleExport}>
        Export
      </IonButton>
    </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollX>
            <table  className="data-table">
          <tr>
           {renderHeader}
          </tr>
          {reanderRows}
          </table>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
