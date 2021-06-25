const addMovieModal = document.getElementById('add-modal');
const backdrop = document.querySelector('.backdrop')
const desc = document.getElementById('desc');
const addbtn = document.getElementById('addBtn');
const cancelBtn = addMovieModal.querySelector('.btn--passive')
const addItemBtn = addMovieModal.querySelector('.btn--success')
const updatedModal = document.getElementById('add-updated');
const updateBtn = document.getElementById('stock');
const updatestockBtn = document.getElementById('stocks');
const itemTotalDiv = document.getElementById('itemTot');
const itemTotDiv = document.getElementById('itemTotal');
const catTotDiv = document.getElementById('catTotal');
const detailsBtn = document.getElementById('details');
const detailStockBtn = document.getElementById('detailStock');
const updateStckModal = document.getElementById('add-stock')
const editor = desc.getElementsByClassName('edit');
const sel = document.querySelector('.categorySelect #cat')
const del = desc.getElementsByClassName('del')
const canUp = updatedModal.querySelector('.btn--passive');
const canUps = updateStckModal.querySelector('.btn--passive');
const qtyC = document.getElementsByClassName('qtyCell')

window.addEventListener('load', () => {
    initStorage();

    let editbtnArray = [...editor]
    editbtnArray.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let id = e.target.closest("tr").rowIndex;
            editDet()
            showItems(id);
            detailsBtn.addEventListener('click', () => {
                editItem(id)
                closeModalUp()
            })
        });
    })
    let delBtnArray = [...del];
    delBtnArray.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let id = e.target.closest("tr").rowIndex;
            e.target.closest("tr").remove();
            updateLocalStorage(id);
        });
    });
    let quantA = [...qtyC]
    quantA.forEach(cel => {
        console.log(cel.parentElement)
        let celCount = parseInt(cel.innerHTML)
        if (celCount == 0) {
            cel.classList.add('outOfStock')
        } else if (celCount < 20) {
            cel.classList.add('allmostOutOfStock')
        } else { cel.classList.add('inStock') }
    })
    itemTotDiv.innerHTML = JSON.parse(localStorage.itemsRecord).length;
    catTotDiv.innerHTML = 4;
    // ​sel.options.length;
});
// window.addEventListener('load', dasvalues);

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

function dasvalues() {
    localStorage.length
}
const editDet = () => {

    backdrop.classList.add('visible')
    updatedModal.classList.add('visible');
}

const updateHandlerHan = () => {
    updatedModal.classList.add('visible');
    backdrop.classList.add('visible')
}

const updateHandlerStock = () => {
    updateStckModal.classList.add('visible');
    backdrop.classList.add('visible')
}


//show addItem window
const showAddItem = () => {
    addMovieModal.classList.add('visible');
    backdrop.classList.add('visible')
}
const addItemList = () => {
    insertNewItem();
    addMovieModal.classList.remove('visible')
    backdrop.classList.remove('visible')
    location.reload()
}


const updateItemList = () => {
    console.log("something has happended")
}



const closeModal = () => {
    addMovieModal.classList.remove('visible')
    backdrop.classList.remove('visible')
    location.reload()
}
const closeModalUp = () => {
    updatedModal.classList.remove('visible')
    backdrop.classList.remove('visible')
    location.reload()
}
const closeModalUps = () => {
    updateStckModal.classList.remove('visible')
    backdrop.classList.remove('visible')
    location.reload()
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
    cell4.classList.add('qtyCell')

    prodName.value = "";
    deSc.value = "";
    quantic.value = ""
    categ.value = "";
}




addbtn.addEventListener('click', showAddItem);
cancelBtn.addEventListener('click', closeModal);
addItemBtn.addEventListener('click', addItemList);
detailsBtn.addEventListener('click', updateItemList);
canUp.addEventListener('click', closeModalUp)
const editItem = (id) => {
    let prodName = document.getElementById("pname")
    let deSc = document.getElementById("pdescript")
    let quantic = document.getElementById("pquant")
    let categ = document.getElementById("pcat")

    let products = JSON.parse(localStorage.getItem("itemsRecord"));
    products.forEach((product, index) => {
        if (index == id - 1) {
            product.prodName = prodName.value;
            product.desc = deSc.value;
            product.quantic = quantic.value;
            product.categ = categ.value;
        }
    });
    localStorage.setItem("itemsRecord", JSON.stringify(products));
    location.reload();
};

const showItems = (id) => {
    let prodName = document.getElementById("pname")
    let deSc = document.getElementById("pdescript")
    let quantic = document.getElementById("pquant")
    let categ = document.getElementById("pcat")

    let products = JSON.parse(localStorage.getItem("itemsRecord"));
    console.log(products)
    products.forEach((product, index) => {
        if (index == id - 1) {
            prodName.value = product.prodName;
            deSc.value = product.deSc;
            quantic.value = product.quantic;
            categ.value = product.categ;
        }
    });
};

const updateLocalStorage = (id) => {
    let product = JSON.parse(localStorage.getItem("itemsRecord"));
    for (let i = 0; i < product.length; i++) {
        if (i == id - 1) {
            product.splice(i, 1);
        }
        localStorage.setItem("itemsRecord", JSON.stringify(product));
    }
};