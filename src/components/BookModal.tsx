import { useEffect } from 'react';
import type { Book, BookEdition } from '../types/book';

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

function BookDetails({ book }: { book: BookEdition }) {
  return (
    <>
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
      <p>
        <strong>Прочитано:</strong> {book.read ? 'Да' : 'Нет'}
      </p>
      <p>
        <strong>В наличии:</strong> {book.availability ? 'Да ✅' : 'Нет ❌'}
      </p>
      {book.goodreads ? (
        <p>
          <a href={book.goodreads} target="_blank" rel="noreferrer">
            Ссылка на Goodreads
          </a>
        </p>
      ) : null}
    </>
  );
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

  const otherEditions = book.other_editions ?? [];

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <img
          className="modal-cover"
          src={getBookImageSrc(book.image)}
          alt={book.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/images/no-cover.svg';
          }}
        />
        <h2>{book.title}</h2>

        <BookDetails book={book} />

        {otherEditions.length > 0 ? (
          <section className="other-editions">
            <h3>Другие издания</h3>
            {otherEditions.map((edition, index) => (
              <article
                key={`${edition.title}-${edition.image ?? 'no-image'}-${index}`}
                className="edition-card"
              >
                <img
                  className="edition-cover"
                  src={getBookImageSrc(edition.image)}
                  alt={edition.title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/images/no-cover.svg';
                  }}
                />
                <div className="edition-info">
                  <h4>{edition.title}</h4>
                  <BookDetails book={edition} />
                </div>
              </article>
            ))}
          </section>
        ) : null}

        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
