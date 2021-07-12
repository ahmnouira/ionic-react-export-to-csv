import {IonGrid, IonRow, IonCol, IonButton, IonItem} from '@ionic/react'
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import React from 'react';
import { data } from '../datasource/data';
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

  <IonItem lines="none">
    <IonButton color="primary" size="large" slot="end">
      export
    </IonButton>
  </IonItem>
  </React.Fragment>
  );
};

