import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons"
import './App.css';
import makeName from './makeName';

function App() {
  const [name, setName] = useState(makeName())
  return (
    <div className="App">
      <header>
        <h3 className="MainTitle">Генератор названий<br />для русских IT компаний</h3>
      </header>
      <article className="Content">
        <h2 className="ContentTitle">Ваша компания</h2>
        <h1 className="CompanyName">{name}</h1>
        <button className="RefreshButton" onClick={() => setName(makeName())}>
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>
        <div className="ContactsList">
          <div className="Contact">
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/@i4iksy">
              {"Twitter разработчика"}
            </a>
          </div>
      </div>
      </article>
      <footer className="Footer">
        <span>
        Все совпадения случайны, потому что названия генерируются случайным образом.
        Если название вам понравилось – забирайте и пользуйтесь.
        Весь код и алгоритм <a target="_blank" rel="noopener noreferrer" href="">опубликован на Github</a> и распространяется по <a target="_blank" rel="noopener noreferrer" href="">Лицензии MIT</a>.
        </span>
      </footer>
    </div>
  );
}

export default App;
