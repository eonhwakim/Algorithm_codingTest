/** 2739 브론즈 5 구구단
 * javascript로 구현
 */


const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const arr = Array.from({length: 9}, (_, i) => i+1);
arr.forEach((item) => {
    console.log(`${input} * ${item} = ${input*item}`)
});

// for(let i=1; i<=9; i++){
//   console.log(`${input} * ${i} = ${input*i}`);
// }