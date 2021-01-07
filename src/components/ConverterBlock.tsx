import React, {ChangeEvent} from 'react'
import {FormControl, MenuItem, Paper, TextField, Typography} from '@material-ui/core'
import {useStyles} from '../styles/useStyles'
import store from '../store/store'
import {observer} from 'mobx-react'
import {TStyle} from '../types/types'

export const ConverterBlock: React.FC =
    observer(() => {
            const style: TStyle = useStyles()
            const itemsNames: Array<string> = store?.getCoins.map(coin => coin.name)!
//fields values onChange func
            const onFirstValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
                const secondValue = +(Number(event.target.value) * store.conversationIndex).toFixed(3)
                store.setFieldValue(Number(event.target.value), secondValue)
            }
            const onSecondValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
                const firstValue = +(Number(event.target.value) / store.conversationIndex).toFixed(3)
                store.setFieldValue(firstValue, Number(event.target.value))
            }
//cryptoCoin onChange func
            const onCoinChange = (event: ChangeEvent<HTMLInputElement>): void => {
                store.setCoinData(event.target.value, event.target.name)
            }

            return (
                <Paper className={style.paper}>

                    <div className={style.inputBox}>

                        <FormControl className={style.currencyInput}>
                            <TextField
                                value={store.getFieldValues.firstField.value}
                                label='Сумма'
                                type='number'
                                variant='outlined'
                                onChange={onFirstValueChange}
                            />
                        </FormControl>

                        <FormControl className={style.currencyType}>
                            <TextField
                                id='select'
                                name='firstField'
                                select
                                value={store.getFieldValues.firstField.name}
                                onChange={onCoinChange}
                                variant='outlined'>
                                {itemsNames.map(name => <MenuItem value={name} key={name}>{name}</MenuItem>)}
                                <MenuItem value={'USD'} key={'USD'}>USD</MenuItem>
                            </TextField>
                        </FormControl>

                    </div>

                    <div className={style.inputBox}>

                        <FormControl className={style.currencyInput}>
                            <TextField
                                value={store.getFieldValues.secondField.value}
                                label='Сумма'
                                type='number'
                                variant='outlined'
                                onChange={onSecondValueChange}
                            />
                        </FormControl>

                        <FormControl className={style.currencyType}>
                            <TextField
                                id='select'
                                name='secondField'
                                select
                                value={store.getFieldValues.secondField.name}
                                onChange={onCoinChange}
                                variant='outlined'>
                                {itemsNames.map(name => <MenuItem value={name} key={name}>{name}</MenuItem>)}
                                <MenuItem value={'USD'} key={'USD'}>USD</MenuItem>
                            </TextField>
                        </FormControl>

                    </div>

                    <Typography variant='h6' component='h6'>
                        {store.getFieldValues.firstField.value} {store.getFieldValues.firstField.name} = {store.getFieldValues.secondField.value} {store.getFieldValues.secondField.name}
                    </Typography>
                </Paper>
            )
        }
    )
