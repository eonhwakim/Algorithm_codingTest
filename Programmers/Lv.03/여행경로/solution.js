/**
 * 문제 설명
주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.
항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 
방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한사항
- 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
- 주어진 공항 수는 3개 이상 10,000개 이하입니다.
- tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
- 주어진 항공권은 모두 사용해야 합니다.
- 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
- 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

입출력 예
tickets	| return
[["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]	| ["ICN", "JFK", "HND", "IAD"]
[["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]	| ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]

입출력 예 설명
예제 #1
["ICN", "JFK", "HND", "IAD"] 순으로 방문할 수 있습니다.

예제 #2
["ICN", "SFO", "ATL", "ICN", "ATL", "SFO"] 순으로 방문할 수도 있지만 
["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] 가 알파벳 순으로 앞섭니다.
 */

function solution(tickets) {
    let answer = [];
    
    // 1. 항공권 정렬 (알파벳 순서가 앞서는 경로를 찾기 위함)
    // 예: [["ICN", "SFO"], ["ICN", "ATL"]] -> [["ICN", "ATL"], ["ICN", "SFO"]]
    // 이렇게 하면 DFS 탐색 시 자연스럽게 알파벳 빠른 경로를 먼저 방문하게 됨
    tickets.sort();

    const len = tickets.length;
    // 방문 여부를 체크하는 배열 (항공권 개수만큼)
    const visited = new Array(len).fill(false);

    // DFS 함수 정의
    // current: 현재 도착한 공항
    // count: 사용한 항공권 개수
    // path: 현재까지의 경로 배열
    function dfs(current, count, path) {
        // [종료 조건] 모든 항공권을 다 사용했다면? (count === len)
        // 정답을 찾았으므로 true 반환
        if (count === len) {
            answer = path;
            return true;
        }

        // [탐색] 모든 항공권을 순회하며 갈 수 있는 곳 찾기
        for (let i = 0; i < len; i++) {
            // 아직 사용하지 않은 티켓이고 && 출발지가 현재 공항(current)과 같다면?
            if (!visited[i] && tickets[i][0] === current) {
                
                // 1. 티켓 사용 처리
                visited[i] = true;

                // 2. 다음 공항으로 이동 (재귀 호출)
                // 만약 이 경로로 끝까지 가서 정답을 찾았다면(result === true), 
                // 더 이상 다른 경로를 볼 필요 없이 즉시 종료! (알파벳 빠른 순으로 정렬했으니까)
                if (dfs(tickets[i][1], count + 1, [...path, tickets[i][1]])) {
                    return true;
                }

                // 3. (백트래킹) 만약 이 경로가 아니었다면?
                // 티켓 사용 취소하고 다음 반복문으로 넘어감
                visited[i] = false;
            }
        }

        return false; // 이 길은 막혔다!
    }

    // "ICN"에서 출발, 사용한 티켓 0개, 경로는 ["ICN"]으로 시작
    dfs("ICN", 0, ["ICN"]);

    return answer;
}

console.log(solution([["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]])); 
// ["ICN", "JFK", "HND", "IAD"]

console.log(solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]])); 
// ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]