import React from 'react';
import { Form, Input, Button, InputNumber, message, Breadcrumb, Table } from 'antd';
import styles from '../styles/Home.module.css'
import Router from 'next/router';
import getConfig from "next/config";
const { publicRuntimeConfig: { API_URL } } = getConfig();

export default class MeetingRooms extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         'roomDetail':[]
      }
   }

   componentDidMount(){
      this.getMeetingRoom()
   }

   async getMeetingRoom(){
      let request = {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         }
      }
      let response = await fetch('http://localhost:9000/api/get-room', request);
      const result = await response.json(); 
      if (result && result.status == 'success') { 
         console.log(result.data)
         this.setState({roomDetail:result.data});
      }
   }

   render() {
      const onFinish = async (values) => {
         let inputData = {
            'room_name': values.room_name,
            'room_capacity': values.room_capacity,
         }

         let request = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
         }
         let response = await fetch(`${API_URL}/meeting-room`, request);
         const result = await response.json();
         if (result && result.status == 'success') {
            message.success('Meeting Room Created Successfully', 4);
            setTimeout(() =>{
               window.location.reload()
            }, 2000)
            
         } else {
            message.error('Error Creating Meeting Room', 10);
         }
      };

      const onFinishFailed = (errorInfo) => {
         console.log('Failed:', errorInfo);
      };
      const columns = [
         {
            title: 'Room Name',
            dataIndex: 'room_name',
            key: 'room_name',
         },
         {
            title: 'Room Capacity',
            dataIndex: 'room_capacity',
            key: 'room_capacity',
         }
      ];

      return (
         <div>
            <h1 className={styles.title}>
               divrt.co
            </h1>
            <div className={styles.breadcrumb_sec}>
               <Breadcrumb>
                  <Breadcrumb.Item href="/">
                     <span style={{ color: '#2866A1' }}>Home</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                     <span>Meeting Rooms </span>
                  </Breadcrumb.Item>
               </Breadcrumb>
            </div>
            <div className={styles.pageTitle}>Meeting Room</div> 
            <Form
               name="meeting_room"
               labelCol={{ span: 8 }}
               wrapperCol={{ span: 16 }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
               className={styles.formData}
            >
               <Form.Item
                  label="Meeting Room Name"
                  name="room_name"
                  rules={[{ required: true, message: 'Please enter room name' }]}
               >
                  <Input style={{ width: '350px' }} />
               </Form.Item>

               <Form.Item
                  label="Meeting Room Capacity"
                  name="room_capacity"
                  rules={[{ required: true, message: 'Please enter room capacity' }]}
               >
                  <InputNumber min="1" />
               </Form.Item>

               <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                     Crate Room
                  </Button>
               </Form.Item>
            </Form>

            <div style={{width:'50%', margin:'auto'}}>
               <h2>Rooms</h2>
               <Table columns={columns} dataSource={this.state.roomDetail} />
            </div>
         </div>
      );
   }
}
