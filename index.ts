export interface Sticky {
  id: string
  board_id: string
  text: string
  color: string
  x: number
  y: number
  width: number
  height: number
  z_index: number
  created_at: string
  updated_at: string
}

export interface Board {
  id: string
  host_key: string
  axis_top: string
  axis_bottom: string
  axis_left: string
  axis_right: string
  created_at: string
}

export interface AxisLabels {
  top: string
  bottom: string
  left: string
  right: string
}
