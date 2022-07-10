import './App.css';
import {CardForm} from './components/body/CardForm';

function App () {
  return (
    <div className="App">
      <header className="App-header navbar navbar-expand-md navbar-dark bg-primary">
        <h1> Todo App</h1>
      </header>

      <CardForm />
    </div>
  );
}

export default App;
