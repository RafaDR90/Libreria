import React, { useState } from 'react';
import data from '../../data/books.json';
import style from './BookList.module.css';
import Filtros from './Filtros.module.css';
import BookListDetalles from './BookListDetalles.module.css';

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPages, setMaxPages] = useState('0');
  const [readBooks, setReadBooks] = useState([]);
  const [librosLeidosVisible, setLibrosLeidosVisible] = useState(true);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMaxPagesChange = (event) => {
    setMaxPages(event.target.value);
  };

  const handleReadBook = () => {
    if (selectedBook) {
      const index = readBooks.findIndex((book) => book.title === selectedBook.title);
      if (index === -1) {
        setReadBooks([...readBooks, selectedBook]);
      } else {
        const updatedReadBooks = readBooks.filter((book) => book.title !== selectedBook.title);
        setReadBooks(updatedReadBooks);
      }
    }
  };

  const filteredBooks = data.library.filter(
    (item) =>
      item.book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (maxPages === '0' || item.book.pages <= Number(maxPages))
  );

  const handleLibrosLeidosToggle = () => {
    setLibrosLeidosVisible(!librosLeidosVisible);
  };

  return (
    <div className={style.main}>
      <div className={Filtros.contenedorFiltros}>
        <div className={Filtros.filtroTitulo}>
          <input
            type="text"
            placeholder="Filtrar por título"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={Filtros.filtroPaginas}>
          <h4>Filtrar por máximo de páginas:</h4>
          <input
            type="range"
            min="0"
            max="500"
            value={maxPages}
            onChange={handleMaxPagesChange}
          />
          <span>{maxPages === '0' ? 'Todos' : maxPages}</span>
        </div>
        <h4 className={`${Filtros.mostrandoLibros} ${Filtros.filtroTitulo}`}>Mostrando {filteredBooks.length} libros</h4>
      </div>
      <div className={style.contenedorGrid}>
        <div className={style.contenedorListaLibros}>
          {filteredBooks.map((item, index) => {
            const isRead = readBooks.some((book) => book.title === item.book.title);

            return (
              <div className={style.libro} key={index} onClick={() => handleBookClick(item.book)}>
                <img src={item.book.cover} alt={item.book.title} className={style.portadaLibro} />
                <h2>{item.book.title}</h2>
                <p className={style.datosLibro}>Autor: {item.book.author.name}</p>
                <p className={style.datosLibro}>Género: {item.book.genre}</p>
                <p className={style.datosLibro}>Año: {item.book.year}</p>
                {isRead && <h3 className={style.tituloLeido}>Leído</h3>}
              </div>
            );
          })}
        </div>
        <div className={`${style.contenedorLibrosLeidos} ${librosLeidosVisible ? style.mostrar : style.oculto}`}>
          <h2>Libros Leídos</h2>
          <div className={style.listaLibrosLeidos}>
            {readBooks.map((book) => (
              <div key={book.title} className={style.libroLeido}>
                <img src={book.cover} alt={book.title} style={{ width: '100px' }} />
                <p className={style.tituloLeido}>{book.title}</p>
                <hr></hr>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedBook && (
        <div className={BookListDetalles.contenedorDetalleLibro}>
          <img src={selectedBook.cover} alt={selectedBook.title} className={BookListDetalles.portadaLibroAmpliada} />
          <div className={BookListDetalles.detalleLibro}>
            <h2>{selectedBook.title}</h2>
            <p>Autor: {selectedBook.author.name}</p>
            <p>Género: {selectedBook.genre}</p>
            <p>Año: {selectedBook.year}</p>
            <p>Sinopsis: {selectedBook.synopsis}</p>
            <p>Páginas: {selectedBook.pages}</p>
            <p>ISBN: {selectedBook.ISBN}</p>
            <p>Otros libros del autor: {selectedBook.author.otherBooks.join(', ')}</p>
            <div className={BookListDetalles.botonCerrarLeido}>
              <button onClick={handleCloseDetail}>Cerrar</button>
              <button onClick={handleReadBook}>
                {readBooks.includes(selectedBook) ? 'Sin leer' : 'Leído'}
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedBook && <div className={BookListDetalles.fondoOpaco} onClick={handleCloseDetail}></div>}
      <div className={style.botonMostrarLeidos}>
      </div>
    </div>
  );
};

export default BookList;