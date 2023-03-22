import styled from "styled-components";
import Title from "./item/Title";

const TopNaviWrap = styled.div`
  position: relative;
  width: 100vw;
  /* Primary */

  background: #1F319D;
  border-radius:0 0 20px 20px;
  padding: 10px 10px 20px;
  color: white;
`
const TopNavigation = () => {
  return<TopNaviWrap>
    <Title />

  </TopNaviWrap>
}

export default TopNavigation
