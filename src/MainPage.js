import React, { Component } from 'react';
import Range from './Range';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounths: 1,
            amount: 100,
            refound: 100
        };
    }

    fetchCurrency = () => {
        fetch("http://www.nbrb.by/api/exrates/rates/145")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        currency: result.Cur_OfficialRate
                    });
                },
                (error) => {
                    this.setState({
                        currency: 'Currency not load'
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchCurrency();
        this.calculate();
    }

    calculate = () => {
        const { amount, mounths } = this.state;
        const refound = (amount * 0.16 / 12 * mounths + amount).toFixed(1);
        this.setState({ refound });
    }


    componentDidUpdate(prevProps, prevState) {
        const { amount, mounths } = this.state;
        if (prevState.amount !== amount || prevState.mounths !== mounths) {
            this.calculate();
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: Number(value)
        });
    }

    render() {
        const { refound, currency, amount, mounths } = this.state;
        const belAmount = currency ? (refound * currency).toFixed(1) : refound;
        return (
            <div className='main-block'>
                <Range title='Сумма кредита ($)' min='100' max='1000' step='100'
                    name='amount' value={amount} handleInputChange={this.handleInputChange} />
                <Range title='Количество месяцев' min='1' max='12' step='1'
                    name='mounths' value={mounths} handleInputChange={this.handleInputChange} />
                <div className='amount-block'>
                    <span>К возврату: </span>
                    <span className='dollar'>${refound}</span>
                    <span> ({belAmount} бел.руб.) </span>
                </div>
            </div>
        );
    }
}


export default Main;