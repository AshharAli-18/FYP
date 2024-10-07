import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import handleImage

function DragDropFileUpload({ onFileUpload }) {
  const [dragOver, setDragOver] = useState(false);


  return (
    <Paper
      variant="outlined"
      // onDragOver={handleDragOver}
      // onDragLeave={handleDragLeave}
      // onDrop={handleDrop}
      style={{
        border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
        padding: 20,
        textAlign: 'center',
        cursor: 'pointer',
        background: dragOver ? '#eee' : '#fafafa',
      }}
    >
      
      <label htmlFor="raised-button-file">
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        // onChange={handleChange}
      />
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <CloudUploadIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Typography>Drag and drop files here or click to select files</Typography>
        </Box>
      </label>
    </Paper>
  );
}

export default DragDropFileUpload;