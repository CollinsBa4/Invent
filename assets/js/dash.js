const addMovieModal = document.getElementById('add-modal');
const desc = document.getElementById('desc');
const addbtn = document.getElementById('addBtn');
const cancelBtn = addMovieModal.querySelector('.btn--passive')
const addItemBtn = addMovieModal.querySelector('.btn--success')
const updatedModal = document.getElementById('add-updated');
const updateBtn = document.getElementById('stock');
const updatestockBtn = document.getElementById('stocks');
const detailsBtn = document.getElementById('details');
const detailStockBtn = document.getElementById('detailStock');
const updateStckModal = document.getElementById('add-stock')
window.addEventListener('load', initStorage);


//item Array
let itemsArray = [];

//function to store values into localstorage
function initStorage() {
    if (localStorage.itemsRecord) {
        itemsArray = JSON.parse(localStorage.itemsRecord);
        for (let i = 0; i < itemsArray.length; i++) {

            prepareTable(itemsArray[i].prodName, itemsArray[i].deSc, itemsArray[i].quantic, itemsArray[i].categ);



        }
        // for (var j = 0; j < localStorage.length; j++) {
        //     console.log(localStorage.getItem(localStorage.key(j)));
        // }
    }
}




const updateHandlerHan = () => {
    updatedModal.classList.add('visible');
}

const updateHandlerStock = () => {
    updateStckModal.classList.add('visible');
}


//show addItem window
const showAddItem = () => {
    addMovieModal.classList.add('visible');

}
const addItemList = () => {
    insertNewItem();
    resetForm;
}


const updateItemList = () => {
    console.log("something has happended")
}
const closeModal = () => {
    addMovieModal.classList.remove('visible');
    resetForm;
}

function insertNewItem() {

    let prodName = document.getElementById("name").value;
    let deSc = document.getElementById("descript").value;
    let quantic = document.getElementById("quant").value;
    let categ = document.getElementById("cat").value;


    prepareTable(prodName, deSc, quantic, categ);

    const itmObj = { prodName: prodName, deSc: deSc, quantic: quantic, categ: categ }
    itemsArray.push(itmObj);

    localStorage.itemsRecord = JSON.stringify(itemsArray);
    console.log(itemsArray);



}


function prepareTable(prodName, deSc, quantic, categ) {

    let table = desc.getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);


    cell1 = newRow.insertCell(0)
    cell1.innerHTML = prodName

    cell2 = newRow.insertCell(1)
    cell2.innerHTML = deSc

    cell3 = newRow.insertCell(2)
    cell3.innerHTML = categ

    cell4 = newRow.insertCell(3)
    cell4.innerHTML = quantic

    cell5 = newRow.insertCell(4)
    cell5.innerHTML = `<button class ="edit">Edit</button>
                        <button class="del">Delete</button>`

}
// <i class="fas fa-trash"></i>
function resetForm() {
    prodName.value = "";
    deSc.value = "";
    quantic.value = ""
    categ.value = "";
}

// function edit(td) {
//     selectedRow = td.parentElement.parentElement;
//     document.getElementById("")
// }
addbtn.addEventListener('click', showAddItem);
cancelBtn.addEventListener('click', closeModal);
addItemBtn.addEventListener('click', addItemList);
updateBtn.addEventListener('click', updateHandlerHan);
detailsBtn.addEventListener('click', updateItemList);
updatestockBtn.addEventListener('click', updateHandlerStock);