const router = require('express').Router();
const restCtrl = require('../controllers/restaurant')

/*------------------------Getting methods------------------------*/
//Getting everything from one restaurant (e. f. o. rest)
//router.get('/api/rest/eforest/:id_restaurant', restCtrl.getEFORest)

//Getting Each Restaurant
//Only RestaurantSchema
router.get('/api/rest/allRest', restCtrl.getAllRest)
/*
//Getting one Restaurant
//Only RestaurantSchema
router.get('/api/rest/restInfo/:id_restaurant', restCtrl.getRestInfo)

//Getting userRestaurant
router.get('/api/rest/restUser/:id_username', restCtrl.getRestUser)

//Getting menu food from one restaurant
router.get('/api/rest/menuFood/:id_restaurant', restCtrl.getRestMenuFood) 

//Getting Schedule from a restaurant
router.get('api/rest/schedule/:id_restaurant', restCtrl.getRestSchedule)
*/
/*------------------------Posting methods------------------------*/
/*
//Posting in restaurantSchema
//This creates a new Restaurant
router.post('/api/rest/newRest', restCtrl.saveNewRest)

//Posting a new Restaurant User
router.post('/api/rest/newRestUser', restCtrl.saveNewRestUser)

//Posting a new Food Menu for a restaurant
router.post('api/rest/newRestMenu', restCtrl.saveNewRestMenu)

//Posting a new ScheduleSchema for a restaurant
router.post('api/rest/newRestSchedule', restCtrl.saveNewRestSchedule)
*/
/*------------------------Updating methods------------------------*/
/*
//Updating a restaurant info
//Only RestaurantSchema
router.put('/api/rest/upRest/:Id_restaurant', restCtrl.upRest)

//You mustn't update a Restaurant User
//Updating Restaurant User
router.put('/api/rest/upRestUser/:Id_username', restCtrl.upRestUser)

//Updating a Food Menu 
router.put('/api/rest/upRestFoodMenu/:Id_menu', restCtrl.upRestFoodMenu)

//Updating Schedule
router.put('/api/rest/upSchedule/:Id_schedule', restCtrl.upRestSchedule)
*/
/*------------------------Deleting methods------------------------*/
/*
//It mustn't be here xD
//Deleting a restaurant
router.delete('/api/rest/delRest/:Id_rest', restCtrl.delRest)

//It musn't be here xD
//Deleting a Restaurant User
router.delete('/api/rest/delRestUser/:Id_username', restCtrl.delRestUser)

//It musn't be here xD
//Deleting a Food Menu
router.delete('/api/rest/delRestFoodMenu/:Id_menu', restCtrl.delRestFoodMenu)

//It musn't be here xD
//Deleting a Schedule
router.delete('/api/rest/delSchedule/:Id_schedule', restCtrl.delSchedule)
*/
/*------------------------Missing methods------------------------*/
//Deleting, Updating, Getting y Posting restFoodSchema from FoodMenuSchema

//Deleting, Updating, Getting y Posting daysAndHoursSchema from ScheduleSchema

//Deleting, Updating, Getting y Posting daysOfWeekSchema from ScheduleSchema

module.exports = router;