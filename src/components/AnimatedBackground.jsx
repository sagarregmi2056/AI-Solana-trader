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
            {/* Animated Gradient Orbs */}
            {[...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20 + index * 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: 300 + index * 100,
                        height: 300 + index * 100,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 70%, transparent 100%)`,
                        filter: 'blur(40px)',
                        transform: `translate(${index * 200}px, ${index * 100}px)`
                    }}
                />
            ))}

            {/* Animated Lines */}
            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={`line-${index}`}
                    animate={{
                        x: [-1000, 2000],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 7 + index,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 2
                    }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.2)}, transparent)`,
                        transform: `rotate(${index * 45}deg)`,
                        top: `${20 + index * 20}%`
                    }}
                />
            ))}
        </Box>
    );
};

export default AnimatedBackground; 