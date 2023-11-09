const table = document.querySelector('.table');

// for( i=0; i < 7; i++ ){
//     let div1El = document.createElement('div');
//     div1El.classList="column";
//     container.appendChild(div1El);
//     for( j = 0; j< 8; j++){
//         let div2El = document.createElement('div');
//         div2El.classList="row";
//         div1El.appendChild(div2El);
//         div2El.textContent='blue';
//         div2El.style.backgroundColor = 'red'
        
//         }

//     }



for(let i=0; i< 7; i++){
    let tr = document.createElement('tr');
    table.appendChild(tr);
    for(let j =0; j < 10; j++){
        td = document.createElement('td');
        td.textContent = '0';
        tr.appendChild(td);
    }
}

//document.querySelector(table).appendChild(table);

// let trOne = table.firstChild(tr)

// console.log(trOne);

//let trdocument.querySelector("table").firstChild.innerHTML;


function newElement() {
    let li = document.createElement("tr");
    let inputValue = document.querySelector("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  } 