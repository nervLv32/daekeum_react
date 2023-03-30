import styled from "styled-components";
import HomeListCard from "../components/home/HomeListCard";

const HomeWrap = styled.div`
  width: 100vw;
  padding: 40px 30px;
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
    no: 41377,
    date: new Date(),
    company: '주식회사 대금지웰',
    regionFirst: '인천',
    regionSecond: '미추홀구',
    site: '반도체 클러스터 일반산업단지 조성사업 2공구'
  },
  {
    no: 41377,
    date: new Date(),
    company: '주식회사 대금지웰',
    regionFirst: '인천',
    regionSecond: '미추홀구',
    site: '반도체 클러스터 일반산업단지 조성사업 2공구'
  }
]
const Home = () => {
  return<HomeWrap>
    고객접수 상황
    {
      dummyData.map((item,key) =>{
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
  </HomeWrap>
}

export default Home
