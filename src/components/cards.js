import React, { Component } from 'react'
import '../App.css';
import { Card, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';


export default class Cards extends Component {
    render() {

        const nama = this.props.nama
        const nomor = this.props.nomor
        const alamat = this.props.alamat
        return (
            <Card style={{ background: "#92817a", borderRadius: '25px', minWidth: '20vw' }}>
                Halo {nama}
                <p>Halo2 {nama}</p>
                {nama}

            </Card>
        )
    }
}