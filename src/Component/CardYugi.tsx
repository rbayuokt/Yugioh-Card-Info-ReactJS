import React from 'react';
import { Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { AiFillHeart } from "react-icons/ai";

function CardYugi(props: any) {
    return (
        <div className="card-yugi d-flex flex-column">
            <Zoom
                zoomMargin={40}
            >
                <img src={props.img} width="160" className="img-fluid ml-auto mr-auto" alt="" />
            </Zoom>
            <h5 className="kartu-title">{props.title}</h5>
            <p className="kartu-desc mb-4">{props.type}</p>
            <div className="d-flex flex-row justify-content-between">
                <Button className="btn-custom" onClick={props.onClick} >{props.btnTitle}</Button>
                <Button className="btn-outline-custom" onClick={props.onFav} ><AiFillHeart /></Button>
            </div>
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
