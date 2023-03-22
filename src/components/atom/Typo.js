import styled from "styled-components";

const TypoWrap = styled.p`
  font-family: ${props => props.fontFamily ? props.fontFamily : 'Noto Sans KR'}, sans-serif;
  font-size: ${props => props.fontSize ? props.fontSize : '10px'};
  font-weight: ${props => props.fontWeight ? props.fontWeight : '500'};
  ${props => props.lineHeight && `line-height : ${props.lineHeight}`};
  ${props => props.color && `color : ${props.color}`}
`
const Typo = ({text, fontSize, fontWeight, lineHeight, fontFamily, color}) => {
  return <TypoWrap fontSize={fontSize} fontWieght={fontWeight} lineHeight={lineHeight} fontFamily={fontFamily} color={color}>
    {text}
  </TypoWrap>
}

export default Typo
