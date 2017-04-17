### `<switch>` of Element
`switch` 是 Weex 的内置组件，用来创建与 iOS 一致样式的按钮。例如，在 iPhone 中的设置应用中的飞行模式按钮就是一个 switch 按钮。

### 子组件
`switch` 组件不支持任何子组件。

### 特性
- `checked {boolean}`：默认值为 `false`，表明按钮是否开启 is on or not.
- `disabled {boolean}`：默认值为 `false`，表明是否激活按钮.

### 样式
值得注意的是，在这个组件上，有些样式组件属性不能使用，它们是：
- `width`
- `height`
- `min-width`
- `min-height`
- `margin`
- `padding`
- `border`

**注意：**<br/>
由于设计宽度为 750px，宽度和高度相关的属性不能配置，组件的尺寸限定在 100x60。

- 通用样式

  - flexbox 布局
  - position
  - opacity
  - background-color

  查看 [组件通用样式](https://weex.incubator.apache.org/cn/v-0.10/references/common-style.html)

### 事件
- `change`：改变开关状态时触发该事件。<br/>
  事件中 event 对象属性：

  - `value`: 组件布尔值真或假。
  - `timestamp`: 事件的时间戳。

- 通用事件<br/>
  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 通用事件

### 示例
```html
<template>
  <div>
    <text>muted:</text>
    <switch checked="true" onclick='onclick' onchange='onchange' ondisappear='ondisappear' onappear='onappear'></switch>
  </div>
</template>
<script>
  module.exports = {
    methods:{
      onclick:function(e){
        console.log('onclick:' + e.timestamp);
      },
      onchange:function(e){
        console.log('onchage, value:' + e.value);
      },
      ondisappear:function(e){
        console.log('ondisappear, value:' + e.value);
      },
      onappear:function(e){
        console.log('onappear, value:' + e.value);
      },
    }
  }
</script>
```
