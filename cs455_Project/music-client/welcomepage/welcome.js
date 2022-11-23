window.onload = function () {
    document.getElementById('logout').onclick = logout;
    document.getElementById("searchBtn").onclick = function () {
        const value = document.getElementById('musicSearch').value;

        getAllSongHere(value);
    }

    init();
    getAllSongHere();
    getPlayList();

    document.getElementById('sufflebtn').onclick = changeSuffleMode;
    document.getElementById('nextbtn').onclick = playNextSong;
    document.getElementById('playPauseBtn').onclick = playPauseCurrentSong;
    document.getElementById('prebtn').onclick = playPrevSong;
    document.getElementById('myAudio').ontimeupdate = function () {
        let playPercentage = (this.currentTime / this.duration) * 100;
        document.getElementById("progress-bar").style.width = `${playPercentage}%`;
        document.getElementById("timeInfo").innerText = `${getMinuteAndSecond(this.currentTime)}/${getMinuteAndSecond(this.duration)}`;
    }
    document.getElementById('myAudio').onended = playNextSong;

    setShuffleMode("Normal");
    resetPlayer();
}

// 
/**
 * Show Welcome message with username
 */
function init() {
    document.getElementById('userSpan').innerHTML = sessionStorage.getItem('username').toUpperCase(); // fix it welcome to here pop
}

let playlist = []; // Stores songs in the playlist
let currentElement = {};
let mode = "orderMode";
/**
 * Remove username and accessToken from storage
 */
function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');
    location.href = "../login.html";
}

/**
 * 
 * @param {array} songId - The song list passed from getPlayList().
 * songId - songs list in the playlist
 * Display playlist in UI
 */
function displayPlaylist(songs) {
    playlist = [...songs];

    let tablePlaylist = document.getElementById("playlistTable");

    tablePlaylist.innerHTML = " ";

    if (!songs || songs.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText = "No songs in playlist";
        td.colSpan = 3;

        tr.append(td);
        tablePlaylist.append(tr);
    }

    songs.forEach((element) => {
        let buttonRemove = document.createElement('button');
        buttonRemove.id = "remove" + `${element.orderId}`;
        buttonRemove.innerHTML = CLOSE_SVG;
        buttonRemove.classList.add("rounded-circle");
        buttonRemove.classList.add("sqaure-32");
        buttonRemove.classList.add("app-btn");
        buttonRemove.classList.add("remove");

        // buttonRemove.onclick = removeFromPlaylist(element.songId);
        buttonRemove.onclick = function (event) {
            event.preventDefault();
            removeFromPlaylist(element.songId);
        }
        let buttonPlay = document.createElement('button');
        buttonPlay.classList.add("rounded-circle");
        buttonPlay.classList.add("sqaure-32");
        buttonPlay.classList.add("media-btn");
        buttonPlay.id = "play" + `${element.orderId}`;
        buttonPlay.innerHTML = PLAY_SVG;
        buttonPlay.onclick = function (event) {
            event.preventDefault();
            playSong(element);
            currentElement = element;

            setPlayMode("Pause");
            //    console.log(element.urlPath);
        }
        let td = document.createElement("td");
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${element.orderId}</td>
        <td>${element.title}</td>
        `;
        td.append(buttonRemove, buttonPlay);
        tr.append(td);
        tablePlaylist.append(tr);
    });
}

/**
 * Similar to setShuffleMode but is for play/pause button
 * @param {string} playMode 
 */
function setPlayMode(playMode) {
    const modeMap = {
        Pause: {
            class: "active", // ghumaune
            svg: PAUSE_SVG
        },
        Play: {
            class: "",
            svg: PLAY_SVG
        }
    };

    const playPauseBtn = document.getElementById('playPauseBtn');
    const songImage = document.getElementById('songImage');
    playPauseBtn.title = playMode;
    playPauseBtn.innerHTML = modeMap[playMode].svg;
    songImage.setAttribute('class', modeMap[playMode].class);
}

/**
 * Sets the current and next states in the view according to provided shuffle mode
 * e.g. if "Shuffle" is provided
 * The current state is shown in the shuffle lable
 * The next state is shown in the shuffle button
 * @param {string} shuffleMode 
 */
function setShuffleMode(shuffleMode) {
    const modeMap = {
        Shuffle: {
            svg: SHUFFLE_SVG,
            next: {
                title: "Repeat",
                svg: REPEAT_SVG
            }
        },
        Normal: {
            svg: IN_ORDER_SVG,
            next: {
                title: "Shuffle",
                svg: SHUFFLE_SVG
            }
        },
        Repeat: {
            svg: REPEAT_SVG,
            next: {
                title: "Normal",
                svg: IN_ORDER_SVG
            }
        }
    };

    const sufflebtn = document.getElementById('sufflebtn');
    const suffleLabel = document.getElementById('shuffleMode');
    
    sufflebtn.title = "Switch to " + modeMap[shuffleMode].next.title;
    sufflebtn.innerHTML = modeMap[shuffleMode].next.svg;
    suffleLabel.innerHTML = modeMap[shuffleMode].svg + shuffleMode + " mode";
}

/**
 * Get PlayList
 * fetch data to get playlist
 */

function getPlayList() {

    fetch('http://localhost:3000/api/playlist', {
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json()).then(result => {
        displayPlaylist(result); //To Display in the UI.
        // set currentElement to first song in the playlist 
        currentElement = result[0];
    });
}

/**
 * 
 * @param {Array} songId - Array of songs object that are sent to add in playlist
 */

function addtoPlayList(songId) {
    fetch('http://localhost:3000/api/playlist/add', {
        method: "POST",
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            songId
        })
    }).then(response => response.json()).then(result => {

        displayPlaylist(result);
    });
}

/**
 * 
 * @param {*} search -default search null
 * fetch all songs from server
 */
function getAllSongHere(search = null) {
    let url;
    if (search != null) {
        url = 'http://localhost:3000/api/music?search=' + search; // yo vaneko bujina-----
    } else {
        url = 'http://localhost:3000/api/music';
    }
    fetch(url, {
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json()).then(songs => {
        generateSongRows(songs);
    });
}

/**
 * 
 * @param {string} songId - Array of songs, that are sent to server to request them to delete from playlist. 
 */
async function removeFromPlaylist(songId) {
    let response = await fetch('http://localhost:3000/api/playlist/remove', {
        method: "POST",
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            songId
        })
    });
    let result = await response.json();

    // If removed song is the one currently being palyed,
    // remove currentElement and reset the player to not the state of not playing anything
    if(currentElement && currentElement.songId === songId) {
        currentElement = null;
        resetPlayer();
    }

    displayPlaylist(result);
}

function generateSongRows(songs) {
    let tableBody = document.getElementById('welcomeTableBody');
    tableBody.innerHTML = " ";

    songs.forEach((element, index) => {

        let addbutton = document.createElement("button");
        addbutton.classList.add("rounded-circle");
        addbutton.classList.add("sqaure-32");
        addbutton.classList.add("app-btn");
        addbutton.classList.add("add");
        addbutton.style.textAlign = "center";
        addbutton.id = "addbtn" + index;
        addbutton.innerHTML = PLUS_SVG;
        addbutton.style.color = "green";
        addbutton.onclick = function (event) {
            event.preventDefault();
            addtoPlayList(element.id);
        }
        let td = document.createElement('td');
        td.style.textAlign = "center";
        td.append(addbutton);
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${element.title}</td>
            <td>${element.releaseDate}</td>
            `
        tr.append(td);
        tableBody.append(tr);
    });
}


/**
 * Plays next song based on current shuffle mode
 * @returns 
 */
function playNextSong() {
    let index = playlist.findIndex(item => item.songId === currentElement.songId);

    if (mode === 'suffleMode') {
        let randomIndex = Math.floor(Math.random() * (playlist.length - 1));

        if (randomIndex === index)
            randomIndex++;

        if (randomIndex >= playlist.length || randomIndex < 0)
            return;

        playSong(playlist[randomIndex]);
        currentElement = playlist[randomIndex];
        return;
    }

    if (index + 1 >= playlist.length)
        return;

    if (mode === 'orderMode') {
        playSong(playlist[index + 1]);
        currentElement = playlist[index + 1];
    } else if (mode === 'repeatAgainMode') {
        playSong(playlist[index]);
        currentElement = playlist[index];
    }
}

/**
 * Palys previos song according to the current shuffle mode
 * @returns 
 */
function playPrevSong() {
    let index = playlist.findIndex(item => item.songId === currentElement.songId);

    if (mode === 'suffleMode') {
        let randomIndex = Math.floor(Math.random() * (playlist.length - 1));

        // if random index is equal to current song index, decrement the random 
        if (randomIndex === index)
            randomIndex--;

        if (randomIndex >= playlist.length || randomIndex < 0)
            return;

        playSong(playlist[randomIndex]);
        currentElement = playlist[randomIndex];
        return;
    }

    if (index - 1 < 0)
        return;

    if (mode === 'orderMode') {
        playSong(playlist[index - 1]);
        currentElement = playlist[index - 1];
    } else if (mode === 'repeatAgainMode') {
        playSong(playlist[index]);
        currentElement = playlist[index];
    }
}

/**
 * Handler fuction for play/pause button
 * @returns 
 */
function playPauseCurrentSong() {
    if (playlist.length === 0)
        return;

    if (!currentElement) {
        currentElement = playlist[0];
    }

    playSong(currentElement, true);
}

/**
 * Change shuffle mode to next mode according to current mode
 */
function changeSuffleMode() {
    if (mode === 'orderMode') {
        setShuffleMode("Shuffle");
        mode = 'suffleMode';
    } else if (mode === 'suffleMode') {
        setShuffleMode("Repeat");
        mode = 'repeatAgainMode';
    } else {
        setShuffleMode("Normal");
        mode = 'orderMode';
    }
}

/**
 * Plays the song provided
 * Pauses/Plays the song: if play/pause button was clicked and the provided song is same as currently playing
 * @param {object} song Song object
 * @param {boolean} isPlayPause To indicate if the function call is in case of play/pause button click
 * @returns 
 */
function playSong(song, isPlayPause) {

    let audio = document.getElementById('myAudio');
    let songUrl = "http://localhost:3000/" + song.urlPath;

    if (isPlayPause && audio.src === songUrl && audio.duration > 0) {
        if (audio.paused) {
            setPlayMode("Pause");
            return audio.play();
        }

        setPlayMode("Play");
        return audio.pause();
    }

    setPlayMode("Pause");

    audio.src = songUrl;
    // For a new song reset the width of progress
    document.getElementById("progress-bar").style.width = "0%";
    let currentlyPlaying = document.getElementById("currentlyPlaying");
    currentlyPlaying.innerText = song.title;
}

/**
 * Constructs time string in MM:SS fomat for given time in second and returns the result
 * @param {number} time Time in second
 * @returns 
 */
function getMinuteAndSecond(time) {
    if(!time || isNaN(time))
        return "00:00";

    let timeInS = Math.floor(time);
    let minute = Math.floor(timeInS / 60);
    let second = timeInS % 60;

    return `${minute < 10 ? `0${minute}` : `${minute}`}:${second < 10 ? `0${second}` : `${second}`}`;
}

/**
 * Reset the player view to the state of not playing any song
 */
function resetPlayer() {
    let audio = document.getElementById('myAudio');
    audio.src = "";
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("currentlyPlaying").innerText = "";
    document.getElementById("timeInfo").innerText = "00:00/00:00";
    setPlayMode("Play");
}
