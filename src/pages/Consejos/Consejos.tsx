// pages/Consejos/Consejos.tsx
/*import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonLoading, IonText } from '@ionic/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface LocationState {
  userId: number;
  scanId: number;
}

const Consejos: React.FC = () => {
  const location = useLocation<LocationState>();
  const { userId, scanId } = location.state;
  const [consejos, setConsejos] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(
      'https://tu-backend.com/premium/advice',
      { params: { user_id: userId, scan_id: scanId } }
    )
    .then(res => {
      // Serializamos el JSON para que useState<string> acepte un string
      setConsejos(JSON.stringify(res.data.consejos, null, 2));
    })
    .catch(err => {
      // Capturamos cualquier error y lo convertimos a string
      const detalle = err.response?.data?.detail || err.message;
      setConsejos(`❌ ${detalle}`);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [userId, scanId]);

  return (
    <IonPage>
      <IonContent className="resultado-bg">
        <IonLoading isOpen={loading} message="Obteniendo consejos..." />

        { !loading && (
          <IonText>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
              {consejos}
            </pre>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Consejos;
*/