const name = 'efox-pay-package' // zip包名

module.exports = {
  filePath: './dist',
  name: name,
  localCacheConfig: {
    dev: {
      projectname: {
        remotePath: `https://pay-test.projectname.com/${name}.zip`,
        domain: ['pay-test.projectname.com'],
        indexRouter: ['/newpay', '/history', '/payresult'],
      },
    },
    pre: {
      projectname: {
        remotePath: `https://preview.projectname.net/${name}.zip`,
        domain: ['preview.projectname.net'],
        indexRouter: ['/newpay', '/history', '/payresult'],
      },
    },
    prod: {
      projectname: {
        remotePath: `https://pay.projectname.net/${name}.zip`,
        domain: ['pay.luluchat.net'],
        indexRouter: ['/newpay', '/history', '/payresult'],
      },
    },
  },
}
