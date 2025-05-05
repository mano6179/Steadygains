import React, { useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [sheetsData, setSheetsData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSheetsData(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload-excel', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setSheetsData(data.sheets);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error uploading file. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upload Excel Workbook
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="excel-upload"
          />
          <label htmlFor="excel-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Select File
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </Button>
        </Box>
        {file && (
          <Typography variant="body2" color="text.secondary">
            Selected file: {file.name}
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>

      {sheetsData && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Workbook Structure
          </Typography>
          <List>
            {Object.entries(sheetsData).map(([sheetName, data], index) => (
              <React.Fragment key={sheetName}>
                <ListItem>
                  <ListItemText
                    primary={sheetName}
                    secondary={`${data.row_count} rows, ${data.columns.length} columns`}
                  />
                </ListItem>
                {index < Object.keys(sheetsData).length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ExcelUpload; 