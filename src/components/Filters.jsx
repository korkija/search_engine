import React from "react";
import {connect} from "react-redux";

import 'antd/dist/antd.css';
import '../style/index.css';
import 'antd/dist/antd.css';
import {Slider, InputNumber, Menu, Dropdown, Button, Input, Icon} from 'antd';
import {setParamFilter, resetFilter} from "../actions/people";

const {Search} = Input;

class Filters extends React.Component {
    state = {
        ageMin: this.props.ageMinDefault,
        ageMax: this.props.ageMaxDefault,
        //gender: ["both", "female", "male"],
        genderChoose: this.props.gender,
        nameForStart: this.props.name,
        name: this.props.name,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.ageMinDefault!==this.props.ageMinDefault)||(prevProps.ageMaxDefault!==this.props.ageMaxDefault)) {
            if (this.props.ageMinFilter === -1) {
                this.setState({
                    ageMin: this.props.ageMinDefault
                });
            }
            if (this.props.ageMaxFilter === 1000) {
                this.setState({
                    ageMax: this.props.ageMaxDefault
                });
            }
        }
    }

    gender=["both", "female", "male"];
    onChangeSlider = value => {
        console.log("onChangeSlider");
        this.setState({
            ageMin: value[0],
            ageMax: value[1],
        }, this.timingAndFilter);
    };
    onChangeMinAge = value => {
        this.setState({
            ageMin: value,
        }, this.timingAndFilter);
    };
    onChangeMaxAge = value => {
        this.setState({
            ageMax: value,
        }, this.timingAndFilter);
    };
    searchName = (e) => {
        this.setState({nameForStart: e.target.value});
        if ((e.target.value.length > 1) || (e.target.value.length === 0)) {
            this.setState({name: e.target.value},
         this.timingAndFilter);
        }
    };

    timingAndFilter = () => setTimeout(
        (() => {
            let {ageMin, ageMax, name, genderChoose} = this.state;
            ageMin=(this.state.ageMin===this.props.ageMinDefault)?-1:ageMin;
            ageMax=(this.state.ageMax===this.props.ageMaxDefault)?1000:ageMax;
            this.props.setParamFilter({name,ageMin,ageMax,genderChoose});
        }), 400);


    reset = () => {
        this.props.resetFilter();
        this.onChangeSlider([this.props.ageMinDefault, this.props.ageMaxDefault]);
        this.setState({name: ""});
        this.setState({nameForStart: ""});
        this.setState({genderChoose: this.gender[0]});
    };
    handleMenuClick = (e) => {
        this.setState({genderChoose: e.item.props.children},this.timingAndFilter);
    };

    render() {
        const {ageMin, ageMax, nameForStart, genderChoose} = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {
                    this.gender.map((item, i) =>
                        <Menu.Item key={i}>
                            {item}
                        </Menu.Item>)
                }
            </Menu>
        );
        const minValue=this.props.ageMinFilter===-1? this.props.ageMinDefault:ageMin;
        const maxValue=this.props.ageMaxFilter===1000? this.props.ageMaxDefault:ageMax;
        return (
            <div className="flex-container-for-filter">
                Name:
                <div className="search">
                    <Search
                        className="filterName"
                        placeholder="input search text"
                        onInput={this.searchName}
                        value={nameForStart}
                    />
                </div>
                Age:
                <div className="slider search">
                    <Slider range
                            className="slider-change"
                            min={this.props.ageMin}
                            max={this.props.ageMax}
                            defaultValue={[this.props.ageMin, this.props.ageMax]}
                            value={[typeof ageMin === 'number' ? ageMin : minValue, typeof ageMax === 'number' ? ageMax : maxValue]}
                            //value={[typeof ageMin === 'number' ? ageMin : this.props.ageMin, typeof ageMax === 'number' ? ageMax : this.props.ageMax]}
                            tooltipVisible
                            onChange={this.onChangeSlider}
                    />
                    from:
                    <InputNumber
                        className="age-min"
                        min={this.props.ageMin}
                        max={this.props.ageMax}
                        //value={ageMin}
                        value={minValue}
                        onChange={this.onChangeMinAge}
                    />
                    to:
                    <InputNumber
                        className="age-max"
                        min={this.props.ageMin}
                        max={this.props.ageMax}
                        style={{marginLeft: 1}}
                        //value={ageMax}
                        value={maxValue}
                        onChange={this.onChangeMaxAge}
                    />
                </div>
                <div className="flex-block-test">
                    gender:
                    <Dropdown className="gender-dropdown" overlay={menu}>
                        <Button>
                            <span className="filter1">{genderChoose}</span><Icon type="down"/>
                        </Button>
                    </Dropdown>

                    <button className="dropdown-my" onClick={this.reset}>ОЧИСТИТЬ</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ageMin: state.people.ageMin,
    ageMax: state.people.ageMax,
    ageMinDefault: state.people.ageMinDefault,
    ageMaxDefault: state.people.ageMaxDefault,
    ageMinFilter: state.people.ageMinFilter,
    ageMaxFilter: state.people.ageMaxFilter,
    name: state.people.name,
    gender: state.people.genderChoose,
});

const mapDispatchToProps = {
    resetFilter,
    setParamFilter,
};
export const MyFilters = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
