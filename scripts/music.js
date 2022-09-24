var music_index;

let music = {

  1: {
    title: "Divine Child, White Sage",
    cover: "nm.png",
    filepath: "tiki.mp3"
  },
  2: {
    title: "Reminiscences",
    cover: "sov.jpg",
    filepath: "reminiscences.mp3"
  },
  3: {
    title: "Dance in the Skies",
    cover: "foe.png",
    filepath: "dance.mp3"
  },
  4: {
    title: "Theme of Love",
    cover: "thracia.png",
    filepath: "love.mp3"
  },
  5: {
    title: "Fated Princess",
    cover: "FE6.jpeg",
    filepath: "princess.mp3"
  },
 6: {
    title: "Recollection of a Petal",
    cover: "FE7.jpeg",
    filepath: "petal.mp3"
  },
  7: {
    title: "Fly with the Breeze",
    cover: "ss.png",
    filepath: "breeze.mp3"
  },
  8: {
    title: "The White Heron",
    cover: "por.png",
    filepath: "heron.mp3"
  },
  9: {
    title: "Sephiran's Sorrow",
    cover: "rd.png",
    filepath: "sephiran.mp3"
  },
  10: {
    title: "Id ~ Serenity",
    cover: "awakening.png",
    filepath: "serenity.mp3"
  },
  11: {
    title: "The Water Maiden",
    cover: "fates.png",
    filepath: "water.mp3"
  },
  12: {
    title: "Dwellings of the Ancient Gods",
    cover: "3h.png",
    filepath: "dwellings.mp3"
  },
  13: {
    title: "The Color of Sunrise",
    cover: "3h.png",
    filepath: "sunrise.mp3"
  },
  14: {
    title: "Under the Moon (Instrumental)",
    cover: "TMS.png",
    filepath: "moon.mp3"
  },
  15: {
    title: "Winds of Askr",
    cover: "feh.png",
    filepath: "askr.mp3"
  }
}

function toggle() {
  bg_audio = document.getElementById("bg_music")
  if (!bg_audio.paused) {
    bg_audio.pause();
    document.getElementById("toggle").src = "buttons/play.png";
  } else {
    bg_audio.volume = .2;
    bg_audio.loop = true;
    bg_audio.play();
    document.getElementById("toggle").src = "buttons/pause.png";
  }
}

function setMusic(load) {
  if (load) {
    music_index = Math.floor(Math.random() * 15) + 1;
  }
  let track = music[music_index];
  document.getElementById("cover").src = "covers/" + track.cover;
  document.getElementById("bg_music").src = "music/" + track.filepath;
  document.getElementById("song_title").innerHTML = track.title;
  console.log(document.getElementById("song_title"))
}

function changeSong(next) {
  if (next) {
    music_index == 15 ? music_index = 1 : music_index++;
  } else {
    music_index == 1 ? music_index = 15 : music_index--;
  }
  document.getElementById("bg_music").pause()
  document.getElementById("toggle").src = "buttons/play.png";
  setMusic(false);
}