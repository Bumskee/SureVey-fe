import Header from './components/Header';
import Mainbody from './components/Mainbody';
import Template from './components/Template';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Formheader from './components/Formheader';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <Header />
              <Template />
              <Mainbody />
            </div>}
          ></Route>

          <Route path="/form/:id" element={<Formheader />}>
            
          </Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App;
