import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from '@mui/material/styles';

const EnhancedParticles = () => {
    const theme = useTheme();

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                particles: {
                    number: {
                        value: 12,
                        density: {
                            enable: true,
                            area: 800
                        }
                    },
                    groups: {
                        z5000: {
                            number: {
                                value: 4
                            },
                            zIndex: {
                                value: 5000
                            }
                        },
                        z7500: {
                            number: {
                                value: 4
                            },
                            zIndex: {
                                value: 7500
                            }
                        },
                        z2500: {
                            number: {
                                value: 4
                            },
                            zIndex: {
                                value: 2500
                            }
                        }
                    },
                    color: {
                        value: ["#6F7EF1", "#9945FF", "#14F195"]
                    },
                    shape: {
                        type: ["square"],
                        options: {
                            square: {
                                fill: true,
                            }
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: {
                            enable: true,
                            minimumValue: 0.2
                        },
                        animation: {
                            enable: true,
                            speed: 0.5,
                            minimumValue: 0.2,
                            sync: false
                        }
                    },
                    size: {
                        value: { min: 60, max: 80 },
                        random: true
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "top",
                        random: false,
                        straight: true,
                        outModes: {
                            default: "out",
                            top: "destroy",
                            bottom: "none"
                        },
                        attract: {
                            enable: false
                        }
                    },
                    rotate: {
                        value: 0,
                        random: false,
                        direction: "clockwise",
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: true
                        }
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        value: {
                            min: 0,
                            max: 360
                        },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false
                        }
                    },
                    stroke: {
                        width: 2,
                        color: {
                            value: "#9945FF",
                            animation: {
                                enable: true,
                                speed: 2,
                                sync: true
                            }
                        }
                    },
                    gradient: {
                        enable: true,
                        type: "radial",
                        angle: {
                            value: 0,
                            animation: {
                                enable: true,
                                speed: 2,
                                sync: true
                            }
                        }
                    }
                },
                detectRetina: true,
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: ["repulse"]
                        },
                        onClick: {
                            enable: true,
                            mode: "push"
                        }
                    },
                    modes: {
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            quantity: 2
                        }
                    }
                },
                emitters: {
                    direction: "top",
                    rate: {
                        delay: 2,
                        quantity: 2
                    },
                    position: {
                        x: 50,
                        y: 100
                    },
                    size: {
                        width: 100,
                        height: 0
                    }
                }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none"
            }}
        />
    );
};

export default EnhancedParticles; 