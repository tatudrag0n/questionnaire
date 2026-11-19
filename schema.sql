CREATE TABLE IF NOT EXISTS responses (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- 閲覧・開始・送信の回数を日別（JST）に記録する合計カウンタ。
-- 個人を特定する情報は保存しません。
CREATE TABLE IF NOT EXISTS stats (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, event)
);
