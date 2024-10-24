import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Dashboard({ Toggle }) {
    const [CountAge, setAgeResponse] = useState(0);
    const [CountSimilarity, setSimilarityResponse] = useState(0);
    const [Topstar, setTopstarResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [countAgeResponse, countSimilarityResponse, topStarResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-age`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-similarity`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-star-top`)
                ]);

                setAgeResponse(countAgeResponse.data.Count);
                setSimilarityResponse(countSimilarityResponse.data.Count);
                setTopstarResponse(topStarResponse.data);
                setLoading(false);
            } catch (err) {
                setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#F0F4F8', minHeight: '100vh', padding: '20px' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} justifyContent="center" alignItems="center">  {/* เพิ่ม justifyContent และ alignItems เพื่อจัดให้อยู่กลาง */}
                        {/* Count Age Card */}
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                                padding: '20px',
                                width: '100%',
                                textAlign: 'center',
                                border: '1px solid #D1D9E6',
                                height: '100%',
                                marginTop: '100px',  // เพิ่ม marginTop ให้การ์ดแต่ละใบห่างจากขอบด้านบน
                                marginBottom: '10px'  // เพิ่ม marginBottom เพื่อสร้างระยะห่างในแนวตั้ง
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#5F6368', fontWeight: 'bold' }}>
                                        จำนวนอายุทั้งหมด
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: '#2D3436', fontWeight: 'bold' }}>
                                        {CountAge}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Count Similarity Card */}
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                                padding: '20px',
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '100px',
                                border: '1px solid #D1D9E6',
                                height: '100%',
                                marginBottom: '10px'  // เพิ่ม marginBottom ให้การ์ดแต่ละใบห่างจากการ์ดอื่น
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#5F6368', fontWeight: 'bold' }}>
                                        จำนวนการเปรียบเทียบ
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: '#2D3436', fontWeight: 'bold' }}>
                                        {CountSimilarity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Top Celebrities Table */}
                        <Grid item xs={12}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                                padding: '20px',
                                border: '1px solid #D1D9E6',
                                width: '100%',
                                marginTop: '20px',  // เพิ่ม marginTop เพื่อให้ห่างจากส่วนบนของหน้าจอ
                                marginBottom: '20px'  // เพิ่ม marginBottom เพื่อให้การ์ดมีช่องว่างในแนวตั้ง
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#5F6368', fontWeight: 'bold' }}>
                                        Top Celebrities
                                    </Typography>
                                    <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2D3436' }}>#</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2D3436' }}>Celebrity Name</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2D3436' }}>Count</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Topstar.map((celebrity, index) => (
                                                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' } }}>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="center">{celebrity.ThaiCelebrities_name}</TableCell>
                                                        <TableCell align="center">{celebrity.CelebrityCount}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Dashboard;
