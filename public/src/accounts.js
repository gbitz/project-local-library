function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1); 
}

function getTotalNumberOfBorrows(account, books) {
  // filters book-rental-ids and account-id matches to create an array 
  // and returns  the length of array to determine number
  // of borrows
  return books.filter((book) => book.borrows.some((borrow) => {
    return borrow.id === account.id;
  })).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const currentBooks = books.filter((book) => book.borrows.some((borrow) => {
    return borrow.id === account.id && borrow.returned === false;
  }));

  const updatedBooks = currentBooks.map((book) => {
    return book = {
        ...book,
        author: authors.find((author) => {
          return author.id === book.authorId;
        })
      }
  });

  return updatedBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
