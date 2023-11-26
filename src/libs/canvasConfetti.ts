import confetti from 'canvas-confetti'


export const canvasConfetti = () => {
    confetti({
        zIndex: 999,
        spread: 120,
        angle: 77,
        particleCount: Math.floor(200 * 3),
        origin:{
            x: 0,
            y: 1
        },
        decay: 0.95,
        scalar: 1
    })
    confetti({
        zIndex: 999,
        spread: 120,
        angle: 100,
        particleCount: Math.floor(200 * 3),
        origin:{
            x: 1,
            y: 1
        },
        decay: 0.95,
        scalar: 1
    })
}
