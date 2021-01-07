import React, {useEffect} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {useStyles} from '../styles/useStyles'
import {TCoin, TCoinDiff, TOnCoinClick, TStyle} from '../types/types'
import {observer} from 'mobx-react'
import store from '../store/store'

export const CurrencyTable: React.FC = observer(() => {
        const style: TStyle = useStyles()
        const items: Array<TCoin> = store!.getCoins
        const itemsDiff: TCoinDiff = store!.getCoinsDifference
        const onCoinClick: TOnCoinClick = (coin) => store.setCoinData(coin.name, 'firstField')
//useEffect hook: updating each 10 sec
        useEffect(() => {
            if (store) {
                store.fetchCoins()
                setInterval(() => {
                    store.fetchCoins()
                }, 10000)
            }

        }, [])

        return (
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' colSpan={2}>Криптовалюта</TableCell>
                            <TableCell align='center'>Обозначение</TableCell>
                            <TableCell align='center'>Цена</TableCell>
                            <TableCell align='center'>Транзакций за сутки</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!items.length
                            ? <TableRow>
                                <TableCell align='center'>Loading...</TableCell>
                            </TableRow>
                            : items.map((coin) => (
                                <TableRow key={coin.name} hover className={style.tableRow}
                                          onClick={() => onCoinClick(coin)}>
                                    <TableCell align='right' component='th'>
                                        <img className={style.currencyIcon} src={coin.imageUrl} alt='ico'/>
                                    </TableCell>
                                    <TableCell align='left'>{coin.fullName}</TableCell>
                                    <TableCell align='center'>{coin.name}</TableCell>
                                    <TableCell className={itemsDiff[coin.name] && style[itemsDiff[coin.name]]}
                                               align='center'>${coin.price}</TableCell>
                                    <TableCell align='center'>${coin.volume24hour}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
)
