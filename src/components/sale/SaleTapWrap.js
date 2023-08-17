import React, {useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { salesStateRecoil } from "../../recoil/salesAtom";

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

  const [salesState, setSalesState] = useRecoilState(salesStateRecoil)

  const navigate = useNavigate()
  useEffect(() => {
    if(salesState.거래처코드 === '' && salesState.현장코드 === '') {
      navigate('/sale')
    }
  }, [])

  return (
    <SaleTapWrapComponent>
      <ul className="top-tab-wrap">
        <li className={title === "업체정보" ? "active" : null}>
          <NavLink to="/sale">
            업체정보
          </NavLink>
        </li>
        <li className={title === "현장정보" ? "active" : null}>
          <NavLink to={salesState.거래처코드 !== "" ? "/sale/site" : "/sale"}>
            현장정보
          </NavLink>
        </li>
        <li className={title === "방문이력" ? "active" : null}>
          <NavLink to={salesState.현장코드 !== "" ? "/sale/visit" : salesState.거래처코드 !== "" ? "/sale/site" : "/sale"}>
          방문이력
          </NavLink>
        </li>
      </ul>
    </SaleTapWrapComponent>
  )
}

export default SaleTapWrap;