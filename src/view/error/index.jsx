import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() =>{
        navigate('/telegram-test')
    },[location])
    return(
        <div></div>
    )
}
export default ErrorPage