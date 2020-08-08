function selectPresent(presentVolumn: number[][]) {
  // 用一个矩阵dp来保存走到每个格子的时候，当前格子累计的礼物的最小体积，dp的大小和格子的大小一致，也是M*N的矩阵
  const h = presentVolumn.length
  if(h === 0) {
    return 0
  }
  const w = presentVolumn[0].length
  if(w === 0) {
    return 0
  } 
  
  // 初始化一个 N*M 的 dp
  const dp: number[][] = new Array(h)
  for(let i = 0; i < h; i++) {
    dp[i] = new Array(w)
  }

  // 初始化第0行
  dp[0][0] = presentVolumn[0][0]
  for(let i = 1; i < w; i++) {
    dp[0][i] = dp[0][i-1] + presentVolumn[0][i]
  }
  // 初始化第0列
  for(let i = 1; i < h; i++) {
    dp[i][0] = dp[i-1][0] + presentVolumn[i][0]
  }

  // 更新dp[i][j]的值，当前格子的左上角、上、左三个值中的最小值 + 当前格子的值
  for(let i = 1; i < h; i++) {
    for(let j = 1; j < w; j++) {
      dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + presentVolumn[i][j]
    }
  }

  return dp[h-1][w-1]
}

selectPresent([[1,2,3], [2,3,4]])