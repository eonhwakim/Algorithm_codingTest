function solution(park, routes) {
  const directions = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0] };
  
  const H = park.length;    // 공원의 세로 길이
  const W = park[0].length; // 공원의 가로 길이

  // 1. 시작점(S) 찾기 (findIndex 활용)
  let startX = park.findIndex(row => row.includes('S'));
  let startY = park[startX].indexOf('S');
  let [currentX, currentY] = [startX, startY];

  // 2. 경로 이동
  for (const route of routes) {
    const [dir, distanceStr] = route.split(' ');
    const distance = Number(distanceStr);
    const [dx, dy] = directions[dir];

    let tempX = currentX;
    let tempY = currentY;
    let canMove = true;

    // 한 칸씩 이동하며 확인
    for (let step = 0; step < distance; step++) {
      tempX += dx;
      tempY += dy;

      // 공원을 벗어나거나 장애물('X')을 만나면 이동 취소
      if (tempX < 0 || tempX >= H || tempY < 0 || tempY >= W || park[tempX][tempY] === 'X') {
        canMove = false;
        break;
      }
    }

    // 무사히 이동을 마쳤다면 현재 위치 업데이트
    if (canMove) {
      currentX = tempX;
      currentY = tempY;
    }
  }

  return [currentX, currentY];
}

let parkData = ['SOO', 'OOO', 'OOO'];
let routesData = ['E 2', 'S 2', 'W 1'];
console.log(solution(parkData, routesData)); //return [2,1]
