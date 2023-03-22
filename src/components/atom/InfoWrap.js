import styled from "styled-components";

const AllWarp = styled.div`
display: flex`
const Blank = styled.div`
  flex: 1
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
