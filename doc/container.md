### `<container>` of Element
container 的作用和 div作用相同.

**注意：**
container已经不推荐使用，推荐使用div。

### 示例
```html
<template>
  <container class="wrapper">
    <a class="button" href="#">
      <text class="text">Jump</text>
    </a>
  </container>
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
