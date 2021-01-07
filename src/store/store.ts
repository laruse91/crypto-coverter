import {action, computed, makeAutoObservable, observable} from 'mobx'
import {TCoin, TCoinDiff, TField} from '../types/types'
import axios, {AxiosResponse} from 'axios'

export class Store {
    constructor() {
        makeAutoObservable(this)
    }

    @observable
    public cryptoCoins: Array<TCoin> = []
    @observable
    public coinsDifference: TCoinDiff = {}
    @observable
    public fields: { [key: string]: TField } = {
        firstField: {
            price: null,
            name: 'BTC',
            value: 1
        },
        secondField: {
            price: 1,
            name: 'USD',
            value: 1
        },
    }
    @observable
    public conversationIndex = 1

    @computed
    get getCoins() {
        return this.cryptoCoins
    }

    @computed
    get getCoinsDifference() {
        return this.coinsDifference
    }

    @computed
    get getFieldValues() {
        return this.fields
    }

    @action
    setFieldValue(firstValue: number, secondValue: number) {
        this.fields.firstField.value = firstValue
        this.fields.secondField.value = secondValue
    }

    @action
    setCoinData(coinName: string, field: string) {
        this.fields[field].name = coinName
        coinName === 'USD'
            ? this.fields[field].price = 1
            : this.fields[field].price = this.cryptoCoins.find(obj => obj.name === coinName)!.price
        this.conversationIndex = this.fields.firstField.price! / this.fields.secondField.price!
        field === 'firstField'
            ? this.fields.secondField.value = +(this.fields.firstField.value * this.conversationIndex).toFixed(3)
            : this.fields.firstField.value = +(this.fields.secondField.value / this.conversationIndex).toFixed(3)
    }

    @action
    setCoins = action((newCoins: Array<TCoin>): void => {
        this.coinsDifference = this.getDifference(this.cryptoCoins, newCoins)
            .reduce((prevObj: TCoinDiff, currObj: TCoin) => {
                const newObj: TCoin = newCoins.find(obj => obj.name === currObj.name)!
                const oldObj: TCoin = this.cryptoCoins.find(obj => obj.name === newObj.name)!

                prevObj[newObj.name] = oldObj.price === newObj.price
                    ? ''
                    : oldObj.price > newObj.price ? 'red' : 'green'

                return prevObj
            }, {})

        this.cryptoCoins = newCoins

        setTimeout(action(() => this.coinsDifference = {}), 4000)
    })
    @action
    fetchCoins = () => {
        axios
            .get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
            .then(action((response: AxiosResponse) => {
                const coins: Array<TCoin> = response.data.Data
                    .map((coin: any) => ({
                        name: coin.CoinInfo.Name,
                        fullName: coin.CoinInfo.FullName,
                        imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
                        price: coin.RAW.USD.PRICE.toFixed(3),
                        volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR)
                    }))
                this.setCoins(coins)
                // set fieldValues on first getting cryptoCoins
                if (this.fields.firstField.price === null) {
                    this.fields.firstField.price = coins.find(obj => obj.name === 'BTC')!.price
                    this.fields.secondField.value = coins.find(obj => obj.name === 'BTC')!.price
                    //set coin data when data updated
                } else {
                    if (this.fields.firstField.name !== 'USD') {
                        this.fields.firstField.price = coins.find(obj => obj.name === this.fields.firstField.name)!.price
                    }
                    if (this.fields.secondField.name !== 'USD') {
                        this.fields.secondField.price = coins.find(obj => obj.name === this.fields.secondField.name)!.price
                    }
                }
                this.conversationIndex = this.fields.firstField.price! / this.fields.secondField.price!
                //update fieldValues when cryptoCoins data updated
                this.fields.secondField.value === 1
                    ? this.fields.firstField.value = +(this.fields.secondField.value / this.conversationIndex).toFixed(3)
                    : this.fields.secondField.value = +(this.fields.firstField.value * this.conversationIndex).toFixed(3)

            }))
    }

// difference btw old and updated data
    getDifference = action((arr1: Array<TCoin>, arr2: Array<TCoin>) => {
        return arr1.filter((obj, index) => obj.price !== arr2[index].price)
    })
}

export default new Store()
