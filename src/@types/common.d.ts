declare interface PaginationReq {
  page    : number
  pageSize: number
}

declare interface PaginationRes<T extends Record<string, any>> {
  page?     : number
  pageSize? : number
  pageCount?: number
  count?    : number
  items?    : Array<T>
}
