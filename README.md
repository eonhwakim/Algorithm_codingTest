# Algorithm_codingTest_
Programmers/BOJ codingTest explanation

const fs = require('fs');
const filePath = process.platform === 'linux' 
    ? '/dev/stdin' 
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim();
