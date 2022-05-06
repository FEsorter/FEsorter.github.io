const titlesArr = [
   'Shadow Dragon / New Mystery', 
   'Shadow Dragon / New Mystery Extra',
   'Shadows of Valentia',
   'Shadows of Valentia Extra',
   'Genealogy of the Holy War',
   'Genealogy of the Holy War Extra',
   'Thracia 776',
   'Thracia 776 Extra',
   'Binding Blade',
   'Binding Blade Extra',
   'Blazing Blade',
   'Blazing Blade Extra',
   'Sacred Stones',
   'Sacred Stones Extra',
   'Path of Radiance / Radiant Dawn',
   'Path of Radiance / Radiant Dawn Extra',
   'Awakening',
   'Awakening Extra',
   'Fates',
   'Fates Extra',
   'Three Houses',
   'Three Houses Extra',
   'TMS#FE',
   'TMS#FE Extra',
   'Warriors',
   'Heroes',
   'Cipher'
]

const romhacksArr = [
   "The Last Promise",
   "The Last Promise Extra",
   "Vision Quest",
   "Vision Quest Extra",
   "Four Kings",
   "Four Kings Extra",
   "Code of the Burger King",
   "Code of the Burger King Extra",
   "Dark Lord and the Maiden of Light",
   "Dark Lord and the Maiden of Light Extra",
   
]

const filtersArr = [
"Male Only",
"Female Only",
"Lords",
"Refreshers",
"Myrmidons",
"Pegasus Knights",
"Archers",
"Healers",
"Wyvern Riders",
"Shapeshifters",
"Red / Orange",
"Pink", 
"Blue",
"Purple",
"Green",
"Blonde",
"Brown",
"Black", 
"White / Gray",
"Bald"
]

const doublesKeep = [
'palla_sov',
'catria_sov',
'est_sov',
'karel_fe6',
'bartre_fe6',
'marcus_fe6',
'eliwood_fe7',
'hector_fe7',
'murdock_fe6',
'guinivere_fe6',
'zephiel_fe6',
"merlinus_fe6",
"leif_fe5",
"nanna_fe5",
"finn_fe5",
"ced_fe5",
"diarmuid_fe5"
]

const doublesRemove = [
'palla_fe1',
'catria_fe1',
'est_fe1',
'karel_fe7',
'bartre_fe7',
'marcus_fe7',
'eliwood_fe6',
'hector_fe6',
'murdock_fe7',
'guinivere_fe7',
'zephiel_fe7',
"merlinus_fe7",
"leif_fe4",
"nanna_fe4",
"finn_fe4",
"ced_fe4",
"diarmuid_fe4"
]

const spoilerKeep = [
'owain',
'severa',
'inigo',
'edelgard_academy',
'edelgard_war',
'jeritza',
'kronya',
'rhea',
'sephiran_por',
'sephiran_rd',
'zelgius_por',
'zelgius_rd',
'sirius',
'camus',
'camus',
'renning_por',
'renning_rd',
'brigid',
'tiki_fe13',
'thales'

]
const spoilerRemove = [
'odin',
'selena_fates',
'laslow',
'flame_emperor',
'flame_emperor',
'death_knight',
'monica',
'seiros',
'lehran',
'lehran',
'black_knight_por',
'black_knight_rd',
'zeke',
'sirius',
'zeke',
'bertram',
'bertram',
'eyvel',
'tiki_fe1',
'lord_arundel'
]

const otherGamesArr = [
"Triangle Strategy",
"Triangle Strategy Extra"
]


var music_index;

let charlist = []

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function toggleCollapsible(id){
   let el = document.getElementById(id);
      el.classList.toggle("active");
   var content = el.nextElementSibling;

    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
}



function uncheckFilters(){
   for (let i = 0; i < filtersArr.length; i++){
      let cbox = document.getElementById('filter'+i);
      cbox.checked = false;
   }

   let cbox = document.getElementById('3hportrait2')
   cbox.checked = false;
   cbox = document.getElementById('tellius1')
   cbox.checked = false;
}


function startup() {
   this.uncheckFilters()
   document.getElementById('romhackSelect_all').checked = false;
   document.getElementById('otherSelect_all').checked = false;
   document.getElementById('topTen').style.display = 'none';
   document.getElementById('resultcontainer').style.display = 'none';
   this.selectAllRomhack()
   this.selectAllOther()
}

function selectAllMainline() {
   for (let i = 0; i < titlesArr.length; i++) {
      document.getElementById('option' + i).checked = document.getElementById('optSelect_all').checked;
   }
}

function reset(){
   window.location.reload();
   window.localStorage.clear()
}

function selectAllRomhack() {
   for (let i = 0; i < romhacksArr.length; i++) {
      document.getElementById('romhack' + i).checked = document.getElementById('romhackSelect_all').checked;
   }
}

function selectAllOther() {
   for (let i = 0; i < otherGamesArr.length; i++) {
      document.getElementById('other' + i).checked = document.getElementById('otherSelect_all').checked;
   }
}

function portraitChoice(id1, id2) {
   let cbox1 = document.getElementById(id1)
   let cbox2 = document.getElementById(id2)
   cbox2.checked = !cbox1.checked;
}

function hideAll(){

document.getElementById('allCheckboxes').style.display = 'none';
document.getElementById('resumeButton').style.display = 'none';

}


async function initialize(){
   
   charlist = [];
   for(let i = 0; i < titlesArr.length; i++){
      if(document.getElementById(`option${i}`).checked){
         charlist = charlist.concat(filter[titlesArr[i]])
      }
   }

   for(let i = 0; i < romhacksArr.length; i++){
         if(document.getElementById(`romhack${i}`).checked){
         charlist = charlist.concat(filter[romhacksArr[i]])
      }
   }

   for(let i = 0; i < otherGamesArr.length; i++){
         if(document.getElementById(`other${i}`).checked){
         charlist = charlist.concat(filter[otherGamesArr[i]])
      }
   }
   this.applyFilters();
   if (charlist.length < 2){
      window.alert('You need to select more than 2 characters.')
      return;
   }



   this.hideAll()
   
   this.start();

   //document.getElementById('fldMiddleB').onclick = 'undo();'

   document.getElementById('fldMiddleB').setAttribute( "onClick", "undo()" );
}

function removeDoubles(keep, remove){
   if (charlist.includes(keep) && charlist.includes(remove)){
      charlist.splice(charlist.indexOf(remove), 1)
   }
}

function portraitFilter(suffix){
   for (let i = 0; i < charlist.length; i++){
      if(charlist[i].includes(suffix)){
         charlist.splice(i, 1);
         i--;
      }
   }
}

function applyFilters(){
   for (let i = 0; i < doublesRemove.length; i++){
      this.removeDoubles(doublesKeep[i], doublesRemove[i])
   }

   if(document.getElementById('dupes').checked){
      for (let i = 0; i < spoilerRemove.length; i++){
      this.removeDoubles(spoilerKeep[i], spoilerRemove[i])
   }
   }

   document.getElementById('3hportrait1').checked ? this.portraitFilter('_war') : this.portraitFilter('_academy')
   document.getElementById('tellius1').checked ? this.portraitFilter('_rd') : this.portraitFilter('_por')

   for (let i = 0; i < filtersArr.length; i++){
      if(document.getElementById(`filter${i}`).checked)
      charlist = filter[filtersArr[i]].filter(element => charlist.includes(element));
   }

   charlist = this.shuffle(charlist)

}

function toggle(){
   bg_audio = document.getElementById("bg_music")
   if (!bg_audio.paused){
      bg_audio.pause();
      document.getElementById("toggle").src = "buttons/play.png";
   }
   else {
      bg_audio.volume = .2;
      bg_audio.loop = true;
      bg_audio.play();
      document.getElementById("toggle").src = "buttons/pause.png";
   }
}

function setMusic(load){
   if(load){
      music_index = Math.floor(Math.random()*9)+1;
   } 
   let track = music[music_index];
   document.getElementById("cover").src = "covers/" + track.cover;
   document.getElementById("bg_music").src = "music/" + track.filepath;
   document.getElementById("song_title").innerHTML = track.title;
   console.log(document.getElementById("song_title"))
}

function changeSong(next) {
   if(next){
      music_index == 9 ? music_index = 1 : music_index++;
   }
   else {
      music_index == 1 ? music_index = 9 : music_index--;
   }
   document.getElementById("bg_music").pause()
   document.getElementById("toggle").src = "buttons/play.png";
   setMusic(false);
}



