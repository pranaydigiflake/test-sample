const commonService = require('../common/api_alpha');

const getWeeklyData = async (symbol) => {
    const result = await commonService.alphaVantageAPI('TIME_SERIES_WEEKLY', 'symbol='+symbol);
    const refinedResult = {};
    refinedResult['meta'] = result['Meta Data'];
    let key = Object.keys(result['Weekly Time Series'])[0];
    refinedResult['weeklyResult'] = result['Weekly Time Series'][key];
    refinedResult['weeklyResult']['6. average'] = ((parseFloat(refinedResult['weeklyResult']['2. high']) + parseFloat(refinedResult['weeklyResult']['3. low'])) / 2).toString()
    return refinedResult;
};

const searchSymbol = async (keywords) => {
    const result = await commonService.alphaVantageAPI('SYMBOL_SEARCH', 'keywords='+keywords);
    const filteredSymbols = (result['bestMatches']).filter(a=>a['3. type'] =='Equity')
    return filteredSymbols;
};

const dailyChart = async (symbol) => {
    const result = await commonService.alphaVantageAPI('TIME_SERIES_DAILY', 'symbol='+symbol+'&outputsize=full'); 
    return result;
};

module.exports = {
    getWeeklyData,
    searchSymbol,
    dailyChart
}