import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { defaultService } from '../service'
import { isLoading } from '../../store/reducer/slice/loader'
import { login, logout } from '../../store/reducer/slice/auth'
import { alert } from '../../store/reducer/slice/alert'

export const authAction = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authLogin = (email: string, password: string, rememberEmail: boolean) => {
        
        dispatch(isLoading())
        
        defaultService.handleService({
            method: 'post',
            endPoint: '/auth/login',
            params: {
                email: email,
                password: password,
                rememberEmail: rememberEmail
            }
        }).then(
            response => {
                dispatch(login(response.data.data))
                dispatch(isLoading())
                navigate('/admin')
            },
            error => {
                dispatch(alert({
                    title: '에러',
                    type: 'alert',
                    message: '이메일과 비밀번호를 확인하세요.',
                    isShow: true,
                    params: ''
                }))     
                dispatch(isLoading())
            }
        )
    }

    const authLogout = (params: any) => {
        defaultService.handleService({
            method: 'post',
            endPoint: '/auth/logout',
            params: params
        }).then(
            response => {
                dispatch(logout())
            },
            error => {
                console.log(error)
            }
        )
    }

    return { 
        authLogin, 
        authLogout
    }
}
