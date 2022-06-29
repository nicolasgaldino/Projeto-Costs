import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path= "/" element={<Home/>}/>
          <Route path= "/projects" element={<Projects/>}/>
          <Route path= "/Company" element={<Company/>}/> 
          <Route path= "/Contact" element={<Contact/>}/> 
          <Route path= "/NewProject" element={<NewProject/>}/>    
          <Route path= "/project/:id" element={<Project/>}/>    
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}

export default App
