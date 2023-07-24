import React, {useEffect, useRef} from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TopSearch from "../../components/molecules/TopSearch";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";
import InventoryWaitList from "../../components/inventory/InventoryWaitList";
import InventoryWaitTop from "../../components/inventory/InventoryWaitTop";
import InventoryWaitModal from "../../components/inventory/InventoryWaitModal";
import { useModal } from "../../hooks/useModal";
import {useRecoilState, useRecoilValue} from 'recoil'
import {inventoryAtom} from '../../recoil/inventoryList'
import userAtom from '../../recoil/userAtom'
import fetchService from '../../util/fetchService'

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

  const observeTargetRef = useRef(null)
  const [inventoryList, setInventoryList] = useRecoilState(inventoryAtom)
  const user = useRecoilValue(userAtom)

  const [isLoading, setLoading] = useState(false)

  const [inventoryParam, setInventoryParam] = useState({
    searchword: '',
    pageSize: '10',
    currentPage: '1',
    EmpNo: 1184/*user.auth.사원코드*/,
  })

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setInventoryParam({
        ...inventoryParam,
        currentPage: parseInt(inventoryParam.currentPage) + 1,
      })
      fetchList(inventoryList)
    }
  })

  const fetchList = (list) => {
    fetchService('/inventory/ipgoWaitingList', 'post', inventoryParam)
      .then((res) => {
        console.log(res.data)
        const data = [...list, ...res.data]

        setInventoryList(data)
        if (res.data.length > 11) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  const changeParam = (key, value) => {
    setInventoryParam({
      ...inventoryParam,
      currentPage: '1',
      [key]: value,
    })
  }

  useEffect(() => {
    setInventoryList([])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [inventoryParam.searchword])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])


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
        inventoryList.map((list, idx) => {
          return (
            <InventoryWaitList key={idx} list={list}
              onClick={() => openModal({ ...modalData, content: <InventoryWaitModal item={list} /> })}
            />
          )
        })
      }
        <div ref={observeTargetRef}/>

      </InventoryWaitWrap>
  </>
}

export default InventoryWait
