# 今回のデプロイエラーへの対応

ログの npx wrangler deploy はWorkers用です。元のPages用構成をWorkersからも利用できるよう、worker.jsとwrangler.jsoncを追加しました。既存のAPIを呼び出すため、質問内容・保存APIの検証は変更しません。

## Workers Builds設定
- ルート：リポジトリのルート
- ビルドコマンド：空欄で可（Wranglerのbuild.commandが静的ファイルを準備します）
- デプロイコマンド：npx wrangler deploy
- Worker名：questionnaire。既存のCloudflareプロジェクト名が異なる場合は、デプロイ前にwrangler.jsoncのnameを実際の名前に一致させてください。

公開される静的ファイルはdist内のindex.html、app.js、survey.jsのみ。Workerは/api/responsesを既存の保存処理に接続し、それ以外はASSETSから配信します。schema.sqlや運用資料を静的配信に含めません。

## 回答受付は別途設定
初回デプロイ後もDB・受付設定がなければ受付停止です。D1にschema.sqlを適用し、WorkerのDBバインディング名をDBに設定してください。既存のDBバインディングがある場合、Wranglerの設定で消えないか確認し、Cloudflareから案内されるd1_databases設定（実際のdatabase_idを含む）をwrangler.jsoncへ反映してから再デプロイしてください。IDはこの修正では仮置きしません。
SURVEY_NOTICEに管理者・連絡先・利用目的・閲覧者・保管期限・廃棄方針を設定し、担当教員の確認・保存テスト後にSURVEY_OPEN=trueを設定してください。これらはWorkerのランタイム設定です。ビルド時の環境変数だけでは受付設定になりません。

public-setup.mdは当初のPages用手順です。Workersで公開する場合のデプロイ部分は本書を優先してください。Pages用functionsディレクトリは互換性のため残します。実環境でのデプロイ成功・D1への保存はこのコミットだけでは確認できません。DNS・カスタムドメイン・DBの作成は変更しません。
