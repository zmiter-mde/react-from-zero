import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import styles from './main.scss';

const checkStatus = (response) => {
    return response;
};

const parseJSON = (response) => response.json();

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
    }

    handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('user', 'zmiter')

        fetch('http://localhost:8080/posters/upload', {
            method: 'POST',
            body: data
        }).then(this.checkStatus);
    }

    handleImageChange(e) {
        e.preventDefault();

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
        fetch(
            //'http://localhost:8080/posters/status',
        'https://postersby.herokuapp.com/status',
        {
            method: 'GET'
        }).then(checkStatus).then(parseJSON).then(json => {
            console.log(json);
        });

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div></div>);
        }

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