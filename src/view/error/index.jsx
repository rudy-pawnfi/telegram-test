import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() =>{
        navigate(location.pathname)
    },[location])
    return(
        <div></div>
    )
}
export default ErrorPage