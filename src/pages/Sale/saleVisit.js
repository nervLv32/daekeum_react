import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SaleListModal from "../../base-components/modal-components/sale/SaleListModal";
import SaleVisitListModal from "../../base-components/modal-components/sale/SaleVisitListModal";
import Floating from "../../components/molecules/Floating";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import SaleInfoList from "../../components/sale/SaleInfoList";
import SaleTapWrap from "../../components/sale/SaleTapWrap";
import SaleVisitList from "../../components/sale/SaleVisitList";

import { useModal } from "../../hooks/useModal";

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
  bottom : 100px;
  z-index: 100;
`

const SaleVisit = () => {

  const { openModal } = useModal();
  const modalData = {
    title: 'SaleInfoList Modal',
    content: <SaleVisitListModal />,
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 1,
      date: "2023-02-01",
      salesManager: "정명길",
      companyManager: "정명길",
      position: "사원",
      text:`세륜기 순회점검 방문, 세륜기 확인하였으나 오랫동안
      방치된 상태 현장 사무실 없어서 담당자 통화하였으며,
      현장 추가계약 못하여 지호건설은 철수 기존 설치된
      세륜기는 후속업체 정해지면 임대 형식으로 3개월 임대
      및 추후 철수예정`
    },
    {
      no: 2,
      date: "2023-02-01",
      salesManager: "공나현",
      companyManager: "팜윤태",
      position: "주임",
      text:`세륜기 순회점검 방문, 세륜기 확인하였으나 오랫동안
      방치된 상태 현장 사무실 없어서 담당자 통화하였으며,
      현장 추가계약 못하여 지호건설은 철수 기존 설치된
      세륜기는 후속업체 정해지면 임대 형식으로 3개월 임대
      및 추후 철수예정`
    },
  ]
  return <SaleWrap>
    <SaleTapWrap title="방문이력" />
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
            return (<SaleVisitList
              key={item.no}
              no={item.no}
              date={item.date}
              salesManager={item.salesManager}
              companyManager={item.companyManager}
              position={item.position}
              onClick={() => openModal({ ...modalData, content: <SaleVisitListModal item={item} /> })}
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

export default SaleVisit
