const React = {
    createElement: function ({ elementName, attributes, children }) {
        return {
            tag: elementName,
            attrs: attributes,
            children
        };
    }
};
// const el = (
//     <div style="color:red;">
//         Hello <span className="title">JavaScript</span>
//     </div>
// );

//console.log(el);

//实现render方法
function render(vdom, container) {
    //调用createDom将虚拟DOM转成真实DOM
    const dom = createDom(vdom)
    //挂载到container下
    container.appendChild(dom)
}


//实现createDom
function createDom(vdom) {
    if (vdom === undefined || vdom === null || typeof vdom === 'boolean') {
        vdom = ''
    }

    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(String(vdom))
    }

    const dom = document.createElement(vdom.tag)

    //设置属性
    if (vdom.attrs) {
        for (let key in vdom.attrs) {
            const value = vdom.attrs[key];
            setAttribute(dom, key, value)
        }
    }

    //递归render子节点
    vdom.children.forEach(child => {
        return render(child, dom)
    });

    return dom
}


//设置属性
function setAttribute(dom, key, value) {
    //className
    if (key === 'className') {
        dom.setAttribute('class', value)
        //事件
    } else if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
        //style
    } else if (key === 'style') {
        if (typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (typeof value === 'object') {
            //{width:'',height:20}
            for (let name in value) {
                //如是数字可以忽略px
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name]
            }
        }
        //其他
    } else {
        dom.setAttribute(key, value)
    }
}

//测试
const ReactDOM = {
    render: function (vdom, container) {
        //当多次调用render函数时，不会清除原来的内容。
        container.innerHTML = ''
        render(vdom, container)
    }
}

const element = (
    <div
        className="Hello"
        onClick={() => alert(1)}
        style={{ color: 'red', fontSize: 30 }}
    >
        Hello <span style={{ color: 'blue' }}>javascript!</span>
    </div>
);

ReactDOM.render(element, document.getElementById('root'));