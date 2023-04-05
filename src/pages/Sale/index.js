import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SaleListModal from "../../base-components/modal-components/sale/SaleListModal";
import SaleInfoList from "../../components/sale/SaleInfoList";

import { useModal } from "../../hooks/useModal";

const SaleWrap = styled.div``

const SaleTapWrap = styled.div`
  height: 30px;
  background-color: rgb(31, 49, 157);
  position: relative;
  border-radius: 0 0 20px 20px;
  z-index: 20;
  .top-tab-wrap {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: calc(100% - 70px);
    display :flex;
    align-items: center;
    height: 35px;
    background-color: #fff;
    border: 1px solid #1F319D;
    border-radius: 10px;
    li {
      width: 33.333%;
      text-align: center;
      height: 100%;
      a {
        display: block;
        line-height: 33px;
        font-size: 12px;
        font-weight: 700;
        color: #1c1b1f;
        cursor: pointer;
      }
      &.active {
        a{
          color: #fff;
          position: relative;
          &::after {
            content: '';
            display: block;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            border-radius: 10px;
            background-color: #1F319D;
            position: absolute;
            top: -1px;
            left: -1px;
            z-index: -1;
            box-shadow: 1px 1px 4px rgba(12, 29, 135, 0.7);
          }
        }
      }
    }
  }
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

const Sale = () => {

  const { openModal } = useModal();
  const modalData = {
    title: 'SaleInfoList Modal',
    content: <SaleListModal />,
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 41377,
      date: "2023-02-01",
      company: '주식회사 대금지웰',
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      sectorNum: "131-81-19404",
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41378,
      date: "2023-02-01",
      company: '주식회사 대금지웰',
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      sectorNum: "131-81-19404",
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
  ]
  return <SaleWrap>
    <SaleTapWrap>
      <ul className="top-tab-wrap">
        <li className="active">
          <NavLink to="/">
            업체정보
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            현장정보
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            방문이력
          </NavLink>
        </li>
      </ul>
    </SaleTapWrap>
    <SaleTabSearch>
      <ul className="tab-navigation">
        <li>업체명</li>
        <img src="../icons/tab-navi-rightarrow.png" alt="right arrow" />
        <li>현장명</li>
        <img src="../icons/tab-navi-rightarrow.png" alt="right arrow" />
        <li>장비정보</li>
      </ul>
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" />
        <button className="search-btn" />
      </div>
    </SaleTabSearch>

    <CompanyInfoWrap>
      <SaleInfoListWrap>
        {
          dummyData.map((item, idx) => {
            return (<SaleInfoList
              key={item.no}
              company={item.company}
              ceo={item.ceo}
              companyNum={item.companyNum}
              onClick={() => openModal({ ...modalData, content: <SaleListModal item={item} /> })}
            />
            )
          })
        }
      </SaleInfoListWrap>
    </CompanyInfoWrap>

  </SaleWrap>
}

export default Sale
