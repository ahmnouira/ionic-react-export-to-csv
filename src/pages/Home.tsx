import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {TableData} from '../components/TableData';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Export</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Export Data Example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TableData />
      </IonContent>
    </IonPage>
  );
};

export default Home;
