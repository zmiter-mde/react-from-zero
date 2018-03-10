import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
        this.pickFile = this.pickFile.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('user', 'zmiter');

        api.post(
            //'http://localhost:8080/posters/upload'
            'https://postersby.herokuapp.com/upload',
            data
        ).then(res => {
            this.setState({open: true});
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

    pickFile() {
        this.filePicker.click();
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];


        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div></div>);
        }

        return (
            <div className={styles.centered}>
                <RaisedButton primary={true}
                              label="Pick a File"
                              onClick={this.pickFile}
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
                    {$imagePreview}
                </div>

                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}

export default Main;