import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
    const performanceData = [
        { time: '00:00', value: 100 },
        { time: '04:00', value: 120 },
        { time: '08:00', value: 115 },
        { time: '12:00', value: 130 },
        { time: '16:00', value: 145 },
        { time: '20:00', value: 160 },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Total Profit</Typography>
                    <Typography variant="h4">+160 SOL</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Active Positions</Typography>
                    <Typography variant="h4">5</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Success Rate</Typography>
                    <Typography variant="h4">75%</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Available Balance</Typography>
                    <Typography variant="h4">500 SOL</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Performance Chart</Typography>
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#7C4DFF" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
