import { Component, OnInit } from '@angular/core';
import { FplService } from './fpl.service';
import { standingsResults } from 'app/interfaces/standings-results';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventList } from 'app/interfaces/events';

@Component({
  selector: 'app-fpl',
  templateUrl: './fpl.component.html',
  styleUrls: ['./fpl.component.scss']
})
export class FplComponent implements OnInit {

  leagueForm!: FormGroup;
  standingsErrors: any;
  corsAnywhereURL: string = "https://cors-anywhere.herokuapp.com";
  league: any;
  standings: standingsResults[] | any;
  p: number = 1;

  bootstrap: any;
  events: any;
  gameweek!: EventList;
  gameweekID!: number;

  constructor(private _fplService: FplService,
    formBuilder: FormBuilder) {
      this.leagueForm = formBuilder.group({
        'league?.league.id': [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      });
  }



  async ngOnInit() {

    (await this._fplService.getFplLeague())
    .subscribe(response => {
      this.league = response;
      console.log("LEAGUE", this.league);
      this.standings = this.league.standings.results;
      console.log("STANDINGS", this.standings);
    }, error => {
      this.standingsErrors = error;
      console.log("STANDINGSERROR", this.standingsErrors);
    },);


    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      console.log("BOOTSTRAP", response);
      this.events = this.bootstrap.events;
      console.log("EVENTS", this.events);

      this.gameweek = this.events.filter((a: { [x: string]: boolean; }) => a['is_current'] === true);
      console.log("CURRENTGAMEWEEK", this.gameweek);
      this.gameweekID = this.gameweek[0].id;
      console.log("CURRENTGAMEWEEKID", this.gameweekID);
      sessionStorage.setItem('GameWeekID', JSON.stringify(this.gameweekID));
    });

  }

  async updateLeague() {

    (await this._fplService.updateFplLeague(this.league.league.id))
    .subscribe(response => {
      this.league = response;
      console.log("UPDATELEAGUE", this.league);
      this.standings = this.league.standings.results;
      console.log("UPDATESTANDINGS", this.standings);
    });

  }
}

