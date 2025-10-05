import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './contexts/ThemeContext'
import { ApplicationProvider } from './contexts/ApplicationContext'

function App() {
  return (
    <ThemeProvider>
      <ApplicationProvider>
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </ApplicationProvider>
    </ThemeProvider>
  )
}

export default App
