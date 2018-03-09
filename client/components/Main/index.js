import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import styles from './main.scss';

class Main extends Component {

    filePicker = undefined;

    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pickFile = this.pickFile.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    pickFile() {
        this.filePicker.click();
    }

    render() {
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
                           onChange={(e)=>this._handleImageChange(e)}
                           ref={instance => { this.filePicker = instance; }}
                           hidden />
                    <RaisedButton secondary={true}
                                  label="Upload Image"
                                  onClick={(e)=>this.handleSubmit(e)}/>
                    <div className={styles.imgPreview}>
                        {$imagePreview}
                    </div>
            </div>
        );
    }
}

export default Main;