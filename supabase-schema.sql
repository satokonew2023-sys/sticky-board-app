-- boardsテーブル作成
CREATE TABLE boards (
  id TEXT PRIMARY KEY,
  host_key TEXT NOT NULL,
  axis_top TEXT NOT NULL DEFAULT '重要度 高い',
  axis_bottom TEXT NOT NULL DEFAULT '重要度 低い',
  axis_left TEXT NOT NULL DEFAULT '所要時間 短い',
  axis_right TEXT NOT NULL DEFAULT '所要時間 長い',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- stickiesテーブル作成
CREATE TABLE stickies (
  id TEXT PRIMARY KEY,
  board_id TEXT NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  text TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#FEF08A',
  x NUMERIC NOT NULL DEFAULT 0,
  y NUMERIC NOT NULL DEFAULT 0,
  width NUMERIC NOT NULL DEFAULT 200,
  height NUMERIC NOT NULL DEFAULT 150,
  z_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- インデックス作成
CREATE INDEX idx_stickies_board_id ON stickies(board_id);
CREATE INDEX idx_stickies_z_index ON stickies(z_index);

-- リアルタイム有効化
ALTER PUBLICATION supabase_realtime ADD TABLE boards;
ALTER PUBLICATION supabase_realtime ADD TABLE stickies;
