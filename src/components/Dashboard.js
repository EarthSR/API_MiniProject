import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// ลงทะเบียน components ของ Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [CountAge, setAgeResponse] = useState(0);
    const [CountSimilarity, setSimilarityResponse] = useState(0);
    const [Topstar, setTopstarResponse] = useState([]);
    const [ageData, setAgeData] = useState([]);
    const [similarityData, setSimilarityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [countAgeResponse, countSimilarityResponse, topStarResponse, ageGraphData, similarityGraphData] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-age`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-similarity`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-star-top`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/age-count`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/similarity-count`)
                ]);

                setAgeResponse(countAgeResponse.data.Count);
                setSimilarityResponse(countSimilarityResponse.data.Count);
                setTopstarResponse(topStarResponse.data);
                setAgeData(ageGraphData.data);
                setSimilarityData(similarityGraphData.data);
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

    // รายชื่อเดือนภาษาไทย
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    // สร้างลิสต์ของเดือนทั้งหมด (1-12) และแมปข้อมูลที่ได้จากฐานข้อมูลให้ตรงกับเดือนเหล่านั้น
    const createDataForAllMonths = (data) => {
        const monthsWithData = new Array(12).fill(0).map((_, i) => ({
            month: i + 1,
            count_per_month: 0,  // ค่าเริ่มต้นของเดือนที่ไม่มีข้อมูล
        }));

        data.forEach(item => {
            const monthIndex = item.month - 1;  // เดือนในฐานข้อมูล (1-12) แต่ array index ใช้ 0-11
            if (monthIndex >= 0 && monthIndex < 12) {
                monthsWithData[monthIndex].count_per_month = item.count_per_month;
            }
        });

        return monthsWithData;
    };

    const allMonthsAgeData = createDataForAllMonths(ageData);
    const allMonthsSimilarityData = createDataForAllMonths(similarityData);

    // Prepare the data for Chart.js
    const chartData = {
        labels: thaiMonths,  // แสดงทุกเดือน
        datasets: [
            {
                label: 'Age Count per Month',
                data: allMonthsAgeData.map(item => item.count_per_month), // แสดงข้อมูลอายุของทุกเดือน
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Similarity Count per Month',
                data: allMonthsSimilarityData.map(item => item.count_per_month), // แสดงข้อมูลการเปรียบเทียบของทุกเดือน
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#F0F4F8', minHeight: '100vh', padding: '20px' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        {/* Count Age Card */}
                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                padding: '25px',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
                                }
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
                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                padding: '25px',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
                                }
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

                        {/* Line Graph */}
                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ marginTop: '5px' }}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                padding: '25px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#5F6368', fontWeight: 'bold' }}>
                                        Age and Similarity Count per Month
                                    </Typography>
                                    <Line data={chartData} options={options} />
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Top Celebrities Table */}
                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ marginTop: '5px' }}>
                            <Card sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                height: '340px',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                padding: '15px',  // ลด padding เพื่อลดความสูง
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#5F6368', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                        Top Celebrities
                                    </Typography>
                                    <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <Table sx={{ minWidth: 200 }} size="small" aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2D3436', padding: '6px' }}>#</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2D3436', padding: '6px' }}>Celebrity Name</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2D3436', padding: '6px' }}>Count</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Topstar.map((celebrity, index) => (
                                                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' }, padding: '6px' }}>
                                                        <TableCell align="center" sx={{ padding: '6px' }}>{index + 1}</TableCell>
                                                        <TableCell align="center" sx={{ padding: '6px' }}>{celebrity.ThaiCelebrities_name}</TableCell>
                                                        <TableCell align="center" sx={{ padding: '6px' }}>{celebrity.CelebrityCount}</TableCell>
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
