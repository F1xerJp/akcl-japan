# AKCL JAPAN — 公開・編集ガイド

HTML / CSS / JavaScriptだけで動く、スマホ対応の公式サイト初版です。ビルド、有料サービス、APIキーは不要です。

## 内容

- ゲームコミュニティ団体としての紹介 / eスポーツ大会・FiveMサーバーの活動紹介
- 公式YouTubeの大会アーカイブ（2024年6月・7月のピックアップ）
- ご提供の情報に基づく2023年から2026年までのAKCLの歴史
- 公式Xの最新投稿を表示する公式タイムライン（表示できない場合は公式Xへ案内）
- Horizon RolePlay JapanのDiscord招待リンク
- akcljapan.com向けのCNAMEファイル

## ローカルで確認

index.htmlをブラウザーで開くとデザインを確認できます。動画再生はHTTPでのプレビューまたは公開サイトで確認してください（ローカルファイルではYouTube側が再生を制限する場合があります）。

Pythonがある場合は、このフォルダーで次のコマンドを実行すると http://localhost:8000/ で確認できます。

    python -m http.server 8000

## GitHub Pagesで公開

1. ZIPを解凍します。
2. GitHubで新しいPublic（公開）リポジトリを作成します。名前は例として `akcl-japan` で構いません。
3. 解凍したフォルダーの「中身」をリポジトリの直下へアップロードします。index.html・styles.css・app.js・content.js・CNAME・assetsがリポジトリの一番上に並ぶ状態にしてください。
4. Settings → Pages → Build and deploymentで「Deploy from a branch」を選択します。
5. Branchは `main`、フォルダーは `/(root)` を選択し、Saveを押します。
6. 公開完了後、Pages画面に表示されるURLを確認します。

ZIP自体をGitHubにアップロードするだけではサイトになりません。

## akcljapan.comを接続

CNAMEには `akcljapan.com` を設定済みです。これはドメインの接続を準備するファイルで、DNS設定の代わりにはなりません。

1. 可能であれば、GitHubのアカウント設定のPagesでドメイン所有権を確認します（GitHubが表示するTXTレコードをDNSへ追加）。
2. リポジトリのSettings → Pages → Custom domainに `akcljapan.com` を入力してSaveを押します。
3. ドメインのDNS管理画面で、ルートドメインに以下のAレコードを登録します。

| 種類 | ホスト名 | 値 |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

管理会社によって「@」の代わりに空欄またはakcljapan.comを指定します。

4. www版も使う場合は、`www` のCNAMEレコードを `あなたのGitHubユーザー名.github.io` に向けます。リポジトリ名やhttps://は含めません。
5. DNSチェックが通り、証明書が発行されたら、GitHub側のEnforce HTTPSを有効にします。

DNSの反映やHTTPSの準備には最大24時間ほどかかる場合があります。
既存のメール用MX・TXTレコードは維持してください。すでにWebサイトへ向けたA・AAAA・CNAMEがある場合は、同じホスト名の競合を確認して必要なWeb用レコードだけ変更します。

GitHubの公式手順（設定値を2026年10月7日に確認）:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 無料公開の範囲

GitHub Freeの公開リポジトリを使う場合、Pagesのホスティング費用は無料です。ドメイン更新料は別途必要です。

GitHub Pagesには、オンラインビジネス運営、商取引を主目的とするサイト、商用SaaS等の利用制限があります。会社の利用目的がこれに該当する場合は、公開先を変更してください。このコードは他の静的サイトホスティングにも移せます。
https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## 編集する場所

- 文章・活動履歴・各SNSリンク: index.html
- 色・レイアウト・スマホ表示: styles.css
- ピックアップ動画・Discord参加リンク: content.js
- メニュー、動画、フィードの動作: app.js
- 接続する独自ドメイン: CNAME

動画追加時は `content.js` の `videos` を編集し、対応するサムネイルをassetsへ追加してください。YouTube動画IDはURLの `v=` の後の11文字です。

## フィードの仕様・確認状況

YouTube欄は、2026年10月7日に公式チャンネルで確認した動画を選んで掲載しています。自動更新ではありません。
X欄は公式の埋め込み機能を使い、SNSセクションに近づいたときに自動で読み込みます。X側の仕様・ログイン状態・閲覧環境で表示できない場合があるため、常に公式プロフィールへのリンクを表示します。

PC（1440px）・スマホ（390px）・小型スマホ（320px）で横にはみ出さないことを確認しています。画像、内部リンク、メニュー、動画ダイアログの開閉、外部コンテンツ説明、X読込失敗時の代替リンク、Discordリンクを確認済みです。
実際のYouTube動画再生とXのフィード表示は、公開後のHTTPS環境で最終確認が必要です。

GitHubへのアップロード、Pagesの公開設定、DNS変更はまだ実施していません。

## ブランド・画像

サイトのAKCLロゴは、ユーザーが選択した星とAを組み合わせたシンボルです。採用画像から輪郭を再構成したSVG版と、そのSVGから書き出したPNG版を同梱しています。ヘッダー・フッター・SNS欄・ファビコンに反映しています。
hero-championship.webpはVCTのシャープな造形を参考にした独自のトロフィー、esports-arena.webpはeスポーツの大会会場を表現した生成画像です。実在の大会会場を示す写真ではありません。サムネイルはAKCL公式YouTubeの動画から取得しています。

活動履歴はユーザーが提供した内容を掲載しています。法人の正式名称、住所、メールなど、提供されていない連絡先は掲載していません。
