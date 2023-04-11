import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TopSearch from "../../components/molecules/TopSearch";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";

const InventoryRequestWrap = styled.div`
  padding: 28px 30px 0;
`
const InventoryRequestListWrap = styled.ul``

const TopSearchcMenuWrap = styled.ul`
  width: 175px;
  height: 206px;
  background: url('images/topmenu-search-threebg.png') no-repeat 50% center / cover;;
  padding: 47px 30px 0px 25px;
`

const InventoryWait = () => {
  const [topMenu, setTopMenu] = useState(false);

  return <>
    <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} />
      {
        topMenu && (
          <TopSearchMenu>
            <TopSearchcMenuWrap>
              <li>
                <NavLink to="/inventory">
                  <i>
                    <img src="icons/icon-topmenu-allindex.png" alt="topmenu icon" />
                  </i>
                  <span>재고</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/inventory/request">
                  <i>
                    <img src="icons/icon-topmenu-question.png" alt="topmenu icon" />
                  </i>
                  <span>자재요청</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/inventory/wait">
                  <i>
                    <img src="icons/icon-topmenu-readmore.png" alt="topmenu icon" />
                  </i>
                  <span>입고대기</span>
                </NavLink>
              </li>
            </TopSearchcMenuWrap>
          </TopSearchMenu>
        )
      }
  </>
}

export default InventoryWait