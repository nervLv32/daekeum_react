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
`

const BtnWrap = styled.div`
  min-width: 33%;
  padding: 50px;
  text-align: center;

  p {
    margin-top: 10px;
  }
`

const Btn = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
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
    width: 60px;
    height: 60px;
  }
`

const MainBtnWrap = () => {
  /*  */
  return <BtnGroup>
    {/* 메뉴 - 1 */}
    <BtnWrap>
      <Btn> <CheckCompIco /> </Btn>
      <p>접수메뉴</p>
    </BtnWrap>

    {/* 메뉴 - 2 */}
    <BtnWrap>
      <Btn> <RegisIco /> </Btn>
      <p>통합등록</p>
    </BtnWrap>

    {/* 메뉴 - 3 */}
    <BtnWrap>
      <Btn> <InvIco /> </Btn>
      <p>재고</p>
    </BtnWrap>

    {/* 메뉴 - 4 */}
    <BtnWrap>
      <Btn> <DocumentIco /> </Btn>
      <p>서류상신</p>
    </BtnWrap>

    {/* 메뉴 - 5 */}
    <BtnWrap>
      <Btn> <SaleIco /> </Btn>
      <p>영업등록</p>
    </BtnWrap>

    {/* 메뉴 - 6 */}
    <BtnWrap>
      <Btn> <MoreViewIco /> </Btn>
      <p>더보기</p>
    </BtnWrap>
  </BtnGroup>
}

export default MainBtnWrap
