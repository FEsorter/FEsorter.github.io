let lstMember = []
let parent = []
let equal = []
let rec = []
 
let cmp1,cmp2;
let head1,head2;
let nrec;
 
let numQuestion; 
let totalSize;
let finishSize; 
let finishFlag;
 
 
 
//The initialization of the letiable+++++++++++++++++++++++++++++++++++++++++++++
 
function start(){
	console.log('started')
	let n = 0;
	let mid;
	let i; 
	//The sequence that you should sort
	lstMember[n] = new Array();
	for (i=0; i<charlist.length; i++) {
		lstMember[n][i] = i;
	}
	parent[n] = -1; 
	totalSize = 0; 
	n++; 
	for (i=0; i<lstMember.length; i++) {
		//And element divides it in two/more than two
		//Increase divided sequence of last in first member
		if(lstMember[i].length>=2) {
			mid = Math.ceil(lstMember[i].length/2);
			lstMember[n] = new Array();
			lstMember[n] = lstMember[i].slice(0,mid); 
			totalSize += lstMember[n].length;
			parent[n] = i; 
			n++; 
			lstMember[n] = new Array(); 
			lstMember[n] = lstMember[i].slice(mid,lstMember[i].length); 
			totalSize += lstMember[n].length; 
			parent[n] = i;
			n++;
		} 
	} 
	//Preserve this sequence
	for (i=0; i<charlist.length; i++) {
		rec[i] = 0;
	} 
	nrec = 0; 
	//List that keeps your results 
	//Value of link initial
	// Value of link initial
	for (i=0; i<=charlist.length; i++) { 
		equal[i] = -1;
	} 
	cmp1 = lstMember.length-2; 
	cmp2 = lstMember.length-1; 
	head1 = 0; 
	head2 = 0; 
	numQuestion = 1;
	finishSize = 0;
	finishFlag = 0;

	showImage()
}
 
 
 
//&#12522;&#12473;&#12488;&#12398;&#12477;&#12540;&#12488;+++++++++++++++++++++++++++++++++++++++++++
 
//flag&#65306;Don't know characters
 
// -1&#65306;Chose the left
 
// 0&#65306;Tie
 
// 1&#65306;Chose the right
 
function sortList(flag){
	let i;
	let str;
	//rec preservation
	if (flag<0) {
		rec[nrec] = lstMember[cmp1][head1]; 
		head1++;
		nrec++; 
		finishSize++; 
		while (equal[rec[nrec-1]]!=-1) { 
			rec[nrec] = lstMember[cmp1][head1]; 
			head1++; 
			nrec++; 
			finishSize++; 
		} 
	} 
	else if (flag>0) { 
		rec[nrec] = lstMember[cmp2][head2]; 
		head2++; 
		nrec++; 
		finishSize++; 
		while (equal[rec[nrec-1]]!=-1) { 
			rec[nrec] = lstMember[cmp2][head2]; 
			head2++; 
			nrec++; 
			finishSize++; 
		}
	}
	else {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
		equal[rec[nrec-1]] = lstMember[cmp2][head2];
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp2][head2]; 
			head2++; 
			nrec++; 
			finishSize++;
		}
	}
	//Processing after finishing with one list
	 
	if (head1<lstMember[cmp1].length && head2==lstMember[cmp2].length) {
	//List the remainder of cmp2 copies, list cmp1 copies when finished scanning
		while (head1<lstMember[cmp1].length){
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		} 
	}
	 
	else if (head1==lstMember[cmp1].length && head2<lstMember[cmp2].length) {
	//List the remainder of cmp1 copies, list cmp2 copies when finished scanning 
		while (head2<lstMember[cmp2].length){ 
			rec[nrec] = lstMember[cmp2][head2];
			head2++; 
			nrec++; 
			finishSize++; 
		}
	}
	//When it arrives at the end of both lists
	 
	//Update a pro list
	if (head1==lstMember[cmp1].length && head2==lstMember[cmp2].length) { 
		for (i=0; i<lstMember[cmp1].length+lstMember[cmp2].length; i++) {
			lstMember[parent[cmp1]][i] = rec[i];
		}
		lstMember.pop(); 
		lstMember.pop();
		cmp1 = cmp1-2;
		cmp2 = cmp2-2;
		head1 = 0;
		head2 = 0; 
		//Initialize the rec before performing the new comparison 
		if (head1==0 && head2==0) {
			for (i=0; i<charlist.length; i++) { 
				rec[i] = 0;
			}
			nrec = 0;
		}
	}
	if (cmp1<0) {
		str = "bBattle #"+(numQuestion-1)+"<br>"+Math.floor(finishSize*100/totalSize)+"% sorted.";
		document.getElementById("lblProgress").innerHTML = str;
		showResult();
		finishFlag = 1; 
	}
	else {
		showImage();
	}
}
 
//The results+++++++++++++++++++++++++++++++++++++++++++++++
//&#38918;&#20301;=Rank/Grade/Position/Standing/Status
//&#21517;&#21069;=Identification term
 
function showResult() {
	let ranking = 1;
	let sameRank = 1;
	let str = "";
	let i;
	str += "<table style=\"width:200px; font-size:18px; line-height:120%; margin-left:auto; margin-right:auto; border:1px solid #000; border-collapse:collapse\" align=\"center\">";
	str += "<tr><td style=\"color:#ffffff; background-color:#e097d9; text-align:center;\">rank<\/td><td style=\"color:#ffffff; background-color:#e097d9; text-align:center;\">options<\/td><\/tr>";

	for (i=0; i<charlist.length; i++) {
		str += "<tr><td style=\"border:1px solid #000; text-align:center; padding-right:5px;\">"+ranking+"<\/td><td style=\"border:1px solid #000; padding-left:5px;\">"+charlist[lstMember[0][i]]+"<\/td><\/tr>";
		if (i<charlist.length-1) {
			if (equal[lstMember[0][i]]==lstMember[0][i+1]) {
				sameRank++;
	 
			} 
			else {
				ranking += sameRank;
	 			sameRank = 1;
			}
		}
	}	 
	str += "<\/table>";
	document.getElementById("resultField").innerHTML = str;
}
 
 
 
//Indicates two elements to compare+++++++++++++++++++++++++++++++++++
 
function showImage() {
	let index1 = lstMember[cmp1][head1]
	let index2 = lstMember[cmp2][head2]
	let str0 = "Battle #"+numQuestion+"<br>"+Math.floor(finishSize*100/totalSize)+"% sorted.";
	let str1 = ""+toNameFace(index1);
	let str2 = ""+toNameFace(index2);
	document.getElementById("lblProgress").innerHTML = str0;
	document.getElementById("leftField").style.backgroundImage = `url('./portraits/${charlist[index1]}.png')`;
	document.getElementById("rightField").style.backgroundImage = `url('./portraits/${charlist[index2]}.png')`;
	document.getElementById("leftField").innerHTML = str1;
	document.getElementById("rightField").innerHTML = str2;
	numQuestion++;
}
 
 
 
//Convert numeric value into a name (emoticon)+++++++++++++++++++++++++++++++
 
function toNameFace(n){
	let displayName = all[charlist[n]];
	return displayName; 
}

 
