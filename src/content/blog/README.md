# ブログ記事の書き方

## ディレクトリ構成

```
content/blog/
  YYYY-MM-DD_slug名/
    index.mdx       ← 記事本文（必須）
    cover.svg       ← サムネイル（任意。なくてもいい）
    image.png       ← 記事内で使う画像（任意）
```

## 記事を追加する手順

1. `YYYY-MM-DD_slug名/` のディレクトリを作る
2. `index.mdx` を作る
3. 必要なら画像ファイルを同じディレクトリに置く

コードやページの変更は不要。ディレクトリを置くだけで自動的に一覧に表示される。

## index.mdx のフォーマット

```mdx
---
title: 記事タイトル
date: 2026-07-07
excerpt: 一覧ページに表示される説明文（任意）
---

本文をここに書く。**Markdown** が使える。

## 見出し

- リスト
- リスト

`インラインコード` や > 引用なども使える。
```

## 画像の使い方

サムネイル（カード一覧に表示）は `cover.*` という名前で置くだけで自動適用される。

記事内の画像は import して使う：

```mdx
import myImage from './image.png'

<img src={myImage} alt="説明" />
```

## ソート順

`date:` フィールドの降順（新しい順）で並ぶ。
ディレクトリ名の `YYYY-MM-DD` プレフィックスと合わせておくこと。

## React コンポーネントを使う場合

MDX なので JSX が書ける。記事内でインタラクティブなデモを動かしたいときなどに使う。

```mdx
import MyChart from '../../components/MyChart.jsx'

<MyChart data={[1, 2, 3]} />
```
