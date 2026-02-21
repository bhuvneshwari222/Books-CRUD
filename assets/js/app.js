const cl = console.log;
const bookContainer = document.getElementById('bookContainer');
const bookForm = document.getElementById('bookForm');
const titleControl = document.getElementById('title')
const priceControl = document.getElementById('price')
const authorControl = document.getElementById('author')
const discriptionControl = document.getElementById('discription')
const categoryControl = document.getElementById('category')
const imgURLControl = document.getElementById('imgURL');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');

function snackbar(title){
    swal.fire({
        title : title,
        timer : 3000,
        icon : `success`
    });
}

let result = '';
let bookArr = [
    {
        title : 'Harry Potter and the Sorcerers Stone',
        price : '$499.00',
        img : 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=60',
        author : 'J.K. Rowling',
        discription : 'The story of a young wizard discovering his magical heritage at Hogwarts School.',
        category : 'Fantasy',
        bookID : '32453f'
    },
    {
        title : 'Sapiens',
        price : '$699.00',
        img : 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=60',
        author : 'Yuval Noah Harari',
        discription : 'An exploration of humankinds creation and evolution from ancient times to modern age.',
        category : 'History',
        bookID : '3483uth'
    },
    {
        title : 'The Alchemist',
        price : '$299.00',
        img : 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=60',
        author : 'J.K. Rowling',
        discription : 'A philosophical novel about a shepherds journey to find his personal legend.',
        category : 'Fiction',
        bookID : '328rnr'
    },
    {
        title : 'Clean Code',
        price : '$599.00',
        img : 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=60',
        author : 'Robert C. Martin',
        discription : 'A handbook of agile software craftsmanship with best practices for writing clean code.',
        category : 'Programming',
        bookID : '34r43rfh'
    },
    {
        title : 'Atomic Habits',
        price : '$399.00',
        img : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=60',
        author : 'James Clear',
        discription : 'A practical guide to building good habits and breaking bad ones using proven techniques.',
        category : ' Self-Help',
        bookID : '2390ru0'
    }
]



function createBook(arr){
    arr.forEach(ele => {
        result += `<div id="${ele.bookID}" class="info col-md-4 mb-4">
                <div class="card h-100 shadow-lg">
                    <div class="card-header">
                        <div class="text-center">
                            <h4>${ele.title}</h4>
                            <h6 class="text-secondary">${ele.price}</h6>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <img src="${ele.img}" alt="Harry Potter and the Sorcerer's Stone" class="d-flex w-100 h-100">
                    </div>
                    <div class="card-footer">
                        <div class="mb-3">
                            <h5>Author : ${ele.author}</h5>
                            <p>${ele.discription}</p>
                            <u>Category:</u> <strong class="text-warning">${ele.category}</strong>
                        </div>
                        <div>
                            <button onclick="toEdit(this)" class="btn btn-outline-light text-blueviolet">EDIT</button>
                            <button onclick="toRemove(this)" class="btn btn-outline-light text-danger">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>`
    });
    bookContainer.innerHTML = result;
}
createBook(bookArr);


function onAddBook(eve){
    eve.preventDefault();
    let newBookObj = {
        title : titleControl.value,
        price : priceControl.value,
        img : imgURLControl.value,
        author : authorControl.value,
        discription : discriptionControl.value,
        category : categoryControl.value,
        bookID : Date.now().toString()
    }
    bookArr.push(newBookObj);
    bookForm.reset();
    let col = document.createElement('div');
    col.className = "info col-md-4 mb-4";
    col.id = newBookObj.bookID;
    col.innerHTML = `<div class="card h-100 shadow-lg">
                    <div class="card-header">
                        <div class="text-center">
                            <h4>${newBookObj.title}</h4>
                            <h6 class="text-secondary">${newBookObj.price}</h6>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <img src="${newBookObj.img}" alt="Book Image" class="d-flex w-100 h-100">
                    </div>
                    <div class="card-footer">
                        <div class="mb-3">
                            <h5>Author : ${newBookObj.author}</h5>
                            <p>${newBookObj.discription}</p>
                            <u>Category:</u> <strong class="text-warning">${newBookObj.category}</strong>
                        </div>
                        <div>
                            <button onclick="toEdit(this)" class="btn btn-outline-light text-blueviolet">EDIT</button>
                            <button onclick="toRemove(this)" class="btn btn-outline-light text-danger">DELETE</button>
                        </div>
                    </div>
                </div>`;
    bookContainer.append(col);
    snackbar(`Your new Book ${newBookObj.title} is added successfully!!!`)
}

function toRemove(eve){
    let removeID = eve.closest('.info').id;
    let confirmation = confirm(`Are sure you want to delete this book with id ${removeID}`)
    if(confirmation){
        let getIndex = bookArr.findIndex(t => t.bookID === removeID);
        let removedBook = bookArr.splice(getIndex,1);
        eve.closest('.info').remove();
        snackbar(`The Book ${removedBook[0].title} is deleted successfully!!!`)
    }
}




let editID;
function toEdit(eve){
    editID = eve.closest('.info').id;
    let getEditBookObj = bookArr.find((t) => t.bookID === editID);
    titleControl.value = getEditBookObj.title;
    priceControl.value = getEditBookObj.price;
    imgURLControl.value = getEditBookObj.img;
    authorControl.value = getEditBookObj.author;
    discriptionControl.value = getEditBookObj.discription;
    categoryControl.value = getEditBookObj.category;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}



function onUpdateBook(){
    let getBookIndex = bookArr.findIndex(t => t.bookID === editID);
    let updatedBook = {
        title : titleControl.value,
        price : priceControl.value,
        img : imgURLControl.value,
        author : authorControl.value,
        discription : discriptionControl.value,
        category : categoryControl.value,
        bookID : editID
    }
    bookArr[getBookIndex] = updatedBook;
    let selectBook = document.getElementById(editID);
    selectBook.innerHTML = `<div class="card h-100 shadow-lg">
                    <div class="card-header">
                        <div class="text-center">
                            <h4>${updatedBook.title}</h4>
                            <h6 class="text-secondary">${updatedBook.price}</h6>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <img src="${updatedBook.img}" alt="Book Image" class="d-flex w-100 h-100">
                    </div>
                    <div class="card-footer">
                        <div class="mb-3">
                            <h5>Author : ${updatedBook.author}</h5>
                            <p>${updatedBook.discription}</p>
                            <u>Category:</u> <strong class="text-warning">${updatedBook.category}</strong>
                        </div>
                        <div>
                            <button onclick="toEdit(this)" class="btn btn-outline-light text-blueviolet">EDIT</button>
                            <button onclick="toRemove(this)" class="btn btn-outline-light text-danger">DELETE</button>
                        </div>
                    </div>
                </div>`;
    
    bookForm.reset();
    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
    snackbar(`The Book ${updatedBook.title} is updated successfully!!!`)
}



bookForm.addEventListener('submit',onAddBook);
updateBtn.addEventListener('click',onUpdateBook);











