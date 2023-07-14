import React, {useEffect, useState, useRef} from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RegisListModal from "../../base-components/modal-components/regis/RegisListModal";
import RegisInfoList from "../../components/regis/RegisInfoList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";

import { useModal } from "../../hooks/useModal";
import fetchService from "../../util/fetchService";
import {useRecoilState} from "recoil";
import {regisAtom, regisParamAtom} from "../../recoil/regisAtom";


const RegisWrap = styled.div``

const RegisTabSearch = styled.div`
  padding: 45px 30px 15px; 
  position: relative;
  top: -20px;
  z-index: 1;
  background: #F7F7F7;
  border-radius: 0 0 10px 10px;
  .tab-navigation {
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
  }
  .tab-searchwrap {
    display: flex;
    align-items: center;
    input {
      height: 28px;
      width: calc(100% - 32px);
      border: 1px solid #555;
      background-color: #fff;
      border-radius: 10px;
      padding: 0 12px;
      font-family: var(--font-mont);
      font-weight: 400;
      font-size: 9px;
      &::placeholder {
        color: #9da2ae;
      }
      &:focus {
        outline: none;
      }
    }
    .search-btn {
      width: 28px;
      height: 28px;
      background-color: #555;
      border: 1px solid rgba(238, 241, 255, 0.4);
      box-shadow: 3px 3px 15px rgba(28, 27, 31, 0.2);
      border-radius: 10px;
      background: #555 url('../icons/search-icon.png') no-repeat 50% center / 14px;
      cursor: pointer;
      margin-left: 4px;
    }
  }
`

const paddingWrap = styled.div`
  padding: 20px 30px 0;
`

const CompanyInfoWrap = styled(paddingWrap)`

`
const RegisInfoListWrap = styled.ul``

const Regis = () => {

  const { openModal } = useModal();
  let debounce = null

  const modalData = {
    title: 'RegisInfoList Modal',
    content: <RegisListModal />,
    callback: () => alert('Modal Callback()'),
  };


  const observeTargetRef = useRef(null)
  const [isLoading, setLoading] = useState(false);
  const [regis, setRegis] = useRecoilState(regisAtom)
  const [regisParam, setRegisParam] = useRecoilState(regisParamAtom)
  const [search, setSearch] = useState('')

  const fetchList = (list) => {
    fetchService('/enroll/clientList', 'post', regisParam)
      .then((res) => {
        const data = [...list, ...res.data]
        setRegis( data )
        if(res.data.length > 0) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setRegisParam({
        ...regisParam,
        currentPage: parseInt(regisParam.currentPage) + 1
      })
      fetchList(regis)
    }
  });

  useEffect(() => {
    setRegis([])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [regisParam.searchword])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  useEffect(() => {
    debounce = setTimeout(() => {
      setRegisParam({
        ...regisParam,
        searchword: search,
        currentPage: '1`',
      })
    }, 500)
    return () => clearTimeout(debounce)
  }, [search])


  return <RegisWrap>
    <RegisTapWrap title="업체정보" />
    <RegisTabSearch>
      <RegisTabNavi dep1="업체명" dep2="현장명" dep3="장비정보" />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
        <button className="search-btn" />
      </div>
    </RegisTabSearch>

    <CompanyInfoWrap>
      <RegisInfoListWrap>
        {
          regis.map((item, idx) => {
            return (<RegisInfoList
              key={idx}
              company={item.업체명}
              ceo={item.대표자성명}
              companyNum={item.사업자번호}
              onClick={() => openModal({ ...modalData, content: <RegisListModal item={item} /> })}
            />
            )
          })
        }
      </RegisInfoListWrap>
    </CompanyInfoWrap>
    <div ref={observeTargetRef}/>
  </RegisWrap>
}

export default Regis
