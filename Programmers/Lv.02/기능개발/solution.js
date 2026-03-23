function solution(progresses, speeds) {
  const answer = [];
  //남은 일수 배열만들기
  let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));

  //첫번째 작업 기준으로 시작
  let maxDay = days[0];
  let count = 0; 

  for(let i=0; i<days.length; i++){
    if(days[i] <= maxDay){
      count ++;
    }else{
      answer.push(count);
      maxDay = days[i];
      count = 1;
    }
  }
  answer.push(count);
  return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5]))
