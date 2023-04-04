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

const Line = styled.div`
  clear: both;
  p{
    font-family: 'Montserrat';
    font-size: 11px;
    float: left;
    margin-bottom: 5px;
    &:first-child {
      margin-right: 20px;
    }
    b{
      color: #1F319D
    }
  }
`
const Blank = styled.div`
  width: 100%;
  height: 10px;
`
const HomeListCard = ({
  no,
  date,
  company,
  regionFirst,
  regionSecond,
  site,
  onClick
}) => {
  return <CardBody onClick={onClick}>
    <Line>
      <p><b>No.</b>{no}</p>
      <p><b>Date. </b>{moment(date).format('YYYY-MM-DD')}</p>
    </Line>
    <Line>
      <p><b>업체명</b> {company}</p>
      <p><b>지역</b> {`${regionFirst} - ${regionSecond}`}</p>
    </Line>
    <Line>
      <p><b>현장명</b> {site}</p>
    </Line>
    <Blank/>
  </CardBody>
}

export default HomeListCard
