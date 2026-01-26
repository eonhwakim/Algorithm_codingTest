/**
 * 1110번: 더하기 사이클
 * https://www.acmicpc.net/problem/1110
 * 
 * [문제 설명]
 * 0 <= N <= 99 인 정수가 주어집니다.
 * 1. N < 10 이면 앞에 0을 붙여 두 자리 수로 간주합니다. (예: 1 -> 01)
 * 2. 각 자리의 숫자를 더합니다. (예: 26 -> 2 + 6 = 8)
 * 3. 주어진 수의 가장 오른쪽 자리 수와, 앞에서 구한 합의 가장 오른쪽 자리 수를 이어 붙여 새로운 수를 만듭니다.
 *    (예: 26의 오른쪽 6 + 합 8의 오른쪽 8 -> 68)
 * 4. 이 과정을 반복하여 원래 수로 돌아오는 사이클의 길이를 구합니다.
 * 
 * [풀이 설명]
 * - 입력받은 수를 저장해두고(initialInput), 변해가는 수(currentNum)를 갱신하며 비교합니다.
 * - do-while 문을 사용하면 적어도 한 번은 연산을 수행하므로 코드가 깔끔해집니다.
 * - 10의 자리 수: Math.floor(num / 10)
 * - 1의 자리 수: num % 10
 * - 새로운 수: (기존 1의 자리 수 * 10) + (합의 1의 자리 수)
 */

const fs = require('fs');
const path = require('path');

// 백준 환경 여부에 따라 입력 파일 경로 설정
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : path.join(__dirname, 'input.txt');

// 입력을 읽어와 정수로 변환합니다.
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);

let currentNum = N;
let cycleLength = 0;

do {
    // 1. 각 자리수 구하기
    const tens = Math.floor(currentNum / 10); // 10의 자리
    const units = currentNum % 10;            // 1의 자리
    // 2. 각 자리수의 합 구하기
    const sum = tens + units;

    // 3. 새로운 수 만들기
    // 원래 수의 1의 자리가 새로운 수의 10의 자리가 되고 (units * 10)
    // 합의 1의 자리가 새로운 수의 1의 자리가 됩니다 (sum % 10)
    currentNum = (units * 10) + (sum % 10);

    // 사이클 길이 증가
    cycleLength++;

} while (currentNum !== N); // 원래 수로 돌아올 때까지 반복

console.log(cycleLength);
