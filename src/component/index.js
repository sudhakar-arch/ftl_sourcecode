import React, { Component } from 'react';
import DatePicker from "react-datepicker";
//import DatePicker from 'react-date-picker'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
const axios = require('axios');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      startDate: new Date(),
      show:false,
      setShow:false,
      givenDate:''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  handleChange = date => {
    this.setState({
      startDate: date,
      givenDate: date.toLocaleDateString()
    });
  };

  handleClose = () =>{
    this.setState({
      setShow: false
    });
  }

  handleShow = () =>{
    this.setState({
      setShow: true
    });
  }
  
  getDate = (userTime) => {
    const userDate = userTime;
    return userDate;
  }

  getUserData = () => {
    const url = "https://run.mocky.io/v3/0131dd83-76e0-414a-8d64-238a01f05d83";
    let config = { method: 'get', url: url };
    return new Promise((resolve, reject) => {
      axios(config)
        .then(response => {
          resolve(response);
          console.log(response.data);
          this.setState({
            userData: response?.data?.members ? response.data.members : ''
          })
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  render() {

    return (
      <>
        <table class="ui celled table">
          <thead>
            <tr><th>Id</th>
              <th>Name</th>
              <th>Place</th>
              <th>Click to see Active Time</th>
            </tr></thead>
          {this.state.userData.map(user => {
            return (
              <>
                <tbody>
                  <tr>
                    <td data-label="id">{user.id}</td>
                    <td data-label="name">{user.real_name}</td>
                    <td data-label="place">{user.tz}</td>
                    <td><button class="ui button" onClick={this.handleShow}>View</button></td>
                  </tr>
                  <Modal show={this.state.setShow} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>User Active Time Details</Modal.Title>
        </Modal.Header>
          <p>Select Date to view the active time on that day</p>
          <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          name="startDate"
          dateFormat="MM/dd/yyyy"
        />
        {user.activity_periods.map(timePeriod =>{
            const userTime = timePeriod.start_time;
            const userDate = this.getDate(userTime);
            console.log(userTime);
            return(
              <>
              
              </>
            )
          })
        }
        </Modal>
                </tbody>
              </>
            )
          })
          }
        </table>
        {/* <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      {/* <Modal show={this.state.setShow} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>User Active Time Details</Modal.Title>
        </Modal.Header>
          <p>Select Date to view the active time on that day</p>
          <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          name="startDate"
          dateFormat="MM/dd/yyyy"
        />
        {
          this.state.userData.map(user => {
          user.activity_periods.map(timePeriod =>{
            const userDate = timePeriod.start_time;
            console.log(userDate);
            return(
              <>
              
              </>
            )
          })
        })
        }
        </Modal> */}
        
      </>
    );
  }
}

export default Home;