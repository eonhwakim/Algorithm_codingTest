/**
 * 문제 설명
괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

"()()" 또는 "(())()" 는 올바른 괄호입니다.
")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
'(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

제한사항
문자열 s의 길이 : 100,000 이하의 자연수
문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

입출력 예
s	| answer
"()()"	| true
"(())()"	| true
")()("	| false
"(()("	| false
 */

function solution(s) {
    let count = 0;

    for (const char of s) {
        if (char === '(') {
            count++;
        } else {
            // ')'가 나왔는데 짝지을 '('가 없으면 올바르지 않음
            if (count === 0) {
                return false;
            }
            count--;
        }
    }

    // 모든 괄호를 짝지은 후 count가 0이어야 올바른 괄호
    return count === 0;
}

console.log(solution("()()")); // true
console.log(solution("(())()")); // true
console.log(solution(")()(")); // false
console.log(solution("(()(")); // false

/**
 * 풀이 핵심 (Count 방식)
- ( 가 나오면 +1 (열림)
- ) 가 나오면 -1 (닫힘)
- 중간에 count 가 음수가 되면? → 닫는 괄호가 먼저 나왔으므로 즉시 실패(false) .
- 끝났을 때 count 가 0이 아니면? → 짝이 안 맞으므로 실패(false) .
- 끝났을 때 count 가 0이면? → 성공(true) .

1. 배열(Stack) 대신 숫자(Number) 사용 :
   - 실제로 배열에 push / pop 을 하는 것보다, 단순히 숫자 변수( count )를 증감시키는 것이 메모리와 속도 면에서 훨씬 빠릅니다.
2. 조기 종료 (Early Return) :
   - count === 0 일 때 ) 가 나오면 더 볼 필요 없이 바로 false 를 반환하여 불필요한 연산을 줄입니다.
이 방식은 시간 복잡도 O(N) , **공간 복잡도 O(1)**로 매우 효율적입니다.

왜 숫자로 해도 되나요?
- 스택에 들어가는 데이터가 모두 똑같은 ( 이기 때문입니다.
- 넣는 행위는 count++, 빼는 행위는 count--로 완벽히 대체됩니다.
- 이렇게 하면 배열 메모리를 쓰지 않아 공간 복잡도가 $O(1)$로 최적화됩니다.
 */

//스택
function solution(s){
    let stack = [];
    for(let i=0; i<s.length; i++){
        if(s[i] === '('){
            stack.push(s[i]);
        }else{
            if(stack.length === 0){
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;
}