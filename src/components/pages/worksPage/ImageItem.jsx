import React, {Component} from "react";
import "./ImageItem.css"
import {Link} from "react-router-dom";

export default class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.media.id,
            title: props.media.title,
            photo: props.media.photo,
            type: props.media.type.name,
            publicationDate: props.media.publicationDate,
        };
    }

    render() {

        let {
            photo, title, type, publicationDate, id
        } = this.state;
        const index = publicationDate.indexOf(":");
        const date = publicationDate.substring(0, index - 3);
        photo = "data:image/png;base64," + photo;

        const url = `/media/${id}`;
        return (
            <div className="p-2 column">
                <Link style={{display: "block"}} to={url} >
                    <div className="p-2">
                        <img className="img-fluid img-item" src={photo} alt=""/>
                    </div>
                </Link>
                <div>
                    <p className="h5 item">
                        {title}
                    </p>
                    <p className="item">
                        {type}
                    </p>
                    <p className="item">
                        {date}
                    </p>
                </div>
            </div>
        )
    }
}