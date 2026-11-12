import { questions as base, validate as baseValidate, visible } from './survey.js';
export const VERSION='2026-11-12-v2';
export {visible};
const make=(id,title,type,options=[],help='')=>({id,section:'任意の成績情報',title,type,options,help});
export const questions=[base[0],
make('exam','順位を回答する場合、どの試験の結果ですか。','single',['直近の校内定期考査：全科目総合','直近の校内定期考査：国数英総合','模試：全科目総合','模試：国数英総合','その他','回答しない'],'任意。試験の種類が違う結果は分けて集計します。成績は自己申告であり、ICTによる学力の変化を証明するものではありません。'),
make('examname','試験名・実施月を記入してください。','text',[],'任意・100文字以内。例：2026年10月中間考査。氏名・クラスなどは書かないでください。'),
make('rank','その試験の学年順位を記入してください。','text',[],'任意。1以上9999以下の半角整数のみ（例：80）。空欄で進めます。順位と他の回答の組合せから本人が推測される可能性があります。不安なら記入しないでください。'),
make('cohort','その順位の対象人数を記入してください。','text',[],'任意。1以上9999以下の半角整数のみ。分からなければ空欄。順位と同じ集団の人数を記入してください。'),
...base.slice(1)];
export function validate(q,v){if(v===undefined)return true;if(['rank','cohort'].includes(q.id))return typeof v==='string'&&/^[1-9][0-9]{0,3}$/.test(v);if(q.id==='examname')return typeof v==='string'&&v.length<=100;return baseValidate(q,v);}
