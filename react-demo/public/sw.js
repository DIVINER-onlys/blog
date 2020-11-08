// https://github.com/mdn/sw-test
importScripts('./lodash.min.js')
console.log('hello sw', _)

// levelList和originLevelList相比较，找出里面不同的子项
function levelItemAdapter(levelList, originLevelList) {
  const updateLevelList = []
  if (levelList && levelList.length > 0) {
    levelList.forEach(levelItem => {
      const findIndex = originLevelList.findIndex(originLevelItem => originLevelItem.id === levelItem.id)
      if (findIndex > -1) {
        if (!_.isEqual(levelItem, originLevelList[findIndex])) {
          updateLevelList.push(levelItem)
        }
      } else {
        updateLevelList.push(levelItem)
      }
    })
  }

  return updateLevelList
}

self.addEventListener('install', function (event) {
  console.log('sw install', event)
})

self.addEventListener('activate', function (event) {
  console.log('sw activated', event)
})

self.addEventListener('message', function (event) {
  console.log('sw reveive message:', event)
  const finalData = {
    id: event.data.id,
    action: event.data.action,
  }
  try {
    if (event.data.action === 'pageUpdateConfig') {
      _.assign(finalData, {
        data: levelItemAdapter(event.data.data.levelList, event.data.data.originLevelList),
        staus: 1,
      })
    }
  } catch (e) {
    _.assign(finalData, {
      data: null,
      staus: 2,
    })
  }
  console.log('sw before send', finalData)
  event.source.postMessage(finalData)
})

self.addEventListener('fetch', function (event) {
  // console.log('sw fetch:', event)
})
