import axios from 'axios'
import React from 'react'
import PostData from './data/post.json'
import { Grid, GridItem, Toast } from 'nr1'

export default class Table extends React.Component {
    
    constructor(props) {
        super(props);
        console.debug(props);
        this.state = {
            centre: false,
            value: '',
            statusText: '',
            data: null
        }

        //this.handleClick = this.handleClick.bind(this)
        //this.handleChange = this.handleChange.bind(this);
        //this.toggleChange = this.toggleChange.bind(this);
        //this.getData = this.getData.bind(this);
        //this.renderPostData = this.renderPostData.bind(this);
    }

    async getData() {
        const res = await fetch('../data/post.json');
        const data = await res.json();
        this.setState({ data });
    }

    renderPostData() {
        const postJson = PostData
        let PostDataReturned = postJson.map((postDetail) => {
            return (
                <tr key={postDetail.id}>
                    <td className="organisationnumber"> {postDetail.Category}</td>
                    <td className="organisationname">{postDetail.Name}</td>
                    <td className="actions">
                        <button className="button" value={postDetail.Name} onClick={this.handleClick.bind(this)} id={postDetail.id}> Create Dashboard</button>
                    </td>
                </tr>
            )
        })
        return PostDataReturned
    }

    handleClick = event => {
        // let val = event.target.value
        //console.log(event.target.value)

        console.log(this.state)
        console.log(event.target.id);
        const id = event.target.id - 1
        const postData = PostData
        let datacentre = 'https://api.newrelic.com/v2/dashboards.json';

        if (this.state.centre == true)
        { datacentre =  'https://api.eu.newrelic.com/v2/dashboards.json' }
        else
        { datacentre =  'https://api.newrelic.com/v2/dashboards.json' }

        //alert(this.state.dc + "<DC - Datacentre>" +datacentre)

        try {
            var api = this.state.value;
        } catch (error) {
            // alert("Are you missing the Admin API Key?");
        }
        axios({
            method: 'post',
            url: datacentre,
            headers: { 'X-Api-Key': api, 'Content-Type': 'application/json' },
            data: postData[id].dashboard
        })
            .then(response => {
                console.log(response)
                //alert("Dashboard Created");
                // Swapped out alert in favour of the natural TOAST method in Programmability
                Toast.showToast({
                    title: 'Dashboard Created',
                    description: 'Congratulations on successfully creating your dashboard',
                    type: Toast.TYPE.NORMAL
                })
                // this.setState({ statusText: response.data. });
            })
            .catch(error => {
                //alert("Are you missing the Admin API Key?");
                // Swapped out alert in favour of the natural TOAST method in Programmability
                if (error.message == "Request failed with status code 403")
                {
                    if (this.state.centre == false)
                    {
                        Toast.showToast({
                            title: 'It looks like you may be on the EU Datacentre',
                            description: 'Please Check the EU data centre box top left of the table',
                            type: Toast.TYPE.CRITICAL
                        })
                    } else {
                        Toast.showToast({
                            title: 'It looks like you selected EU Data centre but your account is US based',
                            description: 'Please deselect the EU Data centre box top left of the table',
                            type: Toast.TYPE.CRITICAL
                        })
                    }
                    
                }
                else if(error.message == "Request failed with status code 401"){
                    Toast.showToast({
                        title: 'Are You Missing The Admin API Key???',
                        description: 'You may have forgotten to add your API key',
                        type: Toast.TYPE.CRITICAL
                    })
                }
                else{
                    Toast.showToast({
                        title: error.message,
                        description: 'Unexpected Exception',
                        type: Toast.TYPE.CRITICAL
                    })
                }
                
                console.log(error.message);
            })
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
        // console.log(this.state.value)
    }

    
    toggleChange = event => {
        this.setState({
            centre: event.target.checked
        });
    }
    render() {
        return (
            <div className="page">
                <Grid >
                    <GridItem columnStart={4} columnEnd={8}>
                        <h1>Dashboard Generator</h1>
                        <label htmlFor="DC">EU Datacentre?</label> : <input name="DC" 
                                type="checkbox" 
                                onClick={this.toggleChange}
                        />
                        <table className="layout display responsive-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th colSpan="2">Functions
              <form onSubmit={this.handleSubmit}>
                                            <input type="text" placeholder='Insert Admin API Key here' onChange={this.handleChange} />
                                            <h1></h1>
                                        </form> </th>
                                    <th>
                                    </th>
                                </tr>
                                {this.renderPostData()}
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </GridItem>
                </Grid>
            </div>
        );
    }
}