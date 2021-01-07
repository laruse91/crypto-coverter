import React from 'react'
import {Typography} from '@material-ui/core'
import {TStyle} from '../types/types'
import {useStyles} from '../styles/useStyles'

export const Header: React.FC = ()=>{
    const style: TStyle = useStyles()
    return(
        <Typography align='center' variant='h4' component='h4' className = {style.header}>
           Конвертер криптовалюты
        </Typography>
    )
}