import './App.css';
import Header from './components/Header'
import GoogleMap from './components/GoogleMap'
function App() {
  return (
    <div className="App">
      <Header></Header>
      <h1>Good Food</h1>
      <GoogleMap></GoogleMap>
    </div>
  );
}

export default App;
