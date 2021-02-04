## 仿造支付宝滚动条
[预览](https://codesandbox.io/s/blue-lake-ssdx8?file=/src/App.js)

## 使用
npm install alipay-scroll

```javascript
import React, { useEffect, useState } from 'react'
import AliPayScroll from 'alipay-scroll'

export default () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setWidth(2000)
    }, 1000)
  }, [])

  const style = {
    width: `${width}px`,
    height: '300px',
    background: 'linear-gradient(-90deg, #29bdd9 0%, #276ace 100%)'
  }

  return (
    <AliPayScroll>
      <div style={ style } /> // 传入的内容必须是组件
    </AliPayScroll>
  )
}
```

如果你的内容结构较为复杂，最好先定义好内容的高宽
一个页面需要多个滚动条时需要传入keyId

``` javaScript
    <>
      <AliPayScroll keyId={ 0 }>
        <div style={ style } />
      </AliPayScroll>
      <AliPayScroll keyId={ 1 } showScrollBar={ false }>
        <div style={ style } />
      </AliPayScroll>
    </>
```

## options

| Name          | Description                      | Type    | Default |
| ------------- | -------------------------------- | ------- | ------- |
| keyId         | 一个页面需要多个滚动条时需要传入 | number  | 0       |
| showScrollBar | 是否展示滚动条                   | boolean | true    |
