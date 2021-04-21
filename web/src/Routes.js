// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/tapes/new" page={NewTapePage} name="newTape" />
      <Route path="/tapes/{id:Int}/edit" page={EditTapePage} name="editTape" />
      <Route path="/tapes/{id:Int}" page={TapePage} name="tape" />
      <Route path="/tapes" page={TapesPage} name="tapes" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
