import styled from "styled-components";
import {useRecoilState} from "recoil";
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

const SiteList = ({searchList, searchModal, setSearchModal}) => {

  console.log(searchList)

  // const setNewReceipt = useSetRecoilState(newReceiptAtom)
  const [newReceipt, setNewReceipt] = useRecoilState(newReceiptAtom)

  const updateValue = (name, code, address, manager, phone) => {
    setNewReceipt({
      ...newReceipt,
      현장명: name,
      현장코드: code,
      현장주소: address,
      현장담당자: manager,
      현장연락처: phone,
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
          <Li key={key}
              onClick={() => updateValue(it.현장명, it.현장코드, it.현장주소, it.담당자, it.휴대폰)}
          >
            <div>
              <p>{it.현장명}</p>
              <p>{it.현장코드}</p>
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

export default SiteList
