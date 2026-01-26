/** 2588 브론즈 3 곱셈
 * javascript로 구현
 * https://www.acmicpc.net/problem/2588
 * 정답
2360
3776
1416
181720
 */





const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);

const num1 = parseInt(input[0]);
const num2Str = input[1];

// 1. (3) 위치: 472 * 5 (일의 자리)
const one = num1 * parseInt(num2Str[2]);
console.log(one);

// 2. (4) 위치: 472 * 8 (십의 자리)
const two = num1 * parseInt(num2Str[1]);
console.log(two);

// 3. (5) 위치: 472 * 3 (백의 자리)
const three = num1 * parseInt(num2Str[0]);
console.log(three);

// 4. (6) 위치: 472 * 385 (전체 곱셈 결과)
const result = num1 * parseInt(num2Str);
console.log(result);