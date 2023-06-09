import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RegisSiteListModal from "../../base-components/modal-components/regis/RegisSiteListModal";
import RegisSiteList from "../../components/regis/RegisSiteList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";
import { useModal } from "../../hooks/useModal";

const RegisSiteWrap = styled.div``

const RegisTabSearch = styled.div`
  padding: 45px 30px 15px; 
  position: relative;
  top: -20px;
  z-index: 1;
  background: #F7F7F7;
  border-radius: 0 0 10px 10px;
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

const SiteInfoWrap = styled(paddingWrap)`

`


const RegisSite = () => {
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
      siteAddress: '경기도 고양시 덕양구 덕은동 427-1번지',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      email: "jjsh2544@daekeum.co.kr"
    },
    {
      no: 41378,
      date: "2023-02-01",
      site: "대금지오웰",
      regionFirst: "서울시",
      regionLast: "관악구",
      center: "수도권1",
      sector: "제조업",
      sectorNum: "131-81-19404",
      siteAddress: '서울시 관악구 사당로17길',
      manager: '팜윤태',
      managerPhone: '010-1112-2342',
      email: "farmyt@gmail.com"
    },
  ]

  const { openModal } = useModal();
  const modalData = {
    title: 'RegisSiteList Modal',
    content: <RegisSiteListModal />,
    callback: () => alert('Modal Callback()'),
  };

  return (
    <RegisSiteWrap>
      <RegisTapWrap title="현장정보" />
      <RegisTabSearch>
        <RegisTabNavi dep1="주)대금지오웰" dep2="현장명" dep3="장비정보" />
        <div className="tab-searchwrap">
          <input type="text" placeholder="Search" />
          <button className="search-btn" />
        </div>
      </RegisTabSearch>

      <SiteInfoWrap>
        {
          dummyData.map((item, idx) => {
            return (<RegisSiteList
              key={item.no}
              site={item.site}
              regionFirst={item.regionFirst}
              regionLast={item.regionLast}
              sector={item.sector}
              onClick={() => openModal({ ...modalData, content: <RegisSiteListModal item={item} /> })}
            />
            )
          })
        }
      </SiteInfoWrap>
    </RegisSiteWrap>
  )
}

export default RegisSite;