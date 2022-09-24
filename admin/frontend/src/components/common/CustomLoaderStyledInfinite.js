import styled from "styled-components";

const CustomLoaderStyled = styled.div`
  @keyframes rotate360 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .spinner {
    margin: 16px;
    animation: rotate360 1s linear infinite;
    transform: translateZ(0);
    border-top: 2px solid #d22630;
    border-right: 2px solid #d22630;
    border-bottom: 2px solid #d22630;
    border-left: 4px solid #d22630;
    background: transparent;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

export default CustomLoaderStyled;
