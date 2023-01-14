const axios = require('axios');
const { liveScoreData } = require('./sampleData.json');


class SportMonks {
    axiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.SPORTMONK_API
        });
        this.axiosInstance.interceptors.request.use((config) => {
            config.params = config.params || {};
            config.params['api_token'] = process.env.SPORTMONK_API_TOKEN;
            return config;
        });
    };

    async getLiveScores() {
        return new Promise(async (resolve, reject) => {
            try {
                //  let { data } = await this.axiosInstance.get(`/livescores`);
                resolve({ status: true, data: liveScoreData, message: "Processed Succesfully" });
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    };

    async getFixtureMatches() {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/fixtures`);
                resolve({ status: true, data, message: "Processed Succesfully" })
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }

    async getFinishedMatches() {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/fixtures`);
                resolve({ status: true, data, message: "Processed Succesfully" });
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }

    async getContinents() {
        return await this.axiosInstance.get('/continents');
    }

    async getCountries() {
        return await this.axiosInstance.get('/countries');
    };

    async getLeagues() {
        return await this.axiosInstance.get('/leagues');
    }

    async getTeams() {
        return await this.axiosInstance.get('/teams');
    };

    async getPlayers() {
        return await this.axiosInstance.get('/players');
    }

    async matchDetails(matchId) {
        return await this.axiosInstance.get(`/fixtures/${matchId}?include=bowling,batting`);
    }

};


module.exports = {
    SportMonks
}