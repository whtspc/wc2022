import {LightningElement, track} from 'lwc';
import WC_QATAR_LOGO from '@salesforce/resourceUrl/wc_qatar_logo_2';
import FlagService from "c/flagService";

export default class WorldCup2022 extends LightningElement {

    @track data = [];
    @track currentMatch;
    nomatchtoday;

    logo = WC_QATAR_LOGO;
    @track flags = {
        home: null,
        away: null
    }
    flagService;

    async connectedCallback() {

        this.flagService = new FlagService();

        this.currentMatch = await this.getCurrent();
        this.data = await this.getToday();


    }

    async getCurrent() {
        const response = await fetch('https://worldcupjson.net/matches/current');
        const currentJSON = await response.json();

        if(currentJSON.length === 0)
            return null;
        const entry = currentJSON[0];
        let match = {};
        const homeCode = this.flagService.getCode(entry.home_team.country);
        const awayCode = this.flagService.getCode(entry.away_team.country);

        if(!homeCode.flag) {
            homeCode.flag = this.flagService.getFlag(homeCode.ISO);
        }
        if(!awayCode.flag) {
            awayCode.flag = this.flagService.getFlag(awayCode.ISO);
        }

        match.venue = entry.venue;
        match.home_team = entry.home_team.country;
        match.home_team_flag = homeCode.flag;
        match.away_team = entry.away_team.country;
        match.away_team_flag = awayCode.flag;
        match.kick_off = entry.datetime;
        match.completed = entry.status === 'completed';
        match.in_progress = entry.status !== 'completed' && entry.status !== 'future_scheduled';
        match.score = `${entry.home_team.goals} - ${entry.away_team.goals}`
        match.time = entry.time;
        return match;
    }

    async getToday() {
        const response = await fetch('https://worldcupjson.net/matches/today');
        const todayJson = await response.json();
        const data = [];
        todayJson.forEach(entry => {
            console.log(entry);

            const homeCode = this.flagService.getCode(entry.home_team.country);
            const awayCode = this.flagService.getCode(entry.away_team.country);

            if(!homeCode.flag) {
               homeCode.flag = this.flagService.getFlag(homeCode.ISO);
               console.log('flag' + homeCode.flag);
            }
            if(!awayCode.flag) {
                awayCode.flag = this.flagService.getFlag(awayCode.ISO);
            }

            let match = {};
            match.venue = entry.venue;
            match.home_team = entry.home_team.name;
            match.home_team_flag = homeCode.flag;
            match.away_team = entry.away_team.name;
            match.away_team_flag = awayCode.flag;
            match.kick_off = entry.datetime;
            match.completed = entry.status === 'completed';
            match.in_progress = entry.status !== 'completed' && entry.status !== 'future_scheduled';
            match.score = `${entry.home_team.goals} - ${entry.away_team.goals}`
            data.push(match);
        });

        if (data.length<1){this.nomatchtoday = true};
        return data;

    }


}
