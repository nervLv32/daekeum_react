import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RegisListModal from "../../base-components/modal-components/regis/RegisListModal";
import RegisInfoList from "../../components/regis/RegisInfoList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";

import { useModal } from "../../hooks/useModal";

const RegisWrap = styled.div``

const RegisTabSearch = styled.div`
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
const RegisInfoListWrap = styled.ul``

const Regis = () => {

  const { openModal } = useModal();
  const modalData = {
    title: 'RegisInfoList Modal',
    content: <RegisListModal />,
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
  return <RegisWrap>
    <RegisTapWrap title="업체정보" />
    <RegisTabSearch>
      <RegisTabNavi dep1="업체명" dep2="현장명" dep3="장비정보" />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" />
        <button className="search-btn" />
      </div>
    </RegisTabSearch>

    <CompanyInfoWrap>
      <RegisInfoListWrap>
        {
          dummyData.map((item, idx) => {
            return (<RegisInfoList
              key={item.no}
              company={item.company}
              ceo={item.ceo}
              companyNum={item.companyNum}
              onClick={() => openModal({ ...modalData, content: <RegisListModal item={item} /> })}
            />
            )
          })
        }
      </RegisInfoListWrap>
    </CompanyInfoWrap>

  </RegisWrap>
}

export default Regis
