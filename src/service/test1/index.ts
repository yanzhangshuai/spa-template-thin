import { defineService } from '@/util/define'

import type { Test1Dto } from './type'

export const useTest1Service = defineService({

  list() {
    return new Promise<PaginationRes<Test1Dto>>((resolve) => {
      resolve({
        page     : 1,
        pageSize : 10,
        pageCount: 1,
        count    : 1,
        items    : [
          {
            id       : 1,
            name     : 'test1',
            age      : 18,
            createdAt: Date.now(),
          },
          {
            id       : 2,
            name     : 'test2',
            age      : 20,
            createdAt: Date.now(),
          },
          {
            id       : 3,
            name     : 'test3',
            age      : 22,
            createdAt: Date.now(),
          },
        ],
      })
    })
  },

})
