
var music_index;

let music = {

	1: {
		title: "Reminiscences",
		cover: "sov.jpg",
		filepath: "reminiscences.mp3"
	},

	2: {
		title: "Dwellings of the Ancient Gods",
		cover: "3h.png",
		filepath: "dwellings.mp3"
	},

	3: {
		title: "The Water Maiden",
		cover: "fates.png",
		filepath: "water.mp3"
	},

	4: {
		title: "Id ~ Serenity",
		cover: "awakening.png",
		filepath: "serenity.mp3"
	},

	5: {
		title: "Sephiran's Sorrow",
		cover: "rd.png",
		filepath: "sephiran.mp3"
	},


	6: {
		title: "The White Heron",
		cover: "por.png",
		filepath: "heron.mp3"
	},


	7: {
		title: "The Color of Sunrise",
		cover: "3h.png",
		filepath: "sunrise.mp3"
	},

	8: {
		title: "Dance in the Skies",
		cover: "foe.png",
		filepath: "dance.mp3"
	},

	9: {
		title: "Divine Child, White Sage",
		cover: "nm.png",
		filepath: "tiki.mp3"
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
    music_index = Math.floor(Math.random() * 9) + 1;
  }
  let track = music[music_index];
  document.getElementById("cover").src = "covers/" + track.cover;
  document.getElementById("bg_music").src = "music/" + track.filepath;
  document.getElementById("song_title").innerHTML = track.title;
  console.log(document.getElementById("song_title"))
}

function changeSong(next) {
  if (next) {
    music_index == 9 ? music_index = 1 : music_index++;
  } else {
    music_index == 1 ? music_index = 9 : music_index--;
  }
  document.getElementById("bg_music").pause()
  document.getElementById("toggle").src = "buttons/play.png";
  setMusic(false);
}


