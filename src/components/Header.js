import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate(); 

  const handleSignInClick = () => {
    navigate('/signinadmin'); 
  };

  const handleHomeClick = () => {
    navigate('/'); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(255, 182, 193, 0.8)', // สีชมพูอ่อนและปรับความโปร่งใส
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // เงาของแถบนำทาง
        }}
      >
        <Toolbar>
          <Box
            component="img"
            onClick={handleHomeClick} 
            sx={{
              height: 100, 
              width: 100,
              cursor: 'pointer',
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: '#FEFFDA',
              borderRadius: '10px',
              border: '1px solid #000',
              color: '#000',
              '&:hover': {
                backgroundColor: '#f5f5a0',
              },
            }}
            onClick={handleSignInClick}
            aria-label="เข้าสู่ระบบ"
          >
            เข้าสู่ระบบ
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
