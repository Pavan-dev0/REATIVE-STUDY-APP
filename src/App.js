import React from 'react';
import PDFViewer from './PdfViewer';
import MusicPlayerWithTimer from './MusicPlayerWithTimer';
import AISEARCH from './AISEARCH';
import Chatbots from './AIBOT/Chatboter';

function App() {
  return (
    <div
      style={{
        padding: '250px',
        backgroundImage: `url('/Untitled design.jpg')`, // Use a relative path from the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures the background covers the entire screen
      }}
    >
      <PDFViewer />
      <MusicPlayerWithTimer />
      <AISEARCH />
      <Chatbots />
    </div>
  );
}

export default App;