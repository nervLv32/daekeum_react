import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TopSearch from "../../components/molecules/TopSearch";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";
import InventoryWaitList from "../../components/inventory/InventoryWaitList";
import InventoryWaitTop from "../../components/inventory/InventoryWaitTop";
import InventoryWaitModal from "../../components/inventory/InventoryWaitModal";
import { useModal } from "../../hooks/useModal";

const InventoryWaitWrap = styled.div`
  padding: 28px 30px 0;
`

const TopSearchcMenuWrap = styled.ul`
  width: 175px;
  height: 206px;
  background: url('../images/topmenu-search-threebg.png') no-repeat 50% center / cover;;
  padding: 47px 30px 0px 25px;
`

const InventoryWait = () => {
  const [topMenu, setTopMenu] = useState(false);

  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 1,
      sendday: "2023-02-08",
      reqday: "2023-02-08",
      code: "TNUGM03002",
      count: "1.0",
      part: "모형절단품",
      name: "G/M(대금감속기)",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
      model: "R10D-06",
      sector: "11. 수도권",
      manager: "정명길",
      memo: "입고요청일 20230216"
    },
    {
      no: 2,
      sendday: "2023-02-08",
      reqday: "2023-02-08",
      code: "TNUGM03002",
      count: "1.0",
      part: "모형절단품",
      name: "G/M(대금감속기)",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
      model: "R10D-06",
      sector: "11. 수도권",
      manager: "팜윤태",
      memo: "입고요청일 20230216"
    },
    {
      no: 3,
      sendday: "2023-02-08",
      reqday: "2023-02-08",
      code: "TNUGM03002",
      count: "1.0",
      part: "모형절단품",
      name: "G/M(대금감속기)",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
      model: "R10D-06",
      sector: "11. 수도권",
      manager: "정명길",
      memo: "입고요청일 20230216"
    }
  ]


  const changeParam = (key, value) => {
  }


  return <>
    <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} changeParam={changeParam}/>
      {
        topMenu && (
          <TopSearchMenu>
            <TopSearchcMenuWrap>
              <li>
                <NavLink to="/inventory">
                  <i>
                    <img src="../../icons/icon-topmenu-allindex.png" alt="topmenu icon" />
                  </i>
                  <span>재고</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/inventory/request">
                  <i>
                    <img src="../../icons/icon-topmenu-question.png" alt="topmenu icon" />
                  </i>
                  <span>자재요청</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/inventory/wait">
                  <i>
                    <img src="../../icons/icon-topmenu-readmore.png" alt="topmenu icon" />
                  </i>
                  <span>입고대기</span>
                </NavLink>
              </li>
            </TopSearchcMenuWrap>
          </TopSearchMenu>
        )
      }
      <InventoryWaitWrap>
      <InventoryWaitTop />
      {
        dummyData.map((list, idx) => {
          return (
            <InventoryWaitList key={idx} list={list}
              onClick={() => openModal({ ...modalData, content: <InventoryWaitModal item={list} /> })}
            />
          )
        })
      }
    </InventoryWaitWrap>
  </>
}

export default InventoryWait
