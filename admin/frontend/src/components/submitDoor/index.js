import { Col, Row, message } from "antd"
import React, { useState } from "react"
import Attributes from "./components/Attributes"
import ImageSelector from "./components/ImageSelector"
import SubmitDoorHeader from "./components/SubmitDoorHeader"
import SubmitDoorStyled from "./SubmitDoorStyled"
import {useDispatch} from 'react-redux'
import { submitDoorData } from "../../features/doors/doorSlice"

const SubmitDoor = () => {
  const [data, setData] = useState([])
  const [image, setImage] = useState([])
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch()
  const error = (msg) => {
    message.error(msg)
  }
  const onSubmit = async() => {
   if (image.length < 1) {
      error("Please upload an image of the door.")
    } else if (data.length < 1) {
      error("Please provide an information of the door.")
    }else if (email.length < 1) {
      error("Please provide your email, so that we can contact you.");
    } else {
      const doorData = new FormData()
      doorData.append("door-image", image[0].originFileObj)
      doorData.append("attributes", JSON.stringify(data))
      doorData.append("email", email);
      const res = await dispatch(submitDoorData(doorData))
      if(res){
       if(res?.data?.success){
        message.success(res?.data?.message)
       }else{
        message.error(res?.data?.message)
       }
      }
    }
  }

  return (
    <SubmitDoorStyled>
      <SubmitDoorHeader onSubmit={onSubmit} emailError={emailError} />
      <div
        style={{
          alignItems: "start",
          width: `${window.innerWidth < 525 ? "95%" : "80%"}`,
          marginTop: "3rem",
        }}
      >
        <Row justify='center' align='top'>
          <Col
            lg={24}
            xs={24}
            sm={24}
            md={24}
            xl={24}
            xxl={6}
            style={{ display: "flex" }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageSelector setImage={setImage} setEmail={setEmail}
                email={email} setEmailError={setEmailError} emailError={emailError} />
            </div>
          </Col>
          <Col lg={24} xs={24} sm={24} md={24} xl={24} xxl={18}>
            <Attributes setData={setData} />
          </Col>
        </Row>
      </div>
    </SubmitDoorStyled>
  )
}

export default SubmitDoor
