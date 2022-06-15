let charlist = []

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
  let cbox = document.getElementById('3hportrait2')
  cbox.checked = false;
  cbox = document.getElementById('3hportrait3')
  cbox.checked = false;
  cbox = document.getElementById('tellius1')
  cbox.checked = false;
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
}

function selectAllMainline() {
  for (let i = 0; i < titlesArr.length; i++) {
    document.getElementById('option' + i).checked = document.getElementById('optSelect_all').checked;
  }
}

function reset() {
  window.location.reload();
  window.localStorage.clear()
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

function portraitChoice(id1, id2) {
  let cbox1 = document.getElementById(id1)
  let cbox2 = document.getElementById(id2)
  cbox2.checked = !cbox1.checked;
}

function triplePortraitChoice(id1, id2, id3) {
  let cbox1 = document.getElementById(id1)
  let cbox2 = document.getElementById(id2)
  let cbox3 = document.getElementById(id3)
  cbox2.checked = !cbox1.checked;
  cbox3.checked = cbox2.checked
}

function hideAll() {
  document.getElementById('allCheckboxes').style.display = 'none';
  document.getElementById('resumeButton').style.display = 'none';
}
async function initialize() {
  charlist = [];
  let keys = await Object.keys(library)
  for (let i = 0; i < titlesArr.length; i++) {
    if (document.getElementById(`option${i}`).checked) {
      charlist = charlist.concat(keys.filter(key => library[key].origin == titlesArr[i]))
    }
  }
  for (let i = 0; i < romhacksArr.length; i++) {
    if (document.getElementById(`romhack${i}`).checked) {
      charlist = charlist.concat(keys.filter(key => library[key].origin == romhacksArr[i]))
    }
  }
  for (let i = 0; i < otherGamesArr.length; i++) {
    if (document.getElementById(`other${i}`).checked) {
      charlist = charlist.concat(keys.filter(key => library[key].origin == otherGamesArr[i]))
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

function removeDoubles(keep, remove) {
  if (charlist.includes(keep) && charlist.includes(remove)) {
    charlist.splice(charlist.indexOf(remove), 1)
  }
}

function portraitFilter(suffix) {
  for (let i = 0; i < charlist.length; i++) {
    if (charlist[i].includes(suffix)) {
      charlist.splice(i, 1);
      i--;
    }
  }
}

function THfilter() {
  chars = []
  for (let i = 0; i < charlist.length; i++) {
    if (charlist[i].includes('_war') || charlist[i].includes('_hopes') || charlist[i].includes('_academy')) {
      chars.push(charlist[i].slice(0, charlist[i].lastIndexOf('_')));
    }
  }
  chars = [...new Set(chars)];
  for (let i = 0; i < chars.length; i++) {
    if (document.getElementById('3hportrait1').checked) {
      this.removeDoubles(`${chars[i]}_academy`, `${chars[i]}_war`)
      this.removeDoubles(`${chars[i]}_academy`, `${chars[i]}_hopes`)
    }
    if (document.getElementById('3hportrait2').checked) {
      this.removeDoubles(`${chars[i]}_war`, `${chars[i]}_academy`)
      this.removeDoubles(`${chars[i]}_war`, `${chars[i]}_hopes`)
      this.removeDoubles(`${chars[i]}_hopes`, `${chars[i]}_academy`)
    }
    if (document.getElementById('3hportrait3').checked) {
      this.removeDoubles(`${chars[i]}_hopes`, `${chars[i]}_academy`)
      this.removeDoubles(`${chars[i]}_hopes`, `${chars[i]}_war`)
      this.removeDoubles(`${chars[i]}_war`, `${chars[i]}_academy`)
    }
  }
}

function applyFilters() {
  for (let i = 0; i < doublesRemove.length; i++) {
    this.removeDoubles(doublesKeep[i], doublesRemove[i])
  }
  if (document.getElementById('dupes').checked) {
    for (let i = 0; i < spoilerRemove.length; i++) {
      this.removeDoubles(spoilerKeep[i], spoilerRemove[i])
    }
  }
  this.THfilter()
  document.getElementById('tellius1').checked ? this.portraitFilter('_rd') : this.portraitFilter('_por')
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
}