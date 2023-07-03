import {useState} from "react";
import styled from "styled-components";

const FloatingWrap = styled.div`
  width: 54px;
  height: 54px;
  background-color: ${props => props.bgColor || '#1F319D'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  z-index: 100;
  cursor: pointer;
  .default-icon {
    width: 31px;
    height: 31px;
    background: url('../icons/icon-floating-add.png') no-repeat 50% center / cover;
  }
  .close-icon {
    width: 18px;
    height: 18px;
    background: url('../icons/icon-floating-x.png') no-repeat 50% center / cover;
  }
`

const Floating = ({ children, isFOpen, onClick, bgColor }) => {
  
  return <FloatingWrap onClick={onClick} bgColor={bgColor}>
    {children}
  </FloatingWrap>
}

export default Floating
