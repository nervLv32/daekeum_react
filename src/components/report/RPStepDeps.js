import React from "react";
import styled from "styled-components";
import {useRecoilValue} from 'recoil'
import {exportDocumentBody} from '../../recoil/reportAtom'

const RPStepDepsWrap = styled.div`
  background-color: #f6f6f6;
  height: 76px;
  padding: 15px 30px;
  ul {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    .bar {
      display: inline-block;
      margin-top: 9px;
      width: 50px;
      height: 1px;
      background-color: #9DA2AE;
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 70px;
      &.active {
        i {
          &::after {
            width: 22px;
            height: 22px;
            background-color: #0129ff;
            border: 1px solid #a9b5ff;
          }
        }
      }
      i {
        font-family: var(--font-mont);
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        margin-bottom: 7px;
        z-index: 2;
        font-style: normal;
        &::after {
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #9da2ae;
          border-radius: 50%;
          z-index: -1;
        }
      }
      p {
        word-break: keep-all;
        font-size: 9px;
        font-weight: 400;
        color: #1c1b1f;
        text-align: center;
        line-height: 1.15;
      }
    }
  }
`

const RPStepDeps = ({ dep, dep1title, dep2title, dep3title, dep4title }) => {

  return <RPStepDepsWrap>
    <ul>
      <li className={dep === "dep1" ? 'active' : ''}>
        <i>1</i>
        <p>{dep1title}</p>
      </li>
      <span className="bar"></span>
      <li className={dep === "dep2" ? 'active' : ''}>
        <i>2</i>
        <p>{dep2title}</p>
      </li>
      <span className="bar"></span>
      <li className={dep === "dep3" ? 'active' : ''}>
        <i>3</i>
        <p>{dep3title}</p>
      </li>
      {
        dep4title && <>
          <span className="bar"></span>
          <li className={dep === "dep4" ? 'active' : ''}>
            <i>4</i>
            <p>{dep4title}</p>
          </li>
        </>
      }
    </ul>
  </RPStepDepsWrap>
}

export default RPStepDeps;
