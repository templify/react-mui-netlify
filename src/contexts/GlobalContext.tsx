import React, { useState, useEffect, ReactChild } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

interface IGlobalContext {
  isInitDone?: boolean
  isLoggedIn?: boolean
  user?: netlifyIdentity.User
  initApp: Function
  displayLogin: Function
  logout: Function
}

function noop() {
  console.warn("not initialized")
}

export const GlobalContext = React.createContext<IGlobalContext>({
  initApp: noop,
  displayLogin: noop,
  logout: noop,
})

type Props = {
  children: ReactChild
}

export const Provider = (props: Props) => {
  const { children } = props
  const [isInitDone, setIsInitDone] = useState(false)
  const [isInitStarted, setIsInitStarted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<netlifyIdentity.User>()

  useEffect(() => {
    // Setup login stuff
    setIsInitStarted(true)
    async function setupIdentity() {
      netlifyIdentity.init()
      let u = localStorage.getItem("user");
      if (u) {
        try {
          await netlifyIdentity.refresh()
          try {
            u = JSON.parse(u)
            // @ts-ignore
            setUser(u)
            setIsLoggedIn(true)
          } catch(err) {
            console.error("unable to parse user from local storage")
          }
        } catch(err) {
          logoutUser()
        }
      } else {
        logoutUser();
      }

      netlifyIdentity.on("login", (u) => {
        setUser(u)
        loginUser()
        netlifyIdentity.close()
      });

      netlifyIdentity.on("logout", () => {
        logoutUser()
      });
    }
    setupIdentity()
    setIsInitDone(true)
  }, [])

  function loginUser() {
    if (netlifyIdentity && netlifyIdentity.currentUser()) {
      localStorage.setItem(
        "user",
        JSON.stringify(netlifyIdentity.currentUser())
      );
      setIsLoggedIn(true)
    }
  }

  function logoutUser() {
    localStorage.removeItem("user");
    netlifyIdentity.logout()
    setIsLoggedIn(false)
  }


  const init = async () => {
    if(!isInitDone && !isInitStarted) {
      setIsInitDone(true)
    }
  }

  const value: IGlobalContext = {
    user,
    isInitDone,
    isLoggedIn,
    displayLogin: netlifyIdentity.open,
    logout: logoutUser,
    initApp: init
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}