import type { Test1Dto } from '@/service/demo/type'

import { defineMock } from './util'

const list: Test1Dto[] = []

// 生成1000个Test1Demo 数据
function generateTestData() {
  for (let i = 0; i < 1000; i++) {
    list.push({
      id       : i + 1,
      name     : `test${i}`,
      age      : i + 1,
      createdAt: Date.now(),
    })
  }
}

generateTestData()

export default defineMock([
  {
    url     : '/api/demo/list',
    method  : 'get',
    response: (req: any) => {
      const page = Number(req.query.page)
      const pageSize = Number(req.query.pageSize)

      // 从list检索数据
      const start = (page - 1) * pageSize
      const end = start + pageSize

      const result = list.slice(start, end)

      return {
        page,
        pageSize,
        pageCount: Math.ceil(list.length / pageSize),
        count    : list.length,
        items    : result,

      }
    },
  },
  {
    url        : '/api/demo/list2',
    method     : 'get',
    response: () => {
      return list.slice(0, 15)
    },
  },
])
