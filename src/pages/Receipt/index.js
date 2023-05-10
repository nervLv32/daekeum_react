import styled from "styled-components"
import TopSearch from "../../components/molecules/TopSearch"
import { useModal } from "../../hooks/useModal";
import ReceiptCard from "../../components/receipt/ReceiptCard";
import ReceiptListModal from "../../base-components/modal-components/receipt/ReceiptListModal";
import { useState } from "react";
import TopSearchMenu from "../../components/molecules/TopSearchMenu";
import { NavLink } from "react-router-dom";
import Floating from "../../components/molecules/Floating";

const ReceiptWrap = styled.div`
  padding: 28px 30px 0; 
`

// 메뉴가 3개 4개 5개로 나뉘어져서 부득이하게
// wrapper 잡아야함. li에 대한 스타일은 TopSearchMenu에 있습니다
const TopSearchcMenuWrap = styled.ul`
  width: 175px;
  height: 240px;
  background: url('../images/topmenu-search-bg.png') no-repeat 50% center / cover;;
  padding: 43px 30px 0px 25px;
`

const FMenuWrap = styled.ul`
  width: 160px;
  height: 200px;
  background: url('../../icons/icon-floating-bg.png') no-repeat 50% center / cover;
  position: absolute;
  bottom : 25px;
  right: -15px;
  padding: 27px 20px 0 15px;
  z-index: 99;
  &.dep2 {
    background: url('../../icons/icon-floating-bg-dep2.png') no-repeat 50% center / cover;
  }
  li {
    width: 100%;
    background-color: #fff;
    padding: 5px 5px 5px 15px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    i {
      display: inline-block;
      margin-right: 5px;
    }
    span {
      font-weight: 500;
      font-size: 13px;
    }
  }
`

const FloatingWrap = styled.div`
  position: fixed;
  right: 20px;
  bottom : 100px;
  z-index: 100;
`

const FloatingBody = styled.div``



const Receipt = () => {

  const { openModal } = useModal();
  const modalData = {
    title: 'Receipt Modal',
    content: <ReceiptListModal />,
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 41377,
      date: "2023-02-01",
      state: '접수대기',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41375,
      date: "2023-02-01",
      state: '접수완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41379,
      date: "2023-02-01",
      state: '처리완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '',
      managerPhone: '',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41377,
      date: "2023-02-01",
      state: '접수대기',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41375,
      date: "2023-02-01",
      state: '접수완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41379,
      date: "2023-02-01",
      state: '처리완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '',
      managerPhone: '',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
  ]

  const [topMenu, setTopMenu] = useState(false);

  // floating open
  const [isFOpen, setIsFOpen] = useState(false);

  const [isFDep2, setIsFDep2] = useState(false);
  

  return (
    <>
      <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} />
      {
        topMenu && (
          <TopSearchMenu>
            <TopSearchcMenuWrap>
              <li>
                <NavLink to="/">
                  <i>
                    <img src="../icons/icon-topmenu-list.png" alt="topmenu icon" />
                  </i>
                  <span>전체</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <i>
                    <img src="../icons/icon-topmenu-addbox.png" alt="topmenu icon" />
                  </i>
                  <span>신규접수</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <i>
                    <img src="../icons/icon-topmenu-checklist.png" alt="topmenu icon" />
                  </i>
                  <span>접수확인</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <i>
                    <img src="../icons/icon-topmenu-done.png" alt="topmenu icon" />
                  </i>
                  <span>처리완료</span>
                </NavLink>
              </li>
            </TopSearchcMenuWrap>
          </TopSearchMenu>
        )
      }
      <ReceiptWrap>
        {
          dummyData.map((item, key) => {
            return <ReceiptCard
              key={key}
              no={item.no}
              date={item.date}
              state={item.state}
              company={item.company}
              regionFirst={item.regionFirst}
              regionSecond={item.regionSecond}
              site={item.site}
              manager={item.manager}
              onClick={() => openModal({ ...modalData, content: <ReceiptListModal item={item} /> })}
            />
          })
        }
      </ReceiptWrap>

      <FloatingWrap>
        <Floating isFOpen={isFOpen} onClick={() => {
          if (isFDep2) {
            setIsFDep2(prev => !prev);
          } else {
            setIsFOpen(prev => !prev)
          }
        }} bgColor={isFDep2 && "#0129FF"}>
          {
            isFOpen ? (
              <>
                <i className="close-icon"></i>
              </>
            ) : <i className="default-icon"></i>
          }
        </Floating>
        <FloatingBody>
          {
            isFOpen ? (
              <FMenuWrap>
                <li onClick={() => setIsFDep2(prev => !prev)}>
                  <i><img src="../../icons/icon-f-calendar.png" alt="floating icon" /></i>
                  <span>기간별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-location.png" alt="floating icon" /></i>
                  <span>지역별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-books.png" alt="floating icon" /></i>
                  <span>신규접수</span>
                </li>
              </FMenuWrap>
            ) : null
          }
          {
            isFOpen && isFDep2? (
              <FMenuWrap className="dep2">
                <li>
                  <i><img src="../../icons/icon-f-calendar.png" alt="floating icon" /></i>
                  <span>년도별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-table.png" alt="floating icon" /></i>
                  <span>월별조회</span>
                </li>
                <li>
                  <i><img src="../../icons/icon-f-viewday.png" alt="floating icon" /></i>
                  <span>일자별조회</span>
                </li>
              </FMenuWrap>
            ) : null
          }
        </FloatingBody>

      </FloatingWrap>
    </>
  )
}

export default Receipt
