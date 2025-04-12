import { useEffect, useState } from "react";
import { Dashboard } from "./screens/dashboard/Dashboard";
// import Form from "./screens/form/Form";

const ACCESS_PASS = "krE&tU23g"

function App() {
  const [pass, setPass] = useState(false)

  useEffect(() => {
    const result = window.prompt("Porfavor registre la contraseña de acceso")
    if (result === ACCESS_PASS) setPass(true)
    else alert("contraseña incorrecta")
  }, [])

  return pass ? <Dashboard /> : <p>No estás autorizado para ver este contenido</p>
}

export default App;
