import React from "react";
import styled from "styled-components";

const TopSearchMenuWrap = styled.div`
  position: absolute;
  top: 100px;
  right: 10px;
  z-index: 99;
  ul {
    li {
      width: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      a {
        display: flex;
        background-color: #fff;
        border-radius: 20px;
        width: 100%;
        padding: 6px 20px;
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
