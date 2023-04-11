import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SaleListModal from "../../base-components/modal-components/sale/SaleListModal";
import SaleSiteListModal from "../../base-components/modal-components/sale/SaleSiteListModal";
import Floating from "../../components/molecules/Floating";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import SaleInfoList from "../../components/sale/SaleInfoList";
import SaleSiteList from "../../components/sale/SaleSiteList";
import SaleTapWrap from "../../components/sale/SaleTapWrap";

import { useModal } from "../../hooks/useModal";

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
      background: #555 url('icons/search-icon.png') no-repeat 50% center / 14px;
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

  const { openModal } = useModal();
  const modalData = {
    title: 'SaleSiteList Modal',
    content: <SaleSiteListModal />,
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 41377,
      date: "2023-02-01",
      site: "DMC리버시티(A6블록)",
      regionFirst: "경기도",
      regionLast: "고양시",
      center: "수도권4",
      sector: "제조업",
      sectorNum: "131-81-19404",
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      email: "jjsh2544@daekeum.co.kr"
    },
    {
      no: 41378,
      date: "2023-02-01",
      site: "DMC리버시티(A6블록)",
      regionFirst: "경기도",
      regionLast: "고양시",
      center: "수도권4",
      sector: "제조업",
      sectorNum: "131-81-19404",
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      email: "jjsh2544@daekeum.co.kr"
    },
  ]
  return <SaleWrap>
    <SaleTapWrap title="현장정보" />
    <SaleTabSearch>
      <RegisTabNavi dep1="주)대금지오웰" dep2="현장명" dep3="장비정보" />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" />
        <button className="search-btn" />
      </div>
    </SaleTabSearch>

    <CompanyInfoWrap>
      <SaleInfoListWrap>
        {
          dummyData.map((item, idx) => {
            return (<SaleSiteList
              key={item.no}
              site={item.site}
              regionFirst={item.regionFirst}
              regionLast={item.regionLast}
              center={item.center}
              onClick={() => openModal({ ...modalData, content: <SaleSiteListModal item={item} /> })}
            />
            )
          })
        }
      </SaleInfoListWrap>
    </CompanyInfoWrap>

    <FloatingWrap>
      <Floating onClick={console.log(1)}>
        <i className="default-icon"></i>
      </Floating>
    </FloatingWrap>

  </SaleWrap>
}

export default SaleSite
