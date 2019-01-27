# 查询条件
通过配置的方式，获取查询条件

## 何时使用
一般用于简单的列表页查询条件，通过配置，快速编写查询条件，太复杂的查询条件可能不适合；

## API

参数|说明|类型|默认值
---|---|---|---
showSearchButton | 是否显示查询按钮 | bool | true
showResetButton | 是否显示重置按钮 | bool | true
collapsed | 是否收起 | bool | false
items | 查询条件没一项配置 | object | -
onSubmit | 提交时触发（回车或则点击查询按钮）| function(values) {} | -
formRef | 获取内部form | function(form) {} | -

### items

FormUtil.getFormItem函数所需参数，[点击这里](/example/form-util)