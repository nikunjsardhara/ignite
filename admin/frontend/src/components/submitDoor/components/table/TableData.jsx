import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'

const TableData = ({ dataSource, onNameChange,  onValueChange, handleDelete }) => {
  const isSubmit = useSelector(state=> state.doors.isSubmit)
    // eslint-disable-next-line
    const[name, setName] = useState('')
    // eslint-disable-next-line
    const[value, setValue] = useState('')
    const nameOptions = ['Width (ft)', "Height (ft)", "Shape", "Collection", "Panel", "Top Panel", "Color", "Contruction", "Hardwares"]
    useEffect(() => {
      setName('')
       setValue('')
    }, [isSubmit]);
  return (
    <>
    {dataSource.map((row, i)=>{
        return(
          <tr key={i}>
        <td>
          <input
            type='text'
            placeholder={i === 0 ? 'Ex.Panel' : "Attribute Name"}
            name='name'
            value={row.name}
            className='text-box'
            onChange={(e)=>{
              e.preventDefault()
              setName(e.target.value)
              onNameChange(e, i)
            }}
            list="attributesName"
            autoComplete="off"
          />
          <datalist id="attributesName">
          {nameOptions.map((o)=>{
            return <option key={o} value={o} />
          })}
        </datalist>
        </td>
        <td>
          <input
            type='text'
            placeholder={i === 0 ? 'Ex.Classic' : "Attribute Value"}
            name='value'
            value={row.value}
            className='text-box'
            onChange={(e)=>{
              e.preventDefault()
              setValue(e.target.value)
              onValueChange(e, i)
            }}
          />
        </td>
        <td>
         <DeleteOutlined className="remove-icon" onClick={(e)=>{
          e.preventDefault()
          handleDelete(i)
          }} />
        </td>
      </tr>
        );
      })}
      </>
  )
}

export default TableData