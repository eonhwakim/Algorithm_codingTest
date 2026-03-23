/**
 * 입출력 예
priorities	location	return
[2, 1, 3, 2]	2	1
[1, 1, 9, 1, 1, 1]	0	5
 */

function solution(priorities, location){
  let queue = priorities.map((priority, index) => ({
    priority: priority,
    id: index
  }));

  let count = 0;
  while(queue.length > 0){
    let current = queue.shift();
    const hasHigher = queue.some(p => p.priority > current.priority);
    if(hasHigher){
      queue.push(current);
    }else{
      count++;
      if(current.id === location){
        return count;
      }
    }
  }
}