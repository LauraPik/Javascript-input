// Default & Global params
var rowCount = 1;

// defaults containers
const addTaskFields = document.querySelector('.addFields');
const addTaskBtn = document.querySelector('.addNewTask');

const table = document.querySelector("tbody");

let addNewRow = function(table){
  // default & repeat txt
  let alignVer = 'align-middle';

  // inputs & select
  let inputs = addTaskFields.querySelectorAll("input");
  let subjectName = inputs[0];
  let dueDate = inputs[1];
  let selects = addTaskFields.querySelectorAll("select");
  let priority = selects[0];
  
  // create row
  let tr = document.createElement('tr');
      tr.dataset.id = rowCount;

  // check action
  let td01 = document.createElement("td");
      td01.className = alignVer;
  let icon = document.createElement("i");
      icon.className = 'fa-regular fa-circle-check text-success';

  icon.onclick = function(){
    if(this.classList.contains('fa-regular')){
      this.classList.remove("fa-regular");
      this.classList.add('fa-solid');

      checkMarkChange(this, "done");
    } else {
      this.classList.add("fa-regular");
      this.classList.remove('fa-solid');

      checkMarkChange(this, "missing");
    }
  }

  td01.appendChild(icon);

  // subject name
  let td02 = document.createElement("td");
      td02.className = alignVer;
      td02.dataset.name = 'subject_name';
  let iconCheck = document.createElement("i");
      iconCheck.className = 'pull-right fa-check fa-solid fa-chart-simple fa-sm text-secondary mr-1';
  let subText = document.createElement("span");
      subText.className = 'p-1';
      subText.innerHTML = subjectName.value;
  td02.append(iconCheck, subText);

  // priority
  let td03 = document.createElement("td");
      td03.className = alignVer;
  let proLabel = document.createElement("span");
      proLabel.className = "badge";
      proLabel.innerText = priority.options[priority.selectedIndex].text;
  let selectColor = optionColours(priority.value);
  proLabel.classList.add(selectColor);
  td03.appendChild(proLabel);

  // Due  Date
  let td04 = document.createElement("td");
      td04.className = alignVer;
      td04.innerText = dueDate.value;

  // Status
  let td05 = document.createElement("td");
      td05.className = alignVer;
  let optValues = ["New", "In Progress", "Complete"];
  let statusSelect = document.createElement("select");
      statusSelect.className = "form-select";
  for(let i = 0; i < optValues.length; i++){
    let opt = document.createElement("option");
        opt.value = i;
        opt.innerText = optValues[i];

    if(i === 0){
      opt.selected = "selected";
    }

    statusSelect.append(opt);
  }

  statusSelect.onchange = function(){
    let val = this.value;

    let widProgFill = "";
    let procNumber = "0%";
    if(val == 1){
      let rngPosibility = [25, 50, 75];
      let rngNumber = Math.floor(Math.random()*rngPosibility.length);

      procNumber = rngPosibility[rngNumber] + "%";
      widProgFill = "w-" + rngPosibility[rngNumber];
    } else if(val == 2){
      procNumber = "100%";
      widProgFill = "w-100";
    }

    /*
    TR
      TD  
        SELECT
    */ 
    let parentTR = this.parentElement.parentElement;
    let procTD = parentTR.querySelector("[data-name=process]");
    let procNr = procTD.querySelector(".proc");
    let procBar = procTD.querySelector('.barCnt').querySelector("div");

    procNr.innerText = procNumber;

    procBar.classList.remove("w-25", "w-50", "w-75", "w-100");
    if(widProgFill !== ""){
      procBar.classList.add(widProgFill);
    }
  }

  td05.appendChild(statusSelect);

  // persent complete
  let td06 = document.createElement("td");
      td06.className = alignVer;
      td06.dataset.name = "process";
  let progHolder = document.createElement("div");
      progHolder.className = "d-flex flex-row gap-1 align-items-center";
  let progProc = document.createElement("div");
      progProc.className = "proc";
      progProc.innerText = "0%";
  let progBarHolder = document.createElement("div");
      progBarHolder.className = "barCnt bg-secondary position-relative w-100 progressBar rounded";
  let progBarProcFill = document.createElement("div");
      // w-25, w-50, w-75 for "in progress"
      progBarProcFill.className = "bg-success position-absolute h-100 rounded";

  progBarHolder.appendChild(progBarProcFill);
  progHolder.append(progProc,progBarHolder);
  td06.appendChild(progHolder);

  // modified on
  let td07 = document.createElement("td");
      td07.className = alignVer;
      td07.innerText = "25/12/2011 2:56 PM";
    
  //delete button

  let td08 = document.createElement("td");
      td08.className = alignVer;
      let iconDelete = document.createElement("i");
      iconDelete.className = "fa-solid fa-ban";
      iconDelete.style.color ="#ea833e";
      iconDelete.dataset.remtr = rowCount;
      iconDelete.dataset.name = "jonelis";


      td08.appendChild(iconDelete);

    function OndeleteRow(e){
      if(e.target.classList.contains('fa-solid fa-ban')){
        return;
      }

        let currentElm = e.target;
        console.log("i", currentElm);

        let getID = currentElm.dataset.remtr;
        console.log("ID", getID);

        let demo = currentElm.dataset;
        console.log("demo", demo);

        let findTR = document.querySelector('[data-id="'+getID+'"]');
        console.log("find", findTR);

        findTR.remove();

/// <div id class data-BELEKOKS name =""         ></div>
        //i.closest =(tr.data-id).remove();
        // console.log(""tr)
    }
    

    // console.log(tr)
    iconDelete.addEventListener('click', OndeleteRow);

  tr.append(td01, td02, td03, td04, td05, td06, td07, td08);
  table.append(tr);
};

let onButtonClick = function(e) {
  e.preventDefault();

  addNewRow(table);
  rowCount++;
};

// tigger add task function
addTaskBtn.addEventListener('click', onButtonClick);

let checkMarkChange = function(elm, type){
  console.log(elm);

  let parentTR = elm.parentElement.parentElement;
  let subTD = parentTR.querySelector("[data-name=subject_name]");
  let subIcon = subTD.querySelector("i");
  let subText = subTD.querySelector('span');

  console.log(subText.innerText);

  if(type == "done"){  
    subIcon.classList.add('text-primary');
    subIcon.classList.remove('text-secondary');
    
    let delElm = document.createElement("del");
        delElm.innerHTML = subText.innerHTML;

    subText.innerHTML = "";
    subText.appendChild(delElm);
  } else if(type == "missing"){
    subIcon.classList.remove('text-primary');
    subIcon.classList.add('text-secondary');

    subText.innerHTML = subText.innerText;
  }
}

let optionColours = function(val){
  let optColor = "bg-";
  
  if(val == "3"){
    optColor += "danger";
  } 
  if(val == "2"){
    optColor += "primary";
  } 
  if(val == "1"){
    optColor += "warning";
  } 

  return optColor;
}


//Array for local storage

let myList = [];// vieta kur idedam itemus

let selects = addTaskFields.querySelectorAll("select");

// console.log(selects[0].value)
if(selects[0].value == ""){
  //  alert("Klaida. Pasirinkite prioriteta");
}


document.getElementById('button').addEventListener('click', (e)=>{
 e.preventDefault();
 // tikrinu ar funkcija veikia 
 console.log('buuton')
  //pasizymiu subject
  let subject = document.getElementsByName("subject_name");
  let value1 = subject[0].value;
  //pasizymiu selecto reiksmes
  let selects = addTaskFields.querySelectorAll("select");
  if(selects[0].value == ""){
    alert("Klaida. Pasirinkite prioriteta");
 }
  let value2 = selects[0].value;
  
//pasizymiu due
  let due = document.getElementsByName("due_date");
  let value3 = due[0].value

    myList.push({
      subject: value1,
      priority: value2,
      due_date: value3
    });
    demo();
    localStorage.setItem('Todo items', JSON.stringify(myList))
    
})




var storedInput = JSON.parse(localStorage.getItem('Todo items'));


//function to pull input from myList array
let storagefunction = function(){
  // let  storedInput = JSON.parse(localStorage.getItem('Todo items'));
  for(let i=0; i < storedInput.length; i++ ){
    // console.log(storedInput[i]);
    // console.log(storedInput
    //   [i].subject);
    let alignVer = 'align-middle';

    
   let tr = document.createElement('tr');
    tr.dataset.id = i;
    //td01 creation
    let td01 = document.createElement("td");
      td01.className = alignVer;
  let icon = document.createElement("i");
      icon.className = 'fa-regular fa-circle-check text-success';

  icon.onclick = function(){
    if(this.classList.contains('fa-regular')){
      this.classList.remove("fa-regular");
      this.classList.add('fa-solid');

      checkMarkChange(this, "done");
    } else {
      this.classList.add("fa-regular");
      this.classList.remove('fa-solid');

      checkMarkChange(this, "missing");
    }
  }

  td01.appendChild(icon);

  // td02 creation for subject
  let td02 = document.createElement("td");
  td02.className = alignVer;
  td02.dataset.name = 'subject_name';
let iconCheck = document.createElement("i");
  iconCheck.className = 'pull-right fa-check fa-solid fa-chart-simple fa-sm text-secondary mr-1';
let subText = document.createElement("span");
  subText.className = 'p-1';
  subText.innerHTML = storedInput[i].subject;
td02.append(iconCheck, subText);

  //td03 creation for priority
let priority = storedInput[i].priority;

let td03 = document.createElement("td");
  td03.className = alignVer;
let proLabel = document.createElement("span");
  proLabel.className = "badge";
  proLabel.innerText = priority;
let selectColor = optionColours(priority.value);
proLabel.classList.add(selectColor);
td03.appendChild(proLabel);

  // td04 creation for Due date
  let td04 = document.createElement("td");
      td04.className = alignVer;
      td04.innerText = storedInput[i].due_date;
      let td05 = document.createElement("td");
      td05.className = alignVer;
  let optValues = ["New", "In Progress", "Complete"];
  let statusSelect = document.createElement("select");
      statusSelect.className = "form-select";
  for(let i = 0; i < optValues.length; i++){
    let opt = document.createElement("option");
        opt.value = i;
        opt.innerText = optValues[i];

    if(i === 0){
      opt.selected = "selected";
    }

    statusSelect.append(opt);
  }

  statusSelect.onchange = function(){
    let val = this.value;

    let widProgFill = "";
    let procNumber = "0%";
    if(val == 1){
      let rngPosibility = [25, 50, 75];
      let rngNumber = Math.floor(Math.random()*rngPosibility.length);

      procNumber = rngPosibility[rngNumber] + "%";
      widProgFill = "w-" + rngPosibility[rngNumber];
    } else if(val == 2){
      procNumber = "100%";
      widProgFill = "w-100";
    }

    let parentTR = this.parentElement.parentElement;
    let procTD = parentTR.querySelector("[data-name=process]");
    let procNr = procTD.querySelector(".proc");
    let procBar = procTD.querySelector('.barCnt').querySelector("div");

    procNr.innerText = procNumber;

    procBar.classList.remove("w-25", "w-50", "w-75", "w-100");
    if(widProgFill !== ""){
      procBar.classList.add(widProgFill);
    }
  }

  td05.appendChild(statusSelect);

  // persent complete
  let td06 = document.createElement("td");
      td06.className = alignVer;
      td06.dataset.name = "process";
  let progHolder = document.createElement("div");
      progHolder.className = "d-flex flex-row gap-1 align-items-center";
  let progProc = document.createElement("div");
      progProc.className = "proc";
      progProc.innerText = "0%";
  let progBarHolder = document.createElement("div");
      progBarHolder.className = "barCnt bg-secondary position-relative w-100 progressBar rounded";
  let progBarProcFill = document.createElement("div");
      // w-25, w-50, w-75 for "in progress"
      progBarProcFill.className = "bg-success position-absolute h-100 rounded";

  progBarHolder.appendChild(progBarProcFill);
  progHolder.append(progProc,progBarHolder);
  td06.appendChild(progHolder);

  // modified on
  let td07 = document.createElement("td");
      td07.className = alignVer;
      td07.innerText = "25/12/2011 2:56 PM";

  //Delete table
  let td08 = document.createElement("td");
      td08.className = alignVer;
      let iconDelete = document.createElement("i");
      iconDelete.className = "fa-solid fa-ban";
      iconDelete.style.color ="#ea833e";

      td08.appendChild(iconDelete);
  tr.append(td01, td02, td03, td04, td05, td06, td07, td08);
  table.append(tr);


  }
};


if(storedInput.length > 0){
  storagefunction();
}

let demo = function(){
  console.log("My list:", myList)
}


