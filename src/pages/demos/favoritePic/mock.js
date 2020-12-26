const item1 = {
    src: 'https://iconfont.alicdn.com/t/50277bd6-fbd1-4356-9c64-3887db8079c6.png',
    desc: '草莓'
}
const item2 = {
    src: 'https://iconfont.alicdn.com/t/7a63b499-b924-4235-bd31-d4be793b21d5.png',
    desc: '桔汁'
}
const item3 = {
    src: 'https://iconfont.alicdn.com/t/ba9671bf-fc99-4c3d-9440-40ee9bee0402.png',
    desc: '鸡蛋'
}

function getArr(item, size = 10) {
    const arr = []
    
    for (let i = 0; i < size; i++) {
        const keyObj = {
            key: Math.floor(Math.random() * 10000)
        }
        arr.push(Object.assign(JSON.parse(JSON.stringify(item)), keyObj))
    }
    return arr
}

const mockDataList = [
    ...getArr(item1, 20),
    ...getArr(item2, 20),
    ...getArr(item3, 20),
]

export function getMockDataList(page, size = 10) {
    const firstNum = (page - 1) * 10
    return new Promise(resolve => {
        setTimeout(() => {
            const list = mockDataList.slice(firstNum, firstNum + size)
            resolve(list)
        }, 1000)
    })
}