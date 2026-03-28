import { Route, Routes } from "react-router"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import DashBoard from "./Pages/DashBoard"
import SharedDashboard from "./Pages/SharedDashboard"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/sharedDashboard/:id" element={<SharedDashboard/>} />
      </Routes>
    </>
  )
}

export default App