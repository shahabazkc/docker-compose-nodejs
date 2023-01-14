const { Leagues } = require("../../models/leagues");
const { Players } = require("../../models/players");
const { Teams } = require("../../models/teams");


const liveMatchParser = async (payload) => {

    return new Promise(async (resolve, reject) => {
        let arr = [];
        for await (const data of payload) {
            const league = await Leagues.findOne({ id: data.league_id }).exec();
            const homeTeam = await Teams.findOne({ id: data.localteam_id }).exec();
            const awayTeam = await Teams.findOne({ id: data.visitorteam_id }).exec();
            const tossWonBy = data.toss_won_team_id == homeTeam.id ? homeTeam.name : awayTeam.name;

            arr.push({
                match_id: data.id,
                league: league?.name,
                homeTeam: homeTeam?.name,
                awayTeam: awayTeam?.name,
                homeTeamLogo: homeTeam?.image_path,
                awayTeamLogo: awayTeam.image_path,
                round: data.round,
                matchType:data.type,
                tossWonBy,
                elected: data.elected,
                homeTeamScore: {
                    score: data.localteam_dl_data.score,
                    overs: data.localteam_dl_data.overs,
                    wickets_out: data.localteam_dl_data.wickets_out
                },
                awayTeamScore: {
                    score: data.visitorteam_dl_data.score,
                    overs: data.visitorteam_dl_data.overs,
                    wickets_out: data.visitorteam_dl_data.wickets_out
                },
                superOver: data.super_over,
                total_overs_played: data.total_overs_played,
                status: data.status,
                live: data.live
            });
        }
        resolve(arr);
    })
};

const matchDetailParser = async (payload) => {

    let battingBy = payload.batting.find((elem) => elem.active === true);
    battingBy = await Players.findOne({ id: battingBy.id });
    let bowlingBy = payload.bowling.find((elem) => elem.active === true);
    bowlingBy = await Players.findOne({ id: bowlingBy.id });
    const league = await Leagues.findOne({ id: payload.league_id }).exec();
    const homeTeam = await Teams.findOne({ id: payload.localteam_id }).exec();
    const awayTeam = await Teams.findOne({ id: payload.visitorteam_id }).exec();
    const tossWonBy = payload.toss_won_team_id == homeTeam.id ? homeTeam.name : awayTeam.name;
    return {
        homeTeamName: homeTeam.name,
        awayTeamName: awayTeam.name,
        tossWonBy,
        elected: payload.elected,
        note: payload.note,
        super_over: payload.super_over,
        status: payload.status,
        live:payload.live,
        round: payload.round,
        league_data: league,
        homeTeamScore: {
            score: payload.localteam_dl_data.score,
            overs: payload.localteam_dl_data.overs,
            wickets_out: payload.localteam_dl_data.wickets_out
        },
        awayTeamScore: {
            score: payload.visitorteam_dl_data.score,
            overs: payload.visitorteam_dl_data.overs,
            wickets_out: payload.visitorteam_dl_data.wickets_out
        },
        battingBy,
        bowlingBy,
        battings: payload.batting,
        bowlings: payload.bowling
    }
}

const fixtureMatchesParser = async (payload)=>{
    return new Promise(async (resolve, reject) => {
        let arr = [];
        for await (const data of payload) {
            const league = await Leagues.findOne({ id: data.league_id }).exec();
            const homeTeam = await Teams.findOne({ id: data.localteam_id }).exec();
            const awayTeam = await Teams.findOne({ id: data.visitorteam_id }).exec();
            
            arr.push({
                match_id: data.id,
                league: league?.name,
                homeTeam: homeTeam?.name,
                awayTeam: awayTeam?.name,
                homeTeamLogo: homeTeam?.image_path,
                awayTeamLogo: awayTeam.image_path,
                dateOfMatch : new Date(data.starting_at),
                matchType : data.type
            });
        }
        resolve(arr);
    })
}

const finishedMatchesParser = async (payload) =>{
    return new Promise(async (resolve, reject) => {
        let arr = [];
        for await (const data of payload) {

            const league = await Leagues.findOne({ id: data.league_id }).exec();
            const homeTeam = await Teams.findOne({ id: data.localteam_id }).exec();
            const awayTeam = await Teams.findOne({ id: data.visitorteam_id }).exec();
            const tossWonBy = payload.toss_won_team_id == homeTeam.id ? homeTeam.name : awayTeam.name;
            const winnerTeam = await Teams.findOne({id: data.winner_team_id}).exec();
            const manOfTheMatch = await Players.findOne({id: data.man_of_match_id}).exec();

            
            
            arr.push({
                homeTeamName: homeTeam.name,
                awayTeamName: awayTeam.name,
                tossWonBy,
                elected: data.elected,
                note: data.note,
                super_over: data.super_over,
                note: data.note,
                status: data.status,
                live:data.live,
                totalOversPlayed: data.total_overs_played,
                round: data.round,
                league_data: league,
                homeTeamScore: {
                    score: data.localteam_dl_data.score,
                    overs: data.localteam_dl_data.overs,
                    wickets_out: data.localteam_dl_data.wickets_out
                },
                awayTeamScore: {
                    score: data.visitorteam_dl_data.score,
                    overs: data.visitorteam_dl_data.overs,
                    wickets_out: data.visitorteam_dl_data.wickets_out
                },
                battings: data.batting,
                bowlings: data.bowling
            });
        }
        resolve(arr);
    })
}

module.exports = {
    liveMatchParser,
    matchDetailParser,
    fixtureMatchesParser,
    finishedMatchesParser
}