import React from "react";
import styled from "styled-components";

const RegisTabNavigation = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  li {
    font-family: var(--font-mont);
    font-weight: 400;
    font-size: 10px;
    color: #1c1b1f;
  }
  img {
    display: inline-block;
    margin: 0 4px;
  }
`

const RegisTabNavi = ({ dep1, dep2, dep3 }) => {
  return (
    <RegisTabNavigation>
      <li>{dep1}</li>
      <img src="../icons/tab-navi-rightarrow.png" alt="right arrow" />
      <li>{dep2}</li>
      <img src="../icons/tab-navi-rightarrow.png" alt="right arrow" />
      <li>{dep3}</li>
    </RegisTabNavigation>
  )
}

export default RegisTabNavi;