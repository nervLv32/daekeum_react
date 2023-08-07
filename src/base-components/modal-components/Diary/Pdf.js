import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import journalAtom from "../../../recoil/journalAtom";
import userAtom from "../../../recoil/userAtom";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import { useModal } from "../../../hooks/useModal";
import fetchService from "../../../util/fetchService";

const PdfWrap = styled.div`
  width: 100%;
  height: auto;
  max-width: 800px;
  background-color: #fff;
  font-family: 'SpoqaHanSans',sans-serif;
  .info-wrap {
    width: 100%;
    height: auto;
    background-color: #00A1D4;
    padding: 30px 50px;
    span {
      display: block;
      font-size: 12px;
      font-family: 'SpoqaHanSans',sans-serif;
      font-weight: 300;
      color: #fff;
      margin-bottom: 10px;
    }
    p {
      font-family: 'SpoqaHanSans',sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
    }
  }
  .pdf-wrap {
    width: 100%;
    height: auto;
    padding: 30px 50px;
    .pdf-header {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-wrap {
        h2 {
          font-size: 30px;
          font-weight: 500;
          color: #222;
        }
        span {
          display: block;
          font-size: 14px;
          font-weight: 400;
          margin-top: 10px;
        }
      }
      .approval-wrap {
        table {
          border: 1px solid #222;
          tr {
            td {
              vertical-align: middle;
              text-align: center;
              padding: 5px 10px;
              &:not(:last-child) {
                border-right: 1px solid #222;
              }
            }
            &:not(:first-child) {
              td {
                border-top: 1px solid #222;
                width: 60px;
                height: 60px;
              }
            }
          }
        }
      }
    }
    .pdf-body {
      width: 100%;
      height: auto;
      margin-top: 15px;
      .no {
        width: 50%;
        height: auto;
        border-bottom: 1px solid #222;
        padding-bottom: 3px;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #222;
        }
      }
    }
  }
  .table-wrap {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
  table {
    width: 100%;
    height: auto;
    border: 1px solid #222;
    thead {
      tr {
        th {
          font-size: 12px;
          font-weight: 400;
          color: #222;
          text-align: center;
          vertical-align: middle;
          padding: 10px;
          background-color: #EFF2FF;
          border-bottom: 1px solid #222;
          &:not(:first-child) {
            border-left: 1px solid #222;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          font-size: 12px;
          font-weight: 400;
          padding: 10px;
          vertical-align: middle;
          color: #222;
          &:not(:first-child) {
            border-left: 1px solid #222;
          }
          &.tac {
            text-align: center;
          }
          &.bd-l {
            border-left: 1px solid #222 !important;
          }
          &.vat {
            vertical-align: top;
          }
          .mt5 {
            display: block;
            margin-top: 0.5rem;
          }
          .active {
            position: relative;
            &::after {
              content: '';
              display: block;
              width: 3rem;
              height: 3rem;
              border: 0.1rem solid #222;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
        &:not(:first-child) {
          td {
            border-top: 1px solid #222;
          }
        }
      }
    }
  }
  .agreement-wrap {
    width: 100%;
    height: auto;
    border: 1px solid #222;
    border-top: 0;
    table {
      width: 40%;
      border-top: 0;
      border-right: 0;
    }
    .info01 {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 60%;
        font-size: 10px;
        padding: 0 10px;
      }
    }
    .info02 {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      span {
        font-size: 10px;
        line-height: 1.35;
      }
      .date {
        padding: 10px;
        font-size: 12px;
        color: #444;
      }
    }
    .info03 {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      span {
        font-size: 14px;
        font-weight: 500;
        color: #1F319D;
      }
    }
  }
  .footer {
    display: flex;
    width: 100%;
    height: auto;
    padding-top: 10px;
    .f-logo {
      p {
        font-size: 18px;
        font-weight: 500;
        color: #222;
      }
      span {
        display: block;
        font-size: 10px;
        text-align: center;
        margin-top: 5px;
      }
    }
    .address {
      padding-left: 20px;
      .box {
        display: flex;
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 4px;
        }
        dl {
          display: flex;
          align-items: center;
          font-size: 10px;
          font-weight: 400;
          color: #222;
          &:not(:last-child) {
            margin-right: 15px;
          }
          dt {
            padding-left: 15px;
            position: relative;
            &::after {
              content: '□';
              display: block;
              position: absolute;
              left: 0;
              top: 1px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
`

const Pdf = () => {

  // 모달관련
  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'Pdf',
    callback: () => alert('Modal Callback()'),
  };

  // PDF Ref
  const reportTemplateRef = useRef(null);
  // 일지작성 recoil
  const [journal, setJournal] = useRecoilState(journalAtom);
  // 유저 recoil
  const [user, setUser] = useRecoilState(userAtom);


  // PDF Blob
  const printPDF = () => {
    html2canvas(reportTemplateRef.current).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf('p', 'px', 'a4');
      pdf.addImage(imgData, "PNG", 0, 0);
      // pdf.save(`test-sample.pdf`);
      const blobPDF = new Blob([pdf.output('blob')], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blobPDF); 
      // closeModal()
      // window.open(blobUrl)
      sendEmail(blobPDF)
    });
  };


  const sendEmail = (blobPDF) => {
    fetchService('/enroll/send-pdf-mail', 'post', {
      id: user.auth.userid,
      emial: journal.step02.현장담당자메일주소,
      file: blobPDF
    }).then((res) => {
      console.log(res)
      closeModal()
    })
  };
  
  useEffect(() => {
    printPDF()
  }, [journal])

  return (
    <PdfWrap ref={reportTemplateRef}>
      <div className="info-wrap">
          <span>Innovation on the move</span>
          <p>세륜기·축중기·싸이클린·오탁수처리설비비점오염저감설·비터널식천막설비</p>
          <div className="logo"></div>
        </div>
        <div className="pdf-wrap">
          <div className="pdf-header">
            <div className="title-wrap">
              <h2>대금세륜기 CS REPORT</h2>
              <span>『대금지오웰』은 더 좋은 세상을 만들기 위해 노력합니다.</span>
            </div>
            <div className="approval-wrap">
              <table>
                <tbody>
                  <tr>
                    <td rowSpan={2}>결<br/><br/>재</td>
                    <td>작성</td>
                    <td>검토</td>
                    <td>검토</td>
                    <td>승인</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="pdf-body">
            <div className="no">
              <span>No.</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>MODEL - NO</th>
                    <th>수 조</th>
                    <th>박 스</th>
                    <th>MFG - NO</th>
                    <th colSpan={3}>사용전압</th>
                    <th colSpan={2}>설치방향</th>
                    <th colSpan={2}>침전제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{journal.step01.DKNO}</td>
                    <td></td>
                    <td></td>
                    <td>
                      DK-
                    </td>
                    <td className="tac"><span className={journal.step01.전압 === '220' ? "active" : ""}>220V</span></td>
                    <td className="tac"><span className={journal.step01.전압 === '380' ? "active" : ""}>380V</span></td>
                    <td className="tac"><span className={journal.step01.전압 === '440' ? "active" : ""}>440V</span></td>
                    <td className="tac"><span className={journal.step01.방향 === '정방향' ? "active" : ""}>정</span></td>
                    <td className="tac"><span className={journal.step01.방향 === '역방향' ? "active" : ""}>역</span></td>
                    <td className="tac">자</td>
                    <td className="tac">타</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-wrap">
              <table>
                <colgroup>
                  <col width="50%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>업 체 명 : {journal.step02.업체명}</td>
                    <td colSpan={2}>현 장 명 : {journal.step02.현장명}</td>
                  </tr>
                  <tr>
                    <td>담 당 :</td>
                    <td>T E L :</td>
                    <td>H.P :</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>접수일시 : 년 월 일</td>
                    <td rowSpan={2}>처리일시 : 년 월 일</td>
                    <td>도착 : 시 분</td>
                  </tr>
                  <tr>
                    <td className="bd-l">종료 : 시 분</td>
                  </tr>
                  <tr>
                    <td>점검요원 : </td>
                    <td colSpan={2}>( H.P : )</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-wrap">
              <table>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="vat">
                      ※ 요청사항
                      <span className="mt5">{journal.step03.업무내용}</span>
                    </td>
                    <td rowSpan={3} className="vat">
                      ※ 업무내용
                      <span className="mt5">{journal.step03.업무내용}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="vat">
                      ※ 원인(점검요원소견)
                      <span className="mt5">{journal.step03.원인}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>※다음순회점검 예정일 ({moment(journal.step03.다음순회점검예정일).format('YYYY 년 MM 월 DD 일')})</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-wrap">
              <table>
                <tbody>
                  <tr>
                    <td className="tac">품명 및 규격</td>
                    <td className="tac">수 량</td>
                    <td className="tac">단 가</td>
                    <td className="tac">금 액</td>
                    <td className="tac">비 고</td>
                  </tr>
                  <tr>
                    <td className="tac" style={{height: '15rem'}}>
                      {
                        journal.품목리스트?.length > 0 && journal.품목리스트.map((item, index) => {
                          return (
                            <span key={index} className="mt5">{item.품명} / {item.규격}</span>
                          )
                        })
                      }
                    </td>
                    <td className="tac">
                      {
                        journal.품목리스트?.length > 0 && journal.품목리스트.map((item, index) => {
                          return (
                            <span key={index} className="mt5">{item.수량}</span>
                          )
                        })
                      }
                    </td>
                    <td className="tac">
                      {
                        journal.품목리스트?.length > 0 && journal.품목리스트.map((item, index) => {
                          return (
                            <span key={index} className="mt5">{item.단가}</span>
                          )
                        })
                      }
                    </td>
                    <td className="tac">
                      {
                        journal.품목리스트?.length > 0 && journal.품목리스트.map((item, index) => {
                          return (
                            <span key={index} className="mt5">{item.단가 * item.수량}</span>
                          )
                        })
                      }
                    </td>
                    <td className="tac"></td>
                  </tr>
                  <tr>
                    <td colSpan={3} rowSpan={2} style={{width: '60%'}}>합 계 (VAT별도)</td>
                    <td>계산서발행일 :</td>
                    <td>No </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="bd-l">결제예정일 : 일</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="agreement-wrap">
              <div className="info01">
                <span>※ 상기와 같이 처리되었음을 확인합니다. (*CS REPORT는 거래명세서로 대신할 수 있습니다.)</span>
                <table>
                  <tbody>
                    <tr>
                      <td>결 제 방 식 : 현금결제 ()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="info02">
                <span>
                  ※ 개인정보 수집 및 활용에 동의합니다 (3년) <input type="checkbox" /><br/>
                  수집항목 : 성명, 휴대전화번호, 직장, 이메일주소<br/>
                  수집목적 : 해피콜, 마케팅, 이벤트, 민원처리
                </span>
                <div className="date">
                  년 월 일
                </div>
              </div>
              <div className="info03">
                <span>
                  ※주의※ 세륜기 주변 및 세륜기 횡단 보행 금지!
                </span>
                <div className="user-info">
                  고객확인 : 직책 이름 (인)
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="f-logo">
                <p>(주)대금지오웰</p>
                <span>DAEKEUM GEOWELL CO.,LTD.</span>
                <span>www.geowell.co.kr</span>
              </div>
              <div className="address">
                <div className="box">
                  <dl>
                    <dt>본 사 :</dt>
                    <dd>인천 미추홀구 장고개로 92번길 38(도화동)</dd>
                  </dl>
                  <dl>
                    <dt>TEL :</dt>
                    <dd><strong>032-874-0111</strong></dd>
                  </dl>
                  <dl>
                    <dt>FAX :</dt>
                    <dd><strong>032-874-0250</strong></dd>
                  </dl>
                </div>
                <div className="box">
                  <dl>
                    <dt>음성공장 :</dt>
                    <dd>충북 음성군 삼성면 하이텍산단로 120</dd>
                  </dl>
                  <dl>
                    <dt>TEL :</dt>
                    <dd>043-883-3682</dd>
                  </dl>
                  <dl>
                    <dt>FAX :</dt>
                    <dd>043-883-0120</dd>
                  </dl>
                </div>
                <div className="box">
                  <dl>
                    <dt>부산센터 TEL :</dt>
                    <dd>055-382-2650</dd>
                  </dl>
                  <dl>
                    <dt>대구센터 TEL :</dt>
                    <dd>053-964-0856</dd>
                  </dl>
                  <dl>
                    <dt>광주센터 TEL :</dt>
                    <dd>062-369-0817</dd>
                  </dl>
                  <dl>
                    <dt>층님센터 TEL :</dt>
                    <dd>042-535-4256</dd>
                  </dl>
                </div>
                <div className="box">
                  <dl>
                    <dt>강원센터 TEL :</dt>
                    <dd>033-765-4884</dd>
                  </dl>
                  <dl>
                    <dt>충북센터 TEL :</dt>
                    <dd>043-882-5451</dd>
                  </dl>
                  <dl>
                    <dt>전북센터 TEL :</dt>
                    <dd>063-275-0111</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
    </PdfWrap>
  )
}

export default Pdf;