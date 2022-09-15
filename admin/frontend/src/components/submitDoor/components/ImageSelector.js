import { MailOutlined, PlusCircleTwoTone } from "@ant-design/icons"
import { Input, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import React, { useEffect, useState } from "react"
import {useSelector} from 'react-redux'

const ImageSelector = ({
  setImage,
  email,
  setEmail,
  setEmailError,
  emailError
}) => {
  const isSubmit = useSelector(state => state.doors.isSubmit)
  const [fileList, setFileList] = useState([]);
  
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setImage(newFileList)
  }

  const onPreview = async (file) => {
    let src = file.url

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)

        reader.onload = () => resolve(reader.result)
      })
    }

    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  function ValidateEmail(input) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  //for response to upload that image upload is success.
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok")
    }, 0)
  }

  //Change by Om
  useEffect(() => {
    setFileList([]);
      setEmail('')
  }, [isSubmit]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <ImgCrop rotate>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        customRequest={dummyRequest}
        name='image'
      >
        {fileList.length < 1 && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <PlusCircleTwoTone
                twoToneColor='#d22630'
                style={{ fontSize: "2rem", marginBottom: "1rem" }}
              />
              <p style={{ fontWeight: "600" }}>Upload Your Door Image</p>
            </div>
          </>
        )}
      </Upload>
    </ImgCrop>
            
            {/* added by Om  */}
    <div className={'email-container'}>
        <label htmlFor="email" style={{width : '100%'}}>
          Email Address <span style={{ color: "red" }}>*</span>
        </label>
        <Input
          value={email}
          status={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(
              ValidateEmail(e.target.value) === false ? "error" : ""
            );
          }}
          size="large"
          addonBefore={<MailOutlined />}
          placeholder="Enter email address"
        />
      </div>
      </div>
  )
}

export default ImageSelector
