import styled from "styled-components";
import {useRecoilState, useSetRecoilState} from "recoil";
import {newReceiptAtom} from "../../recoil/receipt";

const Li = styled.li`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  div{
    display: flex;
    justify-content: space-between;
    p{
      font-weight: normal;
      font-size: 1.2rem;
    }
    p:nth-child(2){
      color: #777;
    }
    &:last-child{
      margin-top: .5rem;
    }
  }
  &:hover{
    background-color: #EFF2FF;
  }
`

const ClientList = ({searchList, searchModal, setSearchModal}) => {

  // const setNewReceipt = useSetRecoilState(newReceiptAtom)
  const [newReceipt, setNewReceipt] = useRecoilState(newReceiptAtom)

  const updateValue = (name, code) => {
    setNewReceipt({
      ...newReceipt,
      거래처명: name,
      거래처코드: code
    })

    setSearchModal({
      ...searchModal,
      flag: false,
    })
  }

  return <>
    {
      searchList.map((it, key)=>{
        return (
          <Li key={key} onClick={() => updateValue(it.업체명, it.거래처코드)}>
            <div>
              <p>{it.업체명}</p>
              <p>{it.거래처코드}</p>
            </div>
            <div>
              <p>{it.주소}</p>
              <p>{it.업태}</p>
            </div>
          </Li>
        )
      })
    }
  </>
}

export default ClientList
