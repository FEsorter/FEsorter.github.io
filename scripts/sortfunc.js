let lstMember = []
let parent = []
let equal = []
let rec = []
let resultstr = "";
let cmp1, cmp2;
let head1, head2;
let nrec;
let numQuestion;
let totalSize;
let finishSize;
let finishFlag = 5;
let back_cmp1, back_cmp2;
let back_head1, back_head2;
let back_nrec;
let back_numQuestion;
let back_finishSize;
let back_lstMember = []
let back_parent = []
let back_equal = []
let back_rec = []
let final_rank = [];

function resume() {
  if (!window.localStorage['charlist']) {
    window.alert('No saved data found.')
    return;
  }
  this.transformTable()
  charlist = JSON.parse(window.localStorage['charlist'])

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






  lstMember = JSON.parse(window.localStorage['lstMember'].slice(0));
  rec = JSON.parse(window.localStorage['rec'].slice(0));
  equal = JSON.parse(window.localStorage['equal'].slice(0));
  parent = JSON.parse(window.localStorage['parent'].slice(0));
  cmp1 = window.localStorage['cmp1']
  cmp2 = window.localStorage['cmp2']
  head1 = window.localStorage['head1']
  head2 = window.localStorage['head2']
  nrec = window.localStorage['nrec']
  finishSize = window.localStorage['finishSize']
  numQuestion = window.localStorage['numQuestion']
  totalSize = window.localStorage['totalSize']
  finishFlag = 0;
  document.getElementById('resumeButton').style.display = 'none';
  document.getElementById('allCheckboxes').style.display = 'none';
  showImage();
}

function start() {
  window.localStorage['charlist'] = JSON.stringify(charlist.slice(0))
  this.transformTable()
  let n = 0;
  let mid;
  let i;
  //The sequence that you should sort
  lstMember[n] = new Array();
  for (i = 0; i < charlist.length; i++) {
    lstMember[n][i] = i;
  }
  parent[n] = -1;
  totalSize = 0;
  n++;
  for (i = 0; i < lstMember.length; i++) {
    //And element divides it in two/more than two
    //Increase divided sequence of last in first member
    if (lstMember[i].length >= 2) {
      mid = Math.ceil(lstMember[i].length / 2);
      lstMember[n] = new Array();
      lstMember[n] = lstMember[i].slice(0, mid);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
      lstMember[n] = new Array();
      lstMember[n] = lstMember[i].slice(mid, lstMember[i].length);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
    }
  }
  //Preserve this sequence
  for (i = 0; i < charlist.length; i++) {
    rec[i] = 0;
  }
  nrec = 0;
  //List that keeps your results 
  // Value of link initial
  for (i = 0; i <= charlist.length; i++) {
    equal[i] = -1;
  }
  cmp1 = lstMember.length - 2;
  cmp2 = lstMember.length - 1;
  head1 = 0;
  head2 = 0;
  numQuestion = 1;
  finishSize = 0;
  finishFlag = 0;
  window.localStorage['totalSize'] = JSON.stringify(totalSize)
  showImage()
}

function sortList(flag) {
  if (finishFlag == 5 || finishFlag == 1) {
    return;
  }
  window.localStorage['lstMember'] = JSON.stringify(lstMember.slice(0))
  window.localStorage['rec'] = JSON.stringify(rec.slice(0));
  window.localStorage['equal'] = JSON.stringify(equal.slice(0));
  window.localStorage['parent'] = JSON.stringify(parent.slice(0));
  window.localStorage['cmp1'] = cmp1;
  window.localStorage['cmp2'] = cmp2;
  window.localStorage['head1'] = head1;
  window.localStorage['head2'] = head2;
  window.localStorage['nrec'] = nrec;
  window.localStorage['finishSize'] = finishSize
  window.localStorage['numQuestion'] = numQuestion
  window.localStorage['charlist'] = JSON.stringify(charlist.slice(0))
  let i;
  let str;
  if (flag < 0) {
    rec[nrec] = lstMember[cmp1][head1];
    head1++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (flag > 0) {
    rec[nrec] = lstMember[cmp2][head2];
    head2++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  } else {
    rec[nrec] = lstMember[cmp1][head1];
    head1++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
    equal[rec[nrec - 1]] = lstMember[cmp2][head2];
    rec[nrec] = lstMember[cmp2][head2];
    head2++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }
  //Processing after finishing with one list
  if (head1 < lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    //List the remainder of cmp2 copies, list cmp1 copies when finished scanning
    while (head1 < lstMember[cmp1].length) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (head1 == lstMember[cmp1].length && head2 < lstMember[cmp2].length) {
    //List the remainder of cmp1 copies, list cmp2 copies when finished scanning 
    while (head2 < lstMember[cmp2].length) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }
  //When it arrives at the end of both lists
  //Update a pro list
  if (head1 == lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    for (i = 0; i < lstMember[cmp1].length + lstMember[cmp2].length; i++) {
      lstMember[parent[cmp1]][i] = rec[i];
    }
    lstMember.pop();
    lstMember.pop();
    cmp1 = cmp1 - 2;
    cmp2 = cmp2 - 2;
    head1 = 0;
    head2 = 0;
    //Initialize the rec before performing the new comparison 
    if (head1 == 0 && head2 == 0) {
      for (i = 0; i < charlist.length; i++) {
        rec[i] = 0;
      }
      nrec = 0;
    }
  }
  if (cmp1 < 0) {
    str = "bBattle #" + (numQuestion - 1) + "<br>" + Math.floor(finishSize * 100 / totalSize) + "% sorted.";
    document.getElementById("lblProgress").innerHTML = str;
    showResult();
    finishFlag = 1;
  } else {
    showImage();
  }
}

function undo() {
  if (finishFlag == 5) {
    this.initialize()
    return;
  }
  if (finishFlag == 1) {
    return;
  }
  lstMember = JSON.parse(window.localStorage['lstMember'].slice(0));
  rec = JSON.parse(localStorage['rec'].slice(0));
  equal = JSON.parse(localStorage['equal'].slice(0));
  parent = JSON.parse(localStorage['parent'].slice(0));
  cmp1 = window.localStorage['cmp1']
  cmp2 = window.localStorage['cmp2']
  head1 = window.localStorage['head1']
  head2 = window.localStorage['head2']
  nrec = window.localStorage['nrec']
  finishSize = window.localStorage['finishSize']
  numQuestion = window.localStorage['numQuestion']
  charlist = JSON.parse(window.localStorage['charlist'])
  showImage();
  /*
         localStorage['lstMember'] = lstMember.slice(0);
      localStorage['rec'] = rec.slice(0);

      localStorage['equal'] = equal.slice(0);
      localStorage['parent'] = parent.slice(0);

      localStorage['cmp1'] = cmp1;
      localStorage['cmp2'] = cmp2;
      localStorage['head1'] = head1;
      localStorage['head2'] = head2;
      localStorage['nrec'] = nrec;
      localStorage['finishSize'] = finishSize
      localStorage['numQuestion'] = numQuestion

  */
}

function showResult() {
  window.localStorage.clear()
  let ranking = 1;
  let sameRank = 1;
  let str = "";
  let i;
  str += "<table id= \"resTable\">";
  str += "<tr><td id= \"rightHeader\"> Rank <\/td><td id= \"leftHeader\">Character<\/td><\/tr>";
  for (i = 0; i < charlist.length; i++) {
    final_rank.push(ranking)
    let portraitTag1 = library[charlist[lstMember[0][i]]].portrait
        portraitTag1 != "" ? portraitTag1 = '_' + portraitTag1 : portraitTag1 += "";
    str += "<tr><td id= \"rightCol\">" + ranking + "<\/td><td id= \"leftCol\" style=\"background:url(\'./portraits/" + charlist[lstMember[0][i]] + portraitTag1 + ".png\') 3% center/75px 75px no-repeat !important; margin-left:3px;\">" + library[charlist[lstMember[0][i]]].display + "<\/td><\/tr>";
    resultstr += `${ranking}: ${library[charlist[lstMember[0][i]]].display}\n`
    if (i < charlist.length - 1) {
      if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
        sameRank++;
      } else {
        ranking += sameRank;
        sameRank = 1;
      }
    }
  }
  str += "<\/table>";
  document.getElementById("resultField").innerHTML = str;
  document.getElementById("mainTable").style.display = 'none';
  this.draw()
}



function showImage() {
  let index1 = lstMember[cmp1][head1]
  let index2 = lstMember[cmp2][head2]
  let str0 = "Battle #" + numQuestion + "<br>" + Math.floor(finishSize * 100 / totalSize) + "% sorted.";
  let str1 = "" + toNameFace(index1);
  let str2 = "" + toNameFace(index2);

  let portraitTag1 = library[charlist[index1]].portrait
  let portraitTag2 = library[charlist[index2]].portrait;
  portraitTag1 != "" ? portraitTag1 = '_' + portraitTag1 : portraitTag1 += "";
  portraitTag2 != "" ? portraitTag2 = '_' + portraitTag2 : portraitTag2 += "";
  
  document.getElementById("lblProgress").innerHTML = str0;
  document.getElementById("leftField").style.backgroundImage = `url('./portraits/${charlist[index1]}${portraitTag1}.png'), url('./other_assets/frame.png')`;
  document.getElementById("rightField").style.backgroundImage = `url('./portraits/${charlist[index2]}${portraitTag2}.png'), url('./other_assets/frame.png')`;
  document.getElementById("leftField").innerHTML = str1;
  document.getElementById("rightField").innerHTML = str2;
  numQuestion++;
}

function toNameFace(n) {
  let displayName = library[charlist[n]].display;
  return displayName;
}

function transformTable() {
  let middleTop = document.getElementById('fldMiddleT');
  let middleBottom = document.getElementById('fldMiddleB')
  middleTop.innerHTML = '';
  middleTop.style.backgroundImage = "url('./buttons/tie.png')"
  middleTop.style.borderColor = 'transparent';
  middleTop.style.backgroundSize = '90%'
  middleBottom.innerHTML = '';
  middleBottom.style.backgroundImage = "url('./buttons/undo.png')"
  middleBottom.style.borderColor = 'transparent';
  middleBottom.style.backgroundSize = '90%'
}

function downloadTxt() {
  var textDoc = document.createElement('a');
  textDoc.href = 'data:text/plain;charset=utf-16,' + encodeURIComponent(resultstr)
  textDoc.target = '_blank';
  textDoc.download = 'sorterResults.txt';
  textDoc.click();
}
async function draw() {
  if (charlist.length < 10) {
    height = 150 + (charlist.length * 250) - 100
    document.getElementById('topTen').setAttribute('height', height.toString())
  }
  let canvas = document.getElementById('topTen');
  let ctx = canvas.getContext('2d');
  var bg = new Image();
  bg.src = './other_assets/template.png'
  bg.onload = async function() {
    ctx.drawImage(bg, 0, 0, 900, 2525);
    drawPortraits();
  }
}
async function drawPortraits() {
  let canvas = document.getElementById('topTen');
  let ctx = canvas.getContext('2d');
  ctx.font = '85px FEH';
  ctx.fillStyle = "#ffffff";
  for (let i = 0;
    (i < 10); i++) {
    if (i >= charlist.length) {
      break;
    }
    let porkey = charlist[lstMember[0][i]]
    let portraitTag1 = library[charlist[lstMember[0][i]]].portrait
        portraitTag1 != "" ? portraitTag1 = '_' + portraitTag1 : portraitTag1 += "";
    let title = library[porkey].displayTitle;
    let rank = new Image();
    rank.src = `./other_assets/numbers/${final_rank[i]}.png`
    console.log(final_rank[i])
    rank.onload = async function() {
      if (final_rank[i] == 1 || final_rank[i] == 2 || final_rank[i] == 3) {
        await ctx.drawImage(rank, -12, 150 + (i * 250) - 100, 200, 200);
      } else {
        await ctx.drawImage(rank, 88 - (rank.width / 2), 150 + (i * 250) - (rank.height / 2), rank.width, rank.height);
      }
    }
    let portrait = new Image();
    portrait.src = `portraits/${porkey}${portraitTag1}.png`
    portrait.onload = async function() {
      ctx.drawImage(portrait, 176, 150 + (i * 250) - 100, 200, 200);
      ctx.font = '80px FEH';
      let fontsize = 80;
      let name = library[porkey].display
      if (name.includes('(')) {
        name = name.substring(0, name.indexOf('(') - 1)
      }
      while (ctx.measureText(name).width > 500) {
        fontsize = fontsize - 5;
        ctx.font = `${fontsize}px FEH`;
      }
      await ctx.fillText(name, 400, 160 + (i * 250))
      ctx.font = '25px FEH';
      await ctx.fillText(title, 400, 210 + (i * 250))
    }
  }
  document.getElementById('resultcontainer').style.display = 'block';
}

function downloadCanvas() {
  var link = document.createElement('a');
  link.download = 'topTen.png';
  link.href = document.getElementById('topTen').toDataURL()
  link.click();
}