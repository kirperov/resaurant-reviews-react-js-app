import './App.css';
import Header from './components/Header';
import MapSection from './components/MapSection';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <h1>Good Food</h1>
      <MapSection></MapSection>
    </div>
  );
}

export default App;
