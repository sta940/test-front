import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Range extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '0%'
        };
    }

    componentDidUpdate(prevProps){
        if (prevProps.value !== this.props.value) {
            const { value, max, min, step } =this.props;
            const point = (value - step) / (max - min) * 100 + "%";
            this.setState({point});
        }
    }

    render() {
        const { title, min, max, step, value, name, handleInputChange } = this.props;
        const { point } = this.state;
        const style = {
            background: "linear-gradient(to right, red 0%, red " + point +", gray " + point + ", gray 100%)"
        }
        return (
            <div className = 'range-block'>
                <div className = 'title-block'>
                    <span>{title}</span>
                    <span>{value}</span>
                </div>
                <div className = 'input-block'>
                    <input
                        style = {style}
                        name={name}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={handleInputChange} />
                </div>
            </div>
        );
    }
}

Range.propTypes = {
    title: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    handleInputChange: PropTypes.func
};

export default Range;