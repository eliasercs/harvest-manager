import { useState } from "react"
import { LogIn } from "./pages/LogIn"

function App() {

  const [loginForm, setLoginForm] = useState(true)

  return (
    <div className="App">
      <LogIn />
    </div>
  )
}

export default App
