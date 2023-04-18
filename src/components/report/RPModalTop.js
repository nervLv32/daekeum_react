import React from "react";
import styled from "styled-components";

const RPModalTopWrap = styled.div`
  padding: 15px 0;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #1c1b1f;
`

const RPModalTop = ({ title }) => {
  return <RPModalTopWrap>{title}</RPModalTopWrap>
}

export default RPModalTop;