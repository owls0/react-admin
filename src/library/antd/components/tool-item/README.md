# 工具项

通过配置的方式，获取工具条中的每一项

## 何时使用
通过配置方式，编写工具条场景下使用

## API

参数|说明|类型|默认值
---|---|---|---
items | 工具项配置 | array | -

### 每一项API

参数|说明|类型|默认值
---|---|---|---
key | react 列表循环需要的key | string | index
type | 按钮的type | string| 'primary'
icon | 按钮的icon | FontIcon | -
text | 按钮的text | any | -
visible | 此项是否可见 | bool | true
onClick | 按钮点击回调 | function | -
disabled | 按钮的disabled 属性 | bool | false
component | 非按钮时，自定义组件 | any | -
getComponent | 或去组件，优先级高于 component | function | -

