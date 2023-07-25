import React, {useEffect, useRef, useState} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import TopSearch from '../../components/molecules/TopSearch'
import TopSearchMenu from '../../components/molecules/TopSearchMenu'
import InventoryWaitList from '../../components/inventory/InventoryWaitList'
import InventoryWaitTop from '../../components/inventory/InventoryWaitTop'
import InventoryWaitModal from '../../components/inventory/InventoryWaitModal'
import {useModal} from '../../hooks/useModal'
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
const Choice = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 20px 10px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #9DA2AE;
    padding: 10px;
    border-radius: 10px;
    align-items: center;

    &.noFill {
      background-color: transparent;
    }

    > div {
      button:first-child {
        border: 1px solid #000;
        padding: 3px 10px;
        border-radius: 5px;
        margin-right: 10px;
        background-color: white;
      }

      button {
        margin-right: 5px;
      }
    }
  }
`

const InventoryWait = () => {
  const [topMenu, setTopMenu] = useState(false)

  const {openModal, closeModal} = useModal()
  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  }

  const observeTargetRef = useRef(null)
  const [inventoryList, setInventoryList] = useRecoilState(inventoryAtom)
  const [ipgo, setIpgo] = useState([])
  const user = useRecoilValue(userAtom)

  const updateIpgo = (flag, value) => {
    if (!flag) {
      setIpgo([...ipgo, {
        입고대기일련번호: value.입고대기일련번호,
        수량: value.수량,
        발송구분: value.발송구분,
      }])
    } else {
      setIpgo([...ipgo.filter(it => it.입고대기일련번호 !== value.입고대기일련번호)])
    }
  }

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

  useEffect(() => {
    console.log(ipgo)
  }, [ipgo])

  return <>
    <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} changeParam={changeParam}/>
    {
      topMenu && (
        <TopSearchMenu>
          <TopSearchcMenuWrap>
            <li>
              <NavLink to='/inventory'>
                <i>
                  <img src='../../icons/icon-topmenu-allindex.png' alt='topmenu icon'/>
                </i>
                <span>재고</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/inventory/request'>
                <i>
                  <img src='../../icons/icon-topmenu-question.png' alt='topmenu icon'/>
                </i>
                <span>자재요청</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/inventory/wait'>
                <i>
                  <img src='../../icons/icon-topmenu-readmore.png' alt='topmenu icon'/>
                </i>
                <span>입고대기</span>
              </NavLink>
            </li>
          </TopSearchcMenuWrap>
        </TopSearchMenu>
      )
    }
    <InventoryWaitWrap>
      <InventoryWaitTop/>
      {
        inventoryList.map((list, idx) => {
          return (
            <InventoryWaitList
              key={idx}
              list={list}
              ipgo={ipgo}
              updateIpgo={updateIpgo}
              onClick={() => openModal({
                ...modalData,
                content: <InventoryWaitModal
                  item={list}

                />,
              })}
            />
          )
        })
      }
      <div ref={observeTargetRef}/>
      <p>{ipgo.length}</p>
      {
        ipgo.length > 0 && <Choice>
          <div>
            <p>{ipgo.length}개 선택</p>
            <div>
              <button onClick={() => setIpgo([])}> 전체 취소</button>
              <button> X</button>
            </div>
          </div>
        </Choice>
      }
    </InventoryWaitWrap>
  </>
}

export default InventoryWait
