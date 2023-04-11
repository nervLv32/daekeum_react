import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryTableTop from "../../components/inventory/InventoryTableTop";
import TopSearch from "../../components/molecules/TopSearch";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";

const InventoryWrap = styled.div`
  padding: 28px 30px 0;
`

const TopSearchcMenuWrap = styled.ul`
  width: 175px;
  height: 206px;
  background: url('images/topmenu-search-threebg.png') no-repeat 50% center / cover;;
  padding: 47px 30px 0px 25px;
`

const Inventory = () => {

  const dummyData = [
    {
      no: 1,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 2,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 3,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 4,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 5,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 6,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    }
  ]
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
    <InventoryWrap>
      <InventoryTableTop />
      {
        dummyData.map((list, idx) => {
          return (
            <InventoryTable list={list} />
          )
        })
      }
    </InventoryWrap>
  </>
}

export default Inventory
