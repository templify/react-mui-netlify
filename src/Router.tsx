import { useContext } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './views/Login';
import { Routes as AppRoutes } from "./Routes"
import DefaultLayout from './layouts/DefaultLayout';

function Router() {
  const { isLoggedIn } = useContext(GlobalContext)

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <DefaultLayout>
          <Routes>
            {AppRoutes.map(r => (
              <Route index={r.path === "/"} key={r.path} path={r.path} element={r.element} />
            ))}
          </Routes>
        </DefaultLayout>

      ) : (
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default Router