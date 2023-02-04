import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Team } from 'app/interfaces/entry';
import { PicksList } from 'app/interfaces/picks';
import { Result } from 'app/interfaces/standings';
import { addTeamPicks } from 'app/State/compareActions';
import { CompareState } from 'app/State/compareReducer';
import { TeamService } from '../team.service';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {
  elements!: any;
  league!: any;
  standings!: any;

  teamID!: number;
  teamName!: string;
  gameweekID!: number;

  teamID2!: number;
  teamID3!: number;
  teamID4!: number;
  teamID5!: number;

  compareRivals!: any;

  team!: PicksList;

  rival!: Result[];

  constructor(private store: Store<{ compareState: CompareState }>,
    private _teamService: TeamService) {
  }

  ngOnInit() {

    this.getInitialTeam();

  }

  getInitialTeam() {
    // Lookup state based on ID in URL
    const sessionTeamID = sessionStorage.getItem('TeamID');
    this.teamID = sessionTeamID !== null ? JSON.parse(sessionTeamID) : '';
    const sessionTeamName = sessionStorage.getItem('TeamName');
    this.teamName = sessionTeamName !== null ? JSON.parse(sessionTeamName) : '';
    // Added to store once clicked on from FPL Comp
    // Add to new empty array of leage clone
    this.store.select('compareState').subscribe(compareState => {
      this.elements = compareState.elements;
      this.league = compareState.teams;
      this.standings = compareState.rivals;

      this.compareRivals = this.league.filter((a: any) => this.teamID in a);
    });
  }

  getSelectedTeam(rivalsID: number, index: number) {
    this.store.select('compareState').subscribe(async compareState => {
      this.elements = compareState.elements;
      this.league = compareState.teams;
      this.standings = compareState.rivals;

      // Take ID from dropdown
      // Lookup if ID exists in state
      if (this.league.filter((a: any) => rivalsID in a).length = 0) {
        // If exists add to existing array of leage clone
        this.compareRivals[index] = this.league.filter((a: any) => rivalsID in a)
          .reduce((rival: any) => {
            return rival;
        });
      } else {
        // If not, getCall to get team
        const sessionGameWeekID = sessionStorage.getItem('GameWeekID');
        this.gameweekID = sessionGameWeekID !== null ? JSON.parse(sessionGameWeekID) : '';

        (await this._teamService.getTeamPicks(rivalsID, this.gameweekID))
        .subscribe(response => {
          this.team = response,
          // Add data to state
          this.rival = this.standings.filter((a: any) => a.entry == rivalsID);
          this.store.dispatch(addTeamPicks(this.team, rivalsID, this.rival[0].entry_name));
          this.league = compareState.teams;
          // Add to existing array of leage clone
          this.compareRivals[index] = this.league.filter((a: any) => rivalsID in a)
            .reduce((rival: any) => {
              return rival;
          });
        });
      }
    });
  }

}
