import React, { useState, useRef, useEffect } from 'react';
import './music.css';  // Import custom styles

const MusicPlayerWithTimer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timerMode, setTimerMode] = useState('countdown');
    const [time, setTime] = useState(1500);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null); // To hold the selected music file
    const [volume, setVolume] = useState(1); // Volume state (1 = max volume)
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    // Use relative paths starting from public/assets
    const musicPaths = [
        "/assets/Emo Emo.mp3",
        '/assets/Ganesha.mp3',
        '/assets/khabi khab.mp3',
        '/assets/perfect songs.mp3',
        '/assets/shiv thandav stotram.mp3',
        '/assets/stress music.mp3',
    ];
    const [currentMusic, setCurrentMusic] = useState(musicPaths[0]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Set initial volume
        }
        if (isPlaying) {
            if (timerMode === 'countdown') {
                timerRef.current = setInterval(() => {
                    setTime((prev) => (prev > 0 ? prev - 1 : 0));
                }, 1000);
            } else {
                timerRef.current = setInterval(() => {
                    setElapsedTime((prev) => prev + 1);
                }, 1000);
            }
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, timerMode, volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleTimerMode = () => {
        setTimerMode(timerMode === 'countdown' ? 'stopwatch' : 'countdown');
        setTime(1500);
        setElapsedTime(0);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("audio")) {  // Check if the file is audio
            setSelectedFile(URL.createObjectURL(file));
            setIsPlaying(false); // Optionally reset music state when changing file
        } else {
            alert("Please select a valid audio file.");
        }
    };

    const handleMusicSelect = (path) => {
        setCurrentMusic(path);
        setIsPlaying(false);
    };

    const openMusicPlayerWindow = () => {
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        if (newWindow) {
            newWindow.document.write(`
                <html>
                    <head>
                        <title>Music Player</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                height: 100vh;
                                margin: 0;
                                padding: 0;
                                
                                background-color: #f4f4f4;
                            }
                            .controls {
                                margin-top: 20px;
                            }
                            .timer {
                                font-size: 24px;
                                margin-top: 10px;
                            }
                            .volume-control {
                                margin-top: 20px;
                            }
                            input[type="range"] {
                                width: 200px;
                            }
                        </style>
                    </head>
                    <body>
                        <h3>Music Player with Break Timer(listen only when you need relaxation or if its a break time 211421)</h3>
                        <audio id="audio-player" src="${selectedFile || currentMusic}" controls></audio>
                        <div class="controls">
                            <button onclick="togglePlay()">Play/Pause</button>
                            <button onclick="toggleTimerMode()">Switch to Stopwatch/Countdown</button>
                        </div>
                        <div class="timer">
                            <h3 id="timer-display">00:00</h3>
                        </div>
                        <input type="file" accept="audio/*" onchange="handleFileChange(event)" />
                        <div class="music-list">
                            ${musicPaths.map((path, index) => `
                                <button onclick="handleMusicSelect('${path}')">Track ${index + 1}</button>
                            `).join('')}
                        </div>
                        <div class="volume-control">
                            <label>Volume</label>
                            <input type="range" min="0" max="1" step="0.01" value="1" onchange="handleVolumeChange(event)" />
                        </div>

                        <script>
                            let isPlaying = false;
                            let timerMode = 'countdown';
                            let time = 1500;
                            let elapsedTime = 0;
                            let audioRef = document.getElementById('audio-player');
                            let timerRef;
                            let volume = 1;

                            function formatTime(seconds) {
                                const minutes = Math.floor(seconds / 60);
                                const secs = seconds % 60;
                                return \`\${minutes}:\${secs < 10 ? '0' : ''}\${secs}\`;
                            }

                            function togglePlay() {
                                if (isPlaying) {
                                    audioRef.pause();
                                } else {
                                    audioRef.play();
                                }
                                isPlaying = !isPlaying;
                            }

                            function toggleTimerMode() {
                                timerMode = (timerMode === 'countdown') ? 'stopwatch' : 'countdown';
                                time = 1500;
                                elapsedTime = 0;
                            }

                            function handleFileChange(event) {
                                const file = event.target.files[0];
                                if (file && file.type.startsWith("audio")) {
                                    audioRef.src = URL.createObjectURL(file);
                                    isPlaying = false;
                                    audioRef.pause();
                                } else {
                                    alert("Please select a valid audio file.");
                                }
                            }

                            function handleMusicSelect(path) {
                                audioRef.src = path;
                                isPlaying = false;
                                audioRef.pause();
                            }

                            function handleVolumeChange(event) {
                                volume = event.target.value;
                                audioRef.volume = volume;
                            }

                            setInterval(() => {
                                const timerDisplay = document.getElementById('timer-display');
                                if (timerMode === 'countdown') {
                                    time = (time > 0) ? time - 1 : 0;
                                    timerDisplay.textContent = formatTime(time);
                                } else {
                                    elapsedTime += 1;
                                    timerDisplay.textContent = formatTime(elapsedTime);
                                }
                            }, 1000);
                        </script>
                    </body>
                </html>
            `);
        }
    };

    return (
        <div className="music-app-container">
            {/* Main Page */}
            <div className="main-section">
                <button className="open-btn" onClick={openMusicPlayerWindow}>
                    Show Music Player
                </button>
            </div>
        </div>
    );
};

export default MusicPlayerWithTimer;
