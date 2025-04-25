import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'

type DateType = number | Date | Dayjs

/**
 * 日期格式化
 * @param date
 * @param template
 */
export function dateFormat(date: DateType, template = 'YYYY-MM-DD HH:mm:ss'): string {
  return date ? dayjs(date).format(template) : ''
}

/**
 * 时间戳处理工具
 * mode 1: 转换为完整时间戳
 * mode 2: 转换为秒级时间戳
 * @param date
 * @param mode
 * @returns 时间戳
 */

export function dateTimestamp(date: DateType, mode: 1 | 2 = 1): number {
  const d = date?.valueOf()

  if (!d) {
    throw new Error('date is invalid')
  }

  if (mode === 1) {
    return d.toString().length < 13 ? d * 1000 : d
  }
  else if (mode === 2) {
    return d.toString().length < 13 ? d : Math.floor(d / 1000)
  }
  else {
    return d
  }
}

/**
 * 获取当天的开始时间
 * @param date
 * @returns 时间戳
 */
export function getDayStart(date: DateType): number {
  return dayjs(date).startOf('day').valueOf()
}

/**
 * 获取当天的结束时间
 * @param date
 * @returns 时间戳
 */
export function getDayEnd(date: DateType): number {
  return dayjs(date).endOf('day').valueOf()
}
