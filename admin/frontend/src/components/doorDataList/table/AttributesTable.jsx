import { Button, Form, Input, message, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoor } from "../../../features/doors/doorSlice";
import { makeid } from "../../../helpers/makeId";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please input value.`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AttributesTable = ({ tData, rowId, isUpdatePermitted }) => {
  const Loading = useSelector(state=> state.doors.loading)
  const dispatch = useDispatch()
    //only for remove key warning...
    let key = Number(makeid(6));
    var tableData = tData.map((d)=> {
        key ++;
        if(d.name != '' || d.value != '')
        {
          return {...d, key : key}
        }else{
          return null
        }
    })
tableData = tableData.filter((data)=> data !== null)
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData);
  const [changed, setChanged] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record, index) => {
    return index === editingKey
};

  const addAttribute = () => {
    if(data.length && (data[data.length - 1].name === '' || data[data.length - 1].value === '')){
      message.error('Please insert value before adding new attribute.')
    }else{

      let key = Number(makeid(6));
      let addRow = {
          key : key,
          name:'',
          value:''
      }
      setData((oldData)=> [...oldData, addRow])
    }
  }

  const edit = (record, index) => {
    
    form.setFieldsValue({
      name: "",
      age: "",
      value: "",
      ...record,
    });
    setEditingKey(index);
  };

  const remove = (index) => {
    if(!(data[index].name === '')){
      setChanged(true)
    }
      let newdata = data.filter((data, i)=> {return index !==i})
    setData(newdata)
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (index) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      setChanged(true)
    } catch (errInfo) {
    }
  };

  const saveAttribute = async () => {
    let filterData = []
    data.map((e)=>{
      let fData = {
        name : e.name,
        value : e.value
      }
      if(!(e.name === '')){
        filterData.push(fData)
      }
    })
    let updateData = {
      _id : rowId,
      attributes : filterData
    }
    const res =  await dispatch(updateDoor(updateData));
    if(res?.status === 200){
      setChanged(false)
      setData(filterData)
      res?.data?.success ? message.success(res?.data?.message) : message.error(res?.data?.message)
    }else{
      message.error('There is an error while update attributes.')
    }
  }
  
  const columns = [
    {
      title: (render) => {return <span className="inner-table-head">Attributes</span>},
      dataIndex: "name",
      width: "40%",
      editable: true,
    },

    {
      title: (render) => {return <span className="inner-table-head">Value</span>},
      dataIndex: "value",
      width: "40%",
      editable: true,
    },    
  ];
  if(isUpdatePermitted) columns.push({
    title: (render) => {return <span className="inner-table-head">Operation</span>},
    dataIndex: "operation",
    width: "20%",
    render: (_, record, index) => {
      const editable = isEditing(record, index);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(index)}
            style={{
              marginRight: 8,
              color: "#d22630",
              fontWeight: 300,
            }}
          >
            Save
          </Typography.Link>
          <span onClick={cancel}>
            <a>Cancel</a>
          </span>
        </span>
      ) : (
          <>
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => edit(record, index)}
          style={{ color: "#d22630", fontWeight: 300 }}
        >
          Edit
        </Typography.Link>
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => remove(index)}
          style={{ marginLeft: '0.8rem', color: "#d22630", fontWeight: 300 }}
        >
          Remove
        </Typography.Link>
        </>
      );
    },
  })
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record, index) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record, index),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
      <div style={{display : 'flex', justifyContent:'space-between', alignItems: 'center', width: '100%', marginTop: '2rem'}}>
        {isUpdatePermitted && <Button type={'primary'} onClick={addAttribute}>Add Attribute</Button>}
        <Popconfirm title='Are you sure to update attributes?' onConfirm={saveAttribute} > 
          <Button type={'primary'} loading={Loading} style={{display : `${changed ? 'block' : 'none'}`}}>Save Changes</Button>
        </Popconfirm>
      </div>
    </Form>
  );
};

export default AttributesTable;