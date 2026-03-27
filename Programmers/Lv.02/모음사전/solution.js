/**
 * 모음사전
 * 
 * word    result
 * "AAAAE" 6
 * "AAAE"  10
 * "I"     1563
 * "EIO"   1189
 */

function solution(word) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let count = 0;
    let answer = 0;

    function dfs(currentWord){
      if(currentWord === word) {
        answer = count;
        return;
      }
      if(currentWord.length === 5) return;

      for(let i=0; i<vowels.length; i++){
        if(answer > 0) return;
        count++;
        dfs(currentWord + vowels[i]);
      }
    }

    dfs("");
    return answer;
    
}

// 테스트 케이스 실행
console.log(solution("AAAAE")); // 6
console.log(solution("AAAE"));  // 10
console.log(solution("I"));     // 1563
console.log(solution("EIO"));   // 1189
