function Graph() {
  this.vertices = [] // 顶点集合
  this.edges = new Map() // 边集合
}

// 添加顶点方法
Graph.prototype.addVertex = function (v: any) {
  this.vertices.push(v)
  this.edges.set(v, [])
}

// 添加边方法
Graph.prototype.addEdge = function (v: any, w: any) {
  const vEdge = this.edges.get(v)
  vEdge.push(w)
  const wEdge = this.edges.get(w)
  wEdge.push(v)
  this.edges.set(v, vEdge)
  this.edges.set(w, wEdge)
}

Graph.prototype.toString = function () {
  let s = ''
  for (let i = 0; i < this.vertices.length; i++) {
    s += `${this.vertices[i]}->`
    const neighors = this.edges.get(this.vertices[i])
    for (let j = 0; j < neighors.length; j++) {
      s += `${neighors[j]} `
    }
    s += '\n'
  }

  return s
}

// 深度遍历 dfs
Graph.prototype.dfs = function () {
  const marked = {}

  const dsfVisit = (u: any) => {
    marked[u] = true
    console.log(u)
    const neighbors = this.edges.get(u)
    for (let i = 0; i < neighbors.length; i++) {
      if (!marked[neighbors[i]]) {
        dsfVisit(neighbors[i])
      }
    }
  }

  for (let i = 0; i < this.vertices.length; i++) {
    if (!marked[this.vertices[i]]) {
      dsfVisit(this.vertices[i])
    }
  }
}

// 广度遍历 bfs
Graph.prototype.bfs = function (v: any) {
  const marked = {}
  const queue = []
  marked[v] = true
  queue.push(v)
  while (queue.length) {
    const s: any = queue.shift() // 从队首移除
    if (this.edges.has(s)) {
      console.log('visited vertex:', s)
    }
    const neighbors = this.edges.get(s)
    for (let i = 0; i < neighbors.length; i++) {
      if (!marked[neighbors[i]]) {
        marked[neighbors[i]] = true
        queue.push(neighbors[i])
      }
    }
  }
}

export function testGraph() {
  const graph = new Graph()
  const vertices = [1, 2, 3, 4, 5]
  for (let i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i])
  }
  graph.addEdge(1, 4) // 增加边
  graph.addEdge(1, 3)
  graph.addEdge(2, 3)
  graph.addEdge(2, 5)
  console.log(graph.toString())

  console.log('-------dfs--------')
  graph.dfs()

  console.log('-------bfs--------')
  graph.bfs(1)
}
