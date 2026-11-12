CREATE TABLE IF NOT EXISTS responses (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
