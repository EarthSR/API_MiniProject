import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Container, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');

// Sample data for charts
const data = [
  { name: 'Jan', sessions: 28 },
  { name: 'Feb', sessions: 53 },
  { name: 'Mar', sessions: 51 },
  { name: 'Apr', sessions: 26 },
  { name: 'May', sessions: 58 },
];

const pageData = [
  { name: 'Jan', views: 90 },
  { name: 'Feb', views: 70 },
  { name: 'Mar', views: 80 },
  { name: 'Apr', views: 85 },
  { name: 'May', views: 95 },
  { name: 'Jun', views: 70 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้ที่ถูก report จาก API
    axios.get(`${url}/userreport`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then((response) => {
      setUsers(response.data); // ตั้งค่าผู้ใช้จากการตอบสนองของ API
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleBanUser = (userID) => {
    axios.put(`${url}/user/ban/${userID}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.data.status === true) {
        alert(response.data.message);
        setUsers((prevUsers) => prevUsers.map(user => user.userID === userID ? { ...user, isActive: 0 } : user));
      } else {
        alert('Failed to suspend user');
      }
    })
    .catch((error) => {
      console.error('Error suspending user:', error);
    });
  };

  const handleUnbanUser = (userID) => {
    axios.put(`${url}/user/unban/${userID}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.data.status === true) {
        alert(response.data.message);
        setUsers((prevUsers) => prevUsers.map(user => user.userID === userID ? { ...user, isActive: 1 } : user));
      } else {
        alert('Failed to unban user');
      }
    })
    .catch((error) => {
      console.error('Error unbanning user:', error);
    });
  };

  // ฟังก์ชันสำหรับ logout
  const handleLogout = () => {
    axios.post(`${url}/logout`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then((response) => {
      if (response.data.status === true) {
        // ลบ token ออกจาก localStorage
        localStorage.removeItem('token');
        
        // นำทางไปยังหน้า login
        navigate('/signinadmin');
        
        // ป้องกันการย้อนกลับไปยังหน้า dashboard
        window.history.pushState(null, '', '/signinadmin');
        window.addEventListener('popstate', () => {
          window.history.pushState(null, '', '/signinadmin');
        });
      }
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F8E9F0', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: '#F8E9F0',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Charts */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid black' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ผู้ใช้งานใหม่
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" stroke="#000" />
                      <YAxis stroke="#000" />
                      <Tooltip />
                      <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid black' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    จำนวนการแมท
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={pageData}>
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" stroke="#000" />
                      <YAxis stroke="#000" />
                      <Tooltip />
                      <Bar dataKey="views" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* User Table */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              ผู้ใช้ถูกระงับใหม่
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid black' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ padding: '16px', width: 100 }}>รหัส</TableCell>
                    <TableCell align="center" sx={{ padding: '16px', width: 100 }}>รูป</TableCell>
                    <TableCell align="left" sx={{ padding: '16px' }}>ชื่อผู้ใช้</TableCell>
                    <TableCell align="left" sx={{ padding: '16px' }}>เหตุผล</TableCell>
                    <TableCell align="center" sx={{ padding: '16px' }}>จัดการข้อมูล</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.userID}>
                      <TableCell align="center" sx={{ padding: '16px' }}>{user.userID}</TableCell>
                      <TableCell align="center" sx={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar 
                          src={`${url}/user/image/${user.imageFile}`} 
                          alt={user.username} 
                          sx={{ width: 50, height: 50 }} // ขนาดรูปภาพคงที่
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ padding: '16px' }}>{user.username}</TableCell>
                      <TableCell align="left" sx={{ padding: '16px' }}>{user.reportType || 'ไม่ระบุเหตุผล'}</TableCell>
                      <TableCell align="center" sx={{ padding: '16px' }}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                          {user.isActive === 1 ? (
                            <Button
                              variant="outlined"
                              sx={{
                                borderRadius: '10px',
                                color: 'red',
                                borderColor: 'red',
                                backgroundColor: 'white',
                                '&:hover': {
                                  backgroundColor: '#ffe6e6',
                                },
                              }}
                              onClick={() => handleBanUser(user.userID)}
                            >
                              ระงับผู้ใช้
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{
                                borderRadius: '10px',
                                color: 'black',
                                borderColor: 'black',
                                backgroundColor: 'white',
                                '&:hover': {
                                  backgroundColor: '#f8e9f0',
                                },
                              }}
                              onClick={() => handleUnbanUser(user.userID)}
                            >
                              ปลดแบน
                            </Button>
                          )}
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
