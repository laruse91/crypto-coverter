import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    inputBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0'
    },
    currencyInput: {
        minWidth: '70%',
        marginRight: '10px'
    },
    currencyType: {
        minWidth: '30%',
    },
    currencyIcon: {
        width: '18px',
        height: '18px',
        borderRadius: '9px'
    },

    green: {
        backgroundColor: '#DCEDC8',
        transition: 'all 0.5s ease'
    },
    red: {
        backgroundColor: '#FFCDD2',
        transition: 'all 0.5s ease'
    },
    tableRow: {
        cursor: 'pointer',
    },
    header: {
        backgroundColor: '#C5CAE9',
        borderRadius: '5px',
        padding: '20px 0 '
    }
}))

