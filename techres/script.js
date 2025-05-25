adocument.addEventListener('DOMContentLoaded', function() {
    console.log('教师资源页面已加载');

    const selectedFilters = {
        selectedTime: 'all',
        selectedDownloadType: 'all',
        selectedCategory: 'all'
    };

    const handleFilterClick = (event) => {
        const target = event.target;
        if (target.classList.contains('g-item')) {
            const parent = target.parentElement;
            parent.querySelector('.active').classList.remove('active');
            target.classList.add('active');
            const filterType = parent.parentElement.querySelector('th').textContent.trim();
            const value = target.getAttribute('data-value');
            if (filterType === '时间') {
                selectedFilters.selectedTime = value;
            } else if (filterType === '下载方式') {
                selectedFilters.selectedDownloadType = value;
            } else if (filterType === '分类') {
                selectedFilters.selectedCategory = value;
            }
            console.log('筛选条件:', selectedFilters);
        }
    };

    document.querySelector('.table-filter').addEventListener('click', handleFilterClick);
});


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
    const remainingTime = Math.floor(audio.duration - audio.currentTime);
    currentTimeSpan.textContent = `${formatTime(currentTime)}`;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    totalTimeSpan.textContent = ` ${formatTime(remainingTime)}`;
});

// 元数据加载完成事件
audio.addEventListener('loadedmetadata', function () {
    const duration = Math.floor(audio.duration);
    progressBar.max = 100; // 设置进度条最大值为 100
    progressBar.value = 0;
    totalTimeSpan.textContent = ` ${formatTime(duration)}`; // 初始化总时间
});

// 进度条事件
progressBar.addEventListener('input', function () {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// 音频播放结束事件
audio.addEventListener('ended', function () {
    progressBar.value = progressBar.max; // 确保进度条到达最右端
    currentTimeSpan.textContent = '0:00'; // 重置当前时间
    totalTimeSpan.textContent = ` ${formatTime(audio.duration)}`; // 更新总时间
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

document.addEventListener('keydown', function(event) {
    // 检测是否按下了Ctrl键
    if (event.ctrlKey) {
        event.preventDefault(); // 阻止Ctrl键的默认行为
    }

    // 检测是否按下了F1-F12键，但允许F11
    if (event.key.startsWith('F')) {
        const keyCode = event.key.toUpperCase();
        if (keyCode !== 'F11') {
            event.preventDefault(); // 阻止除F11之外的F1-F12键的默认行为
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 禁用所有键盘输入
    document.addEventListener('keydown', function(event) {
        event.preventDefault(); // 阻止键盘事件的默认行为
});

document.addEventListener('keypress', function(event) {
        event.preventDefault(); // 阻止键盘事件的默认行为
});

document.addEventListener('keyup', function(event) {
        event.preventDefault(); // 阻止键盘事件的默认行为
});

    // 可选：显示提示信息
    alert("键盘输入已被禁用。");
});

function keydown() {
    if (event.keyCode == 8) {
        event.keyCode = 0;
        event.returnValue = false;
        alert("当前设置不允许使用退格键");
    }
    if (event.keyCode == 13) {
        event.keyCode = 0;
        event.returnValue = false;
        alert("当前设置不允许使用回车键");
    }
    if (event.keyCode == 116) {
        event.keyCode = 0;
        event.returnValue = false;
        alert("当前设置不允许使用F5刷新键");
    }
    if ((event.altKey)
            && ((window.event.keyCode == 37) || (window.event.keyCode == 39))) {
        event.returnValue = false;
        alert("当前设置不允许使用Alt+方向键←或方向键→");
    }
    if ((event.ctrlKey) && (event.keyCode == 78)) {
        event.returnValue = false;
        alert("当前设置不允许使用Ctrl+n新建IE窗口");
    }
    if ((event.shiftKey) && (event.keyCode == 121)) {
        event.returnValue = false;
        alert("当前设置不允许使用shift+F10");
    }
}
function click() {
    event.returnValue = false;
    alert("当前设置不允许使用右键！");
}
document.oncontextmenu = click;

window.onload = function() {
    document.onkeydown = function() {
        var e = window.event || arguments[0];
        //屏蔽F12：按键码123
        if(e.keyCode == 123) {
            console.log('暂时不支持开发者模式！！');
            return false;
        //屏蔽Ctrl+Shift+I
        }else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)){
            console.log('当前提示，本网站禁止审查元素');
            return false;
        //屏蔽Ctrl+U(火狐下查看网页源代码快捷键)
        }else if((e.ctrlKey) && (e.keyCode == 85)){
            console.log('本网站禁止使用审查元素')
            return false;
        //屏蔽Shift+F10
        }else if((e.shiftKey) && (e.keyCode == 121)){
            console.log('本网站禁止审查元素！');
            return false;
        //禁止保存页面：ctrl + s
        }else if(event.ctrlKey  &&  window.event.keyCode==83 ){ 
            console.log('本网站禁止保存文件！');
            return false;
        }
    };
    //屏蔽右键单击
    if (window.Event)
        document.captureEvents(Event.MOUSEUP);
    function nocontextmenu()
    {
        event.cancelBubble = true
        event.returnValue = false;
        return false;
    }
    function norightclick(e)
    {if (window.Event)
    {
        if (e.which == 2 || e.which == 3)
            return false;
    }
    else
        if (event.button == 2 || event.button == 3)
        {
            event.cancelBubble = true
            event.returnValue = false;
            return false;
        }
    }
    document.oncontextmenu = nocontextmenu; // for IE5+
    document.onmousedown = norightclick; // for all others
}

document.addEventListener('keydown', function(event) {
    event.preventDefault(); // 阻止键盘事件的默认行为
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'c') {
        event.preventDefault(); // 阻止 Ctrl + C 的默认行为
    }
});

