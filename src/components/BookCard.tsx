import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

function getBookImageSrc(imageName: Book['image']) {
  if (!imageName) {
    return '/images/no-cover.svg';
  }
  return `/images/${imageName}`;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <article className="book-card" onClick={onClick}>
      <img
        className="book-image"
        src={getBookImageSrc(book.image)}
        alt={book.title}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = '/images/no-cover.svg';
        }}
      />
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-year">Год: {book.year || '-'}</div>
        <div>Данные: {book.verified_data ? 'актуализированы' : 'Не актуализированы'}</div>
        <br />
        <div className={book.availability ? 'available' : 'not-available'}>
          {book.availability ? 'В наличии ✅' : 'Отсутствует ❌'}
        </div>
      </div>
    </article>
  );
}
