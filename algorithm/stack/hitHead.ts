function hitHead(n: number, a: number[]) {
  if(n <= 1) {
    return 0
  }
  let ans = 0
  let stack = []
  for(let i = 0; i < n; i++) {
    while(stack.length > 0 && a[stack[stack.length - 1]] <= a[i]){
      stack.splice(-1, 1)
    }
    if(stack.length > 0) {
      ans += stack[stack.length - 1] + 1
    }
    stack.push(i)
  }
  console.log(ans)
  return ans
}

// hitHead(5, [5,4,3,2,1])
hitHead(7, [4,3,2,1,2,3,4])