import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const BidsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.bids()} className="rw-link">
            Bids
          </Link>
        </h1>
        <Link to={routes.newBid()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Bid
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default BidsLayout
