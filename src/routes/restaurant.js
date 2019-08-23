const router = require('express').Router();
const restCtrl = require('../controllers/restaurant')

/*------------------------Getting methods------------------------*/
//Getting everything from one restaurant (e. f. o. rest)
//You must introduce a restaurant name
//Only restaurantSchema
router.get('/api/rest/eforest/:restaurant_name', restCtrl.getEFORest)

//Getting Each Restaurant
//Only restaurant_name, description, min_amount
//It can be really useful for the client's main page
router.get('/api/rest/allRest', restCtrl.getAllRest)

//Getting one Restaurant
//Only restaurant_name, description, min_amount, rest_phone_number, email, address, number_address
//It can be useful for Restaurant Details
router.get('/api/rest/restInfo/:id_restaurant', restCtrl.getRestInfo)

//Getting userRestaurant
//Only name, last_name, username, admin, and rest_name_working properties
//This view can be useful for both RestUser Admin or normals one
router.get('/api/rest/restUser/:id_username', restCtrl.getRestUser)

//Getting users from certain restaurant
//You need to use the restaurant name
router.get('/api/rest/restUser/getUsers/:rest_name_working', restCtrl.getRestUserByRest)
/*
//Getting No Admin Users from userRestaurant
//Only name, last_name, username, admin, and rest_name_working properties
//This can be useful for Restaurant Admin
router.get('/api/rest/restNoAdminUser/:rest_name_working', restCtrl.getRestNoAdminUsers)

//Getting menu food from one restaurant
router.get('/api/rest/menuFood/:id_restaurant', restCtrl.getRestMenuFood) 

//Getting Schedule from a restaurant
router.get('api/rest/schedule/:id_restaurant', restCtrl.getRestSchedule)
*/
/*------------------------Posting methods------------------------*/

//Posting in restaurantSchema
//This creates a new Restaurant
router.post('/api/rest/newRest', restCtrl.saveNewRest)

//Posting a new Restaurant User
//It requires id_username, id_rest_working, rest_name_working,
//code, username, password, name and last_name
router.post('/api/rest/newRestUser', restCtrl.saveNewRestUser)

/*
//Posting a new Food Menu for a restaurant
router.post('api/rest/newRestMenu', restCtrl.saveNewRestMenu)

//Posting a new ScheduleSchema for a restaurant
router.post('api/rest/newRestSchedule', restCtrl.saveNewRestSchedule)
*/
/*------------------------Updating methods------------------------*/

//Updating a restaurant info
//Only RestaurantSchema
router.put('/api/rest/upRest/:id_restaurant', restCtrl.upRest)

//Updating anything from Restaurant User
//You must introduce your username and password into body, no url
//This method is neither password nor username update 
router.put('/api/rest/upRestUser', restCtrl.upRestUser)
/*
//Making a Restaurant user an admin
//Updating only "admin" field
router.put('/api/rest/upRestUserAdmin/:id_username')

//Updating a Food Menu 
router.put('/api/rest/upRestFoodMenu/:id_menu', restCtrl.upRestFoodMenu)

//Updating Schedule
router.put('/api/rest/upSchedule/:id_schedule', restCtrl.upRestSchedule)
*/
/*------------------------Deleting methods------------------------*/

//It mustn't be here xD
//Deleting a restaurant
router.delete('/api/rest/delRest/:id_restaurant', restCtrl.delRest)
/*
//It musn't be here xD
//Deleting a Restaurant User
router.delete('/api/rest/delRestUser/:id_username', restCtrl.delRestUser)

//It musn't be here xD
//Deleting a Food Menu
router.delete('/api/rest/delRestFoodMenu/:id_menu', restCtrl.delRestFoodMenu)

//It musn't be here xD
//Deleting a Schedule
router.delete('/api/rest/delSchedule/:id_schedule', restCtrl.delSchedule)
*/
/*------------------------Missing methods------------------------*/
//Deleting, Updating, Getting y Posting restFoodSchema from FoodMenuSchema

//Deleting, Updating, Getting y Posting daysAndHoursSchema from ScheduleSchema

//Deleting, Updating, Getting y Posting daysOfWeekSchema from ScheduleSchema

module.exports = router;