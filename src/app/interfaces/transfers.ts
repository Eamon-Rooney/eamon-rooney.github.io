export type TransferList = Transfer[]

export interface Transfer {
  element_in: number
  element_in_cost: number
  element_out: number
  element_out_cost: number
  entry: number
  event: number
  time: string
}
