import styled from "styled-components";
import Calendar from "react-calendar";
import {useState} from "react";

const StandardCalenderContainer = styled.div`
  width: 100%;
  height: 100%;
  .react-calendar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar__navigation__label{
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button{
    position: absolute;
  }
  .react-calendar__navigation__prev-button{
    right: 20px;
  }
  .react-calendar__navigation__next-button{
    right: 10px;
  }
  
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button{
    display: none;
  }
  .react-calendar__viewContainer,
  .react-calendar__month-view{
    width: 100%;
    height: 90%;
  }
  .react-calendar__month-view{
    >div{
      width: 100%;
      height: 100%;
      >div{
        width: 100%;
        height: 100%;
        div.react-calendar__month-view__days{
          width: 100%;
          height: 100%;
        }
      }
      
    }
  }
`
const StandardCalendar = () => {
  const [date, setDate] = useState(new Date())

  return<StandardCalenderContainer>
    <Calendar onChange={setDate} value={date}/>
  </StandardCalenderContainer>
}

export default StandardCalendar
