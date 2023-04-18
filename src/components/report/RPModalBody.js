import React from "react";
import styled from "styled-components";

const RPModalBodyWrap = styled.div`
  padding: 20px 30px;
  height: 500px;
  padding-bottom: 40px;
  overflow-y: scroll;
`

const RPModalBody = ({ children }) => {
  return <RPModalBodyWrap>
    {children}
  </RPModalBodyWrap>
}

export default RPModalBody;