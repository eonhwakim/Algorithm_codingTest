/** 체육복
 * 문제분석&사고
 * - 빌려줄 수 있는 사람(reverse)이 누구에게 먼저 빌려줘야 전체 수혜자가 최대가 되는가?
 * Edge Case
 * 1. 여벌이 있는 학생도 도난당할 수 있다: 이 경우 남은 체육복이 1개가 되므로 '남을 빌려줄 수 없는 상태'가 됩니다. (가장 먼저 처리해야 함)
 * 2. 번호 차이는 1만 가능: i번 학생은 i-1번이나 i+1번에게만 빌려줄 수 있습니다.
 * 아이디어
 * - 정렬 후 앞뒤 번호 체크하기
 * - "앞번호부터 순차적으로 확인하며, 번호가 낮은 친구(i-1)에게 먼저 빌려준다."
 * - 이유: i번 학생이 i-1번에게 빌려주지 않고 i+1번에게 빌려주면, 나중에 i+2번 학생이 i+1번에게 빌려줄 기회를 뺏을 수도 있기 때문입니다. 앞에서부터 차례대로 해결하는 것이 최적의 해를 보장합니다.
 * 시간복잡도
 * 
 */
function solution(n, lost, reserve) {
    // 1. 여벌이 있는데 도난당한 학생 제외 (진짜 빌려줄 수 있는 사람과 빌려야 하는 사람 추출)
    // 정렬을 먼저 해주는 것이 그리디의 핵심입니다.
    let actualLost = lost.filter(l => !reserve.includes(l)).sort((a, b) => a - b);
    let actualReserve = reserve.filter(r => !lost.includes(r)).sort((a, b) => a - b);

    // 2. 체육복 빌려주기
    // 실제 도난당한 학생들(actualLost) 중 빌릴 수 있는 학생을 필터링하여 제외시킵니다.
    const finalLost = actualLost.filter(l => {
        // 내 앞번호(l-1) 학생이 여벌이 있는지 확인
        const lendIndex = actualReserve.findIndex(r => r === l - 1 || r === l + 1);
        
        // 빌릴 수 있다면 여벌 목록에서 해당 학생을 제거하고, lost 목록에서도 제거(false 반환)
        if (lendIndex !== -1) {
            actualReserve.splice(lendIndex, 1);
            return false;
        }
        
        // 못 빌렸다면 lost 목록에 유지
        return true;
    });

    // 3. 전체 학생 수 - 끝까지 못 빌린 학생 수
    return n - finalLost.length;
}


//아래는 더 직관적인 코드
// function solution(n, lost, reserve) {
//     // 1. 중복 제거 (자기꺼 자기가 입는 경우)
//     let aLost = lost.filter(l => !reserve.includes(l)).sort((a,b) => a-b);
//     let aReserve = reserve.filter(r => !lost.includes(r)).sort((a,b) => a-b);

//     let count = n - aLost.length; // 일단 현재 체육복 있는 학생 수

//     // 2. 한 명씩 물어보기
//     for (let i = 0; i < aLost.length; i++) {
//         let student = aLost[i];
        
//         // 내 앞번호 친구가 여벌이 있나?
//         let front = aReserve.indexOf(student - 1);
//         if (front !== -1) {
//             aReserve.splice(front, 1); // 빌려줬으니 명단 제외
//             count++; // 수업 들을 수 있는 사람 추가
//             continue; // 빌렸으니 다음 학생으로!
//         }
        
//         // 앞번호가 없으면 뒷번호 친구가 있나?
//         let back = aReserve.indexOf(student + 1);
//         if (back !== -1) {
//             aReserve.splice(back, 1);
//             count++;
//             continue;
//         }
//     }

//     return count;
// }