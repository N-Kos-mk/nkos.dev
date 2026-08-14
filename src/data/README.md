# トップページの中身

トップページに載せる内容はここにまとめてある。表示の組み立て（`src/App.jsx`）や
スタイル（`src/App.css`）を触らずに、この 4 ファイルだけで差し替えられる。

| ファイル | 何を書くか | どこに出るか |
|---|---|---|
| `profile.js` | 所在地・所属などの注記 | Identity モジュール下端の注記帯 |
| `photos.js` | 写真とその場所 | Gallery モジュール |
| `featured.js` | トップに出す制作物の選抜 | Works モジュールの送り |
| `stack.js` | 技術スタック | Stack モジュール（と About ページ） |

記事と制作物そのものは `src/content/blog/` と `src/content/works/` にある。
Log モジュールは記事を新しい順に自動で拾うため、ここに設定はない。

## アイコンについて

`profile.js` と `stack.js` はアイコンを直接持つ。

- 線のアイコン: [lucide](https://lucide.dev/icons/) から `Icon:` に渡す
- ブランドのアイコン: `simple-icons` から `icon:` に渡す

絵文字は使わない。
