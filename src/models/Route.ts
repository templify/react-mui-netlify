type Route = {
  name: string
  path: string
  element: JSX.Element
  children?: Route[]
}

export default Route