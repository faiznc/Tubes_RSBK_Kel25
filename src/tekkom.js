import React, { Component } from "react";
import axios from "axios";
import { Modal, Card } from "antd";
import { Row, Col, Space, Layout } from 'antd';
import "antd/dist/antd.css";
import './tekkom.css';
import Button1 from './components/button';
import Input from './components/input';
import Cards from './components/cards';
const { Header, Footer, Content } = Layout;

// const url = "http://36.80.179.203/api/index.php/kontak";
const url = "http://localhost/api/index.php/kontak";

export default class tekkom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tekkom: [],
            visible: false,
            visible2: false,
            visible_advanced: false,
            id_update: "",
            nama: "",
            alamat: "",
            nomor: "",
            cari: ""
        };
    }

    handleButton = (nama, alamat, nomor, id) => {
        alert("ID:" + id + " - Bapak/Ibu " + nama + " bertempat tinggal di " + alamat + " (" + nomor + ")");
    };
    handleTambahOrang = () => {
        this.setState({
            visible: true,
        });
    };

    handleUpdateButton = (id_update, nama, nomor, alamat) => {
        this.setState({
            visible2: true,
            id_update: id_update,
            nama: nama,
            nomor: nomor,
            alamat: alamat,
        });
        console.log(this.state.nama);
    };

    handleAdvanced = () => {
        var a_var = this.state.visible_advanced;
        this.setState({
            visible_advanced: !a_var,
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

    handleUpdate = () => {
        // console.log(id);
        console.log("KIRIM");

        var value = {
            id: this.state.id_update,
            nama: this.state.nama,
            nomor: this.state.nomor,
            alamat: this.state.alamat,
        }

        if (
            this.state.nama !== "" &&
            this.state.nomor !== "" &&
            this.state.alamat !== ""
        ) {
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
                        window.location.reload();
                    }
                })
                .catch(function (response) {
                    alert("Terjadi Masalah");
                });
        }
        else {
            alert("pastikan semua kolom terisi");
        }
    }

    componentDidMount() {
        axios({
            method: "get",
            url: url,

            headers: { 'content-type': 'application/x-www-form-urlencoded' },
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
        return (
            <Layout className="layout">

                <Header className="my-header">
                    <Row>
                        <Col span={8} className="header-columns">
                            <Button1 onClick={this.handleTambahOrang}>Tambah Kontak</Button1>
                        </Col>
                        <Col span={8} className="header-columns">
                            <h2 onClick={this.handleAdvanced} >List data kontak</h2>
                        </Col>
                        <Col span={8} className="header-columns">
                            <Input type="text" placeholder="Cari..." onKeyUp={this.handleCari} />
                        </Col>
                    </Row>
                </Header>

                {<Modal
                    title="Tambah Kontak"
                    centered='true'
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={() => this.setState({ visible: false })}
                    width={500}
                >
                    <div style={{ textAlign: "center" }}>
                        <p>Nama Anggota : </p>
                        <input
                            type="text"
                            placeholder="Nama"
                            onChange={this.handleNama}
                        />
                        <br />
                        <br></br>
                        <p>Nomor Telepon : </p>
                        <input
                            type="text"
                            placeholder="Nomor Telp."
                            onChange={this.handleNomor} />
                        <br />
                        <br></br>
                        <p>Alamat : </p>
                        <input
                            type="text"
                            placeholder="Alamat"
                            onChange={this.handleAlamat}
                        />
                        <br />
                    </div>
                </Modal>}

                {<Modal
                    title="Ubah Kontak"
                    centered='true'
                    visible={this.state.visible2}
                    onOk={this.handleUpdate}
                    onCancel={() => this.setState({ visible2: false })}
                    width={500}
                >
                    <div style={{ textAlign: "center" }}>
                        <p>Nama Anggota : </p>
                        <input
                            type="text"
                            placeholder="Nama"
                            onChange={this.handleNama}
                            value={this.state.nama}
                        />
                        <br />
                        <br></br>
                        <p>Nomor Telepon : </p>
                        <input
                            type="text"
                            placeholder="Nomor Telp."
                            onChange={this.handleNomor}
                            value={this.state.nomor} />
                        <br />
                        <br></br>
                        <p>Alamat : </p>
                        <input
                            type="text"
                            placeholder="Alamat"
                            onChange={this.handleAlamat}
                            value={this.state.alamat}
                        />
                        <br />
                    </div>
                </Modal>}

                <Content style={{ background: "#16697a" }}>
                    <br></br>

                    <center>
                        <Space direction="vertical" align='center' size='large'>

                            {this.state.tekkom.map((results, index) => {

                                var rendered =
                                    // --------------- INI yang bakal di render --------------------
                                    (
                                        <Space direction="horizontal">
                                            <div className="card" key={results.id}>

                                                <Card style={{ background: "#f8f1f1", minWidth: '20vw' }}>
                                                    <Cards nama={results.nama} nomor={results.nomor} alamat={results.alamat} ></Cards>
                                                    <br></br>
                                                    <Button1 className="button" onClick={() => this.handleButton(results.nama, results.alamat, results.nomor, results.id)}>Detail</Button1>
                                                    <br></br>
                                                    <br style={{ display: this.state.visible_advanced === true ? "flex" : "none" }}></br>
                                                    <Button1 style={{ display: this.state.visible_advanced === true ? "flex" : "none" }} className="button" onClick={() => this.handleUpdateButton(results.id, results.nama, results.nomor, results.alamat)}>Update Kontak {results.nama}</Button1>
                                                </Card>

                                            </div>
                                        </Space>
                                    )

                                if (results.nama.toLowerCase().includes(this.state.cari.toLowerCase())) {
                                    return (rendered);
                                    // return (index);
                                }
                                return (''); // Psst HAPUS AJA hehehe
                            })}
                        </Space>
                    </center>
                </Content>

                <Footer className='my-footer'>
                    <h2>Made by Kel 25</h2>
                </Footer>

            </Layout>
        );
    }
}
