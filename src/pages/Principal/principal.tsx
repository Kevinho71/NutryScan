import React, { useRef, useState } from 'react';
import {
  IonPage, IonContent, IonButton, IonLoading, IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './principal.css';

// Interfaz para tipear la respuesta de la API
interface ScanResponse {
  resultado?: {
    error?: boolean;
    ingredientes?: string[];
    nutrientes?: {
      calorias?: number;
      proteinas?: number;
      carbohidratos?: number;
      grasas?: number;
    };
    // Agrega otros campos que esperes en el resultado
  };
  tiempo_procesamiento?: string;
  status?: string;
  message?: string;
  // Agrega otros campos que esperes en la respuesta
}

const usuario = "Usuario Demo";

const Principal: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  
  // Estados para loading y errores
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const handleAbrirCamara = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.multiple = true; // Permitir múltiples imágenes
      fileInputRef.current.click();
    }
  };

  const handleAbrirGaleria = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.multiple = true; // Permitir múltiples imágenes
      fileInputRef.current.click();
    }
  };

  const handleConfiguracion = () => {
    history.push('/configuracion');
  };

  const handleImagenSeleccionada = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validar número de archivos (máximo 2 según tu backend)
    if (files.length > 2) {
      setToastMessage('⚠ Máximo 2 imágenes permitidas');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    // Validar tamaño de archivos (ejemplo: 5MB máximo por imagen)
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > maxSize) {
        setToastMessage('⚠ Las imágenes deben ser menores a 5MB');
        setToastColor('danger');
        setShowToast(true);
        return;
      }
    }

    const formData = new FormData();
    
    // Agregar todas las imágenes seleccionadas
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const usuario_id = 2; // ← Cambia este ID según tu app

    setIsLoading(true);

    try {
      
      const res = await axios.post<ScanResponse>(
        "https://nutry-scan-backend.onrender.com/scan/scan/ingredientes",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { usuario_id },
          timeout: 120000 // 2 minutos timeout (tu backend tarda ~36s)
        }
      );

      console.log("✅ Resultado del escaneo:", res.data);

      // Navegar a resultado con un pequeño delay para mostrar el toast
      setTimeout(() => {
        history.push({
          pathname: "/resultado",
          state: { 
            scanData: res.data // Enviamos toda la respuesta del backend
          }
        });
      }, 1500);

    } catch (err: any) {
      console.error("❌ Error al escanear:", err);
      
      let errorMessage = "Ocurrió un error al procesar la imagen";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "⏰ Tiempo de espera agotado. El análisis está tardando mucho.";
      } else if (err.response?.status === 400) {
        errorMessage = err.response?.data?.detail || "📷 Imagen no válida o problema con el archivo";
      } else if (err.response?.status === 500) {
        errorMessage = "🔧 Error del servidor. Intenta más tarde.";
      } else if (!navigator.onLine) {
        errorMessage = "📶 Sin conexión a internet";
      }

      setToastMessage(errorMessage);
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setIsLoading(false);
      // Limpiar el input para permitir seleccionar la misma imagen de nuevo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <IonPage>
      <button
        onClick={handleConfiguracion}
        className="boton-configuracion"
        aria-label="Configuración"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#3D6FA2" />
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7-3a1 1 0 0 0 .93-1.36l-1-2.32a1 1 0 0 0-.51-.51l-2.32-1A1 1 0 0 0 15 5.07V3.5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.57a1 1 0 0 0-.36.19l-2.32 1a1 1 0 0 0-.51.51l-1 2.32A1 1 0 0 0 3.5 12a1 1 0 0 0 1.36.93l2.32-1a1 1 0 0 0 .51-.51l1-2.32A1 1 0 0 0 9 8.93V7.5a1 1 0 0 0 1-1h2a1 1 0 0 0 1 1v1.43a1 1 0 0 0 .36.19l2.32 1a1 1 0 0 0 .51.51l1 2.32A1 1 0 0 0 20.5 12z" fill="#fff" />
        </svg>
      </button>

      <IonContent className="principal-bg">
        <div className="logo-container">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <circle cx="75" cy="75" r="75" fill="#3D6FA2" />
            <circle cx="75" cy="65" r="35" fill="#fff" />
            <ellipse cx="75" cy="120" rx="45" ry="28" fill="#fff" />
          </svg>
        </div>

        <div className="usuario-nombre">
          {usuario}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <IonButton 
            expand="block" 
            className="principal-btn" 
            onClick={handleAbrirCamara}
            disabled={isLoading}
          >
            📷 Escanear
          </IonButton>
          <IonButton 
            expand="block" 
            className="principal-btn" 
            onClick={handleAbrirGaleria}
            disabled={isLoading}
          >
            🖼 Galería
          </IonButton>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImagenSeleccionada}
        />

        {/* Loading spinner */}
        <IonLoading
          isOpen={isLoading}
          message="🔍 Analizando ingredientes y nutrientes..."
          duration={0}
          spinner="crescent"
        />

        {/* Toast para mensajes */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={4000}
          color={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Principal;