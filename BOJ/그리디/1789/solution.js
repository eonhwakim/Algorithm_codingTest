/**
 * 1789번: 수들의 합
 * https://www.acmicpc.net/problem/1789
 * 
 * [문제 설명]
 * 서로 다른 N개의 자연수의 합이 S라고 한다. S를 알 때, 자연수 N의 최댓값은 얼마일까?
 * 
 * [풀이 설명]
 * - N을 최대로 하려면 가능한 한 작은 수들을 많이 사용해야 함
 * - 1부터 차례대로 더해가며 S를 넘지 않는 최대 개수를 찾음
 * - 시간복잡도 :  O(√S)
 * 
 * 예제 입력 : 200 -> 출력 : 19
 */

const fs = require('fs');

// 백준 환경 여부에 따라 입력 파일 경로 설정
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : 'input.txt';

const input = fs.readFileSync(filePath).toString().trim();

const S = Number(input);
let sum = 0;
let N = 0;

while(sum + (N+1) <= S){
    N++;
    sum += N;
}
console.log(N);


