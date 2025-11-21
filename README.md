# 🎨 Grid Maker

**Grid Maker** は、CSS Grid レイアウトを視覚的にデザインし、すぐに使える HTML/CSS コードを生成するモダンな Web アプリケーションです。
直感的な操作で、複雑なグリッドレイアウトも簡単に作成できます。

![Grid Maker Preview](https://via.placeholder.com/800x450.png?text=Grid+Maker+Preview)
*(スクリーンショットをここに追加予定)*

## ✨ 主な機能

*   **🖱️ ドラッグ & ドロップ操作**: グリッドアイテムをドラッグして自由に配置を変更できます。
*   **📐 自由なリサイズ**: アイテムの右下をドラッグするだけで、サイズを直感的に調整可能。
*   **⚙️ 詳細なグリッド設定**:
    *   行 (Rows)・列 (Columns) の数をスライダーで調整 (1〜12)。
    *   ギャップ (Gap) のサイズを調整 (0〜50px)。
*   **🎨 アイテムのカスタマイズ**:
    *   アイテムごとの名前変更。
    *   カラーピッカーによる背景色の変更。
    *   正確な配置のための数値入力にも対応。
*   **📝 コード生成 & エクスポート**:
    *   リアルタイムで HTML/CSS コードをプレビュー。
    *   ワンクリックでクリップボードにコピー。
    *   **HTML ファイルとしてエクスポート**し、すぐにブラウザで確認可能。
    *   **折りたたみ可能なコード出力エリア**で、作業スペースを広く確保。

## 🛠️ 使用技術

*   **Frontend**: [React](https://react.dev/) (v19), [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 始め方

### インストール

リポジトリをクローンし、依存関係をインストールします。

```bash
git clone https://github.com/haizuka-m/Grid-maker.git
cd Grid-maker
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```
ブラウザで `http://localhost:5173` を開いてください。

### ビルド

本番環境用にビルドするには以下のコマンドを実行します。

```bash
npm run build
```

## 📦 デプロイ

GitHub Pages へのデプロイが設定されています。

```bash
npm run deploy
```

## 📄 ライセンス

MIT License
