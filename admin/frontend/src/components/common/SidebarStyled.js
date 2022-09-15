import styled from 'styled-components';

const SidebarStyled = styled.div`
  background: #d22630;

  .ant-layout-sider-collapsed {
    font-size: 0.5rem;
  }
  .logo {
    background: #ffffff;
    height:64px;
    display: grid;
    align-items: center;
    justify-content: center;
    h2{
      margin-bottom:0px;
    }
  }
  .sidebar-items {
    background: #d22630;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: transparent;
    font-weight: 700;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;

    font-size: 1rem !important;
  }
`;

export default SidebarStyled;
