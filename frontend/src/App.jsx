import { useState } from "react"
import { Checkbox } from "./components/Checkbox"
import { SignUpForm } from "./components/SignUpForm"
import { LogInForm } from "./components/LogInForm"

function App() {

  const [loginForm, setLoginForm] = useState(true)

  return (
    <div className="App">
      <div className="register-container">
        <div className="col align-self-center">
          <div className="section">
            <Checkbox />
            <div className="card-3d-wrap">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                   <div className="section">
                    <LogInForm />
                   </div>
                  </div>
                </div>

                <div className="card-back">
                  <div className="center-wrap">
                    <div className="section">
                      <SignUpForm /> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
