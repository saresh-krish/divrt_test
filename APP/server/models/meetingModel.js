const { Pool } = require('pg'); 
require('dotenv').config();
 

const connectionString = `postgresql://${process.env.PG_DB_USER}:${process.env.PG_DB_PASSWORD}@${process.env.PG_DB_HOST}:${process.env.PG_DB_PORT}/${process.env.PG_DB_NAME}` 
const pool = new Pool({
   connectionString,
   ssl: false,
});
 
/**
 * Create Meeting Rooms 
**/ 
async function createMeetingRoom(post_data) {
   return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO divrt.meeting_room( room_name, room_capacity, created_at) VALUES ($1, $2, NOW()) RETURNING uid; `, [post_data.room_name, post_data.room_capacity], (error, result) => {
         if (error) {
            reject(error);
         } 
         if(result && result.rows.length > 0) { 
            var uid = result.rows[0].uid;
            resolve(uid);
         } else {
            resolve(null)
         }
      });
   });
} 

/**
 * Schedule Meeting
**/
async function bookMeetingRoom(post_data, room_id){
   return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO divrt.schedule_meeting( booking_date, booking_start_time, booking_end_time, capacity, meeting_room_uid, created_at) 
                  VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING uid; `, 
                  [post_data.booking_date, post_data.booking_start_time, post_data.booking_end_time, post_data.capacity, room_id], (error, result) => {
         if (error) {
            reject(error);
         }
         if(result && result.rows.length > 0) { 
            resolve("success");       
         } else {
            resolve(null)
         }
      });
   });
}

/**
 *  Get Booked Rooms
 */
async function getBookedRoom(post_data) {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT booking_date,booking_start_time,booking_end_time,capacity,meeting_room_uid FROM divrt.schedule_meeting WHERE booking_date = $1 `, [post_data.booking_date], (error, result) => {
         if (error) {
           reject(error);
         } 
         if(result && result.rows.length > 0) {  
            resolve(result.rows);
         } else {
            resolve(null)
         }

      });
   });
}

/**
 *  List all Room Detail
 */
async function getMeetingRoom() {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT uid as meeting_room_uid,room_name,room_capacity FROM divrt.meeting_room ORDER BY room_capacity`, [], (error, result) => {
         if (error) {
           reject(error);
         }  
         if(result && result.rows.length > 0) {  
            resolve(result.rows);
         } else {
            resolve(null)
         }
      });
   });
}

module.exports = {   
   createMeetingRoom,
   bookMeetingRoom,
   getBookedRoom,
   getMeetingRoom
}