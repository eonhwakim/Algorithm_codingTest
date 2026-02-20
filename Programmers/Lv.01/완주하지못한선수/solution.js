/**
 * 해시
 * 
 * 문제 설명
수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.
마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 
완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

제한사항
- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.

입출력 예
participant	| completion	| return
["leo", "kiki", "eden"]	| ["eden", "kiki"]	| "leo"
["marina", "josipa", "nikola", "vinko", "filipa"]	| ["josipa", "filipa", "marina", "nikola"]	| "vinko"
["mislav", "stanko", "mislav", "ana"]	| ["stanko", "ana", "mislav"]	| "mislav"

입출력 예 설명
예제 #1
"leo"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2
"vinko"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3
"mislav"는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.
 


### 시간 복잡도
- O(N) : participant 와 completion 배열을 각각 한 번씩만 순회하므로 효율적입니다. (N은 참가자 수)
- 이중 반복문( for 안에 indexOf 등)을 사용하면 O(N²)이 되어 효율성 테스트를 통과하지 못할 수 있습니다. Map 을 사용하면 검색과 삽입이 평균 O(1)이므로 전체 O(N)으로 해결 가능합니다.
*/

function solution(participant, completion) {
    const map = new Map();

    // 1. 참가자 명단(participant)을 해시 맵에 카운팅하며 저장
    for (const p of participant) {
      if (map.has(p)) {
          map.set(p, map.get(p) + 1);
      } else {
          map.set(p, 1);
      }
    }
    // 2. 완주자 명단(completion)을 순회하며 해시 맵에서 카운트 감소
    for (const c of completion) {
      if (map.has(c)) {
          map.set(c, map.get(c) - 1);
      }
    }

    // 3. 카운트가 0이 아닌(남아있는) 사람이 완주하지 못한 선수
    for (const [key, value] of map) {
      if (value > 0) {
          return key;
      }
    }
}

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"])); // "leo"console.log(solution(["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"])); // "vinko"
// console.log(solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"])); // "mislav"
