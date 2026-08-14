/* Gallery モジュールに流す写真。

   src   … public/ からのパス
   place … 枠の下端に出る場所名
   note  … 右端に小さく添える語（不要なら省く）
   pos   … object-position。切り取り位置の調整に使う

   いまは同じ画像を pos だけ変えて並べたダミー。実写真が入ったら差し替える */
export const PHOTOS = [
  { src: '/images/avatar.png', place: '東京都', note: 'dummy', pos: 'center 28%' },
  { src: '/images/avatar.png', place: '静岡県', note: 'dummy', pos: 'center 55%' },
  { src: '/images/avatar.png', place: '京都府', note: 'dummy', pos: 'center 82%' },
]
