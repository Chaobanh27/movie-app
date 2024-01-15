import './App.css'
import Header from './components/Header/Header'

function App(props) {

  return (
    <>
      <Header/>
      {props.children}
    </>
  )
}

export default App
