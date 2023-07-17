import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import {useEffect, useState} from "react";

const StandardCalenderContainer = styled.div`
  width: 100%;
  height: 100%;

  .react-calendar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #222;
    border-radius: 8px;
    line-height: 1.125em;
  }
  .react-calendar__navigation{
    padding: 20px;
  }

  .react-calendar__navigation__label {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }

  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    position: absolute;
    transform: scale(2);
    color: #555555;
  }

  .react-calendar__navigation__prev-button {
    right: 6rem;
  }

  .react-calendar__navigation__next-button {
    right: 3rem;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__viewContainer,
  .react-calendar__month-view {
    width: 100%;
    height: 90%;
  }
  
  .react-calendar__month-view__days__day,
  .react-calendar__month-view__weekdays__weekday,
  .react-calendar__month-view__days__day--neighboringMonth {
    font-family: 'Montserrat';
    font-style: normal;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    color: #555555;
  }
  
  .react-calendar__tile{
    margin: 5px 0;
    padding: 10px;
  }
  
  .react-calendar__month-view__weekdays__weekday,
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #9DA2AE;
  }
  .react-calendar__month-view__weekdays{
    > div > abbr { text-decoration: none; }
  }
  .react-calendar__tile--range{
    background: #EFF2FF;
  }
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd{
    border-radius: 10px;
    background: #0129FF;
    color: white;
  }
`

const StandardCalendar = ({setRange}) => {
  const [date, setDate] = useState(new Date())

  useEffect(() =>{
    setRange(date)
  },[date])

  return <StandardCalenderContainer>
    <Calendar
      onChange={setDate}
      formatDay={(locale, date) => moment(date).format("DD")}
      selectRange={false}
      locale={'kr'}
    />
  </StandardCalenderContainer>
}

export default StandardCalendar
