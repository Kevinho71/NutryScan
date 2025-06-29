import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonBadge,
  IonImg
} from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import './resultado.css';

// Interfaces para tipear los datos
interface Ingrediente {
  nombre: string;
  descripcion: string;
}

interface NutrienteTabla {
  nombre: string;
  valor: string;
  interpretacion: string;
}

interface Aditivo {
  codigo: string;
  nombre: string;
  Toxicidad: string;
  Interpretacion: string;
}

interface ScanData {
  msg: string;
  id: number;
  resultado: {
    ingredientes: Ingrediente[];
    tabla_nutricional: NutrienteTabla[];
    Aditivos: Aditivo[];
    puntos_positivos: string[];
    advertencias: string[];
  };
  imagenes: string[];
  tiempo_procesamiento: string;
}

interface LocationState {
  scanData: ScanData;
  userId?: number; // ID del usuario
  isPremium?: boolean; // Estado premium del usuario
}

const Resultado: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const { scanData, userId, isPremium } = location.state || {};

  console.log("📋 Datos recibidos en Resultado:", scanData);

  // Verificar si hay datos
  if (!scanData || !scanData.resultado) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Resultado</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>❌ No se pudieron cargar los resultados</h2>
            <p>No se encontraron datos del análisis</p>
            <IonButton onClick={() => history.push('/')}>
              Volver al inicio
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const { resultado, imagenes, tiempo_procesamiento, id: scanId } = scanData;
  const { ingredientes, tabla_nutricional, Aditivos, puntos_positivos, advertencias } = resultado;

  // Función para navegar a la página de consejos
  const goToConsejos = () => {
    if (!isPremium) {
      // Redirigir a página de upgrade premium
      history.push('/premium-upgrade', {
        from: 'consejos',
        scanData: scanData,
        userId: userId
      });
      return;
    }
    
    history.push('/consejos', {
      userId: userId,
      scanId: scanId,
      scanData: scanData
    });
  };

  // Función para manejar clic en consejos cuando no es premium
  const handleConsejosClick = () => {
    if (isPremium) {
      goToConsejos();
    } else {
      // Mostrar modal o navegar a upgrade
      goToConsejos(); // Esto llevará al upgrade
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultado del Análisis</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div style={{ padding: '10px' }}>
          
          {/* Imagen escaneada */}
          {imagenes && imagenes.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>📷 Imagen Analizada</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonImg 
                  src={imagenes[0]} 
                  alt="Imagen escaneada"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
                <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                  ⏱ Procesado en: {tiempo_procesamiento}
                </p>
              </IonCardContent>
            </IonCard>
          )}

          {/* Ingredientes */}
          {ingredientes && ingredientes.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>🥘 Ingredientes ({ingredientes.length})</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {ingredientes.map((ingrediente, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <h3>{ingrediente.nombre}</h3>
                        <p>{ingrediente.descripcion}</p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Información Nutricional */}
          {tabla_nutricional && tabla_nutricional.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>📊 Información Nutricional</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {tabla_nutricional.map((nutriente, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <h3>{nutriente.nombre}</h3>
                        <p><strong>{nutriente.valor}</strong></p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                          {nutriente.interpretacion}
                        </p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Aditivos */}
          {Aditivos && Aditivos.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>⚗ Aditivos ({Aditivos.length})</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {Aditivos.map((aditivo, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <h3>{aditivo.nombre}</h3>
                        <p><strong>Código:</strong> {aditivo.codigo}</p>
                        <p><strong>Toxicidad:</strong> {aditivo.Toxicidad}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                          {aditivo.Interpretacion}
                        </p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Puntos Positivos */}
          {puntos_positivos && puntos_positivos.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>✅ Puntos Positivos</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {puntos_positivos.map((punto, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <p style={{ color: '#2dd36f' }}>✓ {punto}</p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Advertencias */}
          {advertencias && advertencias.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>⚠ Advertencias</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {advertencias.map((advertencia, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <p style={{ color: '#eb445a' }}>⚠ {advertencia}</p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Botones de acción */}
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <IonButton 
              expand="block" 
              color={isPremium ? "success" : "medium"}
              onClick={handleConsejosClick}
              style={{ 
                marginBottom: '15px',
                position: 'relative',
                opacity: isPremium ? 1 : 0.7
              }}
            >
              {isPremium ? (
                <>💡 Más consejos</>
              ) : (
                <>💡 Más consejos 👑 Premium</>
              )}
            </IonButton>

            {/* Mensaje para usuarios no premium */}
            {!isPremium && (
              <p style={{ 
                fontSize: '0.85rem', 
                color: '#666', 
                marginBottom: '15px',
                fontStyle: 'italic' 
              }}>
                🔓 Desbloquea consejos personalizados con Premium
              </p>
            )}

            <IonButton 
              expand="block" 
              fill="outline"
              onClick={() => history.push('/')}
              style={{ marginBottom: '10px' }}
            >
              🔄 Escanear otro producto
            </IonButton>
            
            <IonButton 
              expand="block"
              onClick={() => history.push('/historial')}
            >
              📋 Ver historial
            </IonButton>
          </div>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resultado;