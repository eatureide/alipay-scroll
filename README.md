## 仿造支付宝滚动条
![预览](https://s3.ax1x.com/2021/02/02/ynncSP.png)

## 使用
npm i @cxy/alipay-scroll@0.1.0

```javascript
import React, { useEffect, useState } from 'react'
import AliPayScroll from '@cxy/alipay-scroll'
import styles from './index.less'

export default () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setWidth(2000)
    }, 1000)
  }, [])

  return (
    <AliPayScroll>
      <div className={ styles.child } style={ { width: `${width}px` } } />
    </AliPayScroll>
  )
}
```

如果你的内容结构较为复杂，最好先定义好内容的高宽，传入的内容必须是组件

``` javaScript
<AliPayScroll keyId={0}>
  <div className={ styles.child } style={ { width: `${width}px` } } />
</AliPayScroll>
<AliPayScroll  keyId={1} showScrollBar={false}>
  <div className={ styles.child } style={ { width: `${width}px` } } />
</AliPayScroll>
```

## options

| Name          | Description                      | Type    | Default |
| ------------- | -------------------------------- | ------- | ------- |
| keyId         | 一个页面需要多个滚动条时需要传入 | number  | 0       |
| showScrollBar | 是否展示滚动条                   | boolean | true    |
