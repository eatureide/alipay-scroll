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

如果你的内容结构较为复杂，最好先定义好内容的高宽，否则滚动条可能无法正常运行

## options

| Name          | Description                      | Type    | Default |
| ------------- | -------------------------------- | ------- | ------- |
| showScrollBar | 是否展示滚动条                   | boolean | true    |
