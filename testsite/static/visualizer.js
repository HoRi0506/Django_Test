document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.getElementById('audioElement');
    const canvas = document.getElementById('waveformCanvas');
    const canvasCtx = canvas.getContext('2d');
    
    const analyser = audioContext.createAnalyser();
    const audioSource = audioContext.createMediaElementSource(audioElement);

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function getRandomPastelColor() {
        const r = Math.floor(Math.random() * 127 + 128);
        const g = Math.floor(Math.random() * 127 + 128);
        const b = Math.floor(Math.random() * 127 + 128);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawGrid() {
        const gridSize = 100;
        canvasCtx.strokeStyle = '#333';
        canvasCtx.lineWidth = 4; // 격자 선의 굵기 조정
        for (let x = 0; x <= canvas.width; x += gridSize) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(x, 0);
            canvasCtx.lineTo(x, canvas.height);
            canvasCtx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += gridSize) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, y);
            canvasCtx.lineTo(canvas.width, y);
            canvasCtx.stroke();
        }
    }

    function drawBars() {
        requestAnimationFrame(drawBars);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        const gridSize = 100;
        const barWidth = 20; // 바 그래프의 너비 조정
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;

            canvasCtx.fillStyle = getRandomPastelColor(); // 랜덤 파스텔 톤 색상 적용
            canvasCtx.fillRect(x + (gridSize / 2 - barWidth / 2), canvas.height - barHeight, barWidth, barHeight);

            x += gridSize; // 격자에 맞춰 바의 위치를 조정
        }
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawBars();

    window.onload = () => {
        audioElement.play().then(() => {
            console.log("Audio playback started automatically");
            drawBars(); // 애니메이션 시작
        }).catch(error => {
            console.error("Automatic playback failed:", error);
        });
    };

    // 재생/일시정지 버튼
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play();
            playPauseBtn.textContent = '⏸';
        } else {
            audioElement.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    // 볼륨 컨트롤
    const volumeControl = document.getElementById('volumeControl');
    const volumeValue = document.getElementById('volumeValue');
    volumeControl.addEventListener('input', (e) => {
        audioElement.volume = e.target.value / 100;
        volumeValue.textContent = e.target.value;
    });

    // 음악 선택
    const musicSelect = document.getElementById('musicSelect');
    const currentMusicTitle = document.getElementById('currentMusicTitle');
    musicSelect.addEventListener('change', (e) => {
        const selectedMusic = e.target.value;
        const selectedTitle = e.target.options[e.target.selectedIndex].text;
        audioElement.src = `{% static '' %}${selectedMusic}`;
        audioElement.play();
        currentMusicTitle.textContent = selectedTitle;
    });

    // 메뉴 토글
    const menuToggle = document.getElementById('menuToggle');
    const audioControls = document.getElementById('audioControls');
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        audioControls.classList.toggle('show');
    });

    // 페이지의 다른 부분을 클릭했을 때 정보창 닫기
    document.addEventListener('click', () => {
        audioControls.classList.remove('show');
    });

    // 메뉴를 클릭했을 때 이벤트 버블링을 막음
    audioControls.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
