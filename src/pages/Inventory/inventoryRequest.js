import React, { useEffect, useRef } from "react";
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
import { useRecoilState } from "recoil";
import { materialRequestAtom } from "../../recoil/inventoryList";
import fetchService from "../../util/fetchService";
import userAtom from "../../recoil/userAtom";

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
  const { openModal } = useModal();
  const modalData = {
    title: 'Inventory Request Modal',
    callback: () => alert('Modal Callback()'),
  };

  
  const observeTargetRef = useRef(null)
  const [topMenu, setTopMenu] = useState(false);
  const [materialRequestList,setMaterialRequestList] = useRecoilState(materialRequestAtom)
  const [user, setUser] = useRecoilState(userAtom)
  

  const [isLoading, setLoading] = useState(false);
  const [fetchFlag, setFetchFlag] = useState(false);

  const changeParam = (key, value) => {
    setMaterialRequestParam({
      ...materialRequestParam,
      currentPage : '1',
      [key] : value,
    })
  }

  const [materialRequestParam, setMaterialRequestParam] = useState({
    searchword: '',
    pageSize: '',
    currentPage: '1',
    EmpNo: user.auth.사원코드,
  })

  const mappingItem = (res) => {
    return res.data ? res.data.map(it => {
      return {
        state: it.문서상태,
        no : it.요청일련번호,
        requestDate: it.요청일,
        writeDate: it.작성일,
        requester : it.요청자,
        requesterCode: it.작성자,
        writer: it.작성자,
        writerCode: it.작성자코드,
      }
    }) : []
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setMaterialRequestParam({
        ...materialRequestParam,
        currentPage: parseInt(materialRequestParam.currentPage) + 1
      })
      fetchList(fetchFlag ? [] : materialRequestList)
    }
  });

  const fetchList = (list) => {
    fetchService('/inventory/materialRequestList', 'post', materialRequestParam)
      .then((res) => {
        const temp = mappingItem(res)
        const data = [...list, ...temp]
        setMaterialRequestList(data)
        console.log(res)
        if(temp.length > 0) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [
    materialRequestParam.searchword
  ])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  

  return (
    <>
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
      <InventoryRequestWrap>
        <InventoryRequestListWrap>
          {
            materialRequestList.map((item, key) => {
              return <InventoryRequestList
                key={key}
                state={item.state}
                no={item.no}
                requestDate={item.requestDate}
                writeDate={item.writeDate}
                requester ={item.requester}
                requesterCode={item.requesterCode}
                writer={item.writer}
                writerCode={item.writerCode}
                onClick={() => openModal({ ...modalData, content: <InventoryRequestListModal item={item} />})}
              />
            })
          }
        </InventoryRequestListWrap>
        <div ref={observeTargetRef}/>

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
