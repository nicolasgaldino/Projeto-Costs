import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path= "/" element={<Home/>}/> 
          <Route path= "/Company" element={<Company/>}/> 
          <Route path= "/Contact" element={<Contact/>}/> 
          <Route path= "/NewProject" element={<NewProject/>}/>    
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}

export default App
