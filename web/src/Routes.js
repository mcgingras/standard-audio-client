// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'
import EditTapePage from './pages/EditTapePage/EditTapePage'
import ListeningRoomPage from './pages/ListeningRoom/ListeningRoomPage'
import TapesClaimPage from './pages/TapeClaimPage/TapesClaimPage'
import DemoPage from './pages/DemoPage/DemoPage'
import AboutPage from './pages/AboutPage/AboutPage'
import AltPage from './pages/AltPage/AltPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/tapes/{id:Int}/edit" page={EditTapePage} name="editTape" />
      <Route path="/tapes/{id:Int}" page={TapePage} name="tape" />
      <Route path="/tapes" page={TapesPage} name="tapes" />
      <Route path="/tapes/{id:Int}/claim" page={TapesClaimPage} name="claims" />
      <Route path="/den/{id:Int}" page={ListeningRoomPage} name="listeningRoom" />
      <Route path="/alt" page={AltPage} name="alt" />
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/demo/{id:Int}" page={DemoPage} name="demo" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
