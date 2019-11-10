//dom核心操作
// 根据 html 代码片段创建 dom 对象
function createElemByHTML(html) {
    let div
    div = document.createElement('div')
    div.innerHTML = html
    return div.children
}
// 判断指定选择器获取的对象是否为多个元素
function isDOMList(selector) {
    if (!selector) {
        return false
    }
    if (selector instanceof HTMLCollection || selector instanceof NodeList) {
        return true
    }
    return false
}

// 获取指定选择器所有元素，以数组形式返回，selector 为'pre','.class','#id'
function querySelectorAll(selector) {
    const result = document.querySelectorAll(selector)
    if (isDOMList(result)) {
        return result
    } else {
        return [result]
    }
}
// 创建构造函数
function DomElement(selector) {
    if (!selector) {
        return
    }

    // selector 本来就是 DomElement 对象，直接返回
    if (selector instanceof DomElement) {
        return selector
    }

    this.selector = selector
    const nodeType = selector.nodeType

    // 根据 selector 得出的结果（如 DOM，DOM List）
    let selectorResult = []
    if (nodeType === 9) {
        // document 节点
        selectorResult = [selector]
    } else if (nodeType === 1) {
        // 单个 DOM 节点
        selectorResult = [selector]
    } else if (isDOMList(selector) || selector instanceof Array) {
        // DOM List 或者数组
        selectorResult = selector
    } else if (typeof selector === 'string') {
        // 字符串
        selector = selector.replace('/\n/mg', '').trim()
        if (selector.indexOf('<') === 0) {
            // 如 <div>
            selectorResult = createElemByHTML(selector)
        } else {
            // 如 #id .class
            selectorResult = querySelectorAll(selector)
        }
    }

    const length = selectorResult.length
    if (!length) {
        // 空数组
        return this
    }

    // 加入 DOM 节点
    let i
    for (i = 0; i < length; i++) {
        this[i] = selectorResult[i]
    }
    this.length = length
}

// 修改原型
DomElement.prototype = {
    constructor: DomElement,
    // 类数组，forEach
    forEach: function (fn) {
        let i
        for (i = 0; i < this.length; i++) {
            const elem = this[i]
            const result = fn.call(elem, elem, i)
            if (result === false) {
                break
            }
        }
        return this
    },
    // 获取/设置 属性
    attr: function (key, val) {
        if (val == null) {
            // 获取值
            return this[0].getAttribute(key)
        } else {
            // 设置值
            return this.forEach(elem => {
                elem.setAttribute(key, val)
            })
        }
    },
}

// new 一个对象
function $(selector) {
    return new DomElement(selector)
}

export default $;