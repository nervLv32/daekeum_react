import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {useModal} from '../../../hooks/useModal'
import {Calendar} from '../../../assets/icon/Svg'
import {DateFormat} from '../../../util/dateFormat'
import fetchService from '../../../util/fetchService'
import SingleDate from '../../../components/calander/SingleDate'
import {useRecoilState, useRecoilValue} from 'recoil'
import userAtom from '../../../recoil/userAtom'
import {itemAndRequestList} from '../../../recoil/inventoryList'

const InventoryRequestModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;

  .list-top {
    .title {
      padding: 15px 0;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
      font-weight: 700;
      font-size: 16px;
      color: #1c1b1f;
    }
  }
`
const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: inline-block;
    background-color: #F6F6F6;
    padding: 1rem .5rem .5rem;
    font-size: 1.3rem;

    &:last-child {
      padding: 0 .5rem 1rem;
    }

    span {
      display: flex;

      b {
        color: #1F319D;
        margin: 0 .5rem;
      }

      span {
        margin: 0 .5rem 0 1rem;
        color: #9DA2AE;
      }

      svg {
        fill: #555555;
        width: 1.5rem;
        height: 1.5rem;
        align-self: center;
        margin-left: .5rem;
      }
    }
  }
`
const ModalBody = styled.div``
const Section = styled.section`
  > div.title {
    background-color: #1F319D;
    color: white;
    text-align: center;
    line-height: 3.5rem;
    font-size: 1.5rem;
  }
`

const ModalBtm = styled.div`
  display: flex;
  flex-direction: row;
`
const Button = styled.button`
  flex: 1;
  margin: 2rem;
  border-radius: 1.5rem;
  background-color: #1F319D;
  padding: .5rem;
  color: #F6F6F6;
  font-size: 2rem;
  font-weight: bold;

  &.del {
    border: 1px solid #1F319D;
    background-color: white;
    color: #1F319D;
  }
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

const InventoryRequestModal = ({detail}) => {
  const {closeModal} = useModal()
  const observeTargetRef = useRef(null)
  const [isCalendar, setCalendar] = useState(false)
  const {auth} = useRecoilValue(userAtom)
  const [body, setBody] = useState({
    입고요청일: '',
    창고코드: '',
    요청자: auth.한글이름,
    요청자코드: auth.사원코드,
    EmpNo: auth.사원코드,
    EmpNm: auth.한글이름,
    비고: '',
    요청부서명: auth.부서명,
  })

  const [params, setParams] = useState({
    EmpNo: '',
    대금AS: '',
    신규중고: '',
    pageSize: 5,
    currentPage: 1,
  })
  const [options, setOptions] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [list, setList] = useRecoilState(itemAndRequestList)

  const submit = (key, value) => {
    updateBody(key, value)
    close()
  }

  const close = () => {
    setCalendar(false)
  }

  const updateBody = (key, value) => {
    setBody({
      ...body,
      [key]: value,
    })
  }
  const updateValue = (value) => {
    setList({
      ...list,
      요청리스트: [...list.요청리스트, value],
    })
  }
  const filterItem = (value) => {
    setList({
      ...list,
      요청리스트: [...list.요청리스트.filter(it => it !== value)],
    })
  }

  const fetchList = (temp) => {
    fetchService('/inventory/materialRequestItemList', 'post', params)
      .then((res) => {
        const data = [...temp.품목리스트 || [], ...res.data]
        setList({
          품목리스트: [...data],
          요청리스트: [...temp.요청리스트 || []],
        })
        if (res.data.length > 4) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setParams({
        ...params,
        currentPage: parseInt(params.currentPage) + 1,
      })
      fetchList(list)
    }
  })

  const submitData = () => {
    const reqParams = {
      ...body,
      reqItems: [...list.요청리스트],
    }

    console.log(reqParams)

    fetchService('/inventory/addMaterialRequestItems', 'post', reqParams)
      .then((res) => {
        alert(res.msg)
        closeModal()
      })
  }
  useEffect(() => {
    fetchService('/inventory/shippingFactorylist', 'post', {})
      .then(res => {
        setOptions(res.data)
      })
  }, [])

  useEffect(() => {
    if (observeTargetRef.current) {
      !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    }
    return () => onIntersect.disconnect()
  }, [isLoading, list])

  useEffect(() => {
    if(detail && detail.length > 0) {
      const temp = detail.map(it => ({...it, 재고: it.수량}))
      console.log(temp[0])
      setBody({
        ...body,
        입고요청일: temp[0].입고요청일,
        창고코드: temp[0].수신부서창고코드
      })
      setList({
        ...list,
        요청리스트: [...temp]
      })
    }
  }, [])

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return <InventoryRequestModalWrap>
    <div className='list-top'>
      <div className='title'>간편입력</div>
      <TitleWrap>
        <div onClick={e => setCalendar(true)}>
          <span><b>입고요청일</b> {body.입고요청일 ? DateFormat(new Date(body.입고요청일)).substr(0, 10) : '날짜를 선택해주세요'}
            <Calendar/> </span>
        </div>
        <div onClick={() => {
        }}>
          <span><b>발송공장</b>
          <select value={body.창고코드 ? body.창고코드 : ''} onChange={e => updateBody('창고코드', e.target.value)}>
            <option value={''} disabled>항목선택</option>
            {
              options.map((it, key) => {
                return <option key={key} value={it.창고코드}> {it.대표요청부서}</option>
              })
            }
          </select>
            <span>|</span> <b>요청자</b> {body.요청자 || ''} </span>
        </div>
      </TitleWrap>
    </div>
    <ModalBody>
      <Section>
        <div className={'title'}> 품목리스트</div>
        <Table item={list.품목리스트} list={list} observeTargetRef={observeTargetRef} updateItem={updateValue}
               filterItem={filterItem}/>
        <div className={'title'}> 요청리스트</div>
        <Table item={list.요청리스트}/>
      </Section>
      <Choice>
        <div className={list.요청리스트.length <= 0 ? 'noFill' : ''}>
          {
            list.요청리스트.length > 0 && <>
              <p>{list.요청리스트.length}개 선택</p>
              <div>
                <button onClick={() => setList({...list, 요청리스트: []})}> 전체 취소</button>
                <button> X</button>
              </div>
            </>
          }
        </div>
      </Choice>
    </ModalBody>
    <ModalBtm>
      <Button onClick={submitData}>입력완료</Button>
      <Button className='del' onClick={closeModal}>취소</Button>
    </ModalBtm>
    {
      isCalendar && <>
        <SingleDate submit={submit} close={close} type={'입고요청일'}/>
      </>
    }
  </InventoryRequestModalWrap>
}

const CustomTable = styled.div`
`
const TableContent = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  background: #C7CAD1;
  flex-wrap: wrap;

  &.body {
    display: block;
    background-color: white;
    padding: 0;
    min-height: 120px;
    height: 120px;
    max-height: 120px;
    overflow-y: scroll;

    li {
      font-family: Montserrat;
      font-weight: normal;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-top: 10px;

      div {
        padding: 0;
        margin: 0;
        flex: 2;
        border-left: 1px solid #9DA2AE;
        text-align: center;
        &:first-child {
          border-left: none;
        }

        &:nth-child(2n) {
          flex: 1;
        }

        input{
          padding: 0;
          border: none;
          max-width: 2rem;
          text-align: center;
        }

        &:last-child {
          margin-top: 10px;
          background-color: #EBECEF;
          min-width: 80vw;
          line-height: 30px;
          border-left: none;

          &.nullContent {
            height: 30px;
          }
        }
      }
      

      &.active {
        background-color: #FEF1EC;
        font-weight: 700;

        p {
          background-color: #FEF1EC;

          &:last-child {
            font-weight: normal;
            background-color: #FFEAE2;
          }
        }
      }
    }
  }

  li {
    border-left: 1px solid #9DA2AE;
    flex: 2;
    text-align: center;
    color: #1C1B1F;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;

    &.small {
      flex: 1;
    }
  }

  .nullContent:after {
    content: '';
  }
`
const Table = ({item, observeTargetRef, updateItem, filterItem, list}) => {

  const checkItem = (value) => {
    if(updateItem){
      updateItem(value)
    }
  }

  /*const filterItem = (value) => {
    const copy = [...temp]
    setTemp(copy.filter(it => it !== value))
  }*/

  return <CustomTable>
    <TableContent>
      <li> 품목코드</li>
      <li className={'small'}> 파트</li>
      <li> 품명</li>
      <li className={'small'}>{updateItem ? '재고' : '수량'}</li>
    </TableContent>
    <TableContent className={'body'}>
      {
        item.length > 0 && item.map((it, key) => <TableItem key={key} it={it} checkItem={checkItem} list={list}
                                                            filterItem={filterItem}/>)
      }
      <div ref={observeTargetRef ? observeTargetRef : null} />
    </TableContent>
  </CustomTable>
}

const TableItem = ({it, checkItem, filterItem, list}) => {

  const [isSelected, setSeleted] = useState(false)
  const [lst, setlst] = useRecoilState(itemAndRequestList)

  const checked = () => {
    if(checkItem && filterItem){
      if (!isSelected) {
        checkItem(it)
      } else {
        filterItem(it)
      }
      setSeleted(prev => !prev)
    }
  }

  const updateNumber = (e) => {
    let copy = [...lst.요청리스트]
    let temp = lst.요청리스트.filter(item => item === it)[0]
    const idx = lst.요청리스트.indexOf(temp)
    copy[idx] = {
      ...copy[idx],
      재고: parseInt(e.target.value)
    }
    setlst({
      ...lst,
      요청리스트: [...copy]
    })
    /*copy.요청리스트[idx] = temp
    setlst(copy)*/
  }

  useEffect(() => {
    if (isSelected && list.요청리스트) {
      setSeleted(list.요청리스트.indexOf(it) > -1)
    }
  }, [list])


  return <li className={isSelected ? 'active' : ''} onClick={() => checked()}>
    <div>{it.품목코드}</div>
    <div>{it.파트}</div>
    <div>{it.품명}</div>
    <div>
      {
        checkItem && filterItem ? <p>{it.재고}</p> :
          <input type={'number'} max={it.재고} value={it.재고} onChange={updateNumber}/>
      }
    </div>
    <div className={it.사용모델 ? '' : 'nullContent'}>{it.사용모델}</div>
  </li>
}

export default InventoryRequestModal
