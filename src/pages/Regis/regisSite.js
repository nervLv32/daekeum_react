import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import RegisSiteListModal from "../../base-components/modal-components/regis/RegisSiteListModal";
import RegisSiteList from "../../components/regis/RegisSiteList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";
import {useModal} from "../../hooks/useModal";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectCompanyAtom} from "../../recoil/regisAtom";
import fetchService from "../../util/fetchService";

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


const RegisSite = () => {
  const dummyData = [
    {
      no: 41377,
      date: "2023-02-01",
      site: "DMC리버시티(A6블록)",
      regionFirst: "경기도",
      regionLast: "고양시",
      center: "수도권4",
      sector: "제조업",
      sectorNum: "131-81-19404",
      siteAddress: '경기도 고양시 덕양구 덕은동 427-1번지',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      email: "jjsh2544@daekeum.co.kr"
    },
    {
      no: 41378,
      date: "2023-02-01",
      site: "대금지오웰",
      regionFirst: "서울시",
      regionLast: "관악구",
      center: "수도권1",
      sector: "제조업",
      sectorNum: "131-81-19404",
      siteAddress: '서울시 관악구 사당로17길',
      manager: '팜윤태',
      managerPhone: '010-1112-2342',
      email: "farmyt@gmail.com"
    },
  ]

  const {openModal} = useModal();
  const [selectRegis, setSelectRegis] = useRecoilState(selectCompanyAtom)
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


  useEffect(() => {
    fetchService('/enroll/siteList', 'post', siteParam)
      .then((res) => {
        console.log(res.data)
        setSite(mappingData(res.data))
      })
  }, [])

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
          <input type="text" placeholder="Search"/>
          <button className="search-btn"/>
        </div>
      </RegisTabSearch>
      <SiteInfoWrap>
        {
          sites.map((item, idx) => {
            return (<RegisSiteList
                key={item.no}
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
    </RegisSiteWrap>
  )
}

export default RegisSite;
