### `<list>` of Element
`<list>` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。
最简单的使用方法是在 `<list>` 标签内使用一组由简单数组 `repeat` 生成的 `<cell>` 标签填充。

一个最简例子：
```html
<template>
  <list class="list">
    <cell class="row" repeat="item in rows" index="{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </cell>
  </list>
</template>
<style></style>
<script>
module.exports = {
  data: {
    rows:[
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5}
    ]
  }
}
</script>
```

### 子组件

`<list>` 组件支持更多高级功能，由以下子组件提供：

- `<cell>`

用于定义列表中的子列表项，类似于 HTML 中的 `ul` 之于 `li`。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能。

使用文档请查看 `<cell>`。

- header 0.6.1+ <br/>
  当 `<header>` 到达屏幕顶部时，吸附在屏幕顶部。

- `<refresh>` <br/>
  用于给列表添加下拉刷新的功能。<br/>
  使用文档请查看 [`<refresh>`](https://weex.incubator.apache.org/cn/v-0.10/references/components/loading.html)

- `<loading>`
  `<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。<br/>
  使用文档请查看 [`<loading>`](https://weex.incubator.apache.org/cn/v-0.10/references/components/loading.html)

**注意：** <br/>
`<list>` 的子组件只能包括以上四种组件或是 `fix` 定位的组件，其他形式的组件将不能被正确的渲染。

一个错误的示范，此例子无法在客户端正常渲染，因为 `<list>` 子组件是 `<div>`：
```html
<template>
  <list class="list">
    <div class="row" repeat="item in rows" index="{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </div>
  </list>
</template>
<style></style>
<script>
module.exports = {
  data: {
    rows:[
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5}
    ]
  }
}
</script>
```
