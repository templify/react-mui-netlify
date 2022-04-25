import { useContext } from 'react'
import { Button } from "@mui/material"
import styled from "styled-components"
import { GlobalContext } from "../contexts/GlobalContext"

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Login() {
  const { displayLogin } = useContext(GlobalContext)


  return (
    <Wrapper>
      <Button variant='contained' onClick={() => displayLogin()}>
        Login
      </Button>
    </Wrapper>
  )
}

export default Login