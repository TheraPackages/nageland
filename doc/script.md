### `<script>` of Element
`<script>` 组件是weex的脚本容器。weex js脚本写在它的内部。

### 示例

```html
<template>
  <div>
    <text>{{msg}}</text>
  </div>
</template>
<script>
module.exports = {
  data: {
    msg: 'Hello world！'
  }
}
</script>
```
