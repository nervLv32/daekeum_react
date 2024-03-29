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

const SiteList = ({dataAtom, searchList, searchModal, setSearchModal, searchWord}) => {

  // const setNewReceipt = useSetRecoilState(newReceiptAtom)
  const [newReceipt, setNewReceipt] = useRecoilState(dataAtom)

  console.log('teststa')

  const updateValue = (name, code, address1, address2, manager, phone) => {
    setNewReceipt({
      ...newReceipt,
      현장명: name,
      현장코드: code,
      지역: address1,
      현장주소: address2,
      담당자: manager,
      연락처: phone,
    })

    setSearchModal({
      ...searchModal,
      flag: false,
    })
  }

  const updateSale = (item) => {
    console.log(item)
    setNewReceipt({
      ...newReceipt,
      ...item,
      지역: item.지역분류,
      현장주소: item.주소,
      연락처 : item.휴대폰,
    })

    setSearchModal({
      ...searchModal,
      flag: false,
    })
  }
  return <>
    {
      searchList.length > 0 ? searchList.map((it, key)=>{
        return (
          <Li key={key}
              onClick={() => {
                window.location.pathname.indexOf('sale') ? updateSale(it)
                  : updateValue(it.현장명, it.현장코드, it.지역분류, it.주소, it.담당자, it.휴대폰)
              }}
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
        : window.location.pathname.indexOf('sale') === 1 ? null : <li onClick={() => updateValue(searchWord,0)}>
          <p>"{searchWord}" 가 존재하지 않습니다. "{searchWord}" 등록하시겠습니까?</p>
        </li>
    }
  </>
}

export default SiteList
