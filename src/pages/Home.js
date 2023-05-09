import styled from "styled-components";
import HomeListCard from "../components/home/HomeListCard";
import InfoWrap from "../components/atom/InfoWrap";
import UserInfo from "../components/navigation/item/UserInfo";
import MainBtnWrap from "../components/navigation/item/MainBtnWrap";
import Floating from "../components/molecules/Floating";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import DStep01Modal from "../base-components/modal-components/Diary/DStep01Modal";

const HomeWrap = styled.div`
  width: 100vw;
  padding: 40px 30px;
`

const HomeListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  p {
    font-weight: 900;
    font-size: 14px;
    line-height: 20px;
    color: #1f319d;
  }
`

const FMenuWrap = styled.ul`
  width: 160px;
  height: 200px;
  background: url('../../icons/icon-floating-bg.png') no-repeat 50% center / cover;
  position: absolute;
  bottom : 25px;
  right: -15px;
  padding: 27px 20px 0 15px;
  z-index: 99;
  &.dep2 {
    background: url('../../icons/icon-floating-bg-dep2.png') no-repeat 50% center / cover;
  }
  li {
    width: 100%;
    background-color: #fff;
    padding: 5px 5px 5px 15px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    i {
      display: inline-block;
      margin-right: 5px;
    }
    span {
      font-weight: 500;
      font-size: 13px;
    }
  }
`

const FloatingWrap = styled.div`
  position: fixed;
  right: 20px;
  bottom : 100px;
  z-index: 100;
`

const FloatingBody = styled.div``


const dummyData = [
  {
    no: 41377,
    date: new Date(),
    company: '주식회사 대금지웰',
    regionFirst: '인천',
    regionSecond: '미추홀구',
    site: '반도체 클러스터 일반산업단지 조성사업 2공구'
  },
  {
    no: 41375,
    date: new Date(),
    company: '주식회사 대금지웰',
    regionFirst: '인천',
    regionSecond: '미추홀구',
    site: '반도체 클러스터 일반산업단지 조성사업 2공구'
  },
  {
    no: 41379,
    date: new Date(),
    company: '주식회사 대금지웰',
    regionFirst: '인천',
    regionSecond: '미추홀구',
    site: '반도체 클러스터 일반산업단지 조성사업 2공구'
  }
]
const Home = () => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  // floating open
  const [isFOpen, setIsFOpen] = useState(false);

  const [isFDep2, setIsFDep2] = useState(false);
  return (<>
    <InfoWrap>
      <UserInfo />
      <MainBtnWrap />
    </InfoWrap>
    <HomeWrap>
      <HomeListTitle>
        <p>
          고객접수 상황
        </p>
        <NavLink to="/receipt">
          <img src="../icons/icon-main-rightarrow.png" alt="right arrow" />
          {/* ../../../assets/dummyImage/profile.jpeg */}
        </NavLink>
      </HomeListTitle>
      {
        dummyData.map((item, key) => {
          return <HomeListCard
            key={key}
            no={item.no}
            date={item.data}
            company={item.company}
            regionFirst={item.regionFirst}
            regionSecond={item.regionSecond}
            site={item.site}
          />
        })
      }

      <p onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <DStep01Modal /> })
      }}>dhdjdh</p>
      <FloatingWrap>
        <Floating isFOpen={isFOpen} onClick={() => {
          if (isFDep2) {
            setIsFDep2(prev => !prev);
          } else {
            setIsFOpen(prev => !prev)
          }
        }} bgColor={isFDep2 && "#0129FF"}>
          {
            isFOpen ? (
              <>
                <i className="close-icon"></i>
              </>
            ) : <i className="default-icon"></i>
          }
        </Floating>
        <FloatingBody>
          {
            isFOpen ? (
              <FMenuWrap>
                <li onClick={() => setIsFDep2(prev => !prev)}>
                  <i><img src="../../icons/icon-f-calendar.png" alt="floating icon" /></i>
                  <span>기간별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-location.png" alt="floating icon" /></i>
                  <span>지역별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-books.png" alt="floating icon" /></i>
                  <span>신규접수</span>
                </li>
              </FMenuWrap>
            ) : null
          }
          {
            isFOpen && isFDep2? (
              <FMenuWrap className="dep2">
                <li>
                  <i><img src="../../icons/icon-f-calendar.png" alt="floating icon" /></i>
                  <span>년도별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-table.png" alt="floating icon" /></i>
                  <span>월별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-viewday.png" alt="floating icon" /></i>
                  <span>일자별조회</span>
                </li>
              </FMenuWrap>
            ) : null
          }
        </FloatingBody>

      </FloatingWrap>
    </HomeWrap>
  </>)
}

export default Home
