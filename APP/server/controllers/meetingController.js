const meetingModel = require('../models/meetingModel')

//Create Meeting Rooms
createMeetingRoom = async (req, res, next) => {
	let result = await meetingModel.createMeetingRoom(req.body);
	if(result){
		res.status(200).json({status:'success'});
	} else {
		res.status(200).json({status:'failure'});
	}
	
}

//Get Room Detail
getRoomDetail = async (req, res, next) => {
	let result = await meetingModel.getMeetingRoom();
	if(result){
		res.status(200).json({status:'success', data:result});
	} else {
		res.status(200).json({status:'failure'});
	}
}	

//Book Meeting Room
bookMeetingRoom = async (req, res, next) => {
	//Get all Rooms..
	let rooms = await meetingModel.getMeetingRoom();
	//Get Booked Rooms
	var bookedRooms = await meetingModel.getBookedRoom(req.body);  

	let room_available = null;
	if(bookedRooms){
		let booked_rooms = await checkRoomAvailabilty(rooms, bookedRooms, req.body); 
		if(booked_rooms && booked_rooms.length>0){ 
			var roomA = rooms.filter(compareRoom(booked_rooms));
			var roomB = booked_rooms.filter(compareRoom(rooms));  
			let result = roomA.concat(roomB); 
			room_available = result.filter(room => room.room_capacity >=req.body.capacity); 
		} else {
			room_available = rooms.filter(room => room.room_capacity>=req.body.capacity); 
		}	
		
	} else {
		room_available = rooms.filter(room => room.room_capacity>=req.body.capacity); 
	} 
	
	if(room_available && room_available.length>0){
		let room_name = room_available[0].room_name;
		let room_id = room_available[0].meeting_room_uid;

		let response = await meetingModel.bookMeetingRoom(req.body, room_id);
		if(response){ 
			res.status(200).json({status:'success', message:room_name+' room is booked'});
		} else {
			res.status(200).json({status:'success', message:'Error while booking room'});
		}		
	} else {
		res.status(200).json({status:'failure', message:'No Vacant Room'});
	}  
}	

//Get Available Room
availableRooms = async (req, res, next) => {
	//Get all Rooms..
	let rooms = await meetingModel.getMeetingRoom();
	//Get Booked Rooms
	var bookedRooms = await meetingModel.getBookedRoom(req.body);  

	let room_available = null;
	if(bookedRooms){
		let booked_rooms = await checkRoomAvailabilty(rooms, bookedRooms, req.body); 
		if(booked_rooms && booked_rooms.length>0){ 
			var roomA = rooms.filter(compareRoom(booked_rooms));
			var roomB = booked_rooms.filter(compareRoom(rooms));  
			let result = roomA.concat(roomB); 
			room_available = result;
		} else {
			room_available = rooms;
		}	 
	} else {
		room_available = rooms; 
	} 
	
	if(room_available && room_available.length>0){
		res.status(200).json({status:'success', data:room_available});		
	} else {
		res.status(200).json({status:'failure', message:'No Vacant Room'});
	}  
}

checkRoomAvailabilty = async(rooms, bookedRooms, input) => {
	let room_available = [];
	var inputStartTimeArr = input.booking_start_time.split(":")
    var inputEndTimeArr = input.booking_end_time.split(":")

    bookedRooms.forEach((item) => {
    	var startTimeArr = item.booking_start_time.split(":")
    	var endTimeArr = item.booking_end_time.split(":")
    	if(endTimeArr[0]  < inputStartTimeArr[0]){
	        //console.log("==1=", item.endTime)
	       //console.log("=valid")
	    }  else {
	        room_available.push(item) 
	    }
    });
    return room_available;
}

function compareRoom(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other.meeting_room_uid == current.meeting_room_uid 
    }).length == 0;
  }
}


module.exports = { 
	createMeetingRoom,
	bookMeetingRoom,
	getRoomDetail,
	availableRooms
}