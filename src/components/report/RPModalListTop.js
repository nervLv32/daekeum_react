import React from "react";
import styled from "styled-components";

const RPModalListTopWrap = styled.div`
  display: flex;
  align-items: center;
  background-color: #E4E9FF;
  padding: 10px;
  color: #1f319d;
  font-weight: 500;
  font-size: 12px;
  border-radius: 10px;
  > div {
    text-align: center;
    &:not(:last-child) {
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 11px;
        background-color: #9da2ae;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
  &.type01 {
    .dep1, .dep3 {
      width: 33.333%;
    }
    .dep2 {
      width: calc(33.333% * 0.7);
    }
    .icon {
      width: calc(33.333% * 0.3);
    }
  }
  &.type02 {
    .dep1, .dep2 {
      width: 33.333%;
    }
    .dep1 {
      word-break: keep-all;
    }
    .dep3 {
      width: calc(33.333% * 0.7);
    }
    .icon {
      width: calc(33.333% * 0.3);
    }
  }
`

const RPModalListTop = ({ type, dep1, dep2, dep3 }) => {
  return <RPModalListTopWrap className={`${type}`}>
    <div className="dep1">{dep1}</div>
    <div className="dep2">{dep2}</div>
    <div className="dep3">{dep3}</div>
    <div className="icon"><img src="../icons/icon-rpmodal-view.png" alt="view icon" /></div>
  </RPModalListTopWrap>
}

export default RPModalListTop;