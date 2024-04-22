const commonService = require('../common/api_alpha');

const getWeeklyData = async (symbol) => {
    const result = await commonService.alphaVantageAPI('TIME_SERIES_WEEKLY', 'symbol='+symbol);
    const refinedResult = {};
    refinedResult['meta'] = result['Meta Data'];
    let key = Object.keys(result['Weekly Time Series'])[0];
    refinedResult['weeklyResult'] = result['Weekly Time Series'][key];
    refinedResult['weeklyResult']['6. average'] = ((parseFloat(refinedResult['weeklyResult']['2. high']) + parseFloat(refinedResult['weeklyResult']['3. low'])) / 2).toString()
    
    // Second iteration
    // const refinedResult2 = {};
    let key2 = Object.keys(result['Weekly Time Series'])[1];
    console.log("key",key2,"result",result['Weekly Time Series'][key2])

    refinedResult['weeklyResult2'] = result['Weekly Time Series'][key2];
    refinedResult['weeklyResult2']['6. average'] = ((parseFloat(refinedResult['weeklyResult2']['2. high']) + parseFloat(refinedResult['weeklyResult2']['3. low'])) / 2).toString()
    console.log("refinedResult",refinedResult)
    
    // Calculate Close amount between refinedResult2 and refinedResult1 for loss or gain and percentage loss
    let oldValue = parseFloat(refinedResult['weeklyResult2']['4. close']);
    let newValue = parseFloat(refinedResult['weeklyResult']['4. close']);
    
    let percentageDifference = ((newValue - oldValue) / oldValue) * 100;
    console.log("refinedResult['weeklyResult2']['6. average']",parseFloat(refinedResult['weeklyResult']['4. close'])-parseFloat(refinedResult['weeklyResult2']['4. close']),percentageDifference)
    refinedResult['percentageDifference']=percentageDifference

    return refinedResult;
};

const searchSymbol = async (keywords) => {
    const result = await commonService.alphaVantageAPI('SYMBOL_SEARCH', 'keywords='+keywords);
    const filteredSymbols = (result['bestMatches']).filter(a=>a['3. type'] =='Equity')
    return filteredSymbols;
};

const dailyChart = async (symbol) => {
    const result = await commonService.alphaVantageAPI('TIME_SERIES_WEEKLY', 'symbol='+symbol+'&outputsize=full'); 
    return result;
};

module.exports = {
    getWeeklyData,
    searchSymbol,
    dailyChart
}