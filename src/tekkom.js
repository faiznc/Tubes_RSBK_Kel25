import React, { Component } from "react";
import axios from "axios";
import { Modal, Card } from "antd";
import { Typography, Row, Col, Space, Layout } from 'antd';
import "antd/dist/antd.css";
import './tekkom.css';
import Button1 from './components/button';
import Input from './components/input';

import Cards from './components/cards';


const { Header, Footer, Content } = Layout;


// const url = "http://36.80.179.203/api/index.php/kontak";
const url = "http://localhost/api/index.php/kontak";

var pilih = true;

export default class tekkom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tekkom: [],
            visible: false,
            nama: "",
            alamat: "",
            nomor: "",
            cari: ""
        };
    }

    handleButton = (nama, alamat, nomor) => {
        alert("Bapak/Ibu " + nama + " bertempat tinggal di " + alamat + " (" + nomor + ") ");
    };
    handleTambahOrang = () => {
        this.setState({
            visible: true,
        });
    };

    handleCari = (e) => {
        this.setState({
            cari: e.target.value,
        });
        console.log(this.state.cari);
    };

    handleNama = (e) => {
        this.setState({
            nama: e.target.value,
        });
        console.log(this.state.nama);
    };

    handleNomor = (e) => {
        this.setState({
            nomor: e.target.value,
        });
        console.log(this.state.nomor);
    };
    handleAlamat = (e) => {
        this.setState({
            alamat: e.target.value,
        });
        console.log(this.state.alamat);
    };

    handleSubmit = () => {
        if (
            this.state.nama !== "" &&
            this.state.nomor !== "" &&
            !this.state.alamat !== ""
        ) {
            axios({
                method: "post",
                url: url,
                headers: {
                    accept: "*/*",
                },
                data: {
                    nama: this.state.nama,
                    nomor: this.state.nomor,
                    alamat: this.state.alamat,
                },
            })
                .then((data) => {
                    alert("berhasil menambahkan");
                    window.location.reload();
                })
                .catch((error) => {
                    alert("gagal lur");
                });
        } else {
            alert("pastikan semua kolom terisi");
        }
    };

    handleUpdate = (id, nama, nomor, alamat) => {

        var value = {
            id: id,
            nama: 'Ganti',
            nomor: nomor,
            alamat: alamat,
        }

        axios({
            method: "put",
            url: url,
            headers: {
                accept: "*/*",
            },
            data: value,
        })

            .then(function (response) {
                if (response.status === 200) {
                    console.log("Update Success");
                    alert("Berhasil Update");
                }
            })
            .catch(function (response) {
                console.log(response);
                alert("Terjadi Masalah");
            });
    }

    componentDidMount() {
        axios({
            method: "get",
            url: url,

            headers: { 'content-type': 'application/x-www-form-urlencoded' },

            proxy: {
                host: '172.67.182.58',
                port: 80
            }

        })
            .then((data) => {
                // console.log(data.data);
                this.setState({
                    tekkom: data.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        if (pilih === true) {

            return (
                <Layout className="layout">

                    <Header className="my-header">
                        <Row>
                            <Col span={8} className="header-columns">
                                <Button1 onClick={this.handleTambahOrang}>Tambah Kontak</Button1>
                            </Col>
                            <Col span={8} className="header-columns">
                                <h2>List data kontak</h2>
                            </Col>
                            <Col span={8} className="header-columns">
                                <Input type="text" placeholder="Cari..." onKeyUp={this.handleCari} />
                            </Col>
                        </Row>
                    </Header>

                    {<Modal
                        title="Tambah Data"
                        centered='true'
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={() => this.setState({ visible: false })}
                        width={500}
                    >
                        <div style={{ textAlign: "center" }}>
                            <p>Nama Anggota : </p>{" "}
                            <input
                                type="text"
                                placeholder="Nama"
                                onChange={this.handleNama}
                            />
                            <br />
                            <br></br>
                            <p>Nomor Telepon : </p>{" "}
                            <input type="text" placeholder="Nomor Telp." onChange={this.handleNomor} />
                            <br />
                            <br></br>
                            <p>Alamat : </p>{" "}
                            <input
                                type="text"
                                placeholder="Alamat"
                                onChange={this.handleAlamat}
                            />
                            <br />
                        </div>
                    </Modal>}


                    <Content style={{background:"#16697a"}}>
                        <br></br>
                        <center>
                        <Space direction="vertical" align='center' size='large'>

                            {this.state.tekkom.map((results, index) => {
                                console.log(index);
                                // console.log(results);

                                // console.log(results.nama);
                                var rendered =
                                    // --------------- INI yang bakal di render --------------------
                                    (
                                        // <Space direction="horizontal">  // Niatnya mau buat 2 kontak per baris vertikal, tapi ...
                                            <div className="card" key={results.id}>

                                                <Card style={{ background: "#f8f1f1", minWidth: '20vw' }}>
                                                    <div className="card-body">
                                                        <h5 >Nama : {results.nama}</h5>
                                                        <h6 >
                                                            Nomor Telepon : {results.nomor}
                                                        </h6>
                                                    </div>
                                                    <button className="button" onClick={() => this.handleButton(results.nama, results.alamat, results.nomor)}>Detail</button>
                                                    <button className="button" onClick={() => this.handleUpdate(results.id, results.nama, results.alamat, results.nomor)}>Update Kontak {results.nama}</button>
                                                </Card>

                                            </div>
                                        // {/* </Space> */}
                                    )

                                if (results.nama.toLowerCase().includes(this.state.cari.toLowerCase())) {  // Akan mengeksekusi jika objek sesuai dgn yg dicari
                                    // console.log("Good");
                                    return (rendered);
                                    // return (index);
                                }

                                return (''); // Psst HAPUS AJA hehehe

                            })}

                        </Space>
                        </center>
                    </Content>
                </Layout>
            );
        }
    }
} 