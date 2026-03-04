import './App.css';
import { useState, useEffect } from 'react';

const tempData = [
  { "id": 1, "title": "Teenage Mutant Ninja Turtles x Naruto", "author": "Caleb Goellner", "image_url": "https://m.media-amazon.com/images/I/91iA+EfedXL._SY466_.jpg", "price": 15.80 },
  { "id": 2, "title": "Tim Burton's The Nightmare Before Christmas - Zero's Journey", "author": "D.J. Milky", "image_url": "https://m.media-amazon.com/images/I/71p8+8b6XzL._SY466_.jpg", "price": 24.99 },
  { "id": 3, "title": "One Piece, Vol. 1: Romance Dawn", "author": "Eiichiro Oda", "image_url": "https://m.media-amazon.com/images/I/91NxYvUNf6L._SY466_.jpg", "price": 7.68 },
  { "id": 4, "title": "Jujutsu Kaisen, Vol. 1", "author": "Gege Akutami", "image_url": "https://m.media-amazon.com/images/I/81TmHlRleJL._SY466_.jpg", "price": 7.18 },
  { "id": 5, "title": "Demon Slayer: Kimetsu no Yaiba, Vol. 1", "author": "Koyoharu Gotouge", "image_url": "https://m.media-amazon.com/images/I/81ZNkhqRvVL._SY466_.jpg", "price": 6.92 },
  { "id": 6, "title": "Spy x Family, Vol. 2", "author": "Tatsuya Endo", "image_url": "https://m.media-amazon.com/images/I/41Vpj9KnOaL._SY445_SX342_.jpg", "price": 9.99 },
  { "id": 7, "title": "Goodnight Punpun, Vol.1", "author": "Inio Asano", "image_url": "https://m.media-amazon.com/images/I/917IJDfk36L._SY425_.jpg", "price": 13.46 },
  { "id": 8, "title": "Solo Leveling, Vol. 1", "author": "Chugong", "image_url": "https://m.media-amazon.com/images/I/816hywlmu-L._SY425_.jpg", "price": 11.99 }
];

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://organic-couscous-pjpxwjvq4g6jfjgr-5000.app.github.dev/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.books || tempData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Store</h1>
      </header>
      <main className="books-container">
        {loading && <p>Loading books...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && books.length === 0 && <p>No books found.</p>}

        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.image_url} alt={book.title} />
              </div>
              <div className="book-info">
                <h2>{book.title}</h2>
                <p className="author">by {book.author}</p>
                <p className="price">${book.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
