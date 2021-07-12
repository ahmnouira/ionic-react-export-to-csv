import {IonGrid, IonRow, IonCol, IonButton, IonItem, IonText} from '@ionic/react'
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import React from 'react';
import { data } from '../datasource/data';
import { convertToCSV, saveAsCSV } from '../services/file.service';
import './TableData.css';

type TableDataProps =  { }


export const TableData: React.FC<TableDataProps> = () => {


  const [csv, setCSV] = React.useState('')


  const renderHeaders = data.map((d) => {
    return <IonCol  key={d.type}>{d.type}</IonCol>
  })

  const renderRows = new Array(2).fill(0).map((el, row) => {

    return (
      <IonRow key={row}>
     {data.map((d, typeIndex) => {
      return <IonCol key={`${d.type}-${row}`}>{data[typeIndex].values[row]}</IonCol>
    })}
    </IonRow>


  )
  })

  const handlePress =  async () => {
  const csv =  convertToCSV(data)
  setCSV(csv)
  console.log('csv', csv)
  await saveAsCSV(csv)

  }

  return (
   <React.Fragment>

  <IonGrid class="ion-margin">
    
    <IonRow color="red">
      {renderHeaders}
    </IonRow>
    {renderRows}
   
  </IonGrid>

  <IonItem lines="none">
    <IonButton color="primary" size="large" slot="end" onClick={handlePress}>
      export
    </IonButton>
  </IonItem>

  {csv ? <IonText>{csv}</IonText> : null}
  </React.Fragment>
  );
};

