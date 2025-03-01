import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';

const AnimatedBackground = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            {/* Blockchain Nodes */}
            {[...Array(8)].map((_, index) => (
                <motion.div
                    key={`node-${index}`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.4,
                    }}
                    style={{
                        position: 'absolute',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: alpha(theme.palette.primary.main, 0.3),
                        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                        left: `${(index * 15) + 10}%`,
                        top: '50%',
                    }}
                />
            ))}

            {/* Connecting Lines */}
            {[...Array(7)].map((_, index) => (
                <motion.div
                    key={`connection-${index}`}
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                    }}
                    style={{
                        position: 'absolute',
                        left: `${(index * 15) + 12}%`,
                        top: '50%',
                        width: '15%',
                        height: 2,
                        background: `linear-gradient(90deg, 
                            transparent,
                            ${alpha(theme.palette.primary.main, 0.5)},
                            transparent
                        )`,
                        backgroundSize: '200% 100%',
                    }}
                />
            ))}

            {/* Data Packets */}
            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={`packet-${index}`}
                    animate={{
                        x: ['0%', '100%'],
                        y: [0, -20, 0, 20, 0],
                    }}
                    transition={{
                        x: {
                            duration: 8,
                            repeat: Infinity,
                            delay: index * 2,
                        },
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                        }
                    }}
                    style={{
                        position: 'absolute',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: theme.palette.secondary.main,
                        boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
                        left: 0,
                        top: '50%',
                    }}
                />
            ))}

            {/* Blockchain Blocks */}
            {[...Array(4)].map((_, index) => (
                <motion.div
                    key={`block-${index}`}
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        delay: index * 5,
                    }}
                    style={{
                        position: 'absolute',
                        width: 100,
                        height: 100,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        borderRadius: 10,
                        left: `${(index * 25) + 10}%`,
                        top: `${(index * 15) + 20}%`,
                    }}
                />
            ))}

            {/* Network Grid */}
            {[...Array(20)].map((_, index) => (
                <motion.div
                    key={`grid-${index}`}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                    }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 1,
                        background: alpha(theme.palette.primary.main, 0.1),
                        transform: `rotate(${index * 9}deg)`,
                        transformOrigin: 'center',
                    }}
                />
            ))}
        </Box>
    );
};

export default AnimatedBackground; 