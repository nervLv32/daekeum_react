import styled from "styled-components";
import {
  CheckCompIco,
  DocumentIco,
  InvIco,
  MoreViewIco,
  RegisIco,
  SaleIco
} from "../../../assets/icon/Svg";
import { useNavigate } from "react-router-dom";


const BtnGroup = styled.ul`
  margin: 35px auto 45px;
  max-width: 500px;
  min-width: 300px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`
const BtnWrap = styled.li`
  position: relative;
  width: calc(33.333% - 90px / 3);
  margin-right: 30px;
  list-style: none;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:nth-child(n+4) {
    margin-top: 30px;
  }
  p {
    margin-top: 6px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
  }
`
const Inner = styled.div`
  position: relative;
  &:after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  p {
    margin-top: 10px;
  }
`

const Btn = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 3px 3px 15px #0C1D87;
  border-radius: 15px;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    fill: #1F319D;
    width: 60%;
    height: 60%;
  }
`

const MainBtnWrap = () => {
  const navigate = useNavigate();
  /*  */
  return <BtnGroup>
    {/* 메뉴 - 1 */}
    <BtnWrap onClick={() => {
      navigate('/receipt')
    }}>
      <Inner>
        <Btn> <CheckCompIco /> </Btn>
      </Inner>
      <p>접수메뉴</p>
    </BtnWrap>

    {/* 메뉴 - 2 */}
    <BtnWrap onClick={() => {
      navigate('/regis')
    }}>
      <Inner>
        <Btn> <RegisIco /> </Btn>
      </Inner>
      <p>통합등록</p>
    </BtnWrap>

    {/* 메뉴 - 3 */}
    <BtnWrap onClick={() => {
      navigate('/inventory')
    }}>
      <Inner>
        <Btn> <InvIco /> </Btn>
      </Inner>
      <p>재고</p>
    </BtnWrap>

    {/* 메뉴 - 4 */}
    <BtnWrap onClick={() => {
      navigate('/report')
    }}>
      <Inner>
        <Btn> <DocumentIco /> </Btn>
      </Inner>
      <p>서류상신</p>
    </BtnWrap>

    {/* 메뉴 - 5 */}
    <BtnWrap onClick={() => {
      navigate('/sale')
    }}>
      <Inner>
        <Btn> <SaleIco /> </Btn>
      </Inner>
      <p>영업등록</p>
    </BtnWrap>

    {/* 메뉴 - 6 */}
    <BtnWrap onClick={() => {
      navigate('/receipt')
    }}>
      <Inner>
        <Btn> <MoreViewIco /> </Btn>
      </Inner>
      <p>더보기</p>
    </BtnWrap>

  </BtnGroup>
}

export default MainBtnWrap
