import * as React from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // สีหลักของธีม
    },
    secondary: {
      main: '#ff4081', // สีรองที่เด่นชัด
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // ฟอนต์เริ่มต้น
  },
});

export default function PredictApp() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate(); // สร้างตัวแปร navigate สำหรับการนำทาง

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // สร้าง preview URL สำหรับแสดงภาพ
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ฟังก์ชันนำทางไปยังหน้า signinadmin
  const handleLogin = () => {
    navigate('/signinadmin'); // นำทางไปยังหน้า signinadmin
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* ข้อความ whoami ที่เด่นชัดและฟอนต์สวย */}
            <Typography
              variant="h4" // ปรับขนาดฟอนต์ให้ใหญ่
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold', // ทำตัวหนา
                color: '#fff', // ใช้สีขาวให้เข้ากับพื้นหลังของ AppBar
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // เพิ่มเงาเพื่อให้ข้อความดูเด่น
                fontFamily: '"Courier New", Courier, monospace', // เปลี่ยนฟอนต์ให้มีลักษณะพิเศษ
              }}
            >
              whoami
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
                onClick={handleLogin} // เมื่อกดปุ่มจะเรียกฟังก์ชัน handleLogin
              >
                เข้าสู่ระบบ
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" component="div" gutterBottom>
              ระบบอัปโหลดรูปภาพ
            </Typography>

            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  อัปโหลดรูปภาพ
                </Typography>
                <input type="file" onChange={handleImageChange} style={{ marginTop: '10px', marginBottom: '10px' }} />

                {/* แสดง preview รูปภาพ */}
                {imagePreviewUrl && (
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button variant="contained" color="primary">
                    ถัดไป
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
