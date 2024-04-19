const service = require('../service/share_service');

const getWeeklyController = async (req, res) => {
    try {
        const symbol = req.query.symbol;
        const result = await service.getWeeklyData(symbol);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message });
    }
}

const searchSymbol = async (req, res) => {
    try {
        const name = req.query.name;
        const result = await service.searchSymbol(name);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message });
    }
}

const dailyChart = async (req, res) => {
    try {
        const name = req.query.symbol;
        const result = await service.dailyChart(name);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message });
    }
}

module.exports = {
    getWeeklyController,
    searchSymbol,
    dailyChart
}

