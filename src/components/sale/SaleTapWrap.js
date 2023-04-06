import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SaleTapWrapComponent = styled.div`
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
        a {
          color: #fff;position: relative;
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

const SaleTapWrap = ({ title }) => {
  return (
    <SaleTapWrapComponent>
      <ul className="top-tab-wrap">
        <li className={title === "업체정보" ? "active" : null}>
          <NavLink to="/sale">
            업체정보
          </NavLink>
        </li>
        <li className={title === "현장정보" ? "active" : null}>
          <NavLink to="/sale/site">
            현장정보
          </NavLink>
        </li>
        <li className={title === "방문이력" ? "active" : null}>
          <NavLink to="/sale/visit">
          방문이력
          </NavLink>
        </li>
      </ul>
    </SaleTapWrapComponent>
  )
}

export default SaleTapWrap;