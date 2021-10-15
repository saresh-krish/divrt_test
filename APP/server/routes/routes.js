const express = require('express');
const router = express.Router();

const meetingController = require('../controllers/meetingController');

//Get Meeting Room
router.get('/api/get-room', meetingController.getRoomDetail)

//Create Meeting Room
router.post('/api/meeting-room', meetingController.createMeetingRoom);

//Schedule meeting
router.post('/api/schedule-meeting', meetingController.bookMeetingRoom);

//Get Available Rooms
router.post('/api/available-rooms', meetingController.availableRooms)

module.exports = router;