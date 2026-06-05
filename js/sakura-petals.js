(function() {
    const petalEl = document.getElementById('sakura-petals');
    const shapes = [
        'M10,0 Q16,4 12,10 Q8,14 4,10 Q0,4 6,0 Q8,-2 10,0Z',
        'M8,0 Q14,3 11,9 Q8,13 3,9 Q0,4 5,0 Q6,-1 8,0Z',
        'M6,0 Q12,5 8,11 Q4,14 1,8 Q-1,2 5,0 Q5.5,-0.5 6,0Z',
    ];
    const pinks = ['#f5a8c0','#f0c0d0','#e890b0','#fbd0de','#f2b0c8'];
    const ns = 'http://www.w3.org/2000/svg';
    const count = window.matchMedia('(max-width: 768px)').matches ? 25 : 55;
    for (let i = 0; i < count; i++) {
        const svg = document.createElementNS(ns, 'svg');
        const size = Math.random() * 14 + 7;
        svg.setAttribute('viewBox', '-2 -2 18 18');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.classList.add('sakura-petal');
        svg.style.cssText = `
            position:fixed;
            left:${Math.random()*104-2}%;
            top:-20px;
            --dur:${(Math.random()*9+7).toFixed(1)}s;
            --delay:${(Math.random()*12).toFixed(1)}s;
            --drift:${((Math.random()-0.5)*200).toFixed(0)}px;
            --spin:${(Math.random()*720-360).toFixed(0)}deg;
            --op:${(Math.random()*0.5+0.35).toFixed(2)};
            pointer-events:none;
        `;
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', shapes[Math.floor(Math.random() * shapes.length)]);
        path.setAttribute('fill', pinks[Math.floor(Math.random() * pinks.length)]);
        svg.appendChild(path);
        petalEl.appendChild(svg);
    }
})();
