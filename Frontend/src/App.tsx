import { Route, Routes } from "react-router"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import DashBoard from "./Pages/DashBoard"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </>
  )
}

export default App