import { useEffect } from "react"
import Swal from "sweetalert2"
import {Checkbox} from "../components/Checkbox"
import {LogInForm} from "../components/LogInForm"
import {SignUpForm} from "../components/SignUpForm"
import useAuthStore from "../hooks/useAuthStore"

export const LogIn = () => {

  const {errorMessage} = useAuthStore()

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire({
        title: "Error en la autenticación",
        icon: "error",
        text: errorMessage
      })
    }
  }, [errorMessage])

  return (<div className="register-container">
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
  </div>)
}