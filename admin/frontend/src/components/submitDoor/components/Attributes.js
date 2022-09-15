import { DeleteFilled } from "@ant-design/icons"
import { Button, message } from "antd"
import React, { useEffect, useState } from "react"
import TableData from "./table/TableData"
import {useSelector} from 'react-redux'

const Attributes = ({ setData }) => {
  const isSubmit = useSelector(state => state.doors.isSubmit)
  const [dataSource, setDataSource] = useState([
    {
      name: "",
      value: "",
    },
  ])

  const setSubmitData = (data) => {
    const filteredData = data.filter((data)=>{
      return data.name !== '' || data.value !== ''
    })
    setData(filteredData)
  }
  const onNameChange = (e, i) => {
    // eslint-disable-next-line
    var row = dataSource.find((data , index) => {
      // eslint-disable-next-line
      if (index == i) {
        return data
      }
  })
  const newData = {...row, name: e.target.value}
  let newDataSource = dataSource;
  newDataSource.map((data, index) => {
    if(index === i){
      newDataSource[i] = newData
    }
    return null;
  })
 setDataSource(newDataSource)
 setSubmitData(newDataSource)
}
  const onValueChange = (e, i) => {
    // eslint-disable-next-line
    var row = dataSource.find((data, index) => {
      // eslint-disable-next-line
      if (index == i) {
        return data
      }
  })
  const newData = {...row, value: e.target.value}
  let newDataSource = dataSource;
  newDataSource.map((data, index) => {
    if(index === i){
      newDataSource[i] = newData
    }
    return null
  })
 setDataSource(newDataSource)
 setSubmitData(newDataSource)
}
  const handleAdd = () => {
    if(dataSource[dataSource?.length-1]?.name === '' || dataSource[dataSource?.length-1]?.value === ''){
      message.error('Please fill all information before adding new attribute.')
    }else{

      const addEmptyRow = {
        name: "",
        value: "",
      }
      setDataSource([...dataSource, addEmptyRow])
    }
    setSubmitData(dataSource)
  }

  const handleDelete = (key) => {

    const newDataSource = dataSource.filter((data, index)=>{
      return index !== key
    })
    setDataSource(newDataSource)
    
    setSubmitData(newDataSource)
  }
  
  // Change by Om
  useEffect(() => {
   setDataSource([{ name: "", value: "" }]);
  }, [isSubmit]);
  return (
    <div>
      {/* <Table bordered dataSource={dataSource} columns={columns} /> */}
      <div style={{ width: "100%" }}>
        <table id='customers'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>{window.innerWidth < 540 ? (<DeleteFilled style={{color: '#fff'}} />) : 'Remove'}</th>
          </tr>
          <TableData dataSource={dataSource} handleDelete={handleDelete} onNameChange={onNameChange} onValueChange={onValueChange} />          
          </tbody>
        </table>
      </div>
      <Button onClick={(e)=>{
         e.preventDefault()
        handleAdd()
      }} type='primary' style={{ marginTop: 16, marginBottom: 16 }}>
        Add New Attribute
      </Button>
    </div>
  )
}

export default Attributes
