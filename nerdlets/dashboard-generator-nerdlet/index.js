import React from 'react';
import PropTypes from 'prop-types';
import Table from './table'

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class MyAwesomeNerdpack extends React.Component {
    static propTypes = {
        nerdletUrlState: PropTypes.object,
        launcherUrlState: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,

    };

    render() {
        return (<
            Table />
        )
    };


}