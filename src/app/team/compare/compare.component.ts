import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompareState } from 'app/State/compareReducer';


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
  teamName!: string | null;

  teamID2!: number;
  teamID3!: number;
  teamID4!: number;
  teamID5!: number;

  compareRivals!: any;

  constructor(private store: Store<{ compareState: CompareState }>) {
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
      console.log("this.elements", this.elements);
      console.log("this.league", this.league);
      console.log("this.standings", this.standings);
      console.log("this.store", this.store);

      this.compareRivals = this.league.filter((a: any) => this.teamID in a);
      console.log("COMPARERIVALS1", this.compareRivals);
    });
  }

  getSelectedTeam(rivalsID: number, index: number) {
    this.store.select('compareState').subscribe(compareState => {
      this.elements = compareState.elements;
      this.league = compareState.teams;
      this.standings = compareState.rivals;
      console.log("this.elements", this.elements);
      console.log("this.league", this.league);
      console.log("this.standings", this.standings);
      console.log("this.store", this.store);

      // Take ID from dropdown
      // Lookup if ID exists in state
      if (this.league.filter((a: any) => rivalsID in a)) {
        // If exists add to existing array of leage clone
        console.log("rivalsID", rivalsID);
        console.log("index", index)
        console.log("COMPARERIVALS2", this.compareRivals);
        this.compareRivals[index] = this.league.filter((a: any) => rivalsID in a)
          .reduce((rival: any) => {
            return rival;
        });
        console.log("COMPARERIVALS3", this.compareRivals);
      } else {
        // If not, getCall to get team

        // Add data to state
        // Add to existing array of leage clone
      }
    });
  }

}
