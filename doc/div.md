### `<div>` of Element
`<div>` 组件定义了指向某个页面的一个超链接. 此组件的作用和用法与HTML5中的 `<a>` 非常类似，区别在于 Weex 的 `<a>` 组件不能直接在里面添加文本（字符串），如果要展示文本，应该添加 `<text>` 组件。

```html
<template>
  <div class="wrapper">
    <a class="button" href="#">
      <text class="text">Jump</text>
    </a>
  </div>
</template>
<style>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    width: 450px;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
  .text {
    font-size: 60px;
    color: #666666;
    text-align: center;
  }
</style>
```

#### 样式
`<a>`支持所有通用样式。
- 盒模型
- `xflexbox` 布局
- `position`
- `opacity`
- `background-color`
查看 [组件通用样式](http://weex.apache.org/cn/references/common-style.html) .

#### 事件
`<a> 支持所有通用事件。
- click
  ** 注意：**我们不能保证 `click` 事件和 `href` 跳转的执行顺序。建议不要使用 `click` 事件来处理 `href` 跳转前的逻辑处理。</li>
- `longpress`
- `appear`
- `disappear`
查看 [通用事件](http://weex.apache.org/cn/references/common-event.html)。

#### 约束
- 不能直接在 `<a>` 中添加文本。
- 请不要为 `<a>` 添加 click 事件。我们不能确保 `click` 事件和 `href` 跳转的执行顺序。
