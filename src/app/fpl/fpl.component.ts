import { Component, OnInit } from '@angular/core';
import { FplService } from './fpl.service';
import { LeagueStandings, Result } from 'app/interfaces/standings';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bootstrap, Event, EventList } from 'app/interfaces/bootstrap';

@Component({
  selector: 'app-fpl',
  templateUrl: './fpl.component.html',
  styleUrls: ['./fpl.component.scss']
})
export class FplComponent implements OnInit {

  leagueForm!: FormGroup;
  standingsErrors: any;
  corsAnywhereURL: string = "https://cors-anywhere.herokuapp.com";
  league!: LeagueStandings | any;
  standings: Result[] | any;
  p: number = 1;

  bootstrap!: Bootstrap | any;
  events!: Event | any;
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
      this.standings = this.league.standings.results;
    }, error => {
      this.standingsErrors = error;
    },);


    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      this.events = this.bootstrap.events;

      this.gameweek = this.events.filter((a: { [x: string]: boolean; }) => a['is_current'] === true);
      this.gameweekID = this.gameweek[0].id;
      sessionStorage.setItem('GameWeekID', JSON.stringify(this.gameweekID));
    });

  }

  async updateLeague() {

    (await this._fplService.updateFplLeague(this.league.league.id))
    .subscribe(response => {
      this.league = response;
      this.standings = this.league?.standings?.results;
    });

  }
}

