import { LightningElement } from 'lwc';

const columns = [
    { label: 'Venue', fieldName: 'venue' , type: 'text'},
    { label: 'Home Team', fieldName: 'home_team', type: 'text'},
    { label: 'Away Team', fieldName: 'away_team', type: 'text'},
    { label: 'Kick Off', fieldName: 'kick_off', type: 'text' }
];

export default class WorldCup2022 extends LightningElement {

    data = [];
    columns = columns;


    connectedCallback(){

        this.getToday();

  
    }

    async getToday(){
        const response = await fetch('https://worldcupjson.net/matches/today');
        const todayJson = await response.json();
        for (const entry of todayJson){
            let match = {};
            match.venue = entry.venue;
            match.home_team = entry.home_team.name;
            match.away_team = entry.away_team.name;
            match.kick_off = entry.datetime;
            this.data.push(match);

        }
        
        this.data = [... this.data]

    }
}