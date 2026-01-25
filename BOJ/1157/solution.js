/** 1157 브론즈 1 단어공부
 * javascript로 구현
 * 
 * 
 * 문제 : 알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 
 * 단, 대문자와 소문자를 구분하지 않는다.
 * 
 * 입력 : 첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.
 * 
 * 출력 : 첫째 줄에 이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다. 
 * 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 ?를 출력한다.
 */


const fs = require('fs');
const path = require('path');

// 백준 환경(Linux)에서는 '/dev/stdin', 로컬 환경에서는 현재 파일과 같은 디렉토리의 'input.txt'를 읽습니다.
// __dirname을 사용하여 실행 위치에 상관없이 input.txt를 정확히 찾도록 합니다.
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString().trim().toUpperCase();

const counts = new Array(26).fill(0);

for (let i = 0; i < input.length; i++) {
    // 'A'의 ASCII 코드는 65입니다.
    counts[input.charCodeAt(i) - 65]++;
}

let maxCount = -1;
let maxChar = '?';

for (let i = 0; i < 26; i++) {
    if (counts[i] > maxCount) {
        maxCount = counts[i];
        maxChar = String.fromCharCode(i + 65);
    } else if (counts[i] === maxCount) {
        maxChar = '?';
    }
}

console.log(maxChar);
