import { useMemo, useState } from 'react';
import { TegakiRenderer } from 'tegaki';
import caveat from 'tegaki/fonts/caveat';
import { booksData } from './data/booksData';
import { Filters } from './components/Filters';
import { BookList } from './components/BookList';
import { BookModal } from './components/BookModal';
import type { Book } from './types/book';

function App() {
  const [search, setSearch] = useState('');
  const [onlyMissing, setOnlyMissing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const availableCount = useMemo(() => booksData.filter((book) => book.availability).length, []);
  const missingCount = booksData.length - availableCount;

  const filteredBooks = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return booksData
      .filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm);
        const matchesAvailability = !onlyMissing || !book.availability;
        return matchesSearch && matchesAvailability;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [search, onlyMissing]);

  return (
    <div className="container">
      <h1>
        <TegakiRenderer font={caveat} style={{ fontSize: '52px' }}>
          Серия "Я познаю мир"
        </TegakiRenderer>
      </h1>

      <p className="total">
        Всего книг: {booksData.length}. У меня в наличии: {availableCount}. Отсутствует:{' '}
        {missingCount}.
      </p>

      <Filters
        search={search}
        onSearchChange={setSearch}
        onlyMissing={onlyMissing}
        onOnlyMissingChange={setOnlyMissing}
      />

      <BookList books={filteredBooks} onBookClick={setSelectedBook} />

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default App;
