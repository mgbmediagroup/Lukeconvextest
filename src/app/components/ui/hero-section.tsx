import React from 'react';

export const Scene = () => {
    return (
        <div className="w-full h-full z-0 overflow-hidden bg-gradient-to-br from-[#000] to-[#1A2428]">
            {/* Animated 3D-style metallic boxes */}
            <div className="absolute inset-0" style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}>
                <div 
                    className="absolute inset-0"
                    style={{
                        animation: 'rotateBoxes 30s linear infinite',
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(20deg)'
                    }}
                >
                    {Array.from({ length: 100 }).map((_, index) => {
                        // Create helix pattern
                        const angle = (index / 100) * Math.PI * 8; // Multiple rotations
                        const radius = 15 + (index % 20) * 2; // Varying radius for depth
                        const xPos = Math.cos(angle) * radius;
                        const yPos = Math.sin(angle) * radius;
                        const zPos = (index - 50) * 0.5;
                        const rotation = index * 36;
                        
                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    transform: `translate(-50%, -50%) translateX(${xPos}rem) translateY(${yPos}rem) translateZ(${zPos}px) rotateY(${rotation}deg) rotateZ(${angle * 20}deg)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* 3D Box with metallic iridescent effect */}
                                <div 
                                    className="w-full h-full rounded-lg relative"
                                    style={{
                                        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)',
                                        boxShadow: `
                                            inset 2px 2px 8px rgba(255,255,255,0.1),
                                            inset -2px -2px 8px rgba(0,0,0,0.5),
                                            0 0 20px rgba(100,150,255,0.2),
                                            0 0 40px rgba(150,100,255,0.1)
                                        `,
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        animation: `iridescence ${3 + index * 0.1}s ease-in-out infinite alternate`,
                                        transformStyle: 'preserve-3d'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes rotateBoxes {
                    from {
                        transform: rotateX(0deg);
                    }
                    to {
                        transform: rotateX(360deg);
                    }
                }

                @keyframes iridescence {
                    0% {
                        filter: hue-rotate(0deg) brightness(0.8);
                    }
                    100% {
                        filter: hue-rotate(60deg) brightness(1.2);
                    }
                }
            `}</style>
        </div>
    );
};