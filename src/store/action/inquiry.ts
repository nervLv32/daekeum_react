import { useDispatch } from 'react-redux'
import { defaultService } from '../service'
import { addInquiry, getInquiry } from '../../store/reducer/slice/inquiry'

export const inquiryAction = () => {

    const dispatch = useDispatch()
    
    const add = (name: string, gender: string, tel: string, date: string, callback: any) => {
        defaultService.handleService({
            method: 'post',
            endPoint: '/inquiry/add',
            params: {
                name: name,
                gender: gender,
                tel: tel,
                date: date
            }
        }).then(
            response => {
                callback(response.data.data)
            },
            error => {
                callback(error)
            }
        )
    }
    
    const get = (page: number, pageSize: number, callback: any) => {
        defaultService.handleService({
            method: 'post',
            endPoint: '/inquiry/getInquiry',
            params: {
                page: page,
                pageSize: pageSize,
            }
        }).then(
            response => {
                callback(response.data.data)
                dispatch(getInquiry(response.data.data))
            },
            error => {
                callback(error)
            }
        )
    }

    return { 
        add,
        get
    }
}
