import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import InventoryRequestListModal from "../../base-components/modal-components/inventory/InventoryRequestListModal";
import InventoryRequestModal from "../../base-components/modal-components/inventory/InventoryRequestModal";
import InventoryRequestList from "../../components/inventory/InventoryRequestList";
import Floating from "../../components/molecules/Floating";
import TopSearch from "../../components/molecules/TopSearch";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";
import { useModal } from "../../hooks/useModal";

const InventoryRequestWrap = styled.div`
  padding: 28px 30px 0;
`
const InventoryRequestListWrap = styled.ul``

const TopSearchcMenuWrap = styled.ul`
  width: 175px;
  height: 206px;
  background: url('../images/topmenu-search-threebg.png') no-repeat 50% center / cover;;
  padding: 47px 30px 0px 25px;
`

const FloatingWrap = styled.div`
  position: fixed;
  right: 20px;
  bottom : 100px;
  z-index: 100;
`


const InventoryRequest = () => {
  const [topMenu, setTopMenu] = useState(false);

  const { openModal } = useModal();
  const modalData = {
    title: 'Inventory Request Modal',
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 14799,
      date: "2023-02-08",
      state: '접수대기',
      materialManager: '팜윤태',
      writer: "정명길",
      site: "01.음성공장",
      stateManager: "공나현"
    },
    {
      no: 14800,
      date: "2023-02-08",
      state: '접수완료',
      materialManager: '팜윤태',
      writer: "정명길",
      site: "01.음성공장",
      stateManager: "공나현"
    },
    {
      no: 14801,
      date: "2023-02-08",
      state: '처리완료',
      materialManager: '팜윤태',
      writer: "정명길",
      site: "01.음성공장",
      stateManager: "공나현"
    }
  ]

  return (
    <>
      <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} />
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
      <InventoryRequestWrap>
        <InventoryRequestListWrap>
          {
            dummyData.map((item, key) => {
              return <InventoryRequestList
                key={key}
                no={item.no}
                date={item.date}
                state={item.state}
                materialManager={item.materialManager}
                writer={item.writer}
                site={item.site}
                stateManager={item.stateManager}
                onClick={() => openModal({ ...modalData, content: <InventoryRequestListModal item={item} />})}
              />
            })
          }
        </InventoryRequestListWrap>

        {/* 클릭시 재고 간편입력 */}
        <FloatingWrap>
          <Floating
            onClick={() => openModal({ ...modalData, content: <InventoryRequestModal /> })}
          >
            <i className="default-icon"></i>
          </Floating>
        </FloatingWrap>

      </InventoryRequestWrap>
    </>
  )
}

export default InventoryRequest