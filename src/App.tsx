import React from 'react'
import {Container, Grid} from '@material-ui/core'
import {CurrencyTable} from './components/CurrencyTable'
import {ConverterBlock} from './components/ConverterBlock'
import {Header} from './components/Header'
import {useStyles} from './styles/useStyles'

const App: React.FC = () => {
    const style = useStyles()

    return (
        <div>
            <Header/>
            <Container className={style.root} maxWidth='lg'>
                <Grid container spacing={5}>
                    <Grid item xs={8}>
                        <CurrencyTable/>
                    </Grid>
                    <Grid item xs={4}>
                        <ConverterBlock/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default App