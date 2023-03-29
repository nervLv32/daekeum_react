import Typo from "../atom/Typo";
import styled from "styled-components";
import moment from "moment";


const CardBody = styled.div`
  font-family: 'Montserrat';
  background: #EFF2FF;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 20px;
`

const No = styled.div`
  p{
    float: left;
  }
`

const HomeListCard = ({
                        no,
                        date,
                        company,
                        regionFirst,
                        regionSecond,
                        site,
                      }) => {
  return <CardBody>
    <Typo text={'NO.'} color={'#1F319D'}/> <Typo text={no} />
    <Typo text={'Date.'} color={'#1F319D'} /> <Typo text={moment(date).format('YYYY-MM-DD')} />
    <Typo text={'업체명'} color={'#1F319D'}/> <Typo text={company} />
    <Typo text={'지역'} color={'#1F319D'}/> <Typo text={`${regionFirst}- ${regionSecond}`} />
    <Typo text={'현장명'} color={'#1F319D'}/> <Typo text={site} />
  </CardBody>
}

export default HomeListCard
