import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

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

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const areaData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
];

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F8E9F0', minHeight: '100vh', overflow: 'hidden', paddingTop: '80px' }}> {/* ล็อกการเลื่อน */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#F8E9F0' }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={4}> {/* เพิ่ม spacing ให้มากขึ้นเพื่อให้การ์ดห่างกัน */}
            {/* การ์ดแสดงกราฟผู้ใช้งานใหม่ */}
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ผู้ใช้งานใหม่
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}> {/* ปรับความสูงให้มากขึ้น */}
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

            {/* การ์ดแสดงกราฟจำนวนการแมท */}
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    จำนวนการแมท
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}> {/* ปรับความสูงให้มากขึ้น */}
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

            {/* การ์ดแสดงกราฟ Pie Chart */}
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    การใช้ระบบโดยรวม (Pie Chart)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}> {/* ปรับความสูงให้มากขึ้น */}
                    <PieChart>
                      <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* การ์ดแสดงกราฟ Area Chart */}
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    สถิติการใช้งาน (Area Chart)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}> {/* ปรับความสูงให้มากขึ้น */}
                    <AreaChart data={areaData}>
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" stroke="#000" />
                      <YAxis stroke="#000" />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
