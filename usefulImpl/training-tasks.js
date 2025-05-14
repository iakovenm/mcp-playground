// 1. Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('');
}
// Example: reverseString('hello') => 'olleh'

// 2. Calculate the sum of an array
function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}
// Example: sumArray([1,2,3]) => 6

// 3. Find the max element in an array
function maxElement(arr) {
  return Math.max(...arr);
}
// Example: maxElement([1,5,3]) => 5

// 4. Find the min element in an array
function minElement(arr) {
  return Math.min(...arr);
}
// Example: minElement([1,5,3]) => 1

// 5. Binary search (array must be sorted)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Example: binarySearch([1,2,3,4,5], 3) => 2

// 6. Count words in a string
function countWords(str) {
  return str.trim().split(/\s+/).length;
}
// Example: countWords('hello world!') => 2

// 7. Find duplicates in an array
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const num of arr) {
    if (seen.has(num)) duplicates.add(num);
    else seen.add(num);
  }
  return Array.from(duplicates);
}
// Example: findDuplicates([1,2,2,3,4,4]) => [2,4]

// 8. Calculate Fibonacci (nth number, iterative)
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
// Example: fibonacci(5) => 5

// 9. Remove element from a string (remove all occurrences of a char)
function removeChar(str, charToRemove) {
  return str.split(charToRemove).join('');
}
// Example: removeChar('hello', 'l') => 'heo'

// 10. Check if string has all unique elements
function hasAllUniqueChars(str) {
  return new Set(str).size === str.length;
}
// Example: hasAllUniqueChars('abc') => true, hasAllUniqueChars('aba') => false