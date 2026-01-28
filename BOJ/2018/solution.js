/**
 * 2018 수들의 합2
 * 
 * [문제]
 * 어떠한 자연수 N은, 몇 개의 연속된 자연수의 합으로 나타낼 수 있다. 당신은 어떤 자연수 N(1 ≤ N ≤ 10,000,000)에 대해서, 이 N을 몇 개의 연속된 자연수의 합으로 나타내는 가지수를 알고 싶어한다. 이때, 사용하는 자연수는 N이하여야 한다.
 *
 * 예를 들어, 15를 나타내는 방법은 15, 7+8, 4+5+6, 1+2+3+4+5의 4가지가 있다. 반면에 10을 나타내는 방법은 10, 1+2+3+4의 2가지가 있다.
 *
 * N을 입력받아 가지수를 출력하는 프로그램을 작성하시오.
 * [입력]
 * 첫 줄에 정수 N이 주어진다.
 *
 * [출력]
 * 입력된 자연수 N을 몇 개의 연속된 자연수의 합으로 나타내는 가지수를 출력하시오
 *
 * 예제 입력: 15
 * 예제출력: 4
 */
const fs = require('fs');
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : '/input.txt'; // 로컬 테스트용 경로

const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);

let count = 0;
let end = 1; // 자연수는 1부터 시작
let sum = 0;

// start도 1부터 시작해야 합니다. (자연수 문제이므로)
for(let start = 1; start <= N; start++) {
    // sum이 N보다 작으면 계속 더해줍니다.
    while(sum < N && end <= N + 1) { // end가 N+1까지 가야 N까지 더할 수 있음 (또는 조건문 수정)
        sum += end;
        end++;
    }
    
    // 합이 N과 같으면 카운트 증가
    if(sum === N){
        count++;
    }
    
    // 다음 루프를 위해 start 값을 뺍니다.
    sum -= start;
}
console.log(count);
