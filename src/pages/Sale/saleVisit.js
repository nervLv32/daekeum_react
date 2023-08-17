import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SaleVisitListModal from "../../base-components/modal-components/sale/SaleVisitListModal";
import Floating from "../../components/molecules/Floating";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import SaleTapWrap from "../../components/sale/SaleTapWrap";
import SaleVisitList from "../../components/sale/SaleVisitList";
import { useModal } from "../../hooks/useModal";
import { useRecoilState } from "recoil";
import { companyAtom, siteAtom, visitListAtom, VisitPagingRecoil, salesStateRecoil } from "../../recoil/salesAtom"
import SaleSubmitModal from '../../base-components/modal-components/sale/SaleSubmitModal'
import fetchService from "../../util/fetchService";

const SaleWrap = styled.div``

const SaleTabSearch = styled.div`
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
const SaleInfoListWrap = styled.ul``

const FloatingWrap = styled.div`
  position: fixed;
  right: 20px;
  bottom : 100px;
  z-index: 100;
`

const SaleVisit = () => {

  const [company, setCompany] = useRecoilState(companyAtom)
  const [site, setSite] = useRecoilState(siteAtom)
  const [visitList, setVisitList] = useRecoilState(visitListAtom)
  const [paging, setPaging] = useRecoilState(VisitPagingRecoil)
  const [salesState, setSalesState] = useRecoilState(salesStateRecoil)

  const 현장코드 = salesState.현장코드
  const 현장명 = salesState.현장명

  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'SaleInfoList Modal',
    content: <SaleVisitListModal />,
    callback: () => alert('Modal Callback()'),
  };

  const observeTargetRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const fetchList = (list) => {
    fetchService('/sales/visitHistoryList', 'post', {
      ...paging,
      거래처코드 : company.거래처코드,
      현장코드: 현장코드 || site.현장코드
    })
      .then((res) => {
        const data = [...list, ...res.data];
        setVisitList(data);
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  };

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true);
      setPaging({
        ...paging,
        currentPage: parseInt(paging.currentPage) + 1,
      });
      fetchList(visitList);
    }
  });

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect();
    return () => onIntersect.disconnect();
  }, [isLoading]);

  const handleChange = (e) => {
    setPaging({
      ...paging,
      searchword: e.target.value,
      currentPage: '1',
    });
  };

  useEffect(() => {
    if(현장코드) setSite({ 현장코드: 현장코드, 현장명: 현장명 })
  }, [])

  return <SaleWrap>
    <SaleTapWrap title="방문이력" />
    <SaleTabSearch>
      <RegisTabNavi dep1={company.업체명} dep2={site.현장명} dep3="장비정보" />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search"  value={paging.searchword} onChange={e => handleChange(e)}/>
        <button className="search-btn" onClick={() => {
          fetchList([])
          setLoading(true)
        }}/>
      </div>
    </SaleTabSearch>

    <CompanyInfoWrap>
      <SaleInfoListWrap>
        {
          visitList.map((item, idx) => {
            return (<SaleVisitList
              key={idx}
              no={item.방문번호}
              date={item.방문일}
              salesManager={item.영업담당자명}
              companyManager={item.업체담당자}
              position={item.직책}
              onClick={() => openModal({ ...modalData, content: <SaleVisitListModal item={item} /> })}
            />
            )
          })
        }
      </SaleInfoListWrap>
    </CompanyInfoWrap>
    <div ref={observeTargetRef}/>

    <FloatingWrap>
      <Floating onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <SaleSubmitModal item={{거래처코드: company.거래처코드, 현장코드: 현장코드 }} /> })
      }}>
      <i className="default-icon"></i>
      </Floating>
    </FloatingWrap>
  </SaleWrap>
}

export default SaleVisit
