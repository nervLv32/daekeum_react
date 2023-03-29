import styled from "styled-components";
import {
  CheckCompIco,
  DocumentIco,
  HomeIco,
  InvIco,
  MoreViewIco,
  ProdIco,
  RegisIco,
  SaleIco
} from "../../../assets/icon/Svg";

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 500px;
  margin: 0 auto;
`
const BtnWrap = styled.div`
  position: relative;
  width: 33%;
  max-width: 150px;
  padding: 20px;
  text-align: center;
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
  /*  */
  return <BtnGroup>
    {/* 메뉴 - 1 */}
    <BtnWrap>
      <Inner>
        <Btn> <CheckCompIco /> </Btn>
      </Inner>
      <p>접수메뉴</p>
    </BtnWrap>

    {/* 메뉴 - 2 */}
    <BtnWrap>
      <Inner>
        <Btn> <RegisIco /> </Btn>
      </Inner>
      <p>통합등록</p>
    </BtnWrap>

    {/* 메뉴 - 3 */}
    <BtnWrap>
      <Inner>
        <Btn> <InvIco /> </Btn>
      </Inner>
      <p>재고</p>
    </BtnWrap>

    {/* 메뉴 - 4 */}
    <BtnWrap>
      <Inner>
        <Btn> <DocumentIco /> </Btn>
      </Inner>
      <p>서류상신</p>
    </BtnWrap>

    {/* 메뉴 - 5 */}
    <BtnWrap>
      <Inner>
        <Btn> <SaleIco /> </Btn>
      </Inner>
      <p>영업등록</p>
    </BtnWrap>

    {/* 메뉴 - 6 */}
    <BtnWrap>
      <Inner>
        <Btn> <MoreViewIco /> </Btn>
      </Inner>
      <p>더보기</p>
    </BtnWrap>

  </BtnGroup>
}

export default MainBtnWrap
