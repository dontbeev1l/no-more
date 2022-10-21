Design using for examples 
https://www.figma.com/community/file/911178194317809651
https://www.figma.com/file/xqzclBZxv0et3nVh3uwI76/Mac-OS---Big-Sur-UI-Kit-(Community)?node-id=0%3A92


1 - Builder просто собирает все компоненты и вставляет их в index.html 
+ Быстро пишется 
+ Стабилно работает
- Нет lazy-loading
- Нет "tree-shaking"
- Нет source-map
- плохо работает watch


2 - _moveInnerContentToBasicSlot 
Сахар чтобыне не писать лишнее и не создавать дополнительные елемнты DOM (в этом случаен "span")
<template id="buttonTemplate">
<slot name=main></slot>
</template>

<my-button>
<span slot=main>Button</span>
</my-button>

VS
<template id="buttonTemplate">
<slot></slot>
</template>

<my-button>
Button
</my-button>