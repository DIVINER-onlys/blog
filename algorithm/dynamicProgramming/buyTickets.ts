
/**
 * 思路
 * dp[i]表示前i个人买票需要的最短时间
 * 初始化时，第一个人只能自己购买
 * 从第二人开始，要么自己买，要么和前面的人一起买
 * 状态转移方程， dp[i] = min(dp[i-1]+a[i], dp[i-2]+b[i-1])
 * 从8点开始卖票，时间需要加个8
 */
async function buyTickets(T: number, a: number[], b: number[]) {
  // let a = [] // 保存第i个人单独购买票的时间
  // let b = [] // 保存第i个人和前一个人购买票的时间
  let dp = [] // dp[i]表示前i个人购买票的最少总时间

  // 初始第一个人自己购买
  dp[0] = a[0]
  // 后续的所有人，要么自己买，要么和前面的人买
  // 所以 前面的人购买的总时间 + 自己购买的时间，和  前面i-1的人购买的总时间 + 自己和前面人一起购买的时间 取最小值
  for(let i = 1; i< T; i++) {
    dp[i] = Math.min(dp[i-1] + a[i], (dp[i-2] ?? 0) + b[i-1])
  }

  const time = dp[T-1]
  const h = 8 + Math.floor(time/3600)
  const m = Math.floor(time%3600/60)
  const s = Math.floor(time%60)

  let formatTime
  if(h > 12){
    formatTime = `${(h-12)}:${m}:${s} pm`
  } else {
    formatTime = `${h}:${m}:${s} am`
  }
  console.log('售票员下班时间', formatTime)
  return formatTime
}

// buyTickets(2, [20, 25], [40])
buyTickets(3, [20, 15, 30], [40, 10])