# MeiriSTG Forms

東方明理杯用のリーダブルなフォーム。
現状は東方明理杯・参に設定されている。

フロントエンドフレームワークにはNext.jsを利用している。
なんたら.jsとか、なんたら.tsxとかごちゃごちゃしているのはそのため。

バックエンド(データベース)にはFirebaseを利用している。
APIを叩かれないために、ミドルエンドにCloudflare Workersを利用している。
Cloudflare Workersの実行内容や環境変数が割れるなら、APIを叩かれてしまう。
