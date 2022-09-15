import styled from "styled-components";

const DoorSubmitionStyle = styled.div`
  .inner-table-head {
    color: #d22630;
    font-weight: 600;
  }
  .ant-input {
    &:focus {
      border: 1px solid #d22630;
      box-shadow: 0px 0px;
    }
    &:hover {
      border: 1px solid #d22630;
      box-shadow: 0px 0px;
    }
  }
  .inner-table-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 5px;
    cursor : pointer;
  }
  .isApproved {
    background-color: #6bff8269;
    width: fit-content;
    padding: 0px 8px;
    border-radius: 5px;
  }
  .disApproved {
    background-color: #ff676769;
    width: fit-content;
    padding: 0px 8px;
    border-radius: 5px;
  }
  .approveIcon {
    color: #28a745;
  }
  .disApproveIcon {
    color: #dc3545;
  }
`;

export default DoorSubmitionStyle;
