var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

function addItem(e) {
    e.preventDefault();
    console.log(1);
}
if(form) {
    form.addEventListener('submit', addItem);
}


