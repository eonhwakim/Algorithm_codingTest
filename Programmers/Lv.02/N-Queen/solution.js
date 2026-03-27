/**
 * N-Queen 문제
 * https://school.programmers.co.kr/learn/courses/30/lessons/12952
 * 
 * [문제 설명]
 * 가로, 세로 길이가 n인 정사각형으로된 체스판이 있습니다. 
 * 체스판 위의 n개의 퀸이 서로를 공격할 수 없도록 배치하고 싶습니다.
 * n이 매개변수로 주어질 때, n개의 퀸이 조건에 만족 하도록 배치할 수 있는 방법의 수를 return 하는 solution 함수를 완성해주세요.
 */

function solution(n) {
    let answer = 0;
    
    // 1차원 배열로 체스판을 표현합니다.
    // board[i] = j 는 i번째 행(row)의 j번째 열(col)에 퀸이 있다는 뜻입니다.
    const board = new Array(n).fill(0);

    // 퀸을 놓을 수 있는지 검사하는 함수
    function isValid(row) {
        // 현재 행(row) 이전에 놓인 퀸들과 충돌하는지 검사
        for (let i = 0; i < row; i++) {
            // 1. 같은 열에 퀸이 있는지 확인: board[i] === board[row]
            // 2. 대각선에 퀸이 있는지 확인: 행의 차이 === 열의 차이 (절댓값)
            if (board[i] === board[row] || Math.abs(board[i] - board[row]) === row - i) {
                return false; // 충돌하면 놓을 수 없음
            }
        }
        return true; // 충돌하지 않으면 놓을 수 있음
    }

    // DFS (백트래킹) 함수
    function dfs(row) {
        // 퀸을 마지막 행까지 다 놓았다면 (기저 조건)
        if (row === n) {
            answer++; // 방법의 수 1 증가
            return;
        }

        // 현재 행(row)의 0부터 n-1 열까지 퀸을 하나씩 놓아봄
        for (let col = 0; col < n; col++) {
            board[row] = col; // row행 col열에 퀸을 배치

            // 방금 놓은 퀸의 위치가 유효한지(서로 공격하지 않는지) 검사
            if (isValid(row)) {
                // 유효하다면 다음 행으로 넘어감
                dfs(row + 1);
            }
            // 유효하지 않다면(충돌한다면) dfs(row + 1)을 호출하지 않고, 
            // 다음 col로 넘어가서 퀸의 위치를 변경함 (백트래킹)
        }
    }

    // 0번째 행부터 시작
    dfs(0);
    
    return answer;
}

console.log(solution(4)); // 2
