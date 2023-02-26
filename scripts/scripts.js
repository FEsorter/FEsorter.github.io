let charlist = []
let games = []

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

let current = 'top25'

function swap(key){
  document.getElementById(`${current}Img`).src = `./templates/temp_buttons/${current}.png`

  document.getElementById(`${key}Img`).src = `./templates/temp_buttons/${key}_sel.png`

   document.getElementById(`mainImg`).src = `./templates/${key}.png`

   current = key

}

function downloadTemplate(){
  var link = document.createElement('a');
  link.download = `template.png`;
  link.href = document.getElementById('mainImg').src
  link.id = 'template'
  document.body.appendChild(link);
link.click();
document.body.removeChild(link);

}

function toggleCollapsible(id) {
  let el = document.getElementById(id);
  el.classList.toggle("active");
  var content = el.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function uncheckFilters() {
  for (let i = 0; i < filtersArr.length; i++) {
    let cbox = document.getElementById('filter' + i);
    cbox.checked = false;
  }
  document.getElementById('wwings1').checked = false;
  document.getElementById('fe6').checked = false;
  document.getElementById('fe7').checked = false;
  document.getElementById('3hportrait2').checked = false;
  document.getElementById('3hportrait3').checked = false;
  document.getElementById('tellius1').checked = false;
}

function startup() {
  this.uncheckFilters()
  document.getElementById('romhackSelect_all').checked = false;
  document.getElementById('otherSelect_all').checked = false;
  document.getElementById('romhackSelect_allExtra').checked = false;
  document.getElementById('otherSelect_allExtra').checked = false;
  document.getElementById('topTen').style.display = 'none';
  document.getElementById('resultcontainer').style.display = 'none';
  this.selectAllRomhack()
  this.selectAllOther()
  for (let i = 1; i < 25; i++) {
    document.getElementById(`dupeC${i}`).checked = false;
  }
}

function selectAllMainline() {
  for (let i = 0; i < titlesArr.length; i++) {
    document.getElementById('option' + i).checked = document.getElementById('optSelect_all').checked;
  }
}

function reset() {
  if (window.confirm("Do you want to start over? Your saved progress will be deleted.")) {
    window.location.reload();
    window.localStorage.clear()
  }
}

function selectAll(id, arr, option) {
  for (let i = 0; i < arr.length; i++) {
    document.getElementById(option + i).checked = document.getElementById(id).checked;
  }
}

function selectAllExtra(id, arr, option) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].includes('Extra'))
      document.getElementById(option + i).checked = document.getElementById(id).checked;
  }
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

function portraitChoice(id1, id2, id3) {
  let cbox1 = document.getElementById(id1)
  if (cbox1.checked == false) {
    cbox1.checked = true
    return;
  }
  let cbox2 = document.getElementById(id2)
  cbox2.checked = !cbox1.checked;
  if (id3 != undefined) {
    let cbox3 = document.getElementById(id3)
    cbox3.checked = cbox2.checked
  }
}

function hideAll() {
  document.getElementById('allCheckboxes').style.display = 'none';
  document.getElementById('resumeButton').style.display = 'none';
}
async function initialize() {
  if (window.localStorage['charlist']) {
    if (!window.confirm('Saved progress detected. Are you sure you want to start over?')) {
      return;
    }
  }
  charlist = [];
  let keys = await Object.keys(library)
  for (let i = 0; i < titlesArr.length; i++) {
    if (document.getElementById(`option${i}`).checked) {
      games.push(titlesArr[i])
      charlist = charlist.concat(keys.filter(key => library[key].origin.includes(titlesArr[i])))
    }
  }
  for (let i = 0; i < romhacksArr.length; i++) {
    if (document.getElementById(`romhack${i}`).checked) {
      charlist = charlist.concat(keys.filter(key => library[key].origin.includes(romhacksArr[i])))
    }
  }
  for (let i = 0; i < otherGamesArr.length; i++) {
    if (document.getElementById(`other${i}`).checked) {
      charlist = charlist.concat(keys.filter(key => library[key].origin.includes(otherGamesArr[i])))
    }
  }
  this.applyFilters();
  if (charlist.length < 2) {
    window.alert('You need to select more than 2 characters.')
    return;
  }
  this.hideAll()
  this.start();
  document.getElementById('fldMiddleB').setAttribute("onClick", "undo()");
}

function removeDoubles() {
  for (let i = 1; i < 25; i++) {
    if (!document.getElementById(`dupeC${i}`).checked) {
      continue;
    }
    let sel = document.getElementById(`dupe${i}`).options
    let indexToKeep = document.getElementById(`dupe${i}`).selectedIndex

 
    let len = sel.length

    for (let j = 0; j < len; j++) {
      if (j != indexToKeep && charlist.includes(sel[j].value)) {
        
        charlist.splice(charlist.indexOf(sel[j].value), 1)
        charlist.push(sel[indexToKeep].value)
      } 

    }
  }
}

function portraitTagSelect(tag) {
  for (let i = 0; i < charlist.length; i++) {
    if (library[charlist[i]].tags.includes(tag)) {
      library[charlist[i]].portrait = tag;
    }
  }
}

function defaultPortraits() {
  if (games.includes('Binding Blade') && !games.includes('Blazing Blade')) {
    this.portraitTagSelect('fe6')
  }
  if (games.includes('Blazing Blade') && !games.includes('Binding Blade')) {
    this.portraitTagSelect('fe7')
  }
}

function applyFilters() {
  if (games.includes('Genealogy of the Holy War') && !games.includes('Thracia 776')) {
    this.portraitTagSelect('fe4')
  }
  document.getElementById('tellius1').checked ? this.portraitTagSelect('por') : this.portraitTagSelect('rd')
  document.getElementById('wwings1').checked ? this.portraitTagSelect('fe1') : this.portraitTagSelect('sov')
  if (document.getElementById('3hportrait1').checked) {
    this.portraitTagSelect('academy')
  } else if (document.getElementById('3hportrait2').checked) {
    this.portraitTagSelect('war')
    library['monica'].portrait = 'hopes';
  } else if (document.getElementById('3hportrait3').checked) {
    this.portraitTagSelect('hopes')
    library['cyril'].portrait = 'war';
    library['byleth_f'].portrait = 'war';
    library['byleth_m'].portrait = 'war';
  }
  if (document.getElementById('def').checked) {
    this.defaultPortraits();
  } else if (document.getElementById('fe6').checked) {
    this.portraitTagSelect('fe6')
  } else if (document.getElementById('fe7').checked) {
    this.portraitTagSelect('fe7')
  }
  for (let i = 0; i < filtersArr.length; i++) {
    if (document.getElementById(`filter${i}`).checked) {
      charlist = charlist.filter(element =>
        (library[element].sex == filtersArr[i]) ||
        (library[element].hair.includes(filtersArr[i])) ||
        (library[element].class.includes(filtersArr[i]))
      )
    }
    charlist = this.shuffle(charlist)
  }
  this.removeDoubles()
  charlist = [...new Set(charlist)];
}