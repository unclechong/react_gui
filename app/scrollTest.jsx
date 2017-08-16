import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import _ from 'underscore';
import $ from 'jquery';
import './css/scroll.css';
import Calendar from './Calendar/Calendar.jsx';

class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            forData:[4,333,3,3]
        }

        this.scrollTop = 0;
    }

    componentDidMount(){
        let _this = this;
        let fatherHeight = $(this.refs.thisDIV).height();
        let childHeight = $(this.refs.child).height();
        this.scrollTop = childHeight - fatherHeight;
        $(this.refs.thisDIV).scroll(function(){
            if ($(this).scrollTop() == _this.scrollTop) {
                _this.renderNewData();
            }
        })
    }

    renderNewData(){
        this.setState({
            loading: true,
            forData:[...this.state.forData,4,333,3]
        },()=>{
            let childHeight = $(this.refs.child).height();
            this.scrollTop = childHeight - $(this.refs.thisDIV).height();
            this.setState({
                loading: false,
            });
        });
    }

    render() {
        return (
            <Spin spinning={this.state.loading} style={{height:200,width:100}}>
                <div ref='thisDIV' className='scroll-beautiful' style={{height:200,width:100}}>
                    <div ref='child' >
                        <a>
                            {
                                _.map(this.state.forData,(k,v)=>{
                                    return  <h1 key={v}>3<br />3<br />3<br /></h1>
                                })
                            }
                        </a>
                    </div>
                </div>
            </Spin>
        );
    }
}

class CalendarTest extends React.Component {

    render(){
        return(
            <Calendar
                // onSelectDate={this.selectDate}
                // onPreviousMonth={this.previousMonth}
                // onNextMonth={this.nextMonth}
                year="2016"
                month="8"
                day="7"
                tags={[5, 21]} />
        )
    }
}

function initComponentA() {
    ReactDOM.render(
        <CalendarTest/>, document.getElementById("container"))
}

$(document).ready(function() {
    initComponentA();
})
