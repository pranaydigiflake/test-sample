const rp = require('request-promise');
const apiKey = 'SR5IBMZ0HF3J1FSF';
const alphaVantageAPI = async (type, symbol) => {
    const url = `https://www.alphavantage.co/query?function=${type}&${symbol}&apikey=${apiKey}`;
    console.log(url)
    try {
        const response = await rp({
            uri: url,
            json: true,
            headers: { 'User-Agent': 'request' }
        });
        // data is successfully parsed as a JSON object
        return response;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

module.exports = {
    alphaVantageAPI
}