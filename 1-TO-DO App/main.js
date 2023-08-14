var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
// filter 
var filterList = document.getElementById('filter');

//add event - adding item - add if operation because on page where the function cannot find the id, I receive a "Cannot read property 'addEventListener' of null " error and none of my other functions work.
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

// delete event
itemList.addEventListener('click', removeItem);

//remove item button - function
function removeItem(e) {
    console.log('Remove item');
    if(e.target.classList.contains('delete')) {
        console.log('This is remove!');
        // pop up with information
        if(confirm('Are you sure?')){
            // parent element to e
            var li = e.target.parentElement;
            // li is a child of the item list
            itemList.removeChild(li);
        }
    }
}

// filter items event 
filterList.addEventListener('keyup', filterItems);

// filter items function
function filterItems(e) {
    // convert text to lowercase
    let text = e.target.value.toLowerCase();
    // value of writing text will be output in console
    console.log(text);
    // get all with item list - it's li tags
    var items = itemList.getElementsByTagName('li');
    // in console is print the html's collection in array
    console.log(items);
    // convert all collection items to an array
    Array.from(items).forEach(item => {
        // we want the textcontent in first child of item. It will give us the item name 
        var itemName = item.firstChild.textContent;
        // console.log(itemName);
        // compare the item name to item search box text and use indexof item from array. Index from which to start the search. Default 0 - the whole table will be searched. If the index is greater than or equal to the number of elements, the table will not be searched - the function will return -1
        // if item is correct it will be visible, if not - it will be not visible
        if(itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}