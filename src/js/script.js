'use strict';

const select = {

  templateOf: {
    cartProduct: '#template-book',
  },
  elements: {
    booksList: '.books-list',
  }
};

const templates = {
  booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

class BookList {
  constructor() {

    const thisBookList = this;
    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.render();
  }

  initData() {
    const thisBookList = this;
    thisBookList.data = dataSource.books;
  }

  getElements() {
    const thisBookList = this;
    thisBookList.bookListWrapper = document.querySelector(select.wrapper.bookList);
  }

  render() {
    const thisBookList = this;

    for (let book of thisBookList.data) {
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBookList.bookListWrapper.appendChild(element);
    }


  }
}
