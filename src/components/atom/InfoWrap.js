import styled from "styled-components";

const AllWarp = styled.div`
  display: flex;
  border-radius:0 0 20px 20px;
  background: #1F319D url('images/main-btnwrap-bg.png') no-repeat 100% bottom;
`
const Blank = styled.div`
  flex: 1;
`
const Wrap = styled.div`
  flex: 12;
`

const InfoWrap = ({children}) => {
  return<AllWarp>
    <Blank/>
      <Wrap>
        {children}
      </Wrap>
    <Blank/>
  </AllWarp>
}

export default InfoWrap
