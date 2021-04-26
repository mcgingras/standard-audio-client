import { Toaster } from '@redwoodjs/web/toast'

const BaseLayout = (props) => {
  return (
    <div className="p-8 bg-yellow-200 h-screen">
      <Toaster />
      <main className="">{props.children}</main>
    </div>
  )
}

export default BaseLayout
