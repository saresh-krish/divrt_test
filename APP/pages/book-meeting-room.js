import React from 'react';
import {
   Form,
   Input,
   Button,
   InputNumber,
   message,
   DatePicker,
   TimePicker,
   PageHeader,
   Breadcrumb,
   Spin
} from 'antd';
import moment from 'moment';

import styles from '../styles/Home.module.css'
import getConfig from "next/config";
const { publicRuntimeConfig: { API_URL } } = getConfig();

export default class BookMeetingRooms extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         loader: false,
      }
   }


   render() {

      const disabledDate = (current) => {
         return current && current < moment().endOf('day');
      }

      const onFinish = async(values) => {
         this.setState({loader:true});
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

         let response = await fetch(`${API_URL}/schedule-meeting`, request);
         const result = await response.json();
         //console.log(result)
         this.setState({loader:false});
         if (result && result.status == 'success') {
            message.success(result.message, 3);
            setTimeout(() =>{
               window.location.reload()
            }, 2000)
         } else {
            message.error(result.message, 6);
         }
      };

      const onFinishFailed = (errorInfo) => {
         console.log('Failed:', errorInfo);
      };
      const routes = [
         {
            path: 'index',
            breadcrumbName: 'Home',
         },
         {
            path: 'first',
            breadcrumbName: 'Schedule Meeting',
         },
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
                        <span>Schedule Meeting </span>
                     </Breadcrumb.Item>
                  </Breadcrumb>
               </div>
               <div className={styles.pageTitle}>Schedule Meeting</div>
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
                     label="Booking Date"
                     name="booking_date"
                     rules={[{ required: true, message: 'Select Date' }]}
                  >
                     <DatePicker disabledDate={disabledDate} />
                  </Form.Item>
                  <Form.Item
                     label="Booking Time"
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
                        Book
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </Spin>
      );
   }
}
