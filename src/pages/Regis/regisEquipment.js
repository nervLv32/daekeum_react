import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import RegisEquipListModal from "../../base-components/modal-components/regis/RegisEquipListModal";
import RegisEquipList from "../../components/regis/RegisEquipList";
import RegisTabNavi from "../../components/regis/RegisTabNavi";
import RegisTapWrap from "../../components/regis/RegisTapWrap";
import { useModal } from "../../hooks/useModal";
import {useRecoilState} from "recoil";
import {selectCompanyAtom} from "../../recoil/regisAtom";
import {useNavigate} from "react-router-dom";
import fetchService from "../../util/fetchService";
import {DateFormat} from "../../util/dateFormat";

const RegisEquipmentWrap = styled.div``


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

const EquipmentInfoWrap = styled(paddingWrap)`

`



const RegisEquipment = () => {

  let debounce = null
  const [isLoading, setLoading] = useState(false);
  const observeTargetRef = useRef(null)
  const [search, setSearch] = useState('')
  const [selectRegis, setSelectRegis] = useRecoilState(selectCompanyAtom)
  const [equips, setEquips] = useState([])
  const [equipParam, seEquipParam] = useState({
    거래처코드: selectRegis.client.code,
    현장코드: selectRegis.site.code,
    searchword: '',
    pageSize: 10,
    currentPage: 1,
  })
  const navigate = useNavigate()

  const { openModal } = useModal();
  const modalData = {
    title: 'RegisEquipList Modal',
    content: <RegisEquipListModal />,
    callback: () => alert('Modal Callback()'),
  };
/*
  const fetchData = () => {
    console.log(equipParam)
    fetchService('/enroll/equipList', 'post', equipParam)
      .then(res => {
        console.log(res)
        setEquips(mappingData(res.data))
      })


  }*/

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      seEquipParam({
        ...equipParam,
        currentPage: parseInt(equipParam.currentPage) + 1
      })
      fetchList(equips)
    }
  });

  const fetchList = (list) => {
    fetchService('/enroll/equipList', 'post', equipParam)
      .then((res) => {
        const data = [...list, ...mappingData(res.data)]
        setEquips( data )
        if(res.data.length > 9) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
    const mappingData = (data) => {
      return data.map(it => {
        return {
          ...it,
          no: 41377,
          date: DateFormat(new Date(it.설치일)).substr(0,10),
          dkno: it.DKNO,
          mcno: it.MCNO,
          model: it.모델,
          installCate:it.매출타입,
          warehousingCate: it.입출고,
          bolt:it.전압,
          direction:it.방향,
          center: it.지역구분,
          manager: it.담당자,
        }
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [equipParam.searchword])

  useEffect(() => {
    debounce = setTimeout(() => {
      seEquipParam({
        ...equipParam,
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
    if(selectRegis.client.code === '' || selectRegis.site.code === '') {
      navigate('/regis')
    }else{
      fetchList([])
    }
  }, [])

  return <RegisEquipmentWrap>
    <RegisTapWrap title="장비정보" />
    <RegisTabSearch>
      <RegisTabNavi dep1={selectRegis.client.name} dep2={selectRegis.site.name} dep3="장비정보" />
      <div className="tab-searchwrap">
        <input type="text" placeholder="Search" />
        <button className="search-btn" />
      </div>
    </RegisTabSearch>

    <EquipmentInfoWrap>
      {
        equips.map((item, idx) => {
          return (<RegisEquipList
            key={idx}
            dkno={item.dkno}
            date={item.date}
            mcno={item.mcno}
            model={item.model}
            installCate={item.installCate}
            warehousingCate={item.warehousingCate}
            onClick={() => openModal({ ...modalData, content: <RegisEquipListModal item={item} /> })}
          />
          )
        })
      }
    </EquipmentInfoWrap>
    <div ref={observeTargetRef}/>

  </RegisEquipmentWrap>
}

export default RegisEquipment;
