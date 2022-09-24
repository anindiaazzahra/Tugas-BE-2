const express = require('express');
const AuthenticationToken = require('../../middleware/AuthenticationToken');
const { 
    handlerGetAllUser, 
    handlerGetUserById, 
    handlerPostUser, 
    handlerPutUserById, 
    handlerDeleteUserById, 
    handlerGetUserByName,
    handlerLoginUser, 
} = require('./handler');
const router = express.Router();

// 1. Get all users
// GET/user
router.get('/user', handlerGetAllUser);

// 2. Get user by id
// GET/user/:id
router.get('/user/:id', AuthenticationToken, handlerGetUserById);

// 3. Create user
// POST/user
router.post('/user', handlerPostUser);

// 4. Update user
// PUT/user/:id
router.put('/user/:id', AuthenticationToken, handlerPutUserById);

// 5. Delete user
// DELETE/user/:id
router.delete('/user/:id', AuthenticationToken, handlerDeleteUserById);

// 6. Get user filter name
// GET/user/search?name={name}
router.get('/user/search', AuthenticationToken, handlerGetUserByName);

// 7. Login User
// Login user yang sudah terdaftar
// POST/auth/login
router.post('/auth/login', handlerLoginUser);

// 8. Register user
// POST/auth/register
router.post('/auth/register', AuthenticationToken, handlerPostUser);


module.exports = router;