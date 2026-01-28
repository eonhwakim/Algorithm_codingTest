/**
 * [문제]
 * 인터넷 브라우저에서 방문기록과 동일한 작동을 하는 BrowserHistory class를 구현할 것이다. 
 * 구현할 브라우저는 homepage에서 시작하고, 이후에는 다른 url 에 방문할 수 있다.
 * 또, “뒤로가기” 와 “앞으로 가기”가 작동하도록 구현하라
 *
 * - BrowserHistory(string homepage) 를 호출하면 브라우저는 homepage에서 시작이 된다
 * - void visit(string url)을 호출하면 현재 page의 앞에 있는 페이지 기록은 다 삭제가 되고 url로 방문을 한다.
 * - string back(int steps)을 호출하면 steps 수 만큼 “뒤로가기”를 한다. “뒤로가기”를 할 수 있는 page 개수가 x 이고, step > x 라면 x 번 만큼만 “뒤로가기”를 한다. “뒤로가기”가 완료되면 현재 url을 return한다
 * - string forward(int steps) 을 호출하면 steps 수 만큼 “앞으로 가기”를 한다. “앞으로 가기”를 할 수 있는 page 개수가 x이고 step > x 라면 x번 만큼만 “앞으로 가기”를 한다. “앞으로 가기”가 완료되면 현재 url을 return 한다
 *
 * [Constrains]
 * - 1 ≤ homepate.length ≤ 20
 * - 1 ≤ url.length ≤ 20
 * - 1 ≤ step ≤ 100
 * - homepage와 url 은 ‘.’를 포함한 lower case 영어 문자로 구성되어 있다
 * - visit, back 그리고 forward는 최대 5000번의 호출이 있을 수 있다.
 */

/**
 * @param {string} homepage
 */
var BrowserHistory = function(homepage) {
    // 1. 방문 기록을 저장할 배열 (Array)
    // 초기에 홈페이지가 하나 들어있는 상태로 시작합니다.
    this.history = [homepage];
    
    // 2. 현재 보고 있는 페이지의 위치 (Index)
    // 배열의 인덱스는 0부터 시작하므로 초기값은 0입니다.
    this.current = 0;
    
    // 3. 유효한 기록의 끝 위치 (Boundary)
    // visit()을 하면 현재 위치 이후의 기록은 모두 무효화되므로,
    // 어디까지가 유효한 기록인지 표시하는 변수가 필요합니다.
    // 초기에는 홈페이지 하나만 유효하므로 마지막 유효 인덱스는 0입니다.
    this.end = 0;
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
    // 현재 위치(current)에서 한 칸 앞으로 이동합니다.
    this.current++;
    
    // 이동한 위치에 새로운 url을 덮어씁니다.
    // 만약 이전에 forward로 갈 수 있는 기록이 있었더라도,
    // 여기서 덮어쓰게 되므로 자연스럽게 '앞으로 가기' 기록이 삭제되는 효과가 납니다.
    this.history[this.current] = url;
    
    // 새로운 페이지를 방문했으므로, 여기가 이제 역사의 끝(end)이 됩니다.
    // 즉, current 뒤에 있던 기존 기록들은 이제 접근할 수 없게 됩니다.
    this.end = this.current;
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
    // 뒤로 가기: 현재 인덱스(current)에서 steps만큼 뺍니다.
    // 하지만 0(시작점)보다 더 뒤로 갈 수는 없으므로 Math.max(0, ...)를 사용합니다.
    this.current = Math.max(0, this.current - steps);
    
    // 이동한 위치의 url을 반환합니다.
    return this.history[this.current];
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
    // 앞으로 가기: 현재 인덱스(current)에서 steps만큼 더합니다.
    // 하지만 유효한 기록의 끝(end)을 넘어갈 수는 없으므로 Math.min(this.end, ...)를 사용합니다.
    this.current = Math.min(this.end, this.current + steps);
    
    // 이동한 위치의 url을 반환합니다.
    return this.history[this.current];
};

/** 
 * 테스트 코드
 * 문제에 나온 예시를 그대로 실행하여 결과를 확인합니다.
 */
console.log("--- BrowserHistory Test ---");

const browserHistory = new BrowserHistory("leetcode.com");
console.log("Start: leetcode.com");

browserHistory.visit("google.com");
console.log("Visit google.com");

browserHistory.visit("facebook.com");
console.log("Visit facebook.com");

browserHistory.visit("youtube.com");
console.log("Visit youtube.com");

// back(1) -> "facebook.com"
console.log("back(1):", browserHistory.back(1)); 

// back(1) -> "google.com"
console.log("back(1):", browserHistory.back(1)); 

// forward(1) -> "facebook.com"
console.log("forward(1):", browserHistory.forward(1)); 

browserHistory.visit("linkedin.com");
console.log("Visit linkedin.com");

// forward(2) -> "linkedin.com" (더 이상 앞으로 갈 수 없음)
console.log("forward(2):", browserHistory.forward(2)); 

// back(2) -> "facebook.com" -> "google.com"
console.log("back(2):", browserHistory.back(2)); 

// back(7) -> "leetcode.com" (가장 처음으로 돌아감)
console.log("back(7):", browserHistory.back(7)); 
