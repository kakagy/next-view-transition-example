# Digimon 図鑑 (Digimon Encyclopedia)

デジモン API を活用したインタラクティブなデジモン図鑑アプリケーションです。React 19 の ViewTransition 機能と GSAP を使用した、滑らかなアニメーションとドラッグ可能なグリッドレイアウトを特徴としています。

## ✨ 主な機能

### 📱 インタラクティブ UI

- **ドラッグ可能なグリッド**: GSAP Draggable を使用した自由なグリッド操作
- **ホイールスクロール対応**: マウスホイールでのスムーズなナビゲーション
- **レスポンシブデザイン**: あらゆるデバイスサイズに対応

### 🎨 アニメーション

- **ViewTransition**: React 19 の実験的機能を使用したページ遷移
- **スクランブルテキスト**: GSAP の ScrambleTextPlugin によるテキストアニメーション
- **IntersectionObserver**: ビューポート内の要素の視認性に基づいた動的アニメーション

### 📊 デジモンデータ

- **1400 件以上のデジモン**: Digi-API (https://digi-api.com/) からのデータ
- **詳細情報**: レベル、タイプ、属性、フィールド、スキル、進化情報
- **多言語対応**: 日本語・英語の説明文

## 🚀 Getting Started

### 前提条件

- Node.js 18 以降
- pnpm 9.15.4 以降

### インストールと起動

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 📁 プロジェクト構造

```
next-view-transition-example/
├── app/
│   ├── page.tsx                    # メインページ (デジモンリスト)
│   ├── digimon-list.tsx           # グリッドレイアウトのメインコンポーネント
│   ├── components/
│   │   └── digimon-card.tsx       # デジモンカードコンポーネント
│   ├── hooks/
│   │   ├── use-digimon-grid.ts    # グリッドドラッグ機能
│   │   ├── use-grid-animation.ts  # グリッドアニメーション
│   │   └── use-product-observer.ts # 要素の可視性監視
│   ├── constants/
│   │   └── grid-config.ts         # グリッド設定
│   ├── [name]/
│   │   ├── page.tsx               # デジモン詳細ページ (サーバーコンポーネント)
│   │   ├── page-client.tsx        # デジモン詳細ページ (クライアントコンポーネント)
│   │   ├── components/
│   │   │   ├── digimon-header.tsx      # ヘッダー情報
│   │   │   ├── digimon-info.tsx        # 基本情報
│   │   │   ├── digimon-description.tsx # 説明文タブ
│   │   │   ├── evolution-card.tsx      # 進化系カード
│   │   │   └── evolution-tabs.tsx      # 進化系タブ
│   │   └── hooks/
│   │       ├── use-tab-storage.ts      # タブ状態管理
│   │       └── use-scramble-animation.ts # テキストアニメーション
│   ├── api/
│   │   └── list/route.ts          # デジモンリストAPI
│   └── utils/
│       └── constants.ts           # 型定義
├── constants/
│   ├── index.ts                   # デジモンマスターデータ
│   └── extended-digimon.ts        # 拡張デジモンデータ (自動生成)
├── database/
│   ├── schema.sql                 # PostgreSQLスキーマ
│   ├── import-data.sql            # データインポート用SQL (自動生成)
│   └── README.md                  # データベース詳細ドキュメント
├── scripts/
│   ├── fetch-and-merge-digimon.ts # APIからデータ取得
│   ├── import-to-database.ts      # SQL生成スクリプト
│   └── README.md                  # スクリプト詳細ドキュメント
└── components/
    └── ui/                        # Radix UIベースのUIコンポーネント
```

## 🛠️ 技術スタック

### コアフレームワーク

- **Next.js 16.0.0**: React フレームワーク
- **React 19.0.0**: UI ライブラリ (実験的 ViewTransition 機能を使用)
- **TypeScript 5**: 型安全性

### スタイリング

- **Tailwind CSS 4.0.9**: ユーティリティファースト CSS
- **tailwindcss-animate**: アニメーションユーティリティ

### アニメーション

- **GSAP 3.13.0**: 高性能アニメーションライブラリ
  - Draggable Plugin: ドラッグ機能
  - ScrambleText Plugin: テキストスクランブルアニメーション

### UI コンポーネント

- **Radix UI**: アクセシブルな UI プリミティブ
  - Avatar, ScrollArea, Separator, Slot, Tabs, Tooltip

## 📜 利用可能なスクリプト

```bash
# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバーの起動
pnpm start

# Lintの実行
pnpm lint

# デジモンデータの取得とマージ
pnpm fetch-digimon

# データベースインポート用SQLの生成
pnpm generate-sql
```

## 🎯 主要な設計パターン

### カスタムフック

複雑なロジックを再利用可能なカスタムフックに分離：

- `useDigimonGrid`: グリッドのドラッグとバウンド管理
- `useGridAnimation`: GSAP アニメーションロジック
- `useTabStorage`: タブ状態の SessionStorage 管理
- `useScrambleAnimation`: テキストスクランブルアニメーション

### コンポーネント分離

単一責任の原則に基づいたコンポーネント設計：

- 各コンポーネントは特定の機能のみを担当
- Props インターフェースによる明確な型定義
- 高い再利用性とテスタビリティ

### パフォーマンス最適化

- IntersectionObserver による効率的な可視性管理
- GSAP の最適化されたアニメーション
- Next.js のキャッシング戦略 (`use cache`)

## 🗄️ データ管理

### データソース

- **Digi-API**: https://digi-api.com/
- **ローカルデータ**: `app/data.json` (24×12=288 件のランダムデジモン)

### データフェッチフロー

1. `scripts/fetch-and-merge-digimon.ts`: API から全デジモンデータを取得
2. `constants/extended-digimon.ts`: 拡張データとして保存
3. `scripts/import-to-database.ts`: PostgreSQL 用 SQL の生成
4. `database/import-data.sql`: データベースインポート

詳細は各ディレクトリの README を参照してください：

- [Scripts README](./scripts/README.md)
- [Database README](./database/README.md)

## 🎨 アーキテクチャの特徴

### React 19 ViewTransition

ページ遷移時の滑らかなビジュアルフィードバック：

```tsx
<ViewTransition name={`image-${id}`}>
  <img src={image} alt={name} />
</ViewTransition>
```

### GSAP 統合

高性能なアニメーションとインタラクション：

- タイムライン制御
- イージング関数
- Draggable プラグイン
- ScrambleText エフェクト

### Next.js App Router

- サーバーコンポーネントとクライアントコンポーネントの最適な組み合わせ
- 静的生成 (`generateStaticParams`)
- キャッシング戦略の適切な使用

## 🚢 Deploy on Vercel

この Next.js アプリケーションは[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)で簡単にデプロイできます。

詳細は[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)を参照してください。

## 📝 ライセンス

このプロジェクトは教育・デモンストレーション目的で作成されています。デジモンのデータとアセットは[Digi-API](https://digi-api.com/)から提供されており、元の API の利用規約に従ってください。

## 🤝 コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まず issue を開いて変更内容を議論してください。

---

**Built with ❤️ using Next.js, React 19, GSAP, and Digi-API**
