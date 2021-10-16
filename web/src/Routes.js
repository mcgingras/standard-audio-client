import { Router, Route } from '@redwoodjs/router'
import EditTapePage from './pages/EditTapePage/EditTapePage'
import ListeningRoomPage from './pages/ListeningRoom/ListeningRoomPage'
import TapesClaimPage from './pages/TapeClaimPage/TapesClaimPage'
import DemoPage from './pages/DemoPage/DemoPage'
import AboutPage from './pages/AboutPage/AboutPage'
import FlexTest from './pages/FlexTest/FlexTest'

const Routes = () => {
  return (
    <Router>
      <Route path="/tapes/{id:Int}/edit" page={EditTapePage} name="editTape" />
      <Route path="/tapes/{id:Int}" page={TapePage} name="tape" />
      <Route path="/tapes" page={TapesPage} name="tapes" />
      <Route path="/tapes/{id:Int}/claim" page={TapesClaimPage} name="claims" />
      <Route path="/den/{id:Int}" page={ListeningRoomPage} name="listeningRoom" />
      <Route path="/flex" page={FlexTest} name="flex" />
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/demo/{id:Int}" page={DemoPage} name="demo" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
