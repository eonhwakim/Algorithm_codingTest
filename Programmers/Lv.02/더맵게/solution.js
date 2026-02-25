/**
 * 문제 설명
매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 
모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.
- 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

제한 사항
- scoville의 길이는 2 이상 1,000,000 이하입니다.
- K는 0 이상 1,000,000,000 이하입니다.
- scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

입출력 예
scoville	K	return
[1, 2, 3, 9, 10, 12]	7	2
입출력 예 설명
1. 스코빌 지수가 1인 음식과 2인 음식을 섞으면 음식의 스코빌 지수가 아래와 같이 됩니다.
새로운 음식의 스코빌 지수 = 1 + (2 * 2) = 5
가진 음식의 스코빌 지수 = [5, 3, 9, 10, 12]

2. 스코빌 지수가 3인 음식과 5인 음식을 섞으면 음식의 스코빌 지수가 아래와 같이 됩니다.
새로운 음식의 스코빌 지수 = 3 + (5 * 2) = 13
가진 음식의 스코빌 지수 = [13, 9, 10, 12]

모든 음식의 스코빌 지수가 7 이상이 되었고 이때 섞은 횟수는 2회입니다.
 */

/**
 * Min Heap (최소 힙) 구현
 * 
 * 힙은 '완전 이진 트리'의 일종으로, 우선순위 큐를 위해 만들어진 자료구조입니다.
 * - 최소 힙: 부모 노드의 키 값이 자식 노드의 키 값보다 항상 작은 힙 (Root가 가장 작음)
 * - 배열을 사용하여 효율적으로 구현할 수 있습니다.
 * 
 * [인덱스 관계]
 * - 부모 인덱스: Math.floor((index - 1) / 2)
 * - 왼쪽 자식 인덱스: index * 2 + 1
 * - 오른쪽 자식 인덱스: index * 2 + 2
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // 힙의 크기 반환
    size() {
        return this.heap.length;
    }

    // 최솟값 확인 (삭제하지 않음) -> O(1)
    peek() {
        return this.heap[0];
    }

    // 새로운 값 추가 -> O(log N)
    push(value) {
        this.heap.push(value); // 1. 배열의 맨 끝에 값 추가
        this.bubbleUp();       // 2. 부모와 비교하며 제자리 찾아가기 (위로 상승)
    }

    // 최솟값 추출 및 삭제 -> O(log N)
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const minValue = this.heap[0]; // 1. 최솟값(Root) 임시 저장
        this.heap[0] = this.heap.pop(); // 2. 맨 끝의 값을 Root로 이동
        this.bubbleDown();              // 3. 자식들과 비교하며 제자리 찾아가기 (아래로 하강)
        return minValue;
    }

    // 값이 추가되었을 때, 부모보다 작으면 위로 올라가는 과정
    bubbleUp() {
        let index = this.heap.length - 1; // 방금 들어온 값의 인덱스
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            // 부모가 더 작거나 같으면 멈춤 (최소 힙 조건 만족)
            if (this.heap[parentIndex] <= this.heap[index]) break;
            
            // 부모보다 내가 더 작으면? 자리를 바꿈 (Swap)
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex; // 인덱스를 부모로 갱신하여 계속 비교
        }
    }

    // Root가 삭제되고 맨 끝 값이 올라왔을 때, 자식보다 크면 아래로 내려가는 과정
    bubbleDown() {
        let index = 0; // Root에서 시작
        const length = this.heap.length;

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swapIndex = null; // 자리를 바꿀 자식의 인덱스

            // 1. 왼쪽 자식 확인
            if (leftChildIndex < length) {
                if (this.heap[leftChildIndex] < this.heap[index]) {
                    swapIndex = leftChildIndex; // 왼쪽 자식이 더 작으면 후보 등록
                }
            }

            // 2. 오른쪽 자식 확인
            if (rightChildIndex < length) {
                // (1) 왼쪽 자식과 바꿀 예정이 없는데 오른쪽이 더 작거나
                // (2) 왼쪽 자식과 바꿀 예정이지만 오른쪽이 왼쪽보다 더 작으면
                // -> 오른쪽 자식과 바꾸는 게 맞음
                if (
                    (swapIndex === null && this.heap[rightChildIndex] < this.heap[index]) ||
                    (swapIndex !== null && this.heap[rightChildIndex] < this.heap[leftChildIndex])
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            // 바꿀 자식이 없으면 종료 (제자리 찾음)
            if (swapIndex === null) break;

            // 자식과 자리 바꾸기 (Swap)
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex; // 인덱스를 자식으로 갱신하여 계속 비교
        }
    }
}

function solution(scoville, K) {
    const minHeap = new MinHeap();
    
    // 모든 음식의 스코빌 지수를 힙에 넣습니다.
    for (const s of scoville) {
        minHeap.push(s);
    }

    let mixCount = 0;

    // 가장 맵지 않은 음식의 스코빌 지수가 K보다 작은 동안 반복
    while (minHeap.size() > 0 && minHeap.peek() < K) {
        // 더 이상 섞을 음식이 없는데 K를 못 넘었다면 불가능
        if (minHeap.size() < 2) {
            return -1;
        }

        // 가장 맵지 않은 두 음식을 꺼냅니다.
        const first = minHeap.pop();
        const second = minHeap.pop();

        // 섞은 음식 = 가장 맵지 않은 것 + (두 번째로 맵지 않은 것 * 2)
        const mixed = first + (second * 2);
        
        // 섞은 음식을 다시 힙에 넣습니다.
        minHeap.push(mixed);
        mixCount++;
    }
    
    // while 문을 빠져나왔다면 가장 작은 값이 K 이상이라는 뜻 (혹은 힙이 비었음)
    // 단, 힙이 비어있을 경우에 대한 처리가 필요할 수 있으나,
    // 문제 로직상 size < 2 체크에서 걸러지거나, 마지막 남은 하나가 K 이상이면 됨.
    // 힙이 비는 경우는 K가 0이 아닌 이상 발생하지 않음(push를 계속 하므로 size는 1 이상 유지됨)
    // 예외: 처음부터 빈 배열 -> 제한사항 scoville 길이 2 이상이므로 고려 X

    // 반복문 종료 후 맨 앞의 음식이 여전히 K보다 작으면 -1 (이론상 위에서 걸러지지만 안전장치)
    if (minHeap.peek() < K) {
        return -1;
    }

    return mixCount;
}

console.log(solution([1, 2, 3, 9, 10, 12], 7)); // 2
console.log(solution([10, 12], 7)); // 0 (이미 모두 K 이상)