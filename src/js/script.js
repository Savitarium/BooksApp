class BooksList {
  constructor() {
    this.templates = {
      books: Handlebars.compile(document.getElementById('template-book').innerHTML),
    };
    this.booksList = document.querySelector('.books-list');
    this.filtersForm = document.querySelector('.filters');
    this.favoriteBooks = [];
    this.filters = [];
    this.initData();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  render() {
    const displayedBooksIds = [];

    for (let book of this.data) {
      if (displayedBooksIds.includes(book.id)) {
        continue;
      }
      const ratingBgc = this.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
      const ratingWidth = book.rating * 10;
      const generatedHTML = this.templates.books(book);
      const bookDOM = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(bookDOM);
    }
  }

  initActions() {
    this.booksList.addEventListener('dblclick', (event) => {
      const bookImage = event.target.offsetParent;
      if (bookImage.classList.contains('book__image')) {
        event.preventDefault();
        bookImage.classList.toggle('favorite');
        const bookId = bookImage.getAttribute('data-id');
        if (this.favoriteBooks.includes(bookId)) {
          this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
        } else {
          this.favoriteBooks.push(bookId);
        }
        console.log(this.favoriteBooks);
      }
    });
    this.filtersForm.addEventListener('click', (event) => {
      const element = event.target;
      const type = element.getAttribute('type');
      const name = element.getAttribute('name');
      const value = element.getAttribute('value');
      if (type === 'checkbox' && name === 'filter') {
        if (element.checked === true) {
          this.filters.push(value);
        } else if (this.filters.includes(value)) {
          this.filters.splice(this.filters.indexOf(value), 1);
        }
        ;
      }
      ;
      this.filterBooks();
    });
  }

  filterBooks() {
    for (let book of this.data) {
      let shouldBeHidden = false;
      for (let filter of this.filters) {
        if (filter === 'adults' && !book.details.adults) {
          shouldBeHidden = true;
        } else if (filter === 'nonFiction' && !book.details.nonFiction) {
          shouldBeHidden = true;
          break;
        }
        ;
      }
      ;
      if (shouldBeHidden) {
        const bookId = book.id;
        const bookImage = document.querySelector(`.book__image[data-id="${bookId}"]`);
        bookImage.classList.add('hidden');
      } else {
        const bookId = book.id;
        const bookImage = document.querySelector(`.book__image[data-id="${bookId}"]`);
        bookImage.classList.remove('hidden');
      }
    }
    ;
  }

  function

  determineRatingBgc(rating) {

    let background = '';

    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  }
}
new BooksList();