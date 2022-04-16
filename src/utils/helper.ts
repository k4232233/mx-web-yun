/**
 * 生成介于 min 与 max 之间的随机数
 * @returns
 */
export function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

/**
 * 包裹表格，添加 class 以控制 table 样式
 */
export const wrapTable = (container: HTMLElement | Document = document) => {
  container.querySelectorAll('table').forEach((el) => {
    const container = document.createElement('div')
    container.className = 'table-container'
    wrap(el, 'table-container')
  })
}
