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

  tr.append(td01, td02, td03, td04, td05, td06, td07);
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

  
  
//   let close = document.getElementsByClassName("close");
//   for (let i = 0; i < close.length; i++) {
//       close[i].onclick = function() {
//         let div = this.parentElement;
//         div.style.display = "none";
//       }
//     }
  
//     for (let i = 0; i < close.length; i++) {
//       close[i].onclick = function() {
//         let div = this.parentElement;
//         div.style.display = "none";
//       }
//     }
//   //third tr for subject input
//   let tdTwo = document.createElement('td');
//       tdTwo.className = "mystyle2";
//   let select = document.createElement('select');
//       select.className = "priority_" + rowCount;
//       select.name = "priority_" + rowCount;
//       select.style.borderRadius = "15px 15px"
//   let selectTest = document.getElementById("priority").getElementsByTagName("option");

//   let optionColours = function(val){
//     let optColor = "";
    
//     if(val == "High"){
//       optColor = "red";
//     } 
//     if(val == "Normal"){
//       optColor = "lightblue";
//     } 
//     if(val == "Low"){
//       optColor = "yellow";
//     } 

//     return optColor;
//   }

//   let inputSelectorOne = document.querySelector("#priority");
//   for(let i = 0; i < selectTest.length; i++){
//     if(selectTest[i].value !== ""){
//       let optElm = document.createElement("option");
//           optElm.value = selectTest[i].value;
//           optElm.innerHTML = selectTest[i].innerHTML;
      
//       // set option which was selected
//       if(inputSelectorOne.value === selectTest[i].value){
//         optElm.selected = "selected";
//         let selectColor = optionColours(selectTest[i].value);
//         select.style.backgroundColor = selectColor;
//       }    

//       // set option color
//       let optColor = optionColours(selectTest[i].value);
//           optElm.style.backgroundColor = optColor;

//       select.append(optElm);
//     }
//   }

//   let optChanges = function(){
//     let selectColor = optionColours(this.value);
//     this.style.backgroundColor = selectColor;
//   }

//   // add onchange
//   select.onchange = optChanges;
      
//   tdTwo.appendChild(select);

  

//   //third tr for subject input
//   let tdThree = document.createElement('td');
//       tdThree.classList.add("mystyle3");
//   let inputSelectorTwo = document.querySelector("#due");
//   let classThird = document.querySelector('.mystyle3');
//   tdThree.innerText = inputSelectorTwo.value;

//   // status selector

//   let tdFour = document.createElement('td');
//   let selectOne = document.createElement('select');
//   tdFour.appendChild(selectOne);

//   //First option
//   let optionOneOne = document.createElement('option');
//   optionOneOne.innerText = "New";
//   selectOne.appendChild(optionOneOne);
//   optionOneOne.value = "New";

//   //Second option
//   let optionOneTwo = document.createElement('option');
//   optionOneTwo.innerText = "In Progress";
//   optionOneTwo.value = "In Progress";
//   selectOne.appendChild(optionOneTwo);

//   //Third option 
//   let optionOneThree = document.createElement('option');
//   optionOneThree.innerText = "Completed";
//   optionOneThree.value = "Completed";
//   selectOne.appendChild(optionOneThree);

//   // Precent completed part
  
//   let tdFive = document.createElement('td');
//   tdFive.classList.add("mystyle5");
//   // create background grey div
//   let divBackground = document.createElement('div');
//   divBackground.className = "first";
//   tdFive.appendChild(divBackground);
//   divBackground.style.backgroundColor = "#D3D3D3";
//   divBackground.style.width = "10rem";
//   divBackground.style.borderRadius ="15px 15px";
//   divBackground.style.marginTop ="1rem";
//   divBackground.style.position="relitive";

//   //create green div
//   let divGreen = document.createElement('div');
//   divGreen.className = "second";
//   divBackground.appendChild(divGreen);
//   divGreen.style.backgroundColor ="green";
//   divGreen.style.position = "absolute";
  

  
 



//   tr.append(tdZero, tdOne, tdTwo, tdThree, tdFour, tdFive);
//   table.appendChild(tr);
// }

// var rowCount = 1;
// let onButtonClick = function(e) {
//     e.preventDefault();

    
//   let table = document.querySelector(".table");
//   addNewRow(table);
//   rowCount++;

    

        
//    };

//     buttonAdd.addEventListener('click', onButtonClick);

    


//     // let inputValue = document.querySelector("myInput").value;
//     // var t = document.createTextNode(inputValue);
//     // li.appendChild(t);
//     // if (inputValue === '') {
//     //   alert("You must write something!");
//     // } else {
//     //   document.getElementById("myUL").appendChild(li);
//     // }
//     // document.getElementById("myInput").value = "";
  
//     // var span = document.createElement("SPAN");
//     // var txt = document.createTextNode("\u00D7");
//     // span.className = "close";
//     // span.appendChild(txt);
//     // li.appendChild(span);
  
//     // for (i = 0; i < close.length; i++) {
//     //   close[i].onclick = function() {
//     //     var div = this.parentElement;
//     //     div.style.display = "none";
//     //   }
//     // }
  