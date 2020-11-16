import React, {useMemo, useState} from 'react'

import style from './index.module.scss'

export interface TCollapseItem {
  data: any // 第一层数据
  children?: any[] // 每次对应展开的数据
  onClick?: Function
  onSelect?: Function
  onUnSelect?: Function
}

export interface TCollapseItemPlus extends TCollapseItem {
  id: string
}

export type TCollapseStyles = {
  container?: React.CSSProperties
  firstLayer?: React.CSSProperties
  secondLayer?: React.CSSProperties
}

export type TCollapseRenderProps = {
  data: any // 子层数据
  children: any[] // 父级数据
  index: number
  select: boolean
}

export type TCollapseSubRenderProps = {
  data: any
  parent: any
  index: number
}

export type TCollapseProps = {
  list: TCollapseItem[]
  render: (p: TCollapseRenderProps) => JSX.Element
  subRender?: (p: TCollapseSubRenderProps) => JSX.Element
  styles?: TCollapseStyles
}

// 展开折叠基础骨架
const CollapsePanel = ({list = [], render, subRender, styles = {}}: TCollapseProps) => {
  const {container = {}, firstLayer = {}, secondLayer = {}} = styles
  const [select, setSelect] = useState('')
  const List: TCollapseItemPlus[] = useMemo(() => {
    setSelect('')
    return list.map(item => Object.assign({}, item, {id: String(Math.random()).slice(2, 12)}))
  }, [list])

  const updateSelect = (id: string) => {
    const last = select
    const cur = id
    const lastItem = List.find(({id}) => id === last)
    const curItem = List.find(({id}) => id === cur)
    if (last === cur) {
      setSelect('')
      curItem?.onUnSelect && curItem?.onUnSelect()
    } else if (cur) {
      setSelect(cur)
      curItem?.onSelect && curItem?.onSelect()
      lastItem?.onUnSelect && lastItem?.onUnSelect()
    }
  }

  const RenderChildren = ({children, parent}: {children: any[]; parent: any}) =>
    children.map((data, i) => (
      <div className={style.secondLayer} style={secondLayer} key={i}>
        {(subRender &&
          subRender({
            data,
            index: i,
            parent,
          })) ||
          null}
      </div>
    ))

  return (
    <div className={`${style.container}`} style={container}>
      {List.map(({id, data, children = [], onClick}, index) => {
        const isSelected = select === id
        return (
          <div key={id}>
            <div
              className={style.firstLayer}
              style={firstLayer}
              onClick={() => {
                onClick && onClick()
                updateSelect(id)
              }}
            >
              {render({
                data,
                children,
                index,
                select: isSelected,
              })}
            </div>

            <div className={[isSelected ? '' : style.hideChildren, style.children].join(' ')}>
              {RenderChildren({children, parent: data})}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CollapsePanel
