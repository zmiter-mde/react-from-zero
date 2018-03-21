import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import { api } from '../../utils/api';

import styles from './imageUpload.scss';

const CONTEXT = process.env.AUTH_API;

class ImageUpload extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            open: false,
            newImageId: null,
            gotNewImage: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openFilePicker = this.openFilePicker.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.getNewImage = this.getNewImage.bind(this);
    }

    handleSubmit(e) {
        let data = new FormData();
        data.append('file', this.state.file);
        data.append('user', 'zmiter');

        api.post('posters', data)
            .then(res => {
                this.openPopup(res.fileId);
            });
    }

    handleImageChange(e) {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                gotNewImage: false
            });
        };

        reader.readAsDataURL(file);
    }

    getNewImage(e) {
        this.setState({gotNewImage: true});
    }

    openFilePicker() {
        this.filePicker.click();
    }

    openPopup = (newImageId) => {
        this.setState({
            open: true,
            newImageId: newImageId
        });
    };

    closePopup = () => {
        this.setState({
            open: false,
            imagePreviewUrl: null
        });
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
                       onChange={this.handleImageChange}
                       ref={instance => { this.filePicker = instance; }}
                       hidden />
                <RaisedButton secondary={true}
                              label="Upload Image"
                              onClick={this.handleSubmit}/>

                <RaisedButton secondary={true}
                              label={`Check Image With Id = ${this.state.newImageId}`}
                              onClick={this.getNewImage} disabled={!this.state.newImageId}/>

                <div className={styles.imgPreview}>
                    {this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl}/>}
                </div>

                <div className={styles.imgPreview}>
                    {this.state.gotNewImage && <img src={`${ CONTEXT }posters/${this.state.newImageId}/image`}/>}
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
                    Your image for poster is successfully uploaded with id = {this.state.newImageId}. We'll contact you soon
                </Dialog>
            </div>
        );
    }

}

export default ImageUpload;