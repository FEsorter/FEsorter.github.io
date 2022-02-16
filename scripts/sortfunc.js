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
let finishFlag;

let back_cmp1, back_cmp2;
let back_head1, back_head2;
let back_nrec;

let back_numQuestion;
let back_finishSize;

let back_lstMember = []
let back_parent = []
let back_equal = []
let back_rec = []




//The initialization of the letiable+++++++++++++++++++++++++++++++++++++++++++++

function start() {
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
    //Value of link initial
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

    showImage()
}


function sortList(flag) {

    back_last = lstMember.slice(0);
    back_record = rec.slice(0);

    back_equal = equal.slice(0);
    back_parent = parent.slice(0);

    back_cmp1 = cmp1;
    back_cmp2 = cmp2;
    back_head1 = head1;
    back_head2 = head2;
    back_nrec = nrec;
    back_finishsize = finishSize
    back_numQuestion = numQuestion

    let i;
    let str;
    //rec preservation
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

    lstMember = back_last.slice(0);
    rec = back_record.slice(0);

    equal = back_equal.slice(0);
    parent = back_parent.slice(0);

    cmp1 = back_cmp1;
    cmp2 = back_cmp2;
    head1 = back_head1;
    head2 = back_head2;
    nrec = back_nrec;
    finishSize = back_finishsize
    numQuestion = back_numQuestion;

    showImage();

}


function showResult() {
    let ranking = 1;
    let sameRank = 1;
    let str = "";
    let i;
    str += "<table id= \"resTable\">";
    str += "<tr><td id= \"rightHeader\"> Rank <\/td><td id= \"leftHeader\">Character<\/td><\/tr>";

    for (i = 0; i < charlist.length; i++) {
        str += "<tr><td id= \"rightCol\">" + ranking + "<\/td><td id= \"leftCol\" style=\"background:url(\'./portraits/" + charlist[lstMember[0][i]] + ".png\') 3% center/75px 75px no-repeat !important; margin-left:3px;\">" + all[charlist[lstMember[0][i]]] + "<\/td><\/tr>";
        resultstr += `${ranking}: ${all[charlist[lstMember[0][i]]]}\n`
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
    document.getElementById("lblProgress").innerHTML = str0;
    document.getElementById("leftField").style.backgroundImage = `url('./portraits/${charlist[index1]}.png'), url('./frame.png')`;
    document.getElementById("rightField").style.backgroundImage = `url('./portraits/${charlist[index2]}.png'), url('./frame.png')`;
    document.getElementById("leftField").innerHTML = str1;
    document.getElementById("rightField").innerHTML = str2;
    numQuestion++;
}

function toNameFace(n) {
    let displayName = all[charlist[n]];
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
    textDoc.href = 'data:attachment/text,' + encodeURI(resultstr);
    textDoc.target = '_blank';
    textDoc.download = 'sorterResults.txt';
    textDoc.click();
}

async function draw() {
    if (charlist.length < 10) {
        height = 150 + (charlist.length * 250) - 75
        document.getElementById('topTen').setAttribute('height', height.toString())
    }
    let canvas = document.getElementById('topTen');
    let ctx = canvas.getContext('2d');
    var bg = new Image();
    bg.src = 'template.png'

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
    let keys = await Object.keys(filter)
    for (let i = 0;(i < 10); i++) {
        if (i >= charlist.length) {
            break;
        }
        
        
        let porkey = charlist[lstMember[0][i]]
        console.log(porkey)
        let title = "";
        for (let i = 0; i < keys.length; i++) {
            let arr = filter[keys[i]];
            if (arr.includes(porkey)) {
                title = keys[i]
                break;
            }
        }

        if (title.includes('Extra')) {
            title = title.substring(0, title.length - 6)
        }

        let portrait = new Image();
        portrait.src = `portraits/${porkey}.png`
        portrait.onload = async function() {
            ctx.drawImage(portrait, 176, 150 + (i * 250) - 100, 200, 200);
            ctx.font = '80px FEH';
            let fontsize = 80;
            let name = all[charlist[lstMember[0][i]]]
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