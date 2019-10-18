import axios from 'axios'
import React from 'react'
import PostData from './data/post.json'
import { Grid, GridItem } from 'nr1'

class Button extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    constructor(props) {
        super(props);
        console.debug(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this);

        state = {
            value: '',
            statusText: ''
        }

    }
}
export default class Table extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.

    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    async getData() {
        const res = await fetch('../data/post.json');
        const data = await res.json();
        return this.setState({ data });
    }

    renderPostData() {
        const postJson = PostData
        let PostDataReturned = postJson.map((postDetail) => {
            return (
                <tr>
                    <td className="organisationnumber"> {postDetail.Category}</td>
                    <td className="organisationname">{postDetail.Name}</td>
                    <td class="actions">
                        <button className="button" value={postDetail.Name} onClick={this.handleClick} id={postDetail.id}> Create Dashboard</button>
                    </td>
                </tr>
            )
        })
        return PostDataReturned
    }

    handleClick = (event) => {
        // let val = event.target.value
        //console.log(event.target.value)
        const id = event.target.id - 1
        const postData = PostData

        try {
            var api = this.state.value;
        } catch (error) {
            // alert("Are you missing the Admin API Key?");
        }
        axios({
            method: 'post',
            url: 'https://api.newrelic.com/v2/dashboards.json',
            headers: { 'X-Api-Key': api, 'Content-Type': 'application/json' },
            data: postData[id].dashboard
        })
            .then(function (response) {
                console.log(response)
                alert("Dashboard Created");
                // this.setState({ statusText: response.data. });
            })
            .catch(function (error) {
                alert("Are you missing the Admin API Key?");
                console.log(error);
            })
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
        // console.log(this.state.value)
    }

    render() {
        return (
            <div class="page">
                <Grid >
                    <GridItem columnStart={4} columnEnd={8}>
                        <h1>Dashboard Generator</h1>
                        <table class="layout display responsive-table">
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