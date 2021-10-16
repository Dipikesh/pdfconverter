import './App.css';
import Header from './component/Header'
import Form from './component/Form'
import axios from 'axios';
import imageCompression from "browser-image-compressor";


function App() {

 


 
  return (
    <div className = "container">
      <Header title="PDF CONVERTER" />
      <Form/>
    
    </div>
  );
}

export default App;
