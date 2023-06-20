/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');
  const select = {
    templateOf: {
      booksProduct: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      images: '.book__image',
      filters: '.filters',
    },
  };
  
  const classNames = {
    favorite: 'favorite',
    hidden: 'hidden',
  };
  
  // reference to template and list
  const templates = {
    templateBooks: Handlebars.compile(
      document.querySelector(select.templateOf.booksProduct).innerHTML
    ),
  };


  class BooksList {
    constructor() {
      const thisBooks = this;
      ////Add an empty array
      thisBooks.favoriteBooks = [];
      thisBooks.filters = [];

  
      thisBooks.getElement();
      thisBooks.render();
      thisBooks.initActions();
    }
  
    getElement() {
      const thisBooks = this;
  
      thisBooks.bookContainer = document.querySelector(select.containerOf.books);
    }
      
    // inside the for of loop, I go through each item from dataSource.books
    render() {
      const thisBooks = this;
      thisBooks.booksData = dataSource.books;

      for (let book of dataSource.books) {
  
        /* generating HTML code based on a template and data about a specific book. */
        const generatedHTML = templates.templateBooks(book);
        /* creating a DOM element */
        const element = utils.createDOMFromHTML(generatedHTML);
        // creating a DOM element from HTML code
        thisBooks.bookContainer.appendChild(element);
      }
    }

    // Add the initActions function
    initActions() {
      const thisBooks = this;
      /**Add a listener that waits for the clicked item (event.target), paying attention to its parent*/
      thisBooks.bookContainer.addEventListener('dblclick', function(event){
        event.preventDefault(); //block default browser action (preventDefault)
        const clickedBook = event.target.offsetParent;

        const dataId = clickedBook.getAttribute('data-id');

        if (!thisBooks.favoriteBooks.includes(dataId)) {
          clickedBook.classList.add(classNames.favorite); //removes/adds the 'favorite' class
          thisBooks.favoriteBooks.push(dataId); //will add this ID to favoriteBooks[]
        } else {
          const indexOfBooks = thisBooks.favoriteBooks.indexOf(dataId); //download index
          thisBooks.favoriteBooks.splice(indexOfBooks, 1); //remove id
          clickedBook.classList.remove(classNames.favorite); //removes/adds the 'favorite' class
        }
      });

      const booksFilter = document.querySelector(select.containerOf.filters);

      booksFilter.addEventListener('click', function (cb) {
        const clickedElement = cb.target;
        if (
          clickedElement.tagName == 'INPUT' &&
            clickedElement.type == 'checkbox' &&
            clickedElement.name == 'filter'
        ) {
          console.log('clickedElement', clickedElement.value);
          if (clickedElement.checked) {
            thisBooks.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooks.filters.indexOf(
              clickedElement.value
            );
            thisBooks.filters.splice(indexOfValue, 1);
          }
        }
        thisBooks.filterBooks();
      });
    }

    filterBooks() {
      const thisBooks = this;
      for (let bookData of thisBooks.booksData) {
        let shouldBeHidden = false;

        const book = document.querySelector(
          select.containerOf.images + '[data-id = "' + bookData.id + '"]'
        );

        for (let filter of thisBooks.filters) {
          if (!bookData.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          book.classList.add(classNames.hidden);
        } else {
          book.classList.remove(classNames.hidden);
        }
      }
    }

  }

  const app = new BooksList();
  console.log(app);
}
