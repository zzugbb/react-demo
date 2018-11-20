# React阶段升级

## 状态管理

### 挂载阶段的组件生命周期

 React.js 控制组件在页面上挂载和删除过程里面几个方法：

* componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
* componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
* componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。

 示例：

* construct
* component will Mount
* render
* component did Mount
* component will unmount

我们一般会把组件的 state 的初始化工作放在 constructor 里面去做；

在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；

有些组件的启动工作是依赖 DOM 的，而 componentWillMount 的时候组件还没挂载完成，这时候就可以把这些操作放在 componentDidMount 当中。

组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。

### 更新阶段的组件生命周期

1. shouldComponentUpdate(nextProps, nextState)：

    你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
2. componentWillReceiveProps(nextProps)：

    组件从父组件接收到新的 props 之前调用。
3. componentWillUpdate()：

    组件开始重新渲染之前调用。
4. componentDidUpdate()：

    组件重新渲染并且把更改变更到真实的 DOM 以后调用。

## DOM操作

### ref 和 React.js 中的 DOM 操作

在 React.js 当中基本不需要和 DOM 直接打交道，可以直接通过 setState 的方式重新渲染组件，渲染的时候可以把新的 props 传递给子组件，从而达到页面更新的效果。

但不可避免有时需要直接操作Dom，则React.js 当中提供了 ref 属性来帮助我们获取已经挂载的元素的 DOM 节点，可以给某个 JSX 元素加上 ref属性.

```js
 class AutoFocusInput extends Component {
  componentDidMount () {
    this.input.focus()
  }

  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
}

ReactDOM.render(
  <AutoFocusInput />,
  document.getElementById('root')
)
```

## props.children

由于 JSX 会把插入表达式里面数组中的 JSX 一个个罗列下来显示。

所以其实就相当于在 Card 中嵌套了什么 JSX 结构，都会显示在 Card 的类名为 card-content 的 div 元素当中。

```js
ReactDOM.render(
  <Card>
    <h2>React.js 小书</h2>
    <div>开源、免费、专业、简单</div>
    订阅：<input />
  </Card>,
  document.getElementById('root')
)

class Card extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
```

灵活布局

```js
class Layout extends Component {
  render () {
    return (
      <div className='two-cols-layout'>
        <div className='sidebar'>
          {this.props.children[0]}
        </div>
        <div className='main'>
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}
```

## dangerouslySetHTML 和 style 属性

react渲染若想识别标签，转义，应该如何做？

```js
class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>React.js 小书</h1>'
    }
  }

  render () {
    return (
      <div className='editor-wrapper'>
        dangerouslySetInnerHTML={{__html: this.state.content}}
      </div>
    )
  }
}
```

style设置样式，注意驼峰式，且要传入对象

```js
<h1 style={{fontSize: '12px', color: 'red'}}>React.js 小书</h1>

setState({color: 'blue'})
```

## Proptypes 和组件参数验证

规定comment参数为对象，且必须

```js
npm install --save prop-types

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }
}

PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element

```

[Typechecking With PropTypes - React](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

## 一般开发规范

组件的私有方法都用 _ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头。例如：

```js
<CommentInput
  onSubmit={this.handleSubmitComment.bind(this)} />

```

这样统一规范处理事件命名会给我们带来语义化组件的好处，
监听（on）CommentInput 的 Submit 事件，并且交给 this 去处理（handle）。

1. static 开头的类属性，如 defaultProps、propTypes。
2. 构造函数，constructor。
3. getter/setter（还不了解的同学可以暂时忽略）。
4. 组件生命周期。
5. _ 开头的私有方法。
6. 事件监听方法，handle*。
7. render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
8. render() 方法。

## react第三阶段

### 高阶组件

高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。

```js
const NewComponent = higherOrderComponent(OldComponent)
```

高阶组件的作用其实就是为了组件之间的代码复用。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。

高阶组件内部的包装组件和被包装组件之间通过 props 传递数据。

### react的 context

React.js 的 context 就是这么一个东西，某个组件只要往自己的 context 里面放了某些状态，这个组件之下的所有子组件都直接访问这个状态而不需要通过中间组件的传递。

一个组件的 context 只有它的子组件能够访问，它的父组件是不能访问到的.

父组件：

可以通过 getChildContext 方法返回一个对象，这个对象就是子树的 context，提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证。

子组件：

任意深度的子组件都可以通过 contextTypes 来声明你想要的 context 里面的哪些状态，然后可以通过 this.context 访问到那些状态。

一般不推荐使用，直接使用第三方库的状态管理即可。

### Redux

要注意的是，Redux 和 React-redux 并不是同一个东西。

Redux 是一种架构模式（Flux 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。

而 React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。
