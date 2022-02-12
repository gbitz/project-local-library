function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows.some((borrow) => {
    return !borrow.returned;
  })).length
}

function getMostCommonGenres(books) {
  let genreCount = {};
  let genreList = [];
  books.forEach(book => {
    genreCount.hasOwnProperty(book.genre) ? genreCount[book.genre] += 1 : genreCount = {...genreCount,[book.genre]: 1}
  });
  return sortAndSlice(createList(genreCount, genreList));
}

function getMostPopularBooks(books) {
  let popularBooks = {};
  let popularList = [];
  books.forEach(book => {
    popularBooks = {
      ...popularBooks,
      [book.title]: book.borrows.length
    }
  }); 
  return sortAndSlice(createList(popularBooks, popularList));
  
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = {}
  let authorsList = [];
  authors.forEach((author) => {
    const name = `${author.name.first + " " + author.name.last}`;
    const authorBorrowsCount = books.filter((book) => book.authorId === author.id).map((book) => book.borrows.length);
    const count = authorBorrowsCount.reduce((count, borrow) => count + borrow);
    
    popularAuthors = {
      ...popularAuthors,
      [name]: count
    }
  })
  return sortAndSlice(createList(popularAuthors,authorsList));
}

function sortAndSlice(list) {
  list.sort((itemA, itemB) => itemB.count - itemA.count);
  return list.slice(0,5);
}

function createList(informationObject, list) {
  Object.entries(informationObject).forEach(([entry,value]) => {
    list.push(
      {
        name: entry,
        count: value
      }
    )
  });
  return list;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
