import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <div className = "info">
                <h3 className="m-3">How can Texans slow the spread of COVID-19?</h3>
                <li className="mb-3">
                    <ul>The next two weeks are critical in slowing the spread of COVID-19. Texans must act now.</ul>
                    <ul>Stay home as much as possible, especially if you are sick, older, and/or have a medical condition.</ul>
                    <ul>If you are sick, stay home except to access medical care. If you are able to take care of yourself, stay home. If you need to see your doctor, call ahead.</ul>
                    <ul>Avoid gatherings of more than 10 people and non-essential trips into public.</ul>
                    <ul>Cancel events of more than 10 people.</ul>
                    <ul>Limit close contact (at least six feet) with other people.</ul>
                    <a href = "https://www.dshs.state.tx.us/news/updates.shtm#coronavirus">More info at dshs.state.tx.us</a>
                </li>

            </div>
        );
    }
}
 
export default Info;