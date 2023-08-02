import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import RegisDKNOListModal from "../../base-components/modal-components/regis/RegisDKNOListModal";
import RegisDKNOList from "../../components/regis/RegisDKNOList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";
import { useModal } from "../../hooks/useModal";
import {useRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import fetchService from "../../util/fetchService";
import {selectCompanyAtom} from "../../recoil/regisAtom";

const RegisDKNOWrap = styled.div``


const RegisTabSearch = styled.div`
  padding: 45px 30px 15px; 
  position: relative;
  top: -20px;
  z-index: 1;
  background: #F7F7F7;
  border-radius: 0 0 10px 10px;
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

const DKNOInfoWrap = styled(paddingWrap)`

`


const RegisDKNO = () => {
  const dummyData = [
    {
      no: 41379,
      date: "2023-02-01",
      installCate: "회수",
      model: "R10DN",
      type: "13644",
      mcno: "C652",
      bolt:"380",
      direction:"정방향",
      company: "대금지오웰",
      center: "380",
      manager: '팜윤태',
      site: "여수 소호동 테라스하우스",
      siteAddress: "전남 여수시 소호동 741번지"
    },
  ]

  const [selectRegis, setSelectRegis] = useRecoilState(selectCompanyAtom)
  const navigate = useNavigate();


  const { openModal } = useModal();
  const modalData = {
    title: 'RegisDKNO Modal',
    content: <RegisDKNOListModal />,
    callback: () => alert('Modal Callback()'),
  };

  let debounce = null
  const observeTargetRef = useRef(null)
  const [isLoading, setLoading] = useState(false);
  const [dknoList, setDknoList] = useState([])
  const [params, setParams] = useState({
    searchword: selectRegis.equipment.code,
    pageSize: '10',
    currentPage: '1',
  })
  const [search, setSearch] = useState(selectRegis.equipment.code)

  const fetchList = (list) => {
    console.log(list)
    fetchService('/enroll/dknoList', 'post', params)
      .then((res) => {
        const data = [...list, ...res.data]
        setDknoList( data )
        if(res.data.length > 9) {
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
        currentPage: parseInt(params.currentPage) + 1
      })
      fetchList(dknoList)
    }
  });

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [params.searchword])

  useEffect(() => {
    debounce = setTimeout(() => {
      setParams({
        ...params,
        searchword: search,
        currentPage: '1`',
      })
    }, 500)
    return () => clearTimeout(debounce)
  }, [search])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  return <RegisDKNOWrap>
    <RegisTapWrap title="DKNO" />
    <RegisTabSearch>
      <RegisTabNavi dep1={selectRegis.client.name} dep2={selectRegis.site.name} dep3={selectRegis.equipment.name} />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
        <button className="search-btn" />
      </div>
    </RegisTabSearch>

    <DKNOInfoWrap>
      {
        dknoList.map((item, idx) => {
          return (<RegisDKNOList
            key={idx}
            installCate={item.구분}
            date={item.날짜}
            model={item.모델명}
            type={item.매출타입}
            mcno={item.MCNO}
            bolt={item.전압}
            direction={item.방향}
            onClick={() => openModal({ ...modalData, content: <RegisDKNOListModal item={item} /> })}
          />
          )
        })
      }
    </DKNOInfoWrap>
    <div ref={observeTargetRef}/>

  </RegisDKNOWrap>
}

export default RegisDKNO;
