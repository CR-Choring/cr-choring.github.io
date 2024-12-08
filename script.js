const audio = document.getElementById('myAudio');
const playPauseButton = document.getElementById('playPauseButton');
const playPauseImg = document.getElementById('playPauseImg');
const prevButton = document.getElementById('prevButton');
const prevImg = document.getElementById('prevImg');
const nextButton = document.getElementById('nextButton');
const nextImg = document.getElementById('nextImg');
const progressBar = document.getElementById('progress');
const volumeBar = document.getElementById('volume');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');
const mutePath = document.getElementById('mute-path');
const lowPath = document.getElementById('low-path');
const midPath = document.getElementById('mid-path');
const highPath = document.getElementById('high-path');

// 初始化音量图标状态
setVolumeIcon(audio.volume);

// 监听音量变化事件
volumeBar.addEventListener('input', function () {
    audio.volume = volumeBar.value;
    setVolumeIcon(audio.volume);
});

// 设置音量图标的函数
function setVolumeIcon(volume) {
    // 重置所有路径的透明度
    mutePath.style.opacity = 0;
    lowPath.style.opacity = 0;
    midPath.style.opacity = 0;
    highPath.style.opacity = 0;

    // 根据音量级别显示对应的图标路径
    if (volume === 0) {
        mutePath.style.opacity = 1; // 仅显示静音图标
    } else if (volume > 0 && volume <= 0.33) {
        mutePath.style.opacity = 1;
        lowPath.style.opacity = 1; // 显示静音和低音图标
    } else if (volume > 0.33 && volume <= 0.66) {
        mutePath.style.opacity = 1;
        lowPath.style.opacity = 1;
        midPath.style.opacity = 1; // 显示静音、低音和中音图标
    } else {
        mutePath.style.opacity = 1;
        lowPath.style.opacity = 1;
        midPath.style.opacity = 1;
        highPath.style.opacity = 1; // 显示所有图标
    }
}

// 播放/暂停按钮事件
playPauseButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playPauseImg.src = "2.svg";
    } else {
        audio.pause();
        playPauseImg.src = "1.svg";
    }
});

// 上一首按钮事件
prevButton.addEventListener('click', function () {
    // 这里可以添加逻辑来实现上一首功能，比如切换到上一个音频文件
    // 暂时简单地重新播放当前音频
    audio.currentTime = 0;
    audio.play();
});

// 下一首按钮事件
nextButton.addEventListener('click', function () {
    // 这里可以添加逻辑来实现下一首功能，比如切换到下一个音频文件
    // 暂时简单地重新播放当前音频
    audio.currentTime = 0;
    audio.play();
});

// 时间更新事件
audio.addEventListener('timeupdate', function () {
    const currentTime = Math.floor(audio.currentTime);
    const remainingTime = audio.duration-audio.currentTime;
    currentTimeSpan.textContent = `${formatTime(currentTime)}`;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    totalTimeSpan.textContent = ` ${formatTime(remainingTime)}`;
});

// 元数据加载完成事件
audio.addEventListener('loadedmetadata', function () {
    const duration = Math.floor(audio.duration);
    progressBar.max = audio.duration;
    progressBar.value = 0;
});

// 进度条事件
progressBar.addEventListener('input', function () {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// 时间格式化函数，将秒转换为mm:ss格式
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const toggleDarkMode = document.getElementById('toggle-dark-mode');
const audioPlayer = document.querySelector('.audio-player');

toggleDarkMode.addEventListener('click', function () {
    audioPlayer.classList.toggle('dark-mode');
});