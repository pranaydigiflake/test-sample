const express = require('express');
const router = express.Router();
const controller = require('../controller/share_controller');

router.get('/weekly',controller.getWeeklyController);
router.get('/search',controller.searchSymbol);
router.get('/daily',controller.dailyChart);

module.exports = router;