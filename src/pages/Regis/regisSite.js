import React, {useEffect, useState, useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import RegisSiteListModal from "../../base-components/modal-components/regis/RegisSiteListModal";
import RegisSiteList from "../../components/regis/RegisSiteList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";
import {useModal} from "../../hooks/useModal";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectCompanyAtom} from "../../recoil/regisAtom";
import fetchService from "../../util/fetchService"
import Floating from "../../components/molecules/Floating";
import RegisAddPlaceModal from "../../base-components/modal-components/regis/RegisAddPlaceModal";

const RegisSiteWrap = styled.div``

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

const SiteInfoWrap = styled(paddingWrap)`

`

const FloatingWrap = styled.div`
  position: fixed;
  right: 20px;
  bottom : 100px;
  z-index: 100;
`


const RegisSite = () => {

  const {openModal} = useModal();

  const [selectRegis, setSelectRegis] = useRecoilState(selectCompanyAtom)
  let debounce = null
  const [isLoading, setLoading] = useState(false);
  const observeTargetRef = useRef(null)
  const [search, setSearch] = useState('')
  const [sites, setSite] = useState([]);
  const [siteParam, setSiteParam] = useState({
    거래처코드: selectRegis.client.code,
    searchword: '',
    pageSize: 10,
    currentPage: 1,
  })

  const navigate = useNavigate()

  const modalData = {
    title: 'RegisSiteList Modal',
    content: <RegisSiteListModal/>,
    callback: () => alert('Modal Callback()'),
  };

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setSiteParam({
        ...siteParam,
        currentPage: parseInt(siteParam.currentPage) + 1
      })
      fetchList(sites)
    }
  });

  const mappingData = (data) => {
    return data.map(it => {
      return {
        ...it,
        no: it.현장코드,
        date: it.등록일,
        site: it.현장명,
        regionFirst: (it.지역분류).split('-')[0],
        regionLast: (it.지역분류).split('-')[1],
        center: it.담당부서명,
        sector: "",//업태? 담당센터?
        sectorNum: "" ,//사업자번호
        siteAddress: it.주소,
        manager: it.담당자,
        managerPhone: it.휴대폰,
        email: it.이메일
      }
    })
  }

  const fetchList = (list) => {
    fetchService('/enroll/siteList', 'post', siteParam)
      .then((res) => {
        const data = [...list, ...mappingData(res.data)]
        setSite( data )
        if(res.data.length > 9) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [siteParam.searchword])

  useEffect(() => {
    debounce = setTimeout(() => {
      setSiteParam({
        ...siteParam,
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


  useEffect(() => {
    if(selectRegis.client.code === '') {
      navigate('/regis')
    }
  }, [])

  return (
    <RegisSiteWrap>
      <RegisTapWrap title="현장정보"/>
      <RegisTabSearch>
        <RegisTabNavi dep1={selectRegis.client.name} dep2="현장명" dep3="장비정보"/>
        <div className="tab-searchwrap">
          <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
          <button className="search-btn"/>
        </div>
      </RegisTabSearch>
      <SiteInfoWrap>
        {
          sites.map((item, idx) => {
            return (<RegisSiteList
                key={idx}
                site={item.site}
                regionFirst={item.regionFirst}
                regionLast={item.regionLast}
                sector={item.sector}
                onClick={() => openModal({...modalData, content: <RegisSiteListModal item={item}/>})}
              />
            )
          })
        }
      </SiteInfoWrap>
      <div ref={observeTargetRef}/>

      <FloatingWrap>
        <Floating onClick={() => openModal({...modalData, content: <RegisAddPlaceModal item={null}/>})}>
          <i className="default-icon" />
        </Floating>
      </FloatingWrap>

    </RegisSiteWrap>
  )
}

export default RegisSite;
