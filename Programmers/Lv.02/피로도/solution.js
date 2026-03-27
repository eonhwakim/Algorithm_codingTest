/**
 * 입출력 예
k	dungeons	result
80	[[80,20],[50,40],[30,10]]	3

만약, 첫 번째 → 세 번째 → 두 번째 던전 순서로 탐험한다면

현재 피로도는 80이며, 첫 번째 던전을 돌기위해 필요한 "최소 필요 피로도" 또한 80이므로, 첫 번째 던전을 탐험할 수 있습니다. 첫 번째 던전의 "소모 피로도"는 20이므로, 던전을 탐험한 후 남은 피로도는 60입니다.
남은 피로도는 60이며, 세 번째 던전을 돌기위해 필요한 "최소 필요 피로도"는 30이므로, 세 번째 던전을 탐험할 수 있습니다. 세 번째 던전의 "소모 피로도"는 10이므로, 던전을 탐험한 후 남은 피로도는 50입니다.
남은 피로도는 50이며, 두 번째 던전을 돌기위해 필요한 "최소 필요 피로도"는 50이므로, 두 번째 던전을 탐험할 수 있습니다. 두 번째 던전의 "소모 피로도"는 40이므로, 던전을 탐험한 후 남은 피로도는 10입니다.
따라서 이 경우 세 던전을 모두 탐험할 수 있으며, 유저가 탐험할 수 있는 최대 던전 수는 3입니다
 */

function solution(k, dungeons){
  let maxCount =0; 
  const visited = new Array(dungeons.length).fill(false);
  function dfs(currentK, count){
    maxCount = Math.max(maxCount, count);
    for(let i=0; i<dungeons.length; i++){
      const [minRequired, consumption] = dungeons[i];
      if(!visited[i] && currentK >= minRequired){
        visited[i] = true;
        dfs(currentK - consumption, count+1);
        visited[i] = false;
      }
    } 
  }
  dfs(k, 0);
  return maxCount;
}