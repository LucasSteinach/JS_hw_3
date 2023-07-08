`для себя попробовал по-старому сделать
function Good() {
    
}

Good.prototype.constructor = function(id, name, description, sizes, price, available) {
    this.id = id
    this.name = name
    this.description = description
    this.sizes = sizes
    this.price = price
    this.available = available
}

Good.prototype.setAvailable = function() {
    this.available = !this.available
}`

class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }

    setAvailable() {
        this.available = !this.available
    }

}

const g1 = new Good(1, "T-shirt", 'simple color and format', [1, 2, 3, 4], 140, true)
const g2 = new Good(2, "rare Boots", 'with thick platform', [1, 4], 180, false)
const g3 = new Good(3, "The Hat", 'tall black cylinder', [2, 3], 200, true)
const g4 = new Good(4, "Shirt-underpants", 'comfortable happiness', [1, 3], 300, true)
const g5 = new Good(5, "kurtka", 'russian clothes', [2, 4], 1500, true)


class BasketGood extends Good {
    constructor(good, amount) {
        const params = []
        for (let property of Object.keys(good)) {
            if (typeof good[property] !== 'function') {
                params.push(good[property])    
            }
        }
        super(...params)
        this.amount = amount
    }


}

class Basket {
    constructor(goods = []) {
        this.goods = goods
    }

// использовать reduce() и forEach()

    get totalAmount() {
        return this.goods.reduce((sum, pointer) => sum + pointer.amount, 0)
    }

    get totalSum() {
        let result = 0
        this.goods.forEach(good => {
            result += good.amount * good.price
        }
        )
        return result
    }

    add(good, amount) {
        let index = this.goods.indexOf(this.goods.filter(x => x.id == good.id)[0])
        if (index == -1) {
            let baskGood = new BasketGood(good, amount)
            this.goods.push(baskGood)
            return 'successfully added'
        } else {
            this.goods[index].amount += amount
            return 'the amount has been increased'
        }
        
    }

    remove(good, amount) {
        let index = this.goods.indexOf(this.goods.filter(x => x.id == good.id)[0])
        if (index == -1) {
            return 'The good is not in the basket'
        } else {
            this.goods[index].amount -=  amount
            if (this.goods[index].amount <= 0) {
                this.goods.splice(index, 1)
                return 'the good has been removed (amount = 0)'
            } else {
            return 'successfully decreas'
            }
        }
        

    } 

    clear() {
        if (this.goods.length !== 0) {
            this.goods = []
        }
        return 'The basket is empty'
    }

    removeUnavailable() {
        this.goods = this.goods.filter(x => x.available)
        return 'Done'
    }
}


class GoodsList {
    #goods

    constructor(id, goodsArray, filter, sortPrice, sortDir) {
        this.id = id
        this.#goods = goodsArray
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }

    getGoods() {
        return this.#goods
    }

    // возвращает массив доступных для продажи товаров 
    // в соответствии с установленным фильтром и сортировкой по полю Price
    get list() {
        let result = this.getGoods().filter(x => x.available)
        result = result.filter(x => this.filter.test(x.name))
        if (this.sortPrice) {
            if (this.sortDir) {
                result.sort((unit1, unit2) => unit1.price - unit2.price)
            } else {
                result.sort((unit1, unit2) => unit2.price - unit1.price)
            }
        }
        
        return result
    }

    // добавление товара в каталог
    add(obj) {
        if (this.#goods.indexOf(obj) == -1) {
            this.#goods.push(obj)    
        } else return 'The good is already in catalog'
    }

    remove(id) {
        let index = this.#goods.map(x => x.id).indexOf(id)
        if (index !== -1) {
            this.#goods.splice(index, 1)
        } else return `There is no good with id ${id}`
    }
}

const goodListOne = new GoodsList(1, [g1,g2,g3], /.*shirt.*/i, true, true)
goodListOne.add(g4)
goodListOne.remove(3)
console.log(goodListOne.remove(3))
console.log(goodListOne.getGoods())
console.log('-----------')
console.log(goodListOne.list)


const bask = new Basket
bask.add(g1, 3)
bask.add(g2, 4)
bask.add(g3, 3)
bask.add(g1, 2)
bask.remove(g1, 4)
bask.remove(g1, 3)
bask.removeUnavailable()


console.log(bask)
console.log(`Total summ = ${bask.totalSum}`)
console.log(`Total amount = ${bask.totalAmount}`)