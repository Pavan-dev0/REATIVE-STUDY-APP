import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './App.css'; // Import custom styles


const PDFViewerApp = () => {
  const [showPdfApp, setShowPdfApp] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [pdfLoaded, setPdfLoaded] = useState(false); // Track whether PDF is loaded
  const [showACBP1, setShowACBP1] = useState(false); // State to show the ACBP1 button
  const [showChooseFile, setShowChooseFile] = useState(true); // State to show choose file input
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Default PDF URLs for ACBP1, ACBP2, ACBP3, ACBP4
  const pdfUrls = {
    Computers: `${process.env.PUBLIC_URL}/cs blueprint_merged.pdf`,
    Economics: `${process.env.PUBLIC_URL}/Economics.pdf`,
    Business: `${process.env.PUBLIC_URL}/Buissness BP_merged.pdf`,
    Accounts: `${process.env.PUBLIC_URL}/Accountancy.pdf`,
  }

  // Handle Open PDF Viewer Button
  const handleOpenPdfApp = () => {
    setShowPdfApp(true);
    setShowACBP1(true);  // Show the ACBP1 button once PDF viewer is open
    setShowChooseFile(true);  // Show choose file input
    setPdfLoaded(false);  // Reset PDF load state
  };

  // Handle File Input (Choose File)
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (e) => {
        setPdfError('');
        setPdfFile(e.target.result);  // Load the selected PDF
        setPdfLoaded(true);  // Mark as loaded once the PDF is selected
        setShowChooseFile(false); // Hide the choose file input after file is selected
      };
    } else {
      setPdfError('Not a valid PDF file. Please upload a PDF.');
      setPdfFile('');
    }
  };

  // Handle loading PDF based on the selected button (ACBP1, ACBP2, etc.)
  const handlePdfLoad = (pdfKey) => {
    setPdfFile(pdfUrls[pdfKey]); // Load the PDF URL based on the key (ACBP1, ACBP2, etc.)
    setPdfLoaded(true); // Mark the PDF as loaded
    setShowChooseFile(false); // Hide choose file input
  };

  // Back to the Main Page or PDF Selection
  const handleBack = () => {
    setPdfFile(null);  // Clear PDF file
    setPdfLoaded(false); // Reset PDF load state
    setShowACBP1(true); // Show ACBP1 button again
    setShowChooseFile(true); // Show choose file input again
  };

  // Go back to the main page from the top-right button
  const handleTopRightButton = () => {
    setShowPdfApp(false); // Go back to the main screen
  };

  return (
    <div className="app-container">
      {/* Header at the top */}
      <header className="app-header">
        <h1>Project-211421</h1>
      </header>

      {/* Main Section */}
      {!showPdfApp ? (
        <div className="main-section">
          <button className="open-btn" onClick={handleOpenPdfApp}>
            Open PDF Viewer
          </button>
        </div>
      ) : (
        <div className="pdf-viewer-container">
          {/* Back Button */}
          <button onClick={handleBack} className="back-btn">
            Back
          </button>

          {/* Add new button on top-right that takes you back to the main page */}
          <button className="top-right-btn" onClick={handleTopRightButton}>
            Go to Main Page
          </button>

          <h3>PDF Viewer</h3>
          
          {/* Choose File Input */}
          {showChooseFile && (
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              style={{ marginBottom: '20px', display: 'block' }}
            />
          )}
          
          {/* Show error if invalid file */}
          {pdfError && <p style={{ color: 'red' }}>{pdfError}</p>}

          {/* Display the ACBP1, ACBP2, ACBP3, ACBP4 buttons arranged in 2x2 matrix */}
          <div className="load-pdf-buttons">
            {['Computers', 'Economics', 'Business', 'Accounts'].map((pdfKey) => (
              <button
                key={pdfKey}
                className={`acbp-btn ${pdfKey.toLowerCase()}`}
                onClick={() => handlePdfLoad(pdfKey)}
              >
                {pdfKey}
              </button>
            ))}
          </div>

          {/* PDF Viewer */}
          {pdfLoaded && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFViewerApp;
