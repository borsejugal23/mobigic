import { Route, Routes } from "react-router-dom"
import Signup from "./Signup"
import Signin from "./Login"
import FileUpload from "./Upload"

const MainRoutes=()=>{
    return <>
    <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="file" element={<FileUpload/>}/>
        <Route path="/login" element={<Signin/>}/>
    </Routes>
    </>
}
export default MainRoutes