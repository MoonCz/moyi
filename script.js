document.addEventListener('DOMContentLoaded', function() {
    const braceletCircle = document.getElementById('braceletCircle');
    const sizeInput = document.getElementById('bracelet-size');
    const sizeSlider = document.getElementById('bracelet-size-slider');
    const beadSizeInput = document.getElementById('bead-size');
    const beadSizeSlider = document.getElementById('bead-size-slider');

    // 更新珠子大小的函数
    function updateBeadSize(size) {
        // 将毫米转换为像素（使用更大的比例）
        const pixelSize = size * 4;  // 改为4:1的比例
        document.documentElement.style.setProperty('--bead-size', `${pixelSize}px`);
    }

    // 创建示例珠子
    function createExampleBeads() {
        // 清除现有的示例珠子
        const existingBeads = braceletCircle.querySelectorAll('.example-bead');
        existingBeads.forEach(bead => bead.remove());

        // 根据手串周长和珠子直径计算珠子数量
        const braceletSize = parseInt(sizeInput.value); // 手串周长(mm)
        const beadSize = parseInt(beadSizeInput.value); // 珠子直径(mm)
        const numBeads = Math.floor(braceletSize / beadSize);
        
        // 调整圆圈大小以适应珠子数量
        const actualCircumference = numBeads * beadSize;
        const actualDiameter = actualCircumference / Math.PI;
        const pixelDiameter = actualDiameter * 6;  // 1.5倍放大（原来是4，现在是6）
        
        // 更新圆圈大小
        braceletCircle.style.width = `${pixelDiameter}px`;
        braceletCircle.style.height = `${pixelDiameter}px`;

        for (let i = 0; i < numBeads; i++) {
            const bead = document.createElement('div');
            bead.className = 'example-bead';
            
            // 计算珠子位置
            const angle = (i / numBeads) * 2 * Math.PI;
            const radius = pixelDiameter / 2;  // 使用计算好的直径的一半作为半径
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            // 设置珠子位置
            bead.style.left = `${radius + x}px`;
            bead.style.top = `${radius + y}px`;
            
            // 设置珠子大小
            const beadPixelSize = beadSize * 6;  // 1.5倍放大
            bead.style.width = `${beadPixelSize}px`;
            bead.style.height = `${beadPixelSize}px`;
            
            braceletCircle.appendChild(bead);
        }
    }

    // 更新圆圈大小的函数
    function updateCircleSize(size) {
        // 更新示例珠子
        requestAnimationFrame(createExampleBeads);
    }

    // 监听手串尺寸输入框变化
    sizeInput.addEventListener('input', function() {
        let size = Math.round(this.value / 10) * 10;
        size = Math.min(Math.max(size, 120), 240);
        sizeSlider.value = size;
        this.value = size;
        updateCircleSize(size);
    });

    // 监听手串尺寸滑块变化
    sizeSlider.addEventListener('input', function() {
        sizeInput.value = this.value;
        updateCircleSize(this.value);
    });

    // 监听珠子尺寸输入框变化
    beadSizeInput.addEventListener('input', function() {
        let size = Math.round(this.value);
        size = Math.min(Math.max(size, 2), 20);
        beadSizeSlider.value = size;
        this.value = size;
        createExampleBeads();
    });

    // 监听珠子尺寸滑块变化
    beadSizeSlider.addEventListener('input', function() {
        beadSizeInput.value = this.value;
        createExampleBeads();
    });

    // 初始化
    updateCircleSize(120);
    createExampleBeads();
}); 