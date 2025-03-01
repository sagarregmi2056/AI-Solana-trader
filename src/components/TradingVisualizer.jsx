import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const TradingVisualizer = () => {
    const canvasRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Generate random price data
        const generatePrice = (t) => {
            return 50 + 20 * Math.sin(t / 20) + 10 * Math.sin(t / 10) + 5 * Math.random();
        };

        // Transaction particles
        let particles = [];
        const addParticle = () => {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 3,
                speedY: (Math.random() - 0.5) * 3,
                life: 1,
                color: Math.random() > 0.5 ? '#9945FF' : '#14F195'
            });
        };

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(26, 27, 35, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw price chart
            ctx.beginPath();
            ctx.strokeStyle = alpha(theme.palette.primary.main, 0.6);
            ctx.lineWidth = 2;

            for (let i = 0; i < canvas.width; i++) {
                const price = generatePrice(time - i);
                const x = canvas.width - i;
                const y = canvas.height / 2 + (price - 50) * 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Draw blockchain connections
            ctx.beginPath();
            ctx.strokeStyle = alpha(theme.palette.secondary.main, 0.1);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                    }
                }
            }
            ctx.stroke();

            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= 0.01;

                ctx.beginPath();
                ctx.fillStyle = particle.color;
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                if (particle.life <= 0) {
                    particles.splice(index, 1);
                }
            });

            // Add new particles
            if (Math.random() < 0.1) {
                addParticle();
            }

            time++;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity: 0.8,
                pointerEvents: 'none'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </Box>
    );
};

export default TradingVisualizer; 