import React, { Component } from 'react'
import '../App.css';
import { Card } from 'antd';

export default class Cards extends Component {
    render() {

        const nama = this.props.nama
        const nomor = this.props.nomor
        const alamat = this.props.alamat
        return (
            <Card style={{ background: "#92817a", borderRadius: '25px', minWidth: '20vw' }}>
                <h3>{nama}</h3>
                <h4>{nomor}</h4>
                <h4>{alamat}</h4>
            </Card>
        )
    }
}