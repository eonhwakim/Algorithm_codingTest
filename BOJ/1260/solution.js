/**
문제
- 그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

입력
- 첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

출력
- 첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.
 */

//예제 출력
/*
1 2 4 3
1 2 3 4
*/
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, V] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [src, dest] = input[i].split(' ').map(Number);
  graph[src].push(dest);
  graph[dest].push(src);
}
// [
//   [],             // 인덱스 0: (사용 안 함)
//   [ 2, 3, 4 ],    // 인덱스 1: 1번 정점은 2, 3, 4번과 연결됨
//   [ 1, 4 ],       // 인덱스 2: 2번 정점은 1, 4번과 연결됨
//   [ 1, 4 ],       // 인덱스 3: 3번 정점은 1, 4번과 연결됨
//   [ 1, 2, 3 ]     // 인덱스 4: 4번 정점은 1, 2, 3번과 연결됨
// ]

// 방문할 수 있는 정점이 여러 개인 경우 정점 번호가 작은 것을 먼저 방문
graph.forEach((element) => {
  element.sort((a, b) => a - b);
});

// DFS
const dfsVisited = new Array(N + 1).fill(false); //const dfsVisited = Array.from({ length: N + 1 }, () => false);
const dfsResult = [];

function dfs(v) {
  if (dfsVisited[v]) return;
  dfsVisited[v] = true;
  dfsResult.push(v);

  for (const next of graph[v]) {
    if (!dfsVisited[next]) {
      dfs(next);
    }
  }
}

dfs(V);
console.log(dfsResult.join(' '));

// BFS
const bfsVisited = new Array(N + 1).fill(false);
const bfsResult = [];

function bfs(start) {
  const queue = [start];
  bfsVisited[start] = true;

  while (queue.length > 0) {
    const v = queue.shift();
    bfsResult.push(v);

    for (const next of graph[v]) {
      if (!bfsVisited[next]) {
        bfsVisited[next] = true;
        queue.push(next);
      }
    }
  }
}

bfs(V);
console.log(bfsResult.join(' '));



/**
 * 코드 설명 및 핵심 포인트
1. 그래프 표현 (인접 리스트) :
  - N 이 최대 1,000, M 이 최대 10,000이므로 인접 행렬(O(N^2))보다 인접 리스트(O(N+M))가 메모리와 시간 측면에서 더 효율적입니다.
  - graph 배열의 각 인덱스는 정점 번호를 의미하며, 해당 정점과 연결된 정점들을 리스트로 관리합니다.
2. 정렬 (Sorting) :
  - 문제 조건 "방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문"을 만족시키기 위해, DFS/BFS 수행 전 각 정점의 인접 리스트를 오름차순으로 정렬( sort((a, b) => a - b) )했습니다.
3. DFS (깊이 우선 탐색) :
  - 재귀 함수 를 사용하여 구현했습니다.
  - 현재 정점을 방문 처리하고, 연결된 정점 중 아직 방문하지 않은 정점을 찾아 재귀적으로 호출합니다.
  - 스택(Stack) 자료구조의 특성을 가집니다.
4. BFS (너비 우선 탐색) :
  - **큐(Queue)**를 사용하여 구현했습니다. (JavaScript에서는 배열의 push 와 shift 메서드로 큐를 흉내낼 수 있습니다.)
  - 시작 정점을 큐에 넣고 방문 처리한 뒤, 큐가 빌 때까지 반복합니다. 큐에서 정점을 하나 꺼내 연결된 미방문 정점들을 모두 큐에 넣고 방문 처리합니다.
 */