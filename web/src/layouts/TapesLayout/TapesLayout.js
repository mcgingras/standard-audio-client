import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const TapesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.tapes()} className="rw-link">
            Tapes
          </Link>
        </h1>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default TapesLayout
