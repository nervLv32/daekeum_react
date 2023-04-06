import StandardCalendar from "../components/molecules/calendar/StandardCalendar";
import styled from "styled-components";

const TestWarp = styled.div`
  width: 100vw;
  height: 100vh;
`
const ComponentTestPage = () => {
  return<TestWarp>
    <StandardCalendar />
  </TestWarp>
}
export default ComponentTestPage
