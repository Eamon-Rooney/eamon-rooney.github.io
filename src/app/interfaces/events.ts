export type EventList = Event[]

export interface Event {
  id: number
  name: string
  deadline_time: string
  average_entry_score: number
  finished: boolean
  data_checked: boolean
  highest_scoring_entry: number
  deadline_time_epoch: number
  deadline_time_game_offset: number
  highest_score: number
  is_previous: boolean
  is_current: boolean
  is_next: boolean
  cup_leagues_created: boolean
  h2h_ko_matches_created: boolean
  chip_plays: ChipPlay[]
  most_selected: number
  most_transferred_in: number
  top_element: number
  top_element_info: TopElementInfo
  transfers_made: number
  most_captained: number
  most_vice_captained: number
}

export interface ChipPlay {
  chip_name: string
  num_played: number
}

export interface TopElementInfo {
  id: number
  points: number
}
