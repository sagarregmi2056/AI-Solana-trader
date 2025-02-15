import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function TokenMonitor() {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080`);

        ws.onmessage = (event) => {
            const newToken = JSON.parse(event.data);
            setTokens(prev => [newToken, ...prev]);
        };

        return () => ws.close();
    }, []);

    const columns = [
        { id: 'timestamp', label: 'Time' },
        { id: 'token', label: 'Token' },
        { id: 'dex', label: 'DEX' },
        { id: 'price', label: 'Price' },
        { id: 'liquidity', label: 'Liquidity' },
        { id: 'analysis', label: 'Analysis' },
        { id: 'actions', label: 'Actions' },
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokens.map((token, index) => (
                        <TableRow key={index}>
                            <TableCell>{new Date(token.timestamp).toLocaleTimeString()}</TableCell>
                            <TableCell>{token.symbol}</TableCell>
                            <TableCell>{token.dex}</TableCell>
                            <TableCell>{token.price}</TableCell>
                            <TableCell>{token.liquidity}</TableCell>
                            <TableCell>
                                <Chip
                                    label={token.analysis.suspicious ? "Suspicious" : "Safe"}
                                    color={token.analysis.suspicious ? "error" : "success"}
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" size="small">
                                    Buy
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TokenMonitor;
