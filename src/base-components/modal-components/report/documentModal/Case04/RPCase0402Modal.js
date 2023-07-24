import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import RPModalBody from '../../../../../components/report/RPModalBody'
import RPModalBottom from '../../../../../components/report/RPModalListBottom'
import RPModalListItem from '../../../../../components/report/RPModalListItem'
import RPModalListTop from '../../../../../components/report/RPModalListTop'
import RPModalSearch from '../../../../../components/report/RPModalSearch'
import RPModalTop from '../../../../../components/report/RPModalTop'
import {useModal} from '../../../../../hooks/useModal'

import RPCase0401Modal from './RPCase0401Modal'
import RPC04Step01Modal from '../../stepModal/Case04/RPC04Step01Modal'
import fetchService from '../../../../../util/fetchService'
import {useRecoilState} from 'recoil'
import {firstExportDocument} from '../../../../../recoil/reportAtom'


const RPCase0402ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`
const RPCase0402Modal = () => {

  const {openModal, closeModal} = useModal()
  const [firstExport, setFirstExport] = useRecoilState(firstExportDocument)

  const modalData = {
    title: 'RPDoc Modal Modal',
    callback: () => alert('Modal Callback()'),
  }


  const observeTargetRef = useRef(null)
  const [isLoading, setLoading] = useState(false)
  const [sites, setSites] = useState([])
  const [params, setParams] = useState({
    거래처코드: firstExport.client.거래처코드,
  })

  const changeParam = (key, value) => {
    let copy = {...firstExport}
    if (!key) {
      copy = {...copy, equip: [...copy.equip, value]}
    } else {
      copy = {...copy, equip: copy.equip.filter(it => it !== value)}
    }
    setFirstExport(copy)
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setParams({
        ...params,
        currentPage: parseInt(params.currentPage) + 1,
      })
    }
  })

  const fetchList = (list) => {
    fetchService('/approval/suliRequestDetails', 'post', params)
      .then((res) => {
        const data = [...list, ...res.data]
        setSites(data)
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  const checkValidation = () => {
    /*Object.entries(firstExport.equip).forEach(([key,value]) => {
      if(key !== '특기사항' && (!value || value !== '' || value !== null)) flag = true
    })*/
    return firstExport.equip.length > 0
  }

  useEffect(() => {
    if (parseInt(params.currentPage) > 1) {
      fetchList(sites)
    }
  }, [params.currentPage])

  useEffect(() => {
    fetchList([])
    setLoading(true)
  }, [params.searchword])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  /******* 입출고 서류상신 - 수리기입고요청서 04의 두 번째 스텝 *******/
  return <RPCase0402ModalWrap>
    <RPModalTop title='수리기서류상신'/>
    <RPModalSearch dep1={firstExport.client.업체명} dep2={null} dep3={null} changeParam={changeParam}/>
    <RPModalBody>
      <RPModalListTop type='type04' dep1='구분' dep2='DKNO' dep3='MCNO' dep4='기종' dep5='전압' dep6='방향'/>
      {
        sites.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type='type04' changeParam={changeParam}/>
        })
      }
      <div ref={observeTargetRef}/>

    </RPModalBody>
    <RPModalBottom>
      <button className='primary-btn' onClick={() => {
        if (checkValidation()) {
          closeModal()
          openModal({...modalData, content: <RPC04Step01Modal/>})
        } else {
          alert('아이템이 선택되지 않았습니다.')
        }
      }}>확인
      </button>
      <button className='del-btn' onClick={() => {
        closeModal()
        openModal({...modalData, content: <RPCase0401Modal/>})
      }}>취소
      </button>
    </RPModalBottom>
  </RPCase0402ModalWrap>
}

export default RPCase0402Modal
