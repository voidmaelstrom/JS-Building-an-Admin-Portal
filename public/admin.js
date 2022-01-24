async function retrieveBooksToUpdate() {

  let response = await fetch('http://localhost:3001/listBooks')
  let books = await response.json()

  books.forEach(renderBook)
}

function renderBook(book) {
  let root = document.querySelector('#root')

  let li = document.createElement('li')
  li.textContent = book.title

  let quantityInput = document.createElement('input')
  quantityInput.value = book.quantity

  let saveButton = document.createElement('button')
  saveButton.textContent = 'Save'

  let deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'

  updateBookQuantity(saveButton, book, quantityInput);

  deleteBook(deleteButton, book, li);

  li.append(quantityInput, saveButton, deleteButton)

  root.append(li)

}

function renderAddNewBook() {
  let body = document.querySelector('body')

  let addNewBookDiv = document.createElement('div')

  let newBookTitleLabel = document.createElement('li')
  newBookTitleLabel.textContent = 'Enter new book title here: '

  let newBookTitleInput = document.createElement('input')
  newBookTitleInput.type = 'text'
  newBookTitleInput.id = 'bookTitle'

  let newBookDescLabel = document.createElement('li')
  newBookDescLabel.textContent = 'Enter new book description here: '

  let newBookDesc = document.createElement('input')
  newBookDesc.type = 'text'
  newBookDesc.id = 'bookDesc'

  let newBookImageURLLabel = document.createElement('li')
  newBookImageURLLabel.textContent = 'Enter new book image link here: '

  let newBookImageURL = document.createElement('input')
  newBookImageURL.type = 'text'
  newBookImageURL.id = 'bookImgURL'

  let addNewBookButton = document.createElement('button')
  addNewBookButton.textContent = 'Add New Book'

  addNewBookDiv.append(newBookTitleLabel,
                       newBookTitleInput,
                       newBookDescLabel,
                       newBookDesc,
                       newBookImageURLLabel,
                       newBookImageURL,
                       addNewBookButton)

  body.append(addNewBookDiv)

  addBook(addNewBookButton);
}

function updateBookQuantity(saveButton, book, quantityInput) {
  saveButton.addEventListener('click', () => {
      fetch('http://localhost:3001/updateBook', {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: book.id,
              quantity: quantityInput.value
          })
      })
  })
}

function deleteBook(deleteButton, book, li) {
  deleteButton.addEventListener('click', () => {
    fetch(`http://localhost:3001/removeBook/${book.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (li.textContent.includes(`${book.title}`)) {
      li.remove();
    }
  })
}

function addBook(addNewBookButton) {
  const year = new Date().getFullYear();
  addNewBookButton.addEventListener('click', () => {
    console.log(document.getElementById('bookTitle').value, year, document.getElementById('bookDesc').value, 1, document.getElementById('bookImgURL').value);
    fetch('http://localhost:3001/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: document.getElementById('bookTitle').value,
            year: year,
            description: document.getElementById('bookDesc').value,
            quantity: 1,
            imageURL: document.getElementById('bookImgURL').value
        })
    })
  })
}

retrieveBooksToUpdate();
renderAddNewBook();