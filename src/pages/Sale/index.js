import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import SaleListModal from '../../base-components/modal-components/sale/SaleListModal'
import Floating from '../../components/molecules/Floating'
import RegisTabNavi from '../../components/regis/RegisTabNavi'
import SaleInfoList from '../../components/sale/SaleInfoList'
import SaleTapWrap from '../../components/sale/SaleTapWrap'

import {useModal} from '../../hooks/useModal'
import {useRecoilState} from 'recoil'
import {companyDetailAtom, companyListAtom, SalePagingRecoil} from '../../recoil/salesAtom'
import SaleAddNewModal from '../../base-components/modal-components/sale/SaleAddNewModal'
import fetchService from '../../util/fetchService'

const SaleWrap = styled.div``

const SaleTabSearch = styled.div`
  padding: 45px 30px 15px;
  position: relative;
  top: -20px;
  z-index: 1;
  background: #F7F7F7;
  border-radius: 0 0 10px 10px;

  .tab-navigation {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    li {
      font-family: var(--font-mont);
      font-weight: 400;
      font-size: 10px;
      color: #1c1b1f;
    }

    img {
      display: inline-block;
      margin: 0 4px;
    }
  }

  .tab-searchwrap {
    display: flex;
    align-items: center;

    input {
      height: 28px;
      width: calc(100% - 32px);
      border: 1px solid #555;
      background-color: #fff;
      border-radius: 10px;
      padding: 0 12px;
      font-family: var(--font-mont);
      font-weight: 400;
      font-size: 9px;

      &::placeholder {
        color: #9da2ae;
      }

      &:focus {
        outline: none;
      }
    }

    .search-btn {
      width: 28px;
      height: 28px;
      background-color: #555;
      border: 1px solid rgba(238, 241, 255, 0.4);
      box-shadow: 3px 3px 15px rgba(28, 27, 31, 0.2);
      border-radius: 10px;
      background: #555 url('../icons/search-icon.png') no-repeat 50% center / 14px;
      cursor: pointer;
      margin-left: 4px;
    }
  }
`

const paddingWrap = styled.div`
  padding: 20px 30px 0;
`

const CompanyInfoWrap = styled(paddingWrap)`

`
const SaleInfoListWrap = styled.ul``

const FloatingWrap = styled.div`
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 100;
`

const Sale = () => {

  const [companyList, setCompanyList] = useRecoilState(companyListAtom)
  const [companyDetail, setCompanyDetail] = useRecoilState(companyDetailAtom)
  const [paging, setPaging] = useRecoilState(SalePagingRecoil)

  const {openModal, closeModal} = useModal()
  const modalData = {
    title: 'SaleInfoList Modal',
    content: <SaleListModal/>,
    callback: () => alert('Modal Callback()'),
  }

  const observeTargetRef = useRef(null)
  const [isLoading, setLoading] = useState(false)

  const fetchList = (list) => {
    fetchService('/sales/clientList', 'post', paging)
      .then((res) => {
        const data = [...list, ...res.data]
        setCompanyList(data)
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setPaging({
        ...paging,
        currentPage: parseInt(paging.currentPage) + 1,
      })
      fetchList(companyList)
    }
  })

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  useEffect(() => {
    fetchList([])
  },[])

  const handleChange = (e) => {
    setPaging({
      ...paging,
      searchword: e.target.value,
      currentPage: '1',
    })
  }

  return <SaleWrap>
    <SaleTapWrap title='업체정보'/>
    <SaleTabSearch>
      <RegisTabNavi dep1='업체명' dep2='현장명' dep3='장비정보'/>
      <div className='tab-searchwrap'>
        <input type='text' placeholder='Search' value={paging.searchword} onChange={e => handleChange(e)}
               onKeyPress={e => {
                 if (e.key === 'Enter') {
                   fetchList([])
                   setLoading(true)
                 }
               }
               }/>
        <button className='search-btn' onClick={() => {
          fetchList([])
          setLoading(true)
        }}/>
      </div>
    </SaleTabSearch>

    <CompanyInfoWrap>
      <SaleInfoListWrap>
        {
          companyList.map((item, idx) => {
            return (<SaleInfoList
                key={idx}
                company={item.업체명}
                ceo={item.대표자성명}
                companyNum={item.사업자번호}
                onClick={() => openModal({...modalData, content: <SaleListModal item={item}/>})}
              />
            )
          })
        }
      </SaleInfoListWrap>
    </CompanyInfoWrap>
    <div ref={observeTargetRef}/>

    <FloatingWrap>
      <Floating onClick={() => {
        setCompanyDetail({})
        closeModal()
        // openModal({ ...modalData, content: <SaleSubmitModal item={''} /> })
        openModal({...modalData, content: <SaleAddNewModal item={''}/>})
      }}>
        <i className='default-icon'></i>
      </Floating>
    </FloatingWrap>

  </SaleWrap>
}

export default Sale
