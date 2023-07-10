import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryTableTop from "../../components/inventory/InventoryTableTop";
import TopSearch from "../../components/molecules/TopSearch";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";
import fetchService from "../../util/fetchService";
import {useRecoilState} from "recoil";
import {inventoryAtom} from "../../recoil/inventoryList";

const InventoryWrap = styled.div`
  padding: 28px 30px 0;
`

const TopSearchcMenuWrap = styled.ul`
  width: 175px;
  height: 206px;
  background: url('../images/topmenu-search-threebg.png') no-repeat 50% center / cover;;
  padding: 47px 30px 0px 25px;
`

const Inventory = () => {

  const observeTargetRef = useRef(null)
  const [topMenu, setTopMenu] = useState(false);
  const [inventoryList,setInventoryList] = useRecoilState(inventoryAtom)

  const [isLoading, setLoading] = useState(false);
  const [fetchFlag, setFetchFlag] = useState(false);

  const changeParam = (key, value) => {
    setInventoryParam({
      ...inventoryParam,
      currentPage : '1',
      [key] : value,
    })
  }

  const [inventoryParam, setInventoryParam] = useState({
    searchword: '',
    pageSize: '',
    currentPage: '1',
    EmpNo: '',
  })

  const mappingItem = (res) => {
    return res.data ? res.data.map(it => {
      return {
        no : it.rownum,
        part : it.파트,
        code : it.품목코드,
        name : it.품명,
        count : it.재고,
        standard : it.규격,
      }
    }) : []
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setInventoryParam({
        ...inventoryParam,
        currentPage: parseInt(inventoryParam.currentPage) + 1
      })
      fetchList(fetchFlag ? [] : inventoryList)
    }
  });

  const fetchList = (list) => {
    fetchService('/inventory/inventoryList', 'post', inventoryParam)
      .then((res) => {
        setInventoryList(res.data)
        console.log(res)
        const temp = mappingItem(res)
        const data = [...list, ...temp]
        console.log("data", data)
        setInventoryList( data )
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
  }

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [
    inventoryParam.searchword
  ])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  return <>
    <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} changeParam={changeParam} />
    {
      topMenu && (
        <TopSearchMenu>
          <TopSearchcMenuWrap>
            <li>
              <NavLink to="/inventory">
                <i>
                  <img src="../icons/icon-topmenu-allindex.png" alt="topmenu icon" />
                </i>
                <span>재고</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/inventory/request">
                <i>
                  <img src="../icons/icon-topmenu-question.png" alt="topmenu icon" />
                </i>
                <span>자재요청</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/inventory/wait">
                <i>
                  <img src="../icons/icon-topmenu-readmore.png" alt="topmenu icon" />
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
      {console.log(inventoryList)}
      {
        inventoryList.map((list, idx) => {
          return (
            <InventoryTable list={list} idx={idx}/>
          )
        })
      }
      <div ref={observeTargetRef}/>
    </InventoryWrap>
  </>
}

export default Inventory
