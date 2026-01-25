/** 10811 브론즈 2 바구니 뒤집기
 * javascript로 구현
 * 
 * 첫째줄에 N, M 
 */





const fs = require('fs');
const path = require('path');

const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : path.join(__dirname, 'input.txt');

// 입력값을 공백과 줄바꿈을 기준으로 모두 분리하여 숫자로 변환합니다.
// 이렇게 하면 빈 줄이나 불규칙한 공백으로 인한 런타임 에러를 방지할 수 있습니다.
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/).map(Number);

const N = input[0];
const M = input[1];

// 1부터 N까지의 숫자로 바구니 초기화
const baskets = Array.from({length: N}, (_, i) => i + 1);

// input 배열에서 현재 읽을 위치를 가리키는 커서
let cursor = 2;

for (let k = 0; k < M; k++) {
    // 1-based index를 0-based index로 변환
    let i = input[cursor++] - 1;
    let j = input[cursor++] - 1;

    // i부터 j까지의 범위를 직접 뒤집습니다 (Two Pointers 방식)
    while (i < j) {
        let temp = baskets[i];
        baskets[i] = baskets[j];
        baskets[j] = temp;
        i++;
        j--;
    }
}

console.log(baskets.join(' '));
