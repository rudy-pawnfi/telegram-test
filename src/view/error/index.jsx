import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() =>{
        console.log('location :>> ', location);
        if(location.pathname === '/'){
            navigate('/telegram-test')
        }else{
            navigate(location.pathname)
        }
        
    },[location])
    return(
        <div></div>
    )
}
export default ErrorPage