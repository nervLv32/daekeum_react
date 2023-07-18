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
  > div {
    display: flex;
    align-items: center;
    dl {
      display: flex;
      align-items: center;
      &:first-child {
        margin-right: 20px;
      }
      dt {
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
        color: #1f319d;
        margin-right: 4px;
      }
      dd {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        color: #1c1b1f;
      }
    }
  }
`


const HomeListCard = ({
  no,
  date,
  company,
  region,
  site,
  onClick
}) => {
  return <CardBody onClick={onClick}>
    <div className="top-wrap">
      <dl>
        <dt>NO.</dt>
        <dd>{no}</dd>
      </dl>
      <dl>
        <dt>Date.</dt>
        <dd>{moment(date).format('YYYY-MM-DD')}</dd>
      </dl>
    </div>
    <div>
      <dl>
        <dt>업체명</dt>
        <dd>{company}</dd>
      </dl>
      <dl>
        <dt>지역</dt>
        <dd>{region}</dd>
      </dl>
    </div>
    <div>
      <dl>
        <dt>현장명</dt>
        <dd>{site}</dd>
      </dl>
    </div>
  </CardBody>
}

export default HomeListCard
