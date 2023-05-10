import styled from "styled-components";
import HomeListCard from "../components/home/HomeListCard";
import InfoWrap from "../components/atom/InfoWrap";
import UserInfo from "../components/navigation/item/UserInfo";
import MainBtnWrap from "../components/navigation/item/MainBtnWrap";
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
      }}>일지 스텝 모달</p>
    </HomeWrap>
  </>)
}

export default Home
