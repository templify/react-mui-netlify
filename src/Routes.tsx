import Route from "./models/Route"
import Home from "./views/Home"
import Settings from "./views/Settings"

export const Routes: Route[] = [
  {
    "name": "Home",
    "path": "/",
    element: <Home />
  },
  {
    "name": "Settings",
    path: "/settings",
    element: <Settings />
  }
]
