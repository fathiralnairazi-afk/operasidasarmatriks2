// Enhanced Matrix Calculator with all requested operations
class MatrixCalculator {
    constructor() {
        this.matrixA = [[0, 0], [0, 0]];
        this.matrixB = [[0, 0], [0, 0]];
        this.sizeA = { rows: 2, cols: 2 };
        this.sizeB = { rows: 2, cols: 2 };
        
        this.init();
    }
    
    init() {
        this.updateMatrixSize('A');
        this.updateMatrixSize('B');
        this.fillExampleMatrices('addition');
    }
    
    updateMatrixSize(matrixName) {
        const rows = parseInt(document.getElementById(`matrix${matrixName}-rows`).value);
        const cols = parseInt(document.getElementById(`matrix${matrixName}-cols`).value);
        
        if (matrixName === 'A') {
            this.sizeA = { rows, cols };
            this.matrixA = this.createMatrix(rows, cols);
            this.generateMatrixInputs('A', rows, cols);
        } else {
            this.sizeB = { rows, cols };
            this.matrixB = this.createMatrix(rows, cols);
            this.generateMatrixInputs('B', rows, cols);
        }
    }
    
    createMatrix(rows, cols) {
        return Array(rows).fill().map(() => Array(cols).fill(0));
    }
    
    generateMatrixInputs(matrixName, rows, cols) {
        const container = document.getElementById(`matrix${matrixName}-input`);
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-input';
                input.id = `${matrixName.toLowerCase()}${i}${j}`;
                input.value = Math.floor(Math.random() * 10) + 1; // Random initial values
                input.addEventListener('input', () => this.updateMatrixFromInput(matrixName, i, j, input.value));
                container.appendChild(input);
            }
        }
    }
    
    updateMatrixFromInput(matrixName, row, col, value) {
        const numValue = parseFloat(value) || 0;
        if (matrixName === 'A') {
            this.matrixA[row][col] = numValue;
        } else {
            this.matrixB[row][col] = numValue;
        }
    }
    
    getMatrixFromInputs(matrixName) {
        const matrix = [];
        const size = matrixName === 'A' ? this.sizeA : this.sizeB;
        
        for (let i = 0; i < size.rows; i++) {
            const row = [];
            for (let j = 0; j < size.cols; j++) {
                const input = document.getElementById(`${matrixName.toLowerCase()}${i}${j}`);
                row.push(parseFloat(input.value) || 0);
            }
            matrix.push(row);
        }
        
        return matrix;
    }
    
    performOperation(operation) {
        this.matrixA = this.getMatrixFromInputs('A');
        this.matrixB = this.getMatrixFromInputs('B');
        
        let result = null;
        let steps = '';
        let info = '';
        
        try {
            switch(operation) {
                case 'add':
                    result = this.addMatrices(this.matrixA, this.matrixB);
                    steps = this.generateAdditionSteps(this.matrixA, this.matrixB, result);
                    info = 'Penjumlahan matriks dilakukan elemen per elemen';
                    break;
                    
                case 'subtract':
                    result = this.subtractMatrices(this.matrixA, this.matrixB);
                    steps = this.generateSubtractionSteps(this.matrixA, this.matrixB, result);
                    info = 'Pengurangan matriks dilakukan elemen per elemen';
                    break;
                    
                case 'multiply':
                    if (this.sizeA.cols !== this.sizeB.rows) {
                        throw new Error(`Perkalian matriks tidak valid: jumlah kolom A (${this.sizeA.cols}) harus sama dengan jumlah baris B (${this.sizeB.rows})`);
                    }
                    result = this.multiplyMatrices(this.matrixA, this.matrixB);
                    steps = this.generateMultiplicationSteps(this.matrixA, this.matrixB, result);
                    info = `Perkalian matriks A(${this.sizeA.rows}×${this.sizeA.cols}) dengan B(${this.sizeB.rows}×${this.sizeB.cols}) menghasilkan matriks ${result.length}×${result[0].length}`;
                    break;
                    
                case 'scalar':
                    const scalar = parseFloat(document.getElementById('scalar-value').value) || 1;
                    result = this.scalarMultiply(this.matrixA, scalar);
                    steps = this.generateScalarSteps(this.matrixA, scalar, result);
                    info = `Perkalian matriks A dengan skalar ${scalar}`;
                    break;
                    
                case 'transposeA':
                    result = this.transposeMatrix(this.matrixA);
                    steps = this.generateTransposeSteps(this.matrixA, result, 'A');
                    info = `Transpose matriks A: baris menjadi kolom, kolom menjadi baris`;
                    break;
                    
                case 'transposeB':
                    result = this.transposeMatrix(this.matrixB);
                    steps = this.generateTransposeSteps(this.matrixB, result, 'B');
                    info = `Transpose matriks B: baris menjadi kolom, kolom menjadi baris`;
                    break;
                    
                case 'inverseA':
                    if (this.sizeA.rows !== this.sizeA.cols) {
                        throw new Error('Invers hanya dapat dihitung untuk matriks persegi (n×n)');
                    }
                    result = this.inverseMatrix(this.matrixA);
                    if (result === null) {
                        throw new Error('Matriks A tidak memiliki invers (determinan = 0)');
                    }
                    steps = this.generateInverseSteps(this.matrixA, result, 'A');
                    info = `Invers matriks A: A × A⁻¹ = I (matriks identitas)`;
                    break;
                    
                case 'inverseB':
                    if (this.sizeB.rows !== this.sizeB.cols) {
                        throw new Error('Invers hanya dapat dihitung untuk matriks persegi (n×n)');
                    }
                    result = this.inverseMatrix(this.matrixB);
                    if (result === null) {
                        throw new Error('Matriks B tidak memiliki invers (determinan = 0)');
                    }
                    steps = this.generateInverseSteps(this.matrixB, result, 'B');
                    info = `Invers matriks B: B × B⁻¹ = I (matriks identitas)`;
                    break;
                    
                case 'determinantA':
                    if (this.sizeA.rows !== this.sizeA.cols) {
                        throw new Error('Determinan hanya dapat dihitung untuk matriks persegi (n×n)');
                    }
                    const detA = this.determinant(this.matrixA);
                    result = [[detA]];
                    steps = this.generateDeterminantSteps(this.matrixA, detA, 'A');
                    info = `Determinan matriks A: nilai yang menentukan apakah matriks memiliki invers`;
                    break;
                    
                case 'determinantB':
                    if (this.sizeB.rows !== this.sizeB.cols) {
                        throw new Error('Determinan hanya dapat dihitung untuk matriks persegi (n×n)');
                    }
                    const detB = this.determinant(this.matrixB);
                    result = [[detB]];
                    steps = this.generateDeterminantSteps(this.matrixB, detB, 'B');
                    info = `Determinan matriks B: nilai yang menentukan apakah matriks memiliki invers`;
                    break;
                    
                case 'powerA':
                    if (this.sizeA.rows !== this.sizeA.cols) {
                        throw new Error('Pangkat matriks hanya dapat dihitung untuk matriks persegi (n×n)');
                    }
                    result = this.matrixPower(this.matrixA, 2);
                    steps = this.generatePowerSteps(this.matrixA, 2, result, 'A');
                    info = `Pangkat matriks A²: A × A`;
                    break;
                    
                case 'powerB':
                    if (this.sizeB.rows !== this.sizeB.cols) {
                        throw new Error('Pangkat matriks hanya dapat dihitung untuk matriks persegi (n×n)');
                    }
                    result = this.matrixPower(this.matrixB, 2);
                    steps = this.generatePowerSteps(this.matrixB, 2, result, 'B');
                    info = `Pangkat matriks B²: B × B`;
                    break;
            }
            
            this.displayResult(result, steps, info);
            
        } catch (error) {
            this.displayError(error.message);
        }
    }
    
    // Matrix Operations Implementation
    addMatrices(A, B) {
        if (A.length !== B.length || A[0].length !== B[0].length) {
            throw new Error('Penjumlahan matriks memerlukan ukuran yang sama');
        }
        
        return A.map((row, i) => 
            row.map((val, j) => val + B[i][j])
        );
    }
    
    subtractMatrices(A, B) {
        if (A.length !== B.length || A[0].length !== B[0].length) {
            throw new Error('Pengurangan matriks memerlukan ukuran yang sama');
        }
        
        return A.map((row, i) => 
            row.map((val, j) => val - B[i][j])
        );
    }
    
    multiplyMatrices(A, B) {
        const resultRows = A.length;
        const resultCols = B[0].length;
        const commonDim = A[0].length;
        
        const result = Array(resultRows).fill().map(() => Array(resultCols).fill(0));
        
        for (let i = 0; i < resultRows; i++) {
            for (let j = 0; j < resultCols; j++) {
                for (let k = 0; k < commonDim; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        
        return result;
    }
    
    scalarMultiply(matrix, scalar) {
        return matrix.map(row => 
            row.map(val => val * scalar)
        );
    }
    
    transposeMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const result = Array(cols).fill().map(() => Array(rows).fill(0));
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                result[j][i] = matrix[i][j];
            }
        }
        
        return result;
    }
    
    determinant(matrix) {
        const n = matrix.length;
        
        if (n === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        
        if (n === 3) {
            const [a, b, c] = matrix[0];
            const [d, e, f] = matrix[1];
            const [g, h, i] = matrix[2];
            
            return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
        }
        
        if (n === 4) {
            // Simplified 4x4 determinant calculation
            let det = 0;
            for (let j = 0; j < 4; j++) {
                const subMatrix = this.getSubMatrix(matrix, 0, j);
                const sign = j % 2 === 0 ? 1 : -1;
                det += sign * matrix[0][j] * this.determinant(subMatrix);
            }
            return det;
        }
        
        throw new Error('Determinan untuk matriks berukuran lebih dari 4×4 tidak didukung');
    }
    
    getSubMatrix(matrix, row, col) {
        return matrix
            .slice(0, row).concat(matrix.slice(row + 1))
            .map(r => r.slice(0, col).concat(r.slice(col + 1)));
    }
    
    inverseMatrix(matrix) {
        const det = this.determinant(matrix);
        
        if (det === 0) {
            return null;
        }
        
        const n = matrix.length;
        
        if (n === 2) {
            const [a, b] = matrix[0];
            const [c, d] = matrix[1];
            const invDet = 1 / det;
            
            return [
                [d * invDet, -b * invDet],
                [-c * invDet, a * invDet]
            ];
        }
        
        if (n === 3) {
            // 3x3 inverse using adjugate method
            const result = Array(3).fill().map(() => Array(3).fill(0));
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const subMatrix = this.getSubMatrix(matrix, i, j);
                    const sign = ((i + j) % 2 === 0) ? 1 : -1;
                    result[j][i] = sign * this.determinant(subMatrix) / det;
                }
            }
            
            return result;
        }
        
        throw new Error('Invers untuk matriks berukuran lebih dari 3×3 tidak didukung');
    }
    
    matrixPower(matrix, power) {
        if (power === 1) return matrix;
        if (power === 2) return this.multiplyMatrices(matrix, matrix);
        
        // For higher powers, use repeated multiplication
        let result = matrix;
        for (let i = 1; i < power; i++) {
            result = this.multiplyMatrices(result, matrix);
        }
        return result;
    }
    
    // Step Generation Methods
    generateAdditionSteps(A, B, result) {
        let steps = '<h4 class="font-bold mb-2">Langkah Penjumlahan:</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                steps += `<div class="bg-yellow-100 p-2 rounded text-sm">c<sub>${i+1}${j+1}</sub> = ${A[i][j]} + ${B[i][j]} = ${result[i][j]}</div>`;
            }
        }
        
        steps += '</div>';
        return steps;
    }
    
    generateSubtractionSteps(A, B, result) {
        let steps = '<h4 class="font-bold mb-2">Langkah Pengurangan:</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                steps += `<div class="bg-blue-100 p-2 rounded text-sm">c<sub>${i+1}${j+1}</sub> = ${A[i][j]} - ${B[i][j]} = ${result[i][j]}</div>`;
            }
        }
        
        steps += '</div>';
        return steps;
    }
    
    generateMultiplicationSteps(A, B, result) {
        let steps = '<h4 class="font-bold mb-2">Langkah Perkalian Matriks:</h4>';
        
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                let calculation = `c<sub>${i+1}${j+1}</sub> = `;
                let sum = 0;
                
                for (let k = 0; k < A[0].length; k++) {
                    if (k > 0) calculation += ' + ';
                    calculation += `${A[i][k]} × ${B[k][j]}`;
                    sum += A[i][k] * B[k][j];
                }
                
                calculation += ` = ${sum}`;
                steps += `<div class="bg-green-100 p-2 rounded text-sm mb-2">${calculation}</div>`;
            }
        }
        
        return steps;
    }
    
    generateScalarSteps(matrix, scalar, result) {
        let steps = `<h4 class="font-bold mb-2">Langkah Perkalian Skalar (${scalar}):</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
        
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                steps += `<div class="bg-purple-100 p-2 rounded text-sm">${scalar} × ${matrix[i][j]} = ${result[i][j]}</div>`;
            }
        }
        
        steps += '</div>';
        return steps;
    }
    
    generateTransposeSteps(matrix, result, matrixName) {
        let steps = `<h4 class="font-bold mb-2">Langkah Transpose ${matrixName}:</h4><div class="bg-gray-100 p-3 rounded">`;
        steps += `<p class="mb-2">Menukar baris dan kolom:</p>`;
        steps += `<p class="text-sm">${matrixName}(baris, kolom) → ${matrixName}ᵗ(kolom, baris)</p>`;
        steps += `<p class="text-sm mt-2">Ukuran: ${matrix.length}×${matrix[0].length} → ${result.length}×${result[0].length}</p>`;
        steps += '</div>';
        return steps;
    }
    
    generateDeterminantSteps(matrix, determinant, matrixName) {
        const n = matrix.length;
        let steps = `<h4 class="font-bold mb-2">Langkah Determinan ${matrixName} (${n}×${n}):</h4>`;
        
        if (n === 2) {
            const [a, b] = matrix[0];
            const [c, d] = matrix[1];
            steps += `<div class="bg-blue-100 p-3 rounded">
                <p>det(${matrixName}) = ad - bc</p>
                <p>det(${matrixName}) = (${a} × ${d}) - (${b} × ${c})</p>
                <p>det(${matrixName}) = ${a * d} - ${b * c} = ${determinant}</p>
            </div>`;
        } else if (n === 3) {
            steps += `<div class="bg-blue-100 p-3 rounded">
                <p>Menggunakan ekspansi kofaktor:</p>
                <p>det(${matrixName}) = ${determinant}</p>
            </div>`;
        }
        
        return steps;
    }
    
    generateInverseSteps(matrix, inverse, matrixName) {
        const det = this.determinant(matrix);
        let steps = `<h4 class="font-bold mb-2">Langkah Invers ${matrixName}:</h4>`;
        steps += `<div class="bg-green-100 p-3 rounded">
            <p>1. Determinan ${matrixName} = ${det}</p>
            <p>2. 1/det = ${(1/det).toFixed(4)}</p>
            <p>3. Menggunakan rumus invers matriks</p>
            <p>4. ${matrixName}⁻¹ × ${matrixName} = I (matriks identitas)</p>
        </div>`;
        return steps;
    }
    
    generatePowerSteps(matrix, power, result, matrixName) {
        let steps = `<h4 class="font-bold mb-2">Langkah Pangkat ${matrixName}^${power}:</h4>`;
        steps += `<div class="bg-yellow-100 p-3 rounded">
            <p>${matrixName}^${power} = ${matrixName} × ${matrixName}</p>
            <p>Menggunakan perkalian matriks biasa</p>
        </div>`;
        return steps;
    }
    
    // Display Methods
    displayResult(result, steps, info) {
        const resultSection = document.getElementById('result-section');
        const resultDisplay = document.getElementById('result-display');
        const stepDisplay = document.getElementById('step-by-step');
        const infoDisplay = document.getElementById('operation-info');
        
        resultDisplay.innerHTML = this.formatMatrix(result);
        stepDisplay.innerHTML = steps;
        infoDisplay.textContent = info;
        
        resultSection.style.display = 'block';
        
        // Animate result appearance
        anime({
            targets: resultSection,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutQuart'
        });
    }
    
    displayError(message) {
        const resultSection = document.getElementById('result-section');
        const resultDisplay = document.getElementById('result-display');
        const stepDisplay = document.getElementById('step-by-step');
        const infoDisplay = document.getElementById('operation-info');
        
        resultDisplay.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle mr-2"></i>${message}</div>`;
        stepDisplay.innerHTML = '';
        infoDisplay.textContent = '';
        
        resultSection.style.display = 'block';
        
        anime({
            targets: resultSection,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutQuart'
        });
    }
    
    formatMatrix(matrix) {
        if (!matrix || matrix.length === 0) return '';
        
        let html = '<div class="font-mono text-lg">';
        
        if (matrix.length === 1 && matrix[0].length === 1) {
            // Single value (like determinant)
            html += `<span style="color: var(--terracotta);">${matrix[0][0]}</span>`;
        } else {
            // Regular matrix
            for (let i = 0; i < matrix.length; i++) {
                html += '[';
                for (let j = 0; j < matrix[i].length; j++) {
                    if (j > 0) html += '  ';
                    html += `<span style="color: var(--terracotta);">${matrix[i][j].toFixed(4).replace(/\.?0+$/, '')}</span>`;
                }
                html += ']';
                if (i < matrix.length - 1) html += '<br>';
            }
        }
        
        html += '</div>';
        return html;
    }
    
    // Utility Methods
    fillExampleMatrices(type) {
        switch(type) {
            case 'addition':
                this.fillMatrixInputs('A', [[3, 1], [4, 2]]);
                this.fillMatrixInputs('B', [[1, 5], [3, 2]]);
                break;
            case 'multiplication':
                this.fillMatrixInputs('A', [[2, 3], [1, 4]]);
                this.fillMatrixInputs('B', [[5, 2], [3, 1]]);
                break;
            case 'transpose':
                this.fillMatrixInputs('A', [[1, 2, 3], [4, 5, 6]]);
                this.fillMatrixInputs('B', [[7, 8], [9, 10], [11, 12]]);
                break;
        }
    }
    
    fillMatrixInputs(matrixName, matrix) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const input = document.getElementById(`${matrixName.toLowerCase()}${i}${j}`);
                if (input) {
                    input.value = matrix[i][j];
                }
            }
        }
    }
    
    clearAllMatrices() {
        const inputs = document.querySelectorAll('.matrix-input');
        inputs.forEach(input => input.value = 0);
        
        document.getElementById('result-section').style.display = 'none';
    }
}

// Global functions for HTML onclick handlers
function updateMatrixSize(matrixName) {
    if (window.calculator) {
        window.calculator.updateMatrixSize(matrixName);
    }
}

function performOperation(operation) {
    if (window.calculator) {
        window.calculator.performOperation(operation);
    }
}

function fillExampleMatrices(type) {
    if (window.calculator) {
        window.calculator.fillExampleMatrices(type);
    }
}

function clearAllMatrices() {
    if (window.calculator) {
        window.calculator.clearAllMatrices();
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.calculator = new MatrixCalculator();
    
    // Initialize animations
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
});