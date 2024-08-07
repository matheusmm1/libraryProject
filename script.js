//array where the new book objects are stored
const myLibrary = [];

//makes the addBook button run the addBookToLibrary function
const addBook = document.querySelector(".addBook");
addBook.addEventListener("click", function (event) {
  event.preventDefault();
  addBookToLibrary();
});

function addBookToLibrary() {
  //object contrusctor function
  function Book(author, title, numOfPages) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
  }

  //variables containing the value of the input in the input boxes on the webpage
  const author = document.querySelector("#authorName").value;
  const title = document.querySelector("#bookTitle").value;
  const numOfPages = document.querySelector("#pageNum").value;

  //newBook variable makes a new object using object contructor
  //and the parameters of the new book are the same as the created variables above (input from user)
  const newBook = new Book(author, title, numOfPages);

  //stores the new book object inside the myLibrary array
  myLibrary.push(newBook);

  //Adds a book card as books get added
  const bookCards = document.querySelector(".bookCards");
  const newCard = bookCards.appendChild(document.createElement("div"));
  newCard.classList.add("card");

  //clears the input boxes
  const inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  //takes last added book and then fill card with last book info
  myLibrary.forEach(function (item, index, array) {
    if (index === array.length - 1) {
      newCard.textContent = `Author name: ${author}`;
      newCard.textContent += ` | Book title: ${title}`;
      newCard.textContent += ` | Number of pages: ${numOfPages}`;
    }
  });

  //creates remove book button and read button to every card created
  const createRemove = document.createElement("button");
  createRemove.classList.add("remove");
  const createRead = document.createElement("button");
  createRead.classList.add("read");
  const cards = document.querySelectorAll(".card");
  cards.forEach(function (i) {
    i.appendChild(createRemove);
    i.appendChild(createRead);
  });

  //adds text to all remove buttons
  const removeBttn = document.querySelectorAll(".remove");
  removeBttn.forEach(function (i) {
    i.textContent = "Remove Book";
  });

  //adds text to all read buttons
  const readBttn = document.querySelectorAll(".read");
  readBttn.forEach(function (i) {
    i.textContent = "Read";
  });
  //removes the book card when clicking remove button on card
  removeBttn.forEach(function (i) {
    i.addEventListener("click", function () {
      i.parentElement.remove();
    });
  });

  //changes card color and shows message depending on if the user has read the book or not
  const bookMessage = document.createElement("p");
  readBttn.forEach(function (item, index, array) {
    item.addEventListener("click", function () {
      if (index === array.length - 1) {
        item.parentElement.appendChild(bookMessage);
        if (item.textContent === "Not read") {
          item.parentElement.setAttribute(
            "style",
            "background-color: lightcoral",
          );
          bookMessage.textContent = "✘ You have not read this book yet";
          item.textContent = "Read";
        } else if (item.textContent === "Read") {
          item.parentElement.setAttribute(
            "style",
            "background-color: lightskyblue",
          );
          bookMessage.textContent = "✓ You have read this book";
          item.textContent = "Not read";
        }
      }
    });
  });
}
