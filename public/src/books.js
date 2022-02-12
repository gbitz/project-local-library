function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter((book) => book.borrows.some((borrow) => {
    return !borrow.returned;
  }));

  const availableBooks = books.filter((book) => book.borrows.every((borrow) => {
    return borrow.returned === true;
  }));

  return [checkedOutBooks, availableBooks];
  
}

function getBorrowersForBook(book, accounts) {
  const filteredAccounts = accounts.filter((account) => book.borrows.some((borrow) => {
    return account.id === borrow.id;
  }));

  const bookBorrowers = filteredAccounts.map((account) => {
    return {
      ...account,
      returned: book.borrows.find((borrow) => {
       return borrow.id === account.id;
      }).returned
    }
  })
  
  return bookBorrowers;
  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
