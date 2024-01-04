import { Route, Routes } from "react-router-dom"
import Signup from "./Signup"
import Signin from "./Login"

const MainRoutes=()=>{
    return <>
    <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Signin/>}/>
    </Routes>
    </>
}
export default MainRoutes