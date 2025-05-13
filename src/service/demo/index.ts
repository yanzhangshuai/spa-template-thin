import axios from 'axios'
import { defineService } from '@/utils/define'

import type { Test1Dto } from './type'

export const useDemoService = defineService({

  list2() {
    return axios.get<Test1Dto[]>('demo/list2')
      .then(res => res.data)
  },

  list(pageReq: PaginationReq) {
    return axios.get<PaginationRes<Test1Dto>>('demo/list', { params: pageReq })
      .then((res) => {
        return res.data
      })
  },

})
