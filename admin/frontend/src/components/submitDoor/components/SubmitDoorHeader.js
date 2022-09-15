import { Button, Col, message, Popconfirm, Row } from "antd"
import React  from "react"
import logo from "../../../assets/a1-logo.png"
import {useSelector} from 'react-redux'

const SubmitDoorHeader = ({ onSubmit, emailError }) => {
  const Loading = useSelector(state => state.doors.loading)
  const confirm = () => {
    if(emailError === 'error')
    message.error('Please provide valid email address.')
    else onSubmit()
  }

  return (
    <div className='header'>
      <Row gutter={[8, 8]} justify='space-around' align='middle'>
        <Col lg={4} xs={6} sm={4} md={4} xl={8} xxl={8} align='left'>
          <div className='logo'>
            <img
              src={logo}
              alt='logo'
              width={window.innerWidth < 525 ? 85 : 100}
            />
          </div>
        </Col>
        <Col lg={10} xs={12} sm={10} md={10} xl={8} xxl={8}>
          <p className='title' align='center'>
            Submit Door Design
          </p>
        </Col>
        <Col lg={4} xs={6} sm={4} md={4} xl={8} xxl={8} align='right'>
          <Popconfirm
            title='Are you sure to submit data?'
            onConfirm={confirm}
            // onCancel={cancel}
            okText='Yes'
            cancelText='Cancel'
            placement='rightBottom'
          >
            <Button type='primary' style={{ marginRight: "5px" }} loading={Loading}>
              Submit
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  )
}

export default SubmitDoorHeader
