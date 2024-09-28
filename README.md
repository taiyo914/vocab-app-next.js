# 英単語帳アプリ VacabApp

## 概要
VocabAppは、英単語を登録・管理・復習できるシンプルかつ高機能な英単語帳アプリです。キャッチコピーは「しっかり整理、サクッと復習」。データベースのような管理のしやすさと、ワンタップで簡単に例文やメモまで復習できる手軽さを両立させました。

## 従来のアプリの問題点
私はこれまで英単語を勉強・管理するために、多くのアプリやツールを使ってきましたが、それらには次のような不満点がありました。
  単語帳アプリ
  - カードのようなUIを採用しているものが多く、情報の一覧性・管理性が低い
  - カードに表と裏しかなく、例文やメモなどの情報を確認しづらい
    - 確認するには追加で別のボタンを押す必要があるなど、UI・UXが悪い
    - 裏面にそれらの情報を書くと、表示の順番を入れ替えて「日本語→英語」の学習ができなくなる
  - 単語の評価基準が「覚えた」or「覚えてない」など、だいぶざっくりしている
  - スマホ用に作られており、デスクトップに対応していない or 使いづらい
  - そもそも英語に特化しているものが実は少ない
  表・ノートアプリ（Exel, Notionなど）
  - 単語帳のような手軽さがなく、復習がしづらい
  - 単語帳としては必要以上に機能があり操作が複雑
  - デスクトップ用に作られており、文字が小さく、編集もしづらい

そこで、これらの単語帳のような手軽さ・復習のしやすさと表・ノートアプリのような管理・編集のしやすさを両立し、自分が本当に心から使いたいと思う英単語帳アプリを作ろうと思いました。

## 実装した機能
**アプリ全体**
- ログイン・ログアウト機能
- ローディング中のアニメーション（スピナー、ドット）
- 右上にメッセージがアニメーションで表示される通知機能
- アニメーションでモーダルが表示される
- 値によって色がかわる自作スライダー（rangeタイプのinput要素）
- スマホとデスクトップで異なるスタイル、レスポンシブ対応

**ホーム画面**
- 「カードビュー」と「テーブルビュー」の2つの表示方法を実装
  - ビューの設定はローカルストレージに保存されます
- カードビューでのフリップアニメーション
- 優先度によってカード裏面の色が変わる
- 単語編集機能
  - 音声読み上げ機能（アメリカ、イギリス、オーストラリア）
- 単語削除機能
- 単語検索機能（順序を保った部分一致）
  - 検索バー出現のアニメーション
  - スタイルが崩れないように、PCとスマホで異なる出現の仕方にしました
- 表示設定機能
  - 以下の項目が設定でき、データベースに保存されます
    - 表示件数
    - 並び替え（作成日、優先度、アルファベット順、復習回数、復習日、更新日）
    - 優先度範囲フィルター
    - 復習回数フィルター
    - 日付範囲フィルター（作成日、復習日、更新日）
- ページネーション機能
  - 表示されるページ番号はデータベースに保存されます
- 単語を表示させるときのアニメーション
- メニューの出現アニメーション
- 画面トップに戻るボタン

**単語作成画面**
- 単語作成機能
- 「連続で作成する」機能
- csv, tsvのテキストから一気に単語を登録できる
  - 上から登録するか、下から登録するか選べます

**復習画面**

単語に登録されている「単語」「意味」「例文」「例文訳」「メモ」のそれぞれがカードになって次々と表示されます
- スライドアニメーション
  - タップ、キーボード、スワイプでの操作が可能
  - スマホの縦画面ではナビゲーションアイコンをなくし、そのかわりタップが反応する領域を画面の高さいっぱいに広げました
  - 最初に戻るボタン
- 音声読み上げ機能
  - 日本語、アメリカ英語、イギリス英語、オーストラリア英語
- 各カードに優先度を変える自作スライダーと編集ボタンを配置
  - 同じ単語のカードには変更が即座に反映されます
- 復習設定機能
  - 表示させる項目と順番の指定
    - どの項目のカードを表示させるか指定できます
    - 例）「単語」「意味」「例文」のみ表示など
    - ドラッグアンドドロップで表示する項目の順番を変えられます
    - 例）「意味」→「単語」→「例文」など
  - 未入力のカードの表示/非表示設定
  - 読み上げ音声のアクセント設定
    - アメリカ、イギリス、オーストラリア
- 復習を記録する機能
  - 復習した単語の「復習回数」が +1 され、「復習日」が更新されます

### これから追加したい機能
- ユーザー情報の編集機能
- ユーザーアイコンの設定
- メール認証とセキュリティの強化
- 外部サービスによる認証（Oauth）
- RLSの実装
- ユーザ情報編集画面
- 進捗管理/進捗の表示
- フォルダ機能
- csv, tsvファイルを読み込んで単語カードを作る
- 復習画面での自動めくり&読み上げ機能をつける
- 画像を保存/表示できるようにする
- YouGlishや辞書アプリなど外部サイトに繋げられる
- メール通知機能
- SRS(Spaced Repetition System: 間隔反復システム)の実装
- きれいなレイアウトによるA4プリント機能
- 英語対応（i18n）

## 技術スタック
**言語・フレームワーク**
  - Next.js14 (App Router)
  - TypeScript

**データベース・認証**
  - Supabase

**スタイリング**
  - TailwindCSS
  - Heroicons
  - React Icons

**状態管理**
  - Zustand

**アニメーション**
  - Framer Motion
  - Swiper
  - react-card-flip

**ユーティリティ**
  - lodash （ユーティリティ）
  - d3-dsv （CSV,TSV解析）
  - react-device-detect（デバイス検出）


