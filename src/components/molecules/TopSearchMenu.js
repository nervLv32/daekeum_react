import React from "react";
import styled from "styled-components";

const TopSearchMenuWrap = styled.div`
  position: absolute;
  top: 100px;
  right: 10px;
  z-index: 99;
  ul {
    li {
      background-color: #fff;
      width: 100%;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 6px 20px;
      cursor: pointer;
      a {
        display: flex;
        align-items: center;
      }
      &:not(:last-child) {
        margin-bottom: 8px;
      }
      i {
        display: inline-block;
        margin-right: 5px;
      }
      span {
        font-weight: 500;
        font-size: 13px;
      }
    }
  }
`

const TopSearchMenu = ({ children }) => {
  return <TopSearchMenuWrap>
    {children}
  </TopSearchMenuWrap>
}

export default TopSearchMenu;