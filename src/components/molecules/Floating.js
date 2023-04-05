import {useState} from "react";
import styled from "styled-components";

const FloatingWrap = styled.div`
  position: fixed;
`
const FloatingMenu = styled.button`
`

const FloatingItem = styled.ul`
  
`

const Floating = ({itemList}) => {
  const [isShow, setShow] = useState(false);

  return<FloatingWrap>
    <FloatingMenu onClick={() => setShow(!isShow)}> Floating </FloatingMenu>
    {
      isShow ? <FloatingItem>
        {
          itemList.map((item, key) => {
            return <li key={key}> <a href={item.path}> {item.name}</a> </li>
          })
        }
      </FloatingItem> : null
    }
  </FloatingWrap>
}

export default Floating
