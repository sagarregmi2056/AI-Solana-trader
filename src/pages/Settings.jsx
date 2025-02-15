import React from 'react';
import { Paper, Grid, TextField, Switch, FormControlLabel, Button, Typography } from '@mui/material';

function Settings() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Trading Parameters
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Maximum Investment per Trade (SOL)"
                                type="number"
                                defaultValue={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Take Profit (%)"
                                type="number"
                                defaultValue={50}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Stop Loss (%)"
                                type="number"
                                defaultValue={20}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label="Enable AI Trading Assistant"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Token Filters
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Minimum Liquidity (SOL)"
                                type="number"
                                defaultValue={10}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label="Skip Tokens with Suspicious Features"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label="Only Trade on Verified DEXs"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large">
                    Save Settings
                </Button>
            </Grid>
        </Grid>
    );
}

export default Settings;
