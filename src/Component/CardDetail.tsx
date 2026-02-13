import React from 'react';
import { Button } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function CardDetail(props: any) {
    return (
        <div className="sticky-top custom-sticky overflow-auto sticky-detail" style={{ top: 110 }}>
            {
                (props.detailLoading === false) ?
                    <div className="d-flex flex-column">
                        <Zoom
                            zoomMargin={100}
                        >
                            <img src={props.detailKartu.length > 0 ? props.detailKartu[0].card_images[0].image_url : null} width="260" alt="" />
                        </Zoom>
                        <h4 className="detail-card-title mt-2" style={{ width: '90%' }}>{props.detailKartu.length > 0 ? props.detailKartu[0].name : null}</h4>
                        <p className="detail-desc">{props.detailKartu.length > 0 ? props.detailKartu[0].type : null}</p>

                        {
                            (props.detailKartu.length > 0) ?
                                (props.detailKartu[0].type === "Monster" || props.detailKartu[0].type === "Effect Monster" || props.detailKartu[0].type === "Normal Monster") ?
                                    <div className="d-flex flex-row ">
                                        <div className="d-flex flex-row mr-4">
                                            <img src="/images/pedang.svg" width="24" alt="" />
                                            <p className="ml-2 my-auto">{props.detailKartu[0].atk}</p>
                                        </div>

                                        <div className="d-flex flex-row">
                                            <img src="/images/perisai.svg" width="24" alt="" />
                                            <p className="ml-2  my-auto">{props.detailKartu[0].def}</p>
                                        </div>
                                    </div>
                                    : null
                                : null
                        }

                        <div className="mt-4">

                            {
                                (props.detailKartu.length > 0) ?
                                    <>
                                        <h5 className="detail-card-title mt-2">Race : </h5>
                                        <p className="detail-desc">{props.detailKartu.length > 0 ? props.detailKartu[0].race : null} </p>
                                    </>
                                    : null
                            }

                            {
                                (props.detailKartu.length > 0) ?
                                    (props.detailKartu[0].hasOwnProperty('level')) ?
                                        <>
                                            <h5 className="detail-card-title mt-2">Level : </h5>
                                            <p className="detail-desc">{props.detailKartu[0].level}</p>
                                        </>
                                        : null
                                    : null
                            }

                            {
                                (props.detailKartu.length > 0) ?
                                    (props.detailKartu[0].hasOwnProperty('attribute')) ?
                                        <>
                                            <h5 className="detail-card-title mt-2">Attribute : </h5>
                                            <p className="detail-desc">{props.detailKartu[0].attribute}</p>
                                        </>
                                        : null
                                    : null
                            }

                            {
                                (props.detailKartu.length > 0) ?
                                    (props.detailKartu[0].hasOwnProperty('archetype')) ?
                                        <>
                                            <h5 className="detail-card-title mt-2">Archetype : </h5>
                                            <p className="detail-desc">{props.detailKartu[0].archetype}</p>
                                        </>
                                        : null
                                    : null
                            }

                            {
                                (props.detailKartu.length > 0) ?
                                    <>
                                        <h5 className="detail-card-title mt-2">Description : </h5>
                                        <p className="detail-desc" style={{ width: '90%' }}>{props.detailKartu.length > 0 ? props.detailKartu[0].desc : null}</p>
                                    </>
                                    : null
                            }

                        </div>
                    </div>
                    :
                    <SkeletonTheme highlightColor="#444">
                        <Skeleton height={380} width={260} className="align-self-center" />
                        <Skeleton className="mt-5" width={260} height={30} duration={2} />
                        <div className="mt-4"></div>
                        <Skeleton className="mt-2" width={200} height={24} count={6} duration={2} />
                    </SkeletonTheme>
            }
        </div>
    )

}

CardDetail.defaultProps = {

};

export default CardDetail;
