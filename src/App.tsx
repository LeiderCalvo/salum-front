import { useEffect, useState } from "react";
import { Dashboard } from "./screens/dashboard/Dashboard";
import Form from "./screens/form/Form";
import { ProfileDetail } from "./screens/profileDetail/ProfileDetail";
import { Route, Routes } from "react-router";

const ACCESS_PASS = "krE&tU23g"

function App() {
  const [pass, setPass] = useState(false)

  useEffect(() => {
    const result = window.prompt("Porfavor registre la contraseña de acceso")
    if (result === ACCESS_PASS) setPass(true)
    else alert("contraseña incorrecta")
  }, [])

  if(!pass) return <p>No estás autorizado para ver este contenido</p>

  return <Routes>
    <Route index element={<Dashboard />} />
    <Route path="form" element={<Form />} />
    <Route path="profile-detail" element={<ProfileDetail />} />
  </Routes>
}

export default App;
