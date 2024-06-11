import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import ListTask from './components/ListTask';
import CreateTask from './components/CreateTask';

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Task List</Link>
            </li>
            <li>
              <Link to="task/create">Create Task</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListTask />} />
          <Route path="task/create" element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
