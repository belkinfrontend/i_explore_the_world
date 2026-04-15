import { BookCard } from './BookCard';

export function BookList({ books, onBookClick }) {
  if (books.length === 0) {
    return <p className="no-results">Ничего не найдено</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={`${book.title}-${book.image ?? 'no-image'}`} book={book} onClick={() => onBookClick(book)} />
      ))}
    </div>
  );
}
