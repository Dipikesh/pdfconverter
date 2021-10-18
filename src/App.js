import './App.css';
import Header from './component/Header'
import Form from './component/Form'



function App() {

 
document.title="PDF CONVERTER"

 
  return (
    <div className = "container">
      <Header title="PDF CONVERTER" />
      <Form/>
    
    </div>
  );
}

export default App;
