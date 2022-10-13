import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BookTable from "./components/BookTable";
import DisplayBoard from "./components/DisplayBoard";
import CreateBook from "./components/CreateBook";
import { getAllBooks, createBook } from "./services/BookService";
import { getAllTodos, createTodo } from "./services/TodoService";
import Footer from "./components/Footer";

function App() {
  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);

  const [todoList, setTodoList] = useState({});
  const [todos, setTodos] = useState([]);
  const [numberOfTodos, setNumberTodos] = useState(0);

  const handleSubmit = () => {
    createBook(bookShelf).then(() => {
      setNumberBooks(numberOfBooks + 1);
    });
  };

  const handleGetAllTodos = () => {
    console.log(getAllTodos())
  }

  const handleSubmitTodo = () => {
    const todoName = prompt("할일")
    console.log(todoName)
    // createTodo
    const category = prompt("카테고리")
    createTodo({todo: todoName, category, isComplete: false})
  }

  const getAllBook = () => {
    getAllBooks().then((data) => {
      setBooks(data);
      setNumberBooks(data.length);
      console.log(data)
    });
  };

  const getAllTodo = () => {
    getAllTodos().then((data) => {
      setTodos(data);
      setNumberTodos(data.length)
    })
  }

  const handleOnChangeForm = (e) => {
    let inputData = bookShelf;
    if (e.target.name === "book") {
      bookShelf.book = e.target.value;
    } else if (e.target.name === "category") {
      bookShelf.category = e.target.value;
    } else if (e.target.name === "author") {
      bookShelf.author = e.target.value;
    }
    setBookShelf(inputData);
  };

  return (
    <div className="main-wrapper">
      <div className="main">
      <button onClick={handleGetAllTodos}>버튼</button>
      <button onClick={handleSubmitTodo}>버튼2</button>
        <Header />
        <CreateBook
          bookShelf={bookShelf}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}
        />
        <DisplayBoard numberOfBooks={numberOfBooks} getAllBook={getAllBook} getAllTodo={getAllTodo}/>
        <BookTable books={books} />
        <Footer />
      </div>

    </div>
  );
}

export default App;
