import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Button, IconButton } from '@mui/material';
import { PhotoLibrary } from '@mui/icons-material'; // ไอคอนรูปภาพ
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate จาก react-router-dom
import webbg from './image/webbg.png'; // นำเข้าภาพพื้นหลัง
import starImage from './image/star.png'; // นำเข้าภาพ star

export default function Minipage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // สถานะเพื่อเก็บ URL ของภาพที่อัปโหลด
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนหน้า

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result); // เก็บ URL ของภาพที่อัปโหลด
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = () => {
    navigate('/next1', { state: { image: imagePreviewUrl } }); // ส่งข้อมูลรูปภาพไปยังหน้า Next1
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${webbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center', // จัดกลางแนวนอน
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"> {/* จัดเรียงให้เป็นแถว */}
          {/* กล่องสำหรับอัปโหลดรูป */}
          <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ marginRight: 4 }}>
            <Card
              sx={{
                width: 350,
                height: 350,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // พื้นหลังของกล่องสีเทาอ่อน
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border: '2px solid #000', // กรอบสีดำ
                marginBottom: 2, // เพิ่มระยะห่างด้านล่าง
                position: 'relative', // ให้ position เป็น relative เพื่อให้จัดการตำแหน่งภาพที่อัปโหลดได้
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // ปรับการแสดงผลให้พอดีกับกล่อง
                        borderRadius: '10px', // ขอบมนสำหรับภาพที่อัปโหลด
                      }}
                    />
                  ) : (
                    <PhotoLibrary sx={{ fontSize: 50 }} /> // ไอคอนรูปภาพขนาดใหญ่
                  )}
                </IconButton>
              </CardContent>
            </Card>

            {/* ปุ่มทำนาย */}
            {imagePreviewUrl && ( // ตรวจสอบว่ามีการเลือกรูปภาพแล้วหรือไม่
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  width: '100%', // ให้ปุ่มกว้างเต็ม
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '10px', // ขอบมน
                  backgroundColor: '#FEFFDA', // สีพื้นหลังปุ่ม
                  color: '#000', // สีตัวอักษร
                  border: '1px solid #000', // กรอบสีดำ
                }}
                onClick={handlePredict} // เรียกใช้ฟังก์ชัน handlePredict เมื่อคลิกปุ่ม
              >
                ทำนาย
              </Button>
            )}
          </Box>

          {/* แสดงกรอบรูป star ขวามือกลางๆ */}
          <Box
            sx={{
              width: 'auto', // ใช้ขนาดตามต้นฉบับ
              height: 'auto', // ใช้ขนาดตามต้นฉบับ
              display: 'flex',
              justifyContent: 'center', // จัดกลางแนวนอน
              alignItems: 'center',
              overflow: 'hidden', // ไม่ให้แสดงเกินกรอบ
              maxWidth: '600px', // กำหนดขนาดสูงสุด
              maxHeight: '600px', // กำหนดขนาดสูงสุด
            }}
          >
            <img src={starImage} alt="Star" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> {/* กรอบรูป star */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
