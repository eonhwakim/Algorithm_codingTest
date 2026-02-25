/**
 * 정수가 저장된 배열 nums 이 주어졌을 때, nums의 원소중 두 숫자를 더해서 target이 될 수 있으면 True 불가능하면  False 반환하세요.

같은 원소를 두 번 사용할 수 없습니다.

제약조건

- 2 ≤ nums.length ≤ 10^4
- -10^9 ≤ nums[i] ≤ 10^9
- -10^9 ≤ target ≤ 10^9

예시1

input: nums = {4, 1, 9, 7, 5, 3, 16}, target : 14

output : True

예시2

input: nums = {2, 1, 5, 7}, target: 4

output: False
 */

// function twoSum(nums, target) {
//   let n = nums.length;

//   for(let i=0; i<n-1; i++){
//     for(let j=i+1; j<n; j++){
//       if(nums[i] + nums[j] === target){
//         return 'True';
//       }
//     }
//   }
//   return 'False';
// }

/**
 * 
O(n^2) 이므로 제약조건의 10^4 을 넣어보면  10^8 이 되니까 시간 제한 초과가 될 수 있다. 
O(nlogn), O(n), O(logn), O(1) 로 짜는 풀이 방법을 떠올려보자!
정렬 nlogn 이 걸려, 이걸로 해볼까?
 */
function twoSum(nums, target) {
	nums.sort((a, b) => a-b );
	let left = 0; 
	let right = nums.length -1
	
	while(left < right) {
		if(nums[left] + nums[right] > target){
			right -= 1
		}else if(nums[left] + nums[right] < target){
			left += 1
		}else if(nums[left] + nums[right] === target){
			return 'True';
		}
	}
	return 'False';
}

console.log(twoSum([4, 1, 9, 7, 5, 3, 16], 14));