import React from 'react';
import { Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function CardYugi(props) {
    return (
        <div className="card-yugi d-flex flex-column">
            <Zoom
                zoomMargin={40}
                overlayBgColorEnd="#030343BF"
                style={{ cursor: "zoom-in" }}
                openText=""
                closeText=""
                wrapStyle={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, marginTop: 20 }}
            >
            <img src={props.img} width="160" className="img-fluid ml-auto mr-auto" alt="" />
            </Zoom>
            <h5 className="kartu-title">{props.title}</h5>
            <p className="kartu-desc mb-4">{props.type}</p>
            <Button className="btn-custom" onClick={props.onClick} >{props.btnTitle}</Button>
        </div>
    )

}

CardYugi.defaultProps = {
    title: "Nama Kartu",
    type: "Jenis Kartu",
    btnTitle: "Detail Kartu",
    img: "/images/darkhole.jpg"
};

export default CardYugi;