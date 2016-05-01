
var sleepSongName = 'sleep-song';
var eatSongName = 'eat-song';

(function () {
    global.setMusic = function () {
        if (document.createElement('audio').canPlayType) {
            addAudioForActions();
        } else {
            alert('<audio> не поддерживается!');
        }
    }
})();

function addAudioForActions() {
    var sleepSong = document.querySelector('.sleep-song');
    var eatSong = document.querySelector('.eat-song');
    var volumeSleepSong = getVolume(sleepSong, 'sleepsong');
    var volumeEatSong = getVolume(sleepSong, 'eatsong');

    if (chargingEnergy) {
        enableSong(sleepSong, sleepSongName);
    }

    if (chargingSatiety) {
        enableSong(eatSong, eatSongName);
    }


    sleepSong.onvolumechange = function () {
        setVolume(sleepSong, sleepSongName);
    };

    eatSong.onvolumechange = function () {
        setVolume(eatSong, eatSongName);
    };

    eatSong.addEventListener('enableSong', function() {
        enableSong(eatSong, eatSongName);
    });

    eatSong.addEventListener('disableSong', function() {
        disableSong(eatSong, eatSongName);
    });


    sleepSong.addEventListener('enableSong', function() {
        enableSong(sleepSong, sleepSongName);
    });

    sleepSong.addEventListener('disableSong', function() {
        disableSong(sleepSong, sleepSongName);
    });
}

function getVolume(song, nameSong) {
    console.log(nameSong);
    var dataAboutPast = localStorage.getItem('volume');
    var data = {};
    if (dataAboutPast === null) {
        data[nameSong] = song.volume;
    } else {
        data = JSON.parse(dataAboutPast);
        if (data[nameSong] == undefined) {
            data[nameSong] = song.volume;
        }
    }
    localStorage.setItem('volume', JSON.stringify(data));
    return data[nameSong];
}

function setVolume(song, nameSong) {
    var dataAboutPast = localStorage.getItem('volume');
    var data = {};
    if (dataAboutPast === null) {
        data[nameSong] = song.volume;
    } else {
        data = JSON.parse(dataAboutPast);
        data[nameSong] = song.volume;
    }
    localStorage.setItem('volume', JSON.stringify(data));
}

function disableSong(song, nameSong) {
    song.classList.remove(nameSong + '_visible');
    song.classList.add(nameSong + '_hidden');
    song.pause();
}

function enableSong(song, nameSong) {
    song.classList.remove(nameSong + '_hidden');
    song.classList.add(nameSong + '_visible');
    song.volume = getVolume(song, nameSong);
    song.play();
}
