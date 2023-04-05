import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";

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

const RegisSite = () => {
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
    </RegisSiteWrap>
  )
}

export default RegisSite;