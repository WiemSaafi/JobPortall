const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory, singleUserByName, singleUserByEmpreintId } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//user routes

// /api/allusers
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get('/user/:id', singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
// /api/user/jobhistory
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

router.get('/user/CIN/:CIN', singleUserByEmpreintId);

//router.get('/user/name/:name', singleUserByName);

module.exports = router;