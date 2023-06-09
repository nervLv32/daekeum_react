import React, { useState, useEffect } from "react";
import { NavLink, useLocation  } from "react-router-dom";
import styled from "styled-components";
import SaleListModal from "../../base-components/modal-components/sale/SaleListModal";
import SaleSiteListModal from "../../base-components/modal-components/sale/SaleSiteListModal";
import Floating from "../../components/molecules/Floating";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import SaleInfoList from "../../components/sale/SaleInfoList";
import SaleSiteList from "../../components/sale/SaleSiteList";
import SaleTapWrap from "../../components/sale/SaleTapWrap";

import { useModal } from "../../hooks/useModal";
import { useRecoilState } from "recoil";
import { companyAtom, siteListAtom, keywordAtom, pagingAtom, salesStateAtom, siteDetailAtom } from "../../recoil/salesAtom"
import axios from 'axios';
import SaleAddPlaceModal from '../../base-components/modal-components/sale/SaleAddPlaceModal'
const SaleWrap = styled.div`
  
`

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
  bottom : 100px;
  z-index: 100;
`

const SaleSite = () => {
  
  const location = useLocation();
  const 거래처코드 = location.state?.거래처코드
  const 업체명 = location.state?.업체명

  const [siteList, setSiteList] = useRecoilState(siteListAtom)
  const [company, setCompany] = useRecoilState(companyAtom)
  const [keyword, setKeyword] = useRecoilState(keywordAtom)
  const [paging, setPaging] = useRecoilState(pagingAtom)
  const [salesState, setSalesState] = useRecoilState(salesStateAtom)
  const [siteDetail, setSiteDetail] = useRecoilState(siteDetailAtom)
  
  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'SaleSiteList Modal',
    content: <SaleSiteListModal />,
    callback: () => alert('Modal Callback()'),
  };
  
  const search = () => {
    
    return axios(
      process.env.REACT_APP_API_URL + '/sales/siteList',
      {
        method: 'post',
        data: {
          searchword: keyword.site,
          pageSize: paging.size,
          currentPage: paging.site,
          거래처코드 : 거래처코드 || company.거래처코드 
        }
        // ,headers: {
        //   'authorization': `${auth.auth.token}`
        // }
      }
    ).then(
      res => {
        const { data } = res.data
        
        setSiteList(oldData => [
          ...data
        ])
      },
      error => {
        console.log(error)
      }
    )
  }
  
  const setValue = e =>{
    let val = e.target.value 
    
    setKeyword(oldData =>{
      return {
        ...oldData,
        site : val      
      }
    })  
  }

  useEffect(() => {
    if(거래처코드) setCompany({
      거래처코드: 거래처코드,
      업체명: 업체명
    })
    search()
    setSalesState(oldData =>{
      return {
        ...oldData,
        site: 0
      }
    })
  }, [salesState.site])
  
  return <SaleWrap>
    <SaleTapWrap title="현장정보" />
    <SaleTabSearch>
      <RegisTabNavi dep1={company.업체명} dep2="현장명" dep3="장비정보" />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" value={keyword.site} onChange={setValue}/>
        <button className="search-btn" onClick={search}/>
      </div>
    </SaleTabSearch>

    <CompanyInfoWrap>
      <SaleInfoListWrap>
        {
          siteList.map((item, idx) => {
            return (<SaleSiteList
              key={idx}
              site={item.현장명}
              region={item.지역분류}
              center={item.담당부서명}
              onClick={() => openModal({ ...modalData, content: <SaleSiteListModal item={item} /> })}
            />
            )
          })
        }
      </SaleInfoListWrap>
    </CompanyInfoWrap>

    <FloatingWrap>
      <Floating onClick={() => {
         setSiteDetail({}) 
        closeModal()
        openModal({ ...modalData, content: <SaleAddPlaceModal item={{거래처코드: 거래처코드}} /> })
      }}>
        <i className="default-icon"></i>
      </Floating>
    </FloatingWrap>

  </SaleWrap>
}

export default SaleSite
