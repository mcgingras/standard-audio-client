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

const Routes = () => {
  return (
    <Router>
      <Route path="/bids/new" page={NewBidPage} name="newBid" />
      <Route path="/bids/{id:Int}/edit" page={EditBidPage} name="editBid" />
      <Route path="/bids/{id:Int}" page={BidPage} name="bid" />
      <Route path="/bids" page={BidsPage} name="bids" />
      <Route path="/tapes/{id:Int}/edit" page={EditTapePage} name="editTape" />
      <Route path="/tapes/{id:Int}" page={TapePage} name="tape" />
      <Route path="/tapes" page={TapesPage} name="tapes" />
      <Route path="/den/{id:Int}" page={ListeningRoomPage} name="listeningRoom" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
