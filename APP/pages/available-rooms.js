import React from 'react';
import { 
   Form, 
   Input, 
   Button, 
   InputNumber, 
   message, 
   Breadcrumb, 
   Table,
   DatePicker,
   TimePicker, 
   Spin
} from 'antd';
import styles from '../styles/Home.module.css'
import Router from 'next/router';
import moment from 'moment';
import getConfig from "next/config";
const { publicRuntimeConfig: { API_URL } } = getConfig();

export default class AvailableRooms extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         'roomDetail':[],
         'loader':false,
      }
   }

   render() {
      const disabledDate = (current) => {
         return current && current < moment().endOf('day');
      }
      const onFinish = async (values) => {
         this.setState({loader:true, roomDetail:[]}); 
         let inputData = {
            'booking_date': moment(values.booking_date).format('YYYY-MM-DD'),
            'booking_start_time': moment(values.booking_time[0]).format('HH:mm'),
            'booking_end_time': moment(values.booking_time[1]).format('HH:mm'),
            'capacity': values.capacity
         }
         let request = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
         }

         let response = await fetch(`${API_URL}/available-rooms`, request);
         const result = await response.json();
         if (result && result.status == 'success') {
            this.setState({loader:false});
            this.setState({roomDetail:result.data});          
         } else {
            message.error(result.message, 6);
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
         <Spin spinning = {this.state.loader}>
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
                        <span>Available Rooms </span>
                     </Breadcrumb.Item>
                  </Breadcrumb>
               </div>
               <div className={styles.pageTitle}>View Available Meeting Rooms</div> 
               <Form
                  name="book_room"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className={styles.formData}
               >
                  <Form.Item
                     label="Date"
                     name="booking_date"
                     rules={[{ required: true, message: 'Select Date' }]}
                  >
                     <DatePicker disabledDate={disabledDate} />
                  </Form.Item>
                  <Form.Item
                     label="Time"
                     name="booking_time"
                     rules={[{ required: true, message: 'Select Time' }]}
                  >
                     <TimePicker.RangePicker
                        format="HH:mm"
                        allowClear={true}
                        minuteStep={15}
                     />
                  </Form.Item>

                  <Form.Item
                     label="Person Capacity"
                     name="capacity"
                     rules={[{ required: true, message: 'Please enter person capacity' }]}
                  >
                     <InputNumber min={2} max={20} />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                     <Button type="primary" htmlType="submit">
                        Search
                     </Button>
                  </Form.Item>
               </Form>

               <div style={{width:'50%', margin:'auto'}}>
                  <h2>Available Rooms</h2>
                  <Table columns={columns} dataSource={this.state.roomDetail} />
               </div>
            </div>
         </Spin>
      );
   }
}
