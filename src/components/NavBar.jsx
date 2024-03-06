import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function NavBar() {

  let navigate = useNavigate()
  return (
    <Navbar  bg="success" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className='xh'>Library Admin</Navbar.Brand>
          <Nav className="heading">
            <i className="fa-solid fa-user-pen" style={{color:'white',marginTop:'12px'}}></i>
            <Nav.Link onClick={()=>navigate('/')} className='navtext'>Author</Nav.Link>&nbsp;&nbsp;
            <i className="fa-solid fa-book" style={{color:'white',marginTop:'12px'}}></i>
            <Nav.Link onClick={()=>navigate('/books')} className='navtext'>Books</Nav.Link>
          </Nav>
        
      </Container>
    </Navbar>
  );
}

export default NavBar;