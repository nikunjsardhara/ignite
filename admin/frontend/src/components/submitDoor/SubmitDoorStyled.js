import styled from "styled-components"

const SubmitDoorStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .containerDiv {
    display: flex;
    justify-content: center;
    align-items: top;
    width: 80%;
    height: 100vh;
    padding-top: 3rem;
  }

  .header {
    width: 80%;
    padding: 10px 8px;
  }
  @media (max-width: 700px) {
    .header {
      width: 100%;
      padding: 6px 2px;
    }
    .logo {
      width: 100%;
      margin: 5px 5px;
    }
  }
  .logo {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h2 {
      margin-bottom: 0px;
    }
    margin: 5px 12px;
    padding: 3px;
  }

  .title {
    color: #d22630;
    font-size: 22px;
    font-weight: 600;
    margin: 10px 0px 10px 20px;
    padding: 10px 0px;
  }
  @media (max-width: 500px) {
    .title {
      font-size: 16px;
    }
  }

  .draggerIcon {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    margin-bottom: 12px;
  }
  .w-100 {
    width: 100% !important;
  }
  .w-40 {
    width: 40% !important;
  }

  .detailText {
    font-size: 22px;
  }
  .propertiesContainer {
    margin: 20px 0px 4px 0px;
    border: 2px solid #cbcbcb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border-radius: 2px;
    overflow: auto;
    padding: 10px 2px;
    margin-top: -200px;
  }
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 300px;
    height: 300px;
    margin: 0px !important;
  }
  .ant-upload {
    color: #d22630;
    &:hover {
      background: #d22630;
      color: #fff;
    }
  }


  ${"" /* table styles */}
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #d22630;
    color: white;
  }
  .text-box {
    width: 100%;
    border: none;
    padding: 5px 5px;
    margin: 3px 1px;
    outline: 0.5px solid #ddd;
    &:focus {
      outline: 0.5px solid #d22630;
    }
  }
  .remove-icon{
    color: #d22630;
    font-size: 16px;
    cursor: pointer;
  }
  .ant-input-group{
    width: 100%;
  }
  .ant-upload-picture-card-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .email-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
    flex-direction: column;
  }
`

export default SubmitDoorStyled
