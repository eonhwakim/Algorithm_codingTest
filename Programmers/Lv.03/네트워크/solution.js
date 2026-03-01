/**
 * 컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 
 * 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

제한사항
- 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
- 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
- i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
- computers[i][i]는 항상 1입니다.

입출력 예
n	computers	return
3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1

 */

function solution(n, computers){
  let visited = Array(n).fill(false);
  let count = 0;

  function dfs(i){
    visited[i] = true;

    for(let j=0; j<n; j++){
      if(computers[i][j] === 1 && !visited[j]){
        dfs(j);
      }
    }
  }

  for(let i=0; i<n; i++){
    if(!visited[i]){
      dfs(i);
      count++;
    }
  }

  return count;
}

let computers= [
  [1,0,0],
  [0,1,0],
  [0,0,1]
 ];
console.log(solution(3, computers));
