//const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const CandidateModel = require('../models/candidateModel');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader.replace('Bearer ', '');
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user_in_db = await CandidateModel.findOne({ _id: decoded.user.id, token: token });
    if (!user_in_db) {
      return res.status(401).json({ message: 'Unauthorized.'});
    }
    
    res.locals.user = user_in_db;
    res.locals.token = token;
    
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized..', error: error.message });
  }
};