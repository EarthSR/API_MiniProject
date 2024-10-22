import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import webbg from './image/webbg.png';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function ImageComparisonPage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${webbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '0 16px',
        }}
      >
        {/* กล่องสำหรับชื่อ */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%',
            maxWidth: '1000px', // จำกัดขนาดความกว้างสูงสุด
            mb: 4,
            padding: '0 20px',
          }}
        >
          {/* ชื่อคนแรกอยู่ซ้าย */}
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              คุณ
            </Typography>
          </Box>

          {/* ข้อความความเหมือนอยู่ตรงกลาง */}
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              ความเหมือน
            </Typography>
            <Typography variant="h3" sx={{ color: '#ff4081', fontWeight: 'bold' }}>
              80%
            </Typography>
          </Box>

          {/* ชื่อดาราอยู่ทางขวา */}
          <Box sx={{ textAlign: 'center', flex: 1 }}>
          </Box>
        </Box>

        {/* ปุ่มย้อนกลับ */}
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            sx={{
              border: '1px solid #000', 
              borderRadius: '10px', 
              padding: '10px',
              width: '100%',
              maxWidth: { xs: '150px', md: '200px' }, 
              height: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',
              color: 'black',
              '&:hover': {
                backgroundColor: '#ffd996',
              },
            }}
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
