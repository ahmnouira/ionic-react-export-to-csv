import {IonGrid, IonRow, IonCol} from '@ionic/react'
import React from 'react';
import { data } from '../datasource/data';
import { CSVDownloader } from './CSVDownlaoder';
import './TableData.css';

type TableDataProps =  { }

export const TableData: React.FC<TableDataProps> = () => {


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


  return (
   <React.Fragment>
  <IonGrid class="ion-margin">
    <IonRow color="red">
      {renderHeaders}
    </IonRow>
    {renderRows}
  </IonGrid>
      <CSVDownloader data={data} />
  
 </React.Fragment>
  );
};

