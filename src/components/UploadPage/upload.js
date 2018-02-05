import React, { Component } from 'react';
import './upload.css';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { getUserInfo } from '../../ducks/user';


const CLOUDINARY_UPLOAD_PRESET = 'zj5sgnrc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rigrater/image/upload';


class Upload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadedFileCloudinaryUrl: '',
            titleName: '',
            compcase: '',
            processor: '',
            gpu: '',
            motherboard: '',
            ram: '',
            powerSupply: '',

            mice: '',
            keyboard: '',
            headset: '',
            microphone: '',
            mousepad: '',
            monitor: '',
        };
        this.updateCase = this.updateCase.bind(this)
        this.updateTitle = this.updateTitle.bind(this)
        this.updateGPU = this.updateGPU.bind(this)
        this.updateMotherboard = this.updateMotherboard.bind(this)
        this.updatePowerSupply = this.updatePowerSupply.bind(this)
        this.updateProcessor = this.updateProcessor.bind(this)
        this.updateRAM = this.updateRAM.bind(this)
    }

    componentDidMount() {
        this.props.getUserInfo()
    }

    onImageDrop(files) {
        console.log(files[0])
        this.setState({
            uploadedFile: files[0]
            
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                })
            }
        })
    }

    onpress() {
        var user = {
            img: this.state.uploadedFileCloudinaryUrl,
            titleName: this.state.titleName,
            authID: this.props.user.auth_id,
            gpu: this.state.gpu,
            ram: this.state.ram,
            motherboard: this.state.motherboard,
            processor: this.state.processor,
            compcase: this.state.compcase,
            powersupply: this.state.powerSupply,

            mice: this.state.mice,
            keyboard: this.state.keyboard,
            headset: this.state.headset,
            microphone: this.state.microphone,
            mousepad: this.state.mousepad,
            monitor: this.state.monitor
        }

        axios.post('/api/cloudinaryImage', user).then(res => {
            console.log(res)
        })

        // axios.post('/api/peripherals', user).then(res => {
        //     console.log(res)
        // })

    }
    updateCase = (val) => {
        this.setState({
            compcase: val
        })
    }
    updateTitle = (val) => {
        this.setState({
            titleName: val
        })
    }
    updateProcessor(val) {
        this.setState({
            processor: val
        })
    }
    updateGPU(val) {
        this.setState({
            gpu: val
        })
    }
    updateMotherboard(val) {
        this.setState({
            motherboard: val
        })
    }
    updateRAM(val) {
        this.setState({
            ram: val
        })
    }
    updatePowerSupply(val) {
        this.setState({
            powerSupply: val
        })
    }
    updateMice(val) {
        this.setState({
            mice: val 
        })
    }
    updateKeyboard(val) {
        this.setState({
            keyboard: val
        })
    }
    updateHeadset(val) {
        this.setState({
            headset: val
        })
    }
    updateMicrophone(val) {
        this.setState({
            microphone: val
        })
    }
    updateMousepad(val) {
        this.setState({
            mousepad: val
        })
    }
    updateMousepad(val) {
        this.setState({
            mousepad: val
        })
    }
    updateMonitor(val) {
        this.setState({
            monitor: val
        })
    }



    render() {


        return (
            <div>
                <NavBar />
                <div className='center'>
                    <div className='uploadAll'>
                        <div className='dropDiv'>
                            <Dropzone className='FileUpload' multiple={false}
                                accept="image/*"
                                onDrop={this.onImageDrop.bind(this)}>
                                <p>Click/Drop Image Here</p>
                            </Dropzone>
                            <p className='showText'>Showcase Photo</p>
                        </div>
                        <div>
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                <div className='center'>
                                    <p>{this.state.uploadedFileCloudinaryUrl.name}</p>
                                    <img className='showcaseImg' src={this.state.uploadedFileCloudinaryUrl} />
                                </div>}
                        </div>

                        

                        <p className='hardwareSpecs'>Name of Setup</p>
                            <br></br>
                            <input onChange={(e) => this.updateTitle(e.target.value)} value={this.state.titleName} className='uploadInput'></input>

                            <p className='hardwareSpecs'>Case:</p>
                            <br></br>
                            <input onChange={(e) => this.updateCase(e.target.value)} value={this.state.compcase} className='uploadInput'></input>

                            <p className='hardwareSpecs'>Processor:</p>
                            <br></br>
                            <input onChange={(e) => this.updateProcessor(e.target.value)} value={this.state.processor} className='uploadInput'></input>

                            <p className='hardwareSpecs'>GPU:</p>
                            <br></br>
                            <input onChange={(e) => this.updateGPU(e.target.value)} value={this.state.gpu} className='uploadInput'></input>

                            <p className='hardwareSpecs'>Motherboard:</p>
                            <br></br>
                            <input onChange={(e) => this.updateMotherboard(e.target.value)} value={this.state.motherboard} className='uploadInput'></input>

                            <p className='hardwareSpecs'>RAM:</p>
                            <br></br>
                            <input onChange={(e) => this.updateRAM(e.target.value)} value={this.state.ram} className='uploadInput'></input>

                            <p className='hardwareSpecs'>Power Supply:</p>
                            <br></br>
                            <input onChange={(e) => this.updatePowerSupply(e.target.value)} value={this.state.powerSupply} className='uploadInput'></input>
                            <br></br>



                            <p className='hardwareSpecs'>Mice:</p>
                            <br></br>
                            <input onChange={(e) => this.updateMice(e.target.value)} value={this.state.mice} className='uploadInput'></input>
                            <br></br>

                            <p className='hardwareSpecs'>Keyboard:</p>
                            <br></br>
                            <input onChange={(e) => this.updateKeyboard(e.target.value)} value={this.state.keyboard} className='uploadInput'></input>
                            <br></br>

                            <p className='hardwareSpecs'>Headset:</p>
                            <br></br>
                            <input onChange={(e) => this.updateHeadset(e.target.value)} value={this.state.headset} className='uploadInput'></input>
                            <br></br>

                            <p className='hardwareSpecs'>Microphone:</p>
                            <br></br>
                            <input onChange={(e) => this.updateMicrophone(e.target.value)} value={this.state.microphone} className='uploadInput'></input>
                            <br></br>

                            <p className='hardwareSpecs'>Mousepad:</p>
                            <br></br>
                            <input onChange={(e) => this.updateMousepad(e.target.value)} value={this.state.mousepad} className='uploadInput'></input>
                            <br></br>

                            <p className='hardwareSpecs'>Monitor:</p>
                            <br></br>
                            <input onChange={(e) => this.updateMonitor(e.target.value)} value={this.state.monitor} className='uploadInput'></input>
                            <br></br>

                            <button className='saveButton' onClick={() => this.onpress()}>SAVE</button>

                        

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps, { getUserInfo })(Upload);