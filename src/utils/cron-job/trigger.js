const { SportMonks } = require("../sportmonks");
const { liveMatchParser } = require("../sportmonks/parser");

const SportApi = new SportMonks();

const trigger = async () => {
    const { status, data, message } = await SportApi.getLiveScores();
    let liveMatch = await liveMatchParser(data);
    return { liveMatch }
}


module.exports = {
    trigger
}