var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

//add item - add if operation because on page where the function cannot find the id, I receive a "Cannot read property 'addEventListener' of null " error and none of my other functions work.
if(form) {
    form.addEventListener('submit', addItem);
}
//form submit event
function addItem(e) {
    e.preventDefault();
    //get input value
    const newItem = document.getElementById('item').value;
    //create li element
    let li = document.createElement('li');
    // add class to new li element
    li.className = 'list-group-item';
    console.log(li);
    // add text node with input value
    li.appendChild(document.createTextNode(newItem));
 

    // add element - delete's button
    const deleteButton = document.createElement('button');
    // add class to delete button
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    // append text node 'X' to button
    deleteButton.appendChild(document.createTextNode('X'));
    // append button to li element
    li.appendChild(deleteButton);

    // append li to list items
    itemList.appendChild(li);
}

