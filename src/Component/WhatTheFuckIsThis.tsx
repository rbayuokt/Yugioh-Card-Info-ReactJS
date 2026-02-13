import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

function WhatTheFuckIsThis(props: any) {
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body >
                    <video loop={true} autoPlay={true} className="img-fluid">
                        <source src="/images/exodia.mp4" type="video/mp4"  className="text-center"/>
                    </video>
                </Modal.Body>
            </Modal>
        </>
    )

}

WhatTheFuckIsThis.defaultProps = {

};

export default WhatTheFuckIsThis;
