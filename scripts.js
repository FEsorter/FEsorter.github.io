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
   'Heroes'
]

const romhacksArr = [
"The Last Promise",
"Four Kings",
"Vision Quest",
"Dark Lord and the Maiden of Light"
]

const filtersArr = [
"Male Only",
"Female Only",
"Lords",
"Refreshers",
"Shapeshifters",
"Myrmidons",
"Archers",
"Healers",
"Pegaus Knights",
"Wyvern Riders"
]

const columns = 2;

function toggleColl(id){
   let el = document.getElementById(id);
      el.classList.toggle("active");
   var content = el.nextElementSibling;

    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
}

function generateCheckboxes() {

   let titlesTable = document.getElementById('titlesTable');
   let titlesBody = document.createElement('tbody');
   let row;
   titlesTable.appendChild(titlesBody);

   for (let i = 0; i < titlesArr.length; i++){
      if ((i % columns) == 0){
         row = titlesBody.insertRow(titlesBody.rows.length);
         row.id = 'optionsRow' + i;
      }
      let cell = row.insertCell(row.childNodes.length)
      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox', 0);
      checkbox.setAttribute('checked', 'true', 0);
      checkbox.value = titlesArr[i]
      checkbox.title = titlesArr[i]
      checkbox.id = 'option' + i;
      cell.appendChild(checkbox);
      let span = document.createElement('span');
      span.appendChild(document.createTextNode(titlesArr[i]))
      span.title = titlesArr[i]
      span.id = 'span'+i;
      span.setAttribute('class', 'cbox', 0);
      span.className = 'cbox';
      span.onclick = function() {check(this.id);}
      cell.appendChild(span);
   }

   let titlesFooter = document.createElement('tfoot');
   titlesTable.appendChild(titlesFooter);
   row = titlesFooter.insertRow(titlesFooter.rows.length);
   row.setAttribute('class', 'opt_foot', 0);
   row.className = 'opt_foot';

   let cell = row.insertCell(row.childNodes.length);

   cell.setAttribute('colspan', columns, 0);
   let checkbox = document.createElement('input');
   checkbox.setAttribute('type', 'checkbox', 0);
   checkbox.setAttribute('checked', 'true', 0);
   checkbox.value = "All";
   checkbox.title = "All boxes are checked/unchecked at the same time.";
   checkbox.id = 'optSelect_all';
   checkbox.onclick = function() {selectAll();}
   cell.appendChild(checkbox);

   var span = document.createElement('span');
   span.appendChild(document.createTextNode("Select All"));
   cell.appendChild(span);    
}


function startup() {
   this.generateCheckboxes();
}

function selectAllMainline() {
   for (let i = 0; i < titlesArr.length; i++) {
      document.getElementById('option' + i).checked = document.getElementById('optSelect_all').checked;
   }
}

function selectAllRomhack() {
   for (let i = 0; i < romhacksArr.length; i++) {
      document.getElementById('romhack' + i).checked = document.getElementById('romhackSelect_all').checked;
   }
}

