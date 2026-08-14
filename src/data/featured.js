/* トップページの Works モジュールに出す制作物。

   src/content/works/ のディレクトリ名から日付を除いた部分（スラッグ）を、
   出したい順に並べる。例: 2026-06-15_nkos-dev → 'nkos-dev'

   存在しないスラッグは黙って飛ばす。
   配列を空にすると、新しい順に FEATURED_FALLBACK 件が自動で選ばれる */
export const FEATURED_WORKS = ["sample-1", "sample-2", "sample-3", "sample-4"]

export const FEATURED_FALLBACK = 4
