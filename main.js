// Matrix Calculator Functions
function calculateMatrix() {
    const operation = document.getElementById('operation').value;
    const scalar = document.getElementById('scalar').value;
    
    // Get matrix A values
    const a11 = parseFloat(document.getElementById('a11').value) || 0;
    const a12 = parseFloat(document.getElementById('a12').value) || 0;
    const a21 = parseFloat(document.getElementById('a21').value) || 0;
    const a22 = parseFloat(document.getElementById('a22').value) || 0;
    
    // Get matrix B values
    const b11 = parseFloat(document.getElementById('b11').value) || 0;
    const b12 = parseFloat(document.getElementById('b12').value) || 0;
    const b21 = parseFloat(document.getElementById('b21').value) || 0;
    const b22 = parseFloat(document.getElementById('b22').value) || 0;
    
    let result = '';
    let steps = '';
    
    switch(operation) {
        case 'add':
            result = `[[${a11 + b11}, ${a12 + b12}], [${a21 + b21}, ${a22 + b22}]]`;
            steps = `
                <h4 class="font-bold mb-2">Langkah Penjumlahan:</h4>
                <div class="space-y-2 text-sm">
                    <div>(${a11}) + (${b11}) = ${a11 + b11}</div>
                    <div>(${a12}) + (${b12}) = ${a12 + b12}</div>
                    <div>(${a21}) + (${b21}) = ${a21 + b21}</div>
                    <div>(${a22}) + (${b22}) = ${a22 + b22}</div>
                </div>
            `;
            break;
        case 'subtract':
            result = `[[${a11 - b11}, ${a12 - b12}], [${a21 - b21}, ${a22 - b22}]]`;
            steps = `
                <h4 class="font-bold mb-2">Langkah Pengurangan:</h4>
                <div class="space-y-2 text-sm">
                    <div>(${a11}) - (${b11}) = ${a11 - b11}</div>
                    <div>(${a12}) - (${b12}) = ${a12 - b12}</div>
                    <div>(${a21}) - (${b21}) = ${a21 - b21}</div>
                    <div>(${a22}) - (${b22}) = ${a22 - b22}</div>
                </div>
            `;
            break;
        case 'multiply':
            const c11 = a11 * b11 + a12 * b21;
            const c12 = a11 * b12 + a12 * b22;
            const c21 = a21 * b11 + a22 * b21;
            const c22 = a21 * b12 + a22 * b22;
            result = `[[${c11}, ${c12}], [${c21}, ${c22}]]`;
            steps = `
                <h4 class="font-bold mb-2">Langkah Perkalian:</h4>
                <div class="space-y-2 text-sm">
                    <div>c₁₁ = (${a11}×${b11}) + (${a12}×${b21}) = ${c11}</div>
                    <div>c₁₂ = (${a11}×${b12}) + (${a12}×${b22}) = ${c12}</div>
                    <div>c₂₁ = (${a21}×${b11}) + (${a22}×${b21}) = ${c21}</div>
                    <div>c₂₂ = (${a21}×${b12}) + (${a22}×${b22}) = ${c22}</div>
                </div>
            `;
            break;
        case 'scalar':
            const k = parseFloat(scalar) || 1;
            result = `[[${k * a11}, ${k * a12}], [${k * a21}, ${k * a22}]]`;
            steps = `
                <h4 class="font-bold mb-2">Langkah Perkalian Skalar:</h4>
                <div class="space-y-2 text-sm">
                    <div>${k} × ${a11} = ${k * a11}</div>
                    <div>${k} × ${a12} = ${k * a12}</div>
                    <div>${k} × ${a21} = ${k * a21}</div>
                    <div>${k} × ${a22} = ${k * a22}</div>
                </div>
            `;
            break;
    }
    
    // Display result
    document.getElementById('result-display').innerHTML = formatMatrixDisplay(result);
    document.getElementById('step-by-step').innerHTML = steps;
    document.getElementById('result-section').style.display = 'block';
    
    // Animate result appearance
    anime({
        targets: '#result-section',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuart'
    });
}

function formatMatrixDisplay(matrixStr) {
    // Convert string representation to readable format
    return matrixStr.replace(/\[\[/g, '[[').replace(/\]\]/g, ']]').replace(/,/g, ', ');
}

// Operation change handler
document.getElementById('operation').addEventListener('change', function() {
    const scalarInput = document.getElementById('scalar');
    if (this.value === 'scalar') {
        scalarInput.style.display = 'block';
        scalarInput.focus();
    } else {
        scalarInput.style.display = 'none';
    }
});

// Smooth scroll function
function scrollToCalculator() {
    document.getElementById('calculator').scrollIntoView({
        behavior: 'smooth'
    });
}

// Coming soon popup
function showComingSoon() {
    alert('Fitur ini akan segera tersedia! Terus belajar matriks ya 😊');
}

// Animation functions
function initAnimations() {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        anime({
            targets: el,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: index * 200,
            easing: 'easeOutQuart'
        });
    });

    // Slide in from left
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach((el, index) => {
        anime({
            targets: el,
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 800,
            delay: 1000 + index * 300,
            easing: 'easeOutQuart'
        });
    });

    // Slide in from right
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach((el, index) => {
        anime({
            targets: el,
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 800,
            delay: 1000 + index * 300,
            easing: 'easeOutQuart'
        });
    });

    // Matrix card hover animations
    const matrixCards = document.querySelectorAll('.matrix-card');
    matrixCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });

    // Floating math symbols animation
    anime({
        targets: '.floating-math',
        translateY: [-10, 10],
        rotate: [-5, 5],
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: anime.stagger(500)
    });

    // Matrix input focus animations
    const matrixInputs = document.querySelectorAll('.matrix-input');
    matrixInputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                scale: 1.1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });

        input.addEventListener('blur', () => {
            anime({
                targets: input,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('fade-in')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('slide-in-left')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('slide-in-right')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Navigation smooth scrolling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Matrix visualization effects
function initMatrixEffects() {
    // Add particle effects to matrix displays
    const matrixDisplays = document.querySelectorAll('.matrix-display');
    matrixDisplays.forEach(display => {
        display.addEventListener('mouseenter', () => {
            anime({
                targets: display,
                backgroundColor: ['#ffffff', '#f8f9fa', '#ffffff'],
                duration: 1000,
                easing: 'easeInOutQuad'
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initScrollAnimations();
    initNavigation();
    initMatrixEffects();
    initInteractiveVisualizations();
    
    // Add some initial animation delay
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Interactive visualizations for matrix operations
function initInteractiveVisualizations() {
    // Create matrix visualization canvas if not exists
    if (!document.getElementById('matrix-canvas')) {
        return;
    }
    
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Matrix animation variables
    let matrixA = [[1, 2], [3, 4]];
    let matrixB = [[5, 6], [7, 8]];
    let currentOperation = 'add';
    let animationStep = 0;
    
    function drawMatrix(matrix, x, y, title, colors) {
        const cellSize = 40;
        const padding = 10;
        
        // Draw title
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(title, x + cellSize, y - 10);
        
        // Draw matrix cells
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const cellX = x + j * (cellSize + padding);
                const cellY = y + i * (cellSize + padding);
                
                // Cell background
                ctx.fillStyle = colors[i][j];
                ctx.fillRect(cellX, cellY, cellSize, cellSize);
                
                // Cell border
                ctx.strokeStyle = '#2C3E50';
                ctx.lineWidth = 2;
                ctx.strokeRect(cellX, cellY, cellSize, cellSize);
                
                // Cell text
                ctx.fillStyle = '#2C3E50';
                ctx.font = 'bold 18px JetBrains Mono';
                ctx.textAlign = 'center';
                ctx.fillText(matrix[i][j], cellX + cellSize/2, cellY + cellSize/2 + 6);
            }
        }
    }
    
    function animateOperation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Define colors for different operations
        const colors = {
            add: [['#FFD93D', '#FFD93D'], ['#6BCF7F', '#6BCF7F']],
            multiply: [['#FF6B6B', '#4ECDC4'], ['#45B7D1', '#96CEB4']]
        };
        
        // Draw matrices
        drawMatrix(matrixA, 50, 100, 'Matriks A', colors.add);
        drawMatrix(matrixB, 250, 100, 'Matriks B', colors.add);
        
        // Draw operation symbol
        ctx.fillStyle = '#D2691E';
        ctx.font = 'bold 36px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('+', 200, 140);
        
        // Draw result matrix (animated)
        if (animationStep > 30) {
            const result = matrixA.map((row, i) => 
                row.map((val, j) => val + matrixB[i][j])
            );
            
            const resultColors = result.map((row, i) => 
                row.map((val, j) => `rgba(210, 105, 30, ${Math.min(1, (animationStep - 30) / 20)})`)
            );
            
            drawMatrix(result, 450, 100, 'Hasil', resultColors);
            
            ctx.fillStyle = '#D2691E';
            ctx.font = 'bold 36px Inter';
            ctx.fillText('=', 400, 140);
        }
        
        animationStep++;
        if (animationStep > 60) {
            animationStep = 0;
        }
        
        requestAnimationFrame(animateOperation);
    }
    
    // Start animation
    animateOperation();
}

// Enhanced matrix calculator with visualization
function enhancedMatrixCalculator() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.border = '2px solid #9CAF88';
    canvas.style.borderRadius = '12px';
    canvas.style.margin = '20px auto';
    canvas.style.display = 'block';
    
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        calculatorSection.appendChild(canvas);
    }
}

// Call enhanced calculator when page loads
if (document.getElementById('calculator')) {
    enhancedMatrixCalculator();
}

// Utility functions for matrix operations
const MatrixUtils = {
    // Calculate determinant of 2x2 matrix
    determinant2x2: function(a, b, c, d) {
        return a * d - b * c;
    },
    
    // Calculate inverse of 2x2 matrix
    inverse2x2: function(a, b, c, d) {
        const det = this.determinant2x2(a, b, c, d);
        if (det === 0) {
            return null; // Matrix is singular
        }
        const invDet = 1 / det;
        return {
            a: d * invDet,
            b: -b * invDet,
            c: -c * invDet,
            d: a * invDet
        };
    },
    
    // Transpose 2x2 matrix
    transpose2x2: function(a, b, c, d) {
        return {
            a: a, b: c,
            c: b, d: d
        };
    },
    
    // Format matrix for display
    formatMatrix: function(matrix) {
        return `[[${matrix.a}, ${matrix.b}], [${matrix.c}, ${matrix.d}]]`;
    }
};

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MatrixUtils;
}