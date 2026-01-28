/**
 * 2003 수들의 합2
 * https://www.acmicpc.net/problem/2003
 * 
 * [문제]
 * N개의 수로 된 수열 A[1], A[2], …, A[N] 이 있다. 
 * 이 수열의 i번째 수부터 j번째 수까지의 합 A[i] + A[i+1] + … + A[j-1] + A[j]가 M이 되는 경우의 수를 구하는 프로그램을 작성하시오.
 * 
 * [입력]
 * 첫째 줄에 N(1 ≤ N ≤ 10,000), M(1 ≤ M ≤ 300,000,000)이 주어진다. 
 * 다음 줄에는 A[1], A[2], …, A[N]이 공백으로 분리되어 주어진다. 각각의 A[x]는 30,000을 넘지 않는 자연수이다.
 * 
 * [출력]
 * 첫째 줄에 경우의 수를 출력한다.
 * 예제 입력:
 * 4 2
 * 1 1 1 1
 * 예제출력: 3
 */
const fs = require('fs');
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : 'input.txt'; // 로컬 테스트용 경로

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

let count = 0;
let sum = 0;
let end = 0;

// start 포인터를 0부터 N까지 증가시키며 확인 (Two Pointers)
for (let start = 0; start < N; start++) {
    // sum이 M보다 작고, end가 배열 범위 내에 있다면 end를 증가시키며 더함
    while (sum < M && end < N) {
        sum += nums[end];
        end++;
    }
    
    // 합이 M과 같으면 카운트 증가
    if (sum === M) {
        count++;
    }
    
    // 다음 start로 넘어가기 위해 현재 start 위치의 값을 합에서 뺌
    sum -= nums[start];
}

console.log(count);
