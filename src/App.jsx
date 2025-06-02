import './index.css'
import Navbar from './components/navbar.jsx'
import Config from './components/config.jsx'

function App() {

  return (
    <>
      <Navbar titulo={"AgriSim Cochinillas"} subtitulo={"Simulador de Cochinilla en Cultivos de Olivo"}/>
      <Config />
    </>
  )
}

export default App
