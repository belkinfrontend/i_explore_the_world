import { useEffect } from 'react';
import type { Book } from '../types/book';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

function getBookImageSrc(imageName: Book['image']) {
  if (!imageName) {
    return '/images/no-cover.svg';
  }
  return `/images/${imageName}`;
}

export function BookModal({ book, onClose }: BookModalProps) {
  useEffect(() => {
    if (!book) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [book, onClose]);

  if (!book) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <img
          src={getBookImageSrc(book.image)}
          alt={book.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/images/no-cover.svg';
          }}
        />
        <h2>{book.title}</h2>

        <p>
          <strong>Год:</strong> {book.year || '-'}
        </p>
        <p>
          <strong>Язык:</strong> {book.language || '-'}
        </p>
        <p>
          <strong>Авторы:</strong> {book.authors?.length ? book.authors.join(', ') : '-'}
        </p>
        <p>
          <strong>Описание:</strong> {book.description || '-'}
        </p>
        <p>
          <strong>Страниц:</strong> {book.pages || '-'}
        </p>
        {book.goodreads ? (
          <p>
            <a href={book.goodreads} target="_blank" rel="noreferrer">
              Ссылка на Goodreads
            </a>
          </p>
        ) : null}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
