import Nav from '../components/Nav'

type Props = {
  children: any
}

function DefaultLayout(props: Props) {
  const { children } = props

  return (
    <div>
      <Nav />
      <div>
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout