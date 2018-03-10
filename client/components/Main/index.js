import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import { api } from '../../utils/api';

import styles from './main.scss';

class Main extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openFilePicker = this.openFilePicker.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    handleSubmit(e) {
        let data = new FormData();
        data.append('file', this.state.file);
        data.append('user', 'zmiter');

        api.post(
            //'http://localhost:8080/posters/upload'
            'https://postersby.herokuapp.com/upload',
            data
        ).then(res => {
            this.openPopup();
        });
    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    openFilePicker() {
        this.filePicker.click();
    }

    openPopup = () => {
        this.setState({open: true});
    };

    closePopup = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div className={styles.centered}>
                <RaisedButton primary={true}
                              label="Pick a File"
                              onClick={this.openFilePicker}
                              className={styles.margined}/>
                <input id="fileUpload"
                       className="fileInput"
                       type="file"
                       onChange={(e)=>this.handleImageChange(e)}
                       ref={instance => { this.filePicker = instance; }}
                       hidden />
                <RaisedButton secondary={true}
                              label="Upload Image"
                              onClick={(e)=>this.handleSubmit(e)}/>

                <div className={styles.imgPreview}>
                    {this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl}/>}
                </div>

                <Dialog title="Poster image uploaded"
                        open={this.state.open}
                        onRequestClose={this.closePopup}
                        actions={[
                            <RaisedButton
                                label="Ok"
                                secondary={true}
                                keyboardFocused={true}
                                onClick={this.closePopup}
                            />,
                        ]}>
                    Your image for poster is successfully uploaded. We'll contact you soon
                </Dialog>
            </div>
        );
    }
}

export default Main;