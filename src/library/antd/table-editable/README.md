# 可编辑表格

整行可编辑，单独单元格可编辑

## API

参数|说明|类型|默认值
---|---|---|---
formRef | 用于获取内部from对象，使用from.validateFieldsAndScroll方法对表格进行校验 | function(form) {} | -
value | 替代了表格的dataSource，表格所需要渲染的数据 | array | - 
onChange | 表格中任意表单元素改变会触发此函数，参数是编辑完成的 value(dataSource) | function (value) | -
columns | 表格列配置 | array | -
showAddButton | 是否显示表格底部的添加按钮 | bool | true

### columns 项中的 props

如果props缺省，此列将不可编辑

FormItemLayout 和 FormUtil.getElement 所需属性。column其他配置同antd Table

常用属性如下

参数|说明|类型|默认值
---|---|---|---
dataIndex | 从每行record获取数据的key，默认为column中配置的dataIndex，如果column中的dataIndex并不是要编辑的（比如select，显示与编辑并不是一个dataIndex），可以使用此属性 | string | `columns[x].dataIndex`
type | 元素类型，比如：'input' | string | 'input'
elementProps | 应用到表单元素上的属性 | object | -
decorator | form.getFieldDecorator 函数的第二个参数，通常写些校验规则等 | object | -
getValue | 获取表单元素的方式 | function | (e) => e.target ? e.target.value : e

### value属性说明

使用value代替了dataSource，可编辑表格更像一个表单元素，所有封装成了类表单组件，提供了value和onChange属性

value中每一项（record），除了正常的业务数据外，额外有以下属性

参数|说明|类型|默认值
---|---|---|---
editable | 用于标记这一条数据中，那些是可编辑的，editable: true 所有都可编辑，editable: false 所有都不可编辑，editable: `[key1, key2]`只用key1，key2对应的数据可编辑| bool 或 array | true
showEdit | 是否显示编辑，与editable配合切换单元格的编辑、非编辑形式| bool | true

value中每一项（record），额外被添加了如下属性，用于区分哪些数据被编辑过：

参数|说明|类型|默认值
---|---|---|---
__changed | 标记此记录被编辑过的字段 | Set | -
__add | 标记此记录为新增记录 | bool | true

### 校验

#### 单独行校验
value每一项（record），额外添加了`__validate`方法，用于当前行数据校验，用法与form.validateFieldsAndScroll相同，代码片段如下：

```jsx
    columns = [
        ...
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <a
                        onClick={() => {
                            // 单独校验此行
                            record.__validate((err, values) => {
                                if (err) return;

                                // values为table-editable form使用的数据
                                console.log(values);
                                
                                // record 才是真实编辑过得数据
                                console.log(record);
                            });
                        }}
                    >保存</a>
                );
            },
        }
    ];
```

#### 整体校验

通过formRef 拿到 TableEditable内部form，进行校验，代码片段如下：

```jsx
    <TableEditable
        formRef={(form) => this.tableForm = form}
        ....
    />
    ...
    handleSubmit = () => {
        // this.tableForm可以用来做校验，编辑过得数据已经同步到 this.state.value中
        this.tableForm.validateFieldsAndScroll((err, values) => {
            if (err) return;
            // values为table-editable form使用的数据
            console.log(values);
            // this.state.value 才是真实编辑过得数据
            console.log(this.state.value);
        });
    };
```






 
