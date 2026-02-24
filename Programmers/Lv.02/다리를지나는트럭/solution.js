/**
 * 문제 설명
트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.

예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

경과 시간	다리를 지난 트럭	다리를 건너는 트럭	대기 트럭
0	[]	[]	[7,4,5,6]
1~2	[]	[7]	[4,5,6]
3	[7]	[4]	[5,6]
4	[7]	[4,5]	[6]
5	[7,4]	[5]	[6]
6~7	[7,4,5]	[6]	[]
8	[7,4,5,6]	[]	[]
따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭 별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

제한 조건
bridge_length는 1 이상 10,000 이하입니다.
weight는 1 이상 10,000 이하입니다.
truck_weights의 길이는 1 이상 10,000 이하입니다.
모든 트럭의 무게는 1 이상 weight 이하입니다.
 */

function solution(bridge_length, weight, truck_weights) {
    // 다리 위 상태를 나타내는 큐 (0으로 초기화, 길이는 다리 길이만큼)
    // 예: bridge_length = 2 -> [0, 0]
    const bridge = new Array(bridge_length).fill(0);
    let bridgeSum = 0; // 현재 다리 위 트럭 무게 합
    let time = 0; // 경과 시간

    // 대기 중인 트럭이 있거나 다리 위에 트럭이 남아있는 동안 반복
    while (bridgeSum > 0 || truck_weights.length > 0) {
        time++; // 1초 경과

        // 1. 다리 맨 앞의 트럭(또는 0)을 빼냄
        bridgeSum -= bridge.shift();

        // 2. 대기 트럭이 있다면, 다리에 올릴 수 있는지 확인
        if (truck_weights.length > 0) {
            // (현재 다리 무게 + 다음 트럭 무게) <= 견딜 수 있는 무게
            if (bridgeSum + truck_weights[0] <= weight) {
                const nextTruck = truck_weights.shift(); // 대기열에서 뺌
                bridge.push(nextTruck); // 다리에 올림
                bridgeSum += nextTruck; // 무게 추가
            } else {
                // 무게 초과로 못 올리면 0(빈 공간)을 밀어넣음
                bridge.push(0);
            }
        }
    }

    return time;
}

console.log(solution(2, 10, [7, 4, 5, 6])); // 8
console.log(solution(100, 100, [10])); // 101
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])); // 110


/**
 * 문제 이해
제한된 길이와 무게를 가진 다리를 트럭들이 순서대로 건너는 상황을 그대로 흉내내는 것이다
- 다리(Bridge) : 길이가 bridge_length 인 컨베이어 벨트라고 생각
- 무게 제한(Weight) : 다리위에 있는 트럭들의 무게 합이 weight 를 넘으면 안된다.
규칙 :
1. 매 초마다 다리 위 트럭들은 한 칸씩 앞으로 이동합니다.
2. 다리 끝에 도달하면 트럭은 다리를 빠져나갑니다.
3. 다리에 여유 무게가 있으면 대기 중인 트럭이 하나 올라갑니다.
4. 무게 때문에 못 올라가면? → **빈 공간(0kg)**을 대신 올려서 앞 트럭들을 밀어냅니다.

최적풀이 (Queue 시뮬레이션)
bridge_length: 2 , weight: 10 , trucks: [7, 4, 5, 6]

시간 | 다리 상태(큐) | 다리 무게 합
0초   [0, 0]   0
1초   [0, 7]   7
2초   [7, 0]   7
3초   [0, 4]   4
4초   [4, 5]   9
5초   [5, 0]   5
6초   [0, 6]   6
7초   [6, 0]   6
8초   [0, 0]   0
 */