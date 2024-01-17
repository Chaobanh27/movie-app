/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { getMovieSearchingResults } from '../../api'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [searchValue, setSearchValue] = useState('')
  const [navbarColor, setNavbarColor] = useState('transparent')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const threshold = 100 // Chỉnh ngưỡng cuộn xuống tại đây

      if (currentScrollPos > threshold) {
        setNavbarColor('black-navbar') // Màu của Navbar khi người dùng cuộn xuống
      } else {
        setNavbarColor('transparent-navbar') // Màu của Navbar khi người dùng đang ở đầu trang
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleChange = (e) => {
    let inputVal = e.target.value
    setSearchValue(inputVal)
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    let flag = true
    if (searchValue === '') {
      flag = false
    }
    else {
      flag = true
    }
    if (flag) {
      let results = await getMovieSearchingResults(searchValue)
      let resultsJson = JSON.stringify(results)
      localStorage.setItem('SEARCH_VALUE', resultsJson)
      dispatch({ type: 'SET_DATA', payload: results })
      navigate('/search-results')
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch(e)
  }

  return (
    <>
      <Navbar fixed="top" key="lg" expand="lg" className={`${navbarColor}`}>
        <Container fluid>
          <Navbar.Brand className="text-light" href="/">Movie</Navbar.Brand>
          <Navbar.Toggle className="bg-light" aria-controls={'offcanvasNavbar-expand-lg '} />
          <Navbar.Offcanvas
            className="bg-dark text-light"
            id={'offcanvasNavbar-expand-lg'}
            aria-labelledby={'offcanvasNavbarLabel-expand-lg}'}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={'offcanvasNavbarLabel-expand-lg'}>
                <Link style={{ textDecoration: 'none', color:'white' }} to={'/'}>Movie</Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              </Nav>
              <Form onSubmit={handleSearch} className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search movies..."
                  className="me-2"
                  aria-label="Search"
                  onChange={handleChange}
                  onKeyDown={handleKey}
                />
                <Button type="submit" className="text-light bg-primary" >
                  <BsSearch/>
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default Header