import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ApiServices from '../Services/ApiServices'
import { Button, Row, Container, Col, Navbar, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AiOutlineSearch, AiFillGithub, AiFillLinkedin, AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//komponen
import CardYugi from '../Component/CardYugi';
import CardDetail from '../Component/CardDetail';
import WhatTheFuckIsThis from '../Component/WhatTheFuckIsThis';

function Home() {

    interface Card {
        name: string;
        type: string; // Assurez-vous de remplacer cela par le type correct
        card_images: { image_url: string }[]; // Assurez-vous de remplacer cela par le type correct
    }

    const [listKartu, setListKartu] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);
    const [jumCard, setJumCard] = useState(21);

    //search
    const [searchText, setSearchText] = useState("");
    const [searchNotFound, setSearchNotFound] = useState([]);

    const [detailKartu, setDetailKartu] = useState([]);

    //modal
    const [modalShow, setModalShow] = useState(false)
    const [wtf, setWtf] = useState([])

    useEffect(() => {
        getAllCard()
    }, [])

    const getAllCard = () => {
        ApiServices.get('cardinfo.php')
            .then((response) => {
                let res = response.data.data
                // console.log("DATANA", res);
                setListKartu(res)
            }).catch((error) => {
            console.log("error")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const getDetailCard = (name: any) => {
        setDetailLoading(true)
        ApiServices.get(`cardinfo.php?name=${name}`)
            .then((response) => {
                let detail = response.data.data
                setDetailKartu(detail)
                console.log(detail)
            }).finally(() => {
            setDetailLoading(false)
        })
    }

    const getSearchCard = (name: string | null) => {
        // setSearchNotFound("")
        if (name === "" || name === null) {
            getAllCard()
            setSearchNotFound([])
            setDetailKartu([])
        } else {
            ApiServices.get(`cardinfo.php?name=${name}`)
                .then((response) => {
                    let detail = response.data.data
                    setListKartu(detail)
                    setDetailKartu([])
                    console.log(detail)
                    scrollTopTop()
                }).catch((error) => {
                setSearchNotFound(error.response.data)
                setListKartu([])
                setDetailKartu([])
                scrollTopTop()
                console.log(error.response.data)
            })
        }
    }

    const getWtf = (data: never) => {
        let temp = [...wtf];
        temp.push(data)
        setWtf(temp)
        toast.dark(`👁️ Mengambil Kartu ${data}`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const scrollTopTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /*useEffect(() => {
        // console.log(wtf)
        let tanganKiri = false;
        let tanganKanan = false;
        let kakiKiri = false;
        let kakiKanan = false;
        let kepala = false;

        if (wtf.includes("Left Arm of the Forbidden One")) {
            tanganKiri = true;
        }

        if (wtf.includes("Right Arm of the Forbidden One")) {
            tanganKanan = true;
        }

        if (wtf.includes("Left Leg of the Forbidden One")) {
            kakiKiri = true;
        }

        if (wtf.includes("Right Leg of the Forbidden One")) {
            kakiKanan = true;
        }

        if (wtf.includes("Exodia the Forbidden One")) {
            kepala = true;
        }

        if (tanganKiri && tanganKanan && kakiKiri && kakiKanan && kepala) {
            setModalShow(!modalShow)
            toast.dark(`SUMMON EXODIA !!!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [wtf])*/

    return (
        <>
            {
                (!isLoading) ?
                    <>
                        <ToastContainer />
                        <Navbar bg="light" expand="lg" className="custom-nav" sticky="top">
                            <Container>
                                <Col xs={12} md={4} lg={4}>
                                    <Navbar.Brand href="/" className="d-flex">
                                        <img
                                            alt="gambar"
                                            src="/images/logo.png"
                                            width="150"
                                            height="32"
                                            className="d-inline-block align-top img-fluid mx-auto"
                                        />
                                    </Navbar.Brand>
                                </Col>

                                <Col xs={12} md={8} lg={8}>
                                    <Form onSubmit={(e) => {
                                        e.preventDefault()
                                        getSearchCard(searchText)
                                    }
                                    }
                                          className="d-flex align-items-center">
                                        <InputGroup className="mb-3 my-auto">
                                            <InputGroup>
                                                <InputGroup.Text id="basic-addon1" className="icon-search"><AiOutlineSearch size={24} /> </InputGroup.Text>
                                            </InputGroup>
                                            <FormControl type="text" placeholder="Cari Kartu. . ." className="searchbox" onChange={(event) => setSearchText(event.target.value)} onBlur={() => getSearchCard(searchText)} />
                                        </InputGroup>
                                    </Form>
                                </Col>
                            </Container>
                        </Navbar>

                        <Container style={{ paddingBottom: 30 }}>
                            <Row>
                                <Col xs={6} sm={12} md={4} lg={4}>
                                    <CardDetail detailLoading={detailLoading} detailKartu={detailKartu} />
                                </Col>

                                <Col xs={6} sm={12} md={8} lg={8}>
                                    <Row className="mt-1">
                                        {/*{(searchNotFound !== "") ? <p>{searchNotFound.error}</p> : null}*/}
                                        {
                                            listKartu.slice(0, jumCard).map((datana, index) => {
                                                return (
                                                    // <p>Wow</p>
                                                    <Col xs={12} sm={12} md={6} lg={4} className="my-3" key={index.toString()}>
                                                        <CardYugi title={datana.name} type={datana.type} img={datana.card_images[0].image_url} onClick={() => getDetailCard(datana.name)} />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    {
                                        (listKartu.length > 1) ?
                                            <Button className="btn-load my-4" onClick={() => setJumCard(jumCard + 21)}>Load More...</Button>
                                            : null
                                    }
                                </Col>
                            </Row>

                            <WhatTheFuckIsThis
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />

                        </Container>

                        <Container className="my-3">
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <div className="text-center">
                                        <a href="https://github.com/rbayuokt" target="_nblank" className="link">
                                            <AiFillGithub size={24} className="mr-2" />
                                        </a>
                                        <a href="http://linked.in/rbayuokt" target="_nblank" className="link">
                                            <AiFillLinkedin size={24} className="mr-2" />
                                        </a>
                                        <a href="https://www.facebook.com/RizkybayuCheater" target="_nblank" className="link">
                                            <AiFillFacebook size={24} className="mr-2" />
                                        </a>
                                        <a href="https://twitter.com/rbayuokt" target="_nblank" className="link">
                                            <AiFillTwitterSquare size={24} className="mr-2" />
                                        </a>
                                    </div>
                                    <p className="copy text-center mt-3">&copy; 2020 Rizky Bayu Oktavian</p>
                                </Col>
                            </Row>
                        </Container>
                    </>
                    :
                    <SkeletonTheme highlightColor="#444">
                        <Container style={{ marginTop: 100 }}>
                            <Row>
                                <Col xs={6} sm={6} md={4} lg={4}>

                                </Col>
                                <Col xs={6} sm={6} md={8} lg={8}>
                                    <Row className="mt-1">
                                        <Skeleton width={230} height={360} count={3} style={{ marginLeft: 20, borderRadius: 16 }} duration={2} />
                                    </Row>

                                    <Row className="mt-3">
                                        <Skeleton width={230} height={360} count={3} style={{ marginLeft: 20, borderRadius: 16 }} duration={2} />
                                    </Row>

                                </Col>
                            </Row>
                        </Container>
                    </SkeletonTheme>
            }
        </>
    );
}

export default Home;


console.log(`%c
...-''''''-...
..-''     ....     ''-.
..-'   ..--'''    ''''-..  '.
.-'    ..'                  '.. '-.
;    .-'                        '.  '-.
'-.-'           .----..           '-.  '-...
    .-''...... ''..          '-.    ''-........
 .-'.-'';'    '... '-.          ''-...         ;
.' .'  .'        '.'-. '-.             ''''--'''
..-' .'    .              '.  '-..
.' .-''      .          '     '-..  ''-..
'.. ''--.      .         '         '-.... ''--..
'''--.''-..  .      .'       .....---'       '''--..
 '''-.;'''-..-'....--'''....--------------....'
     :     ........---''
     ;  ..:
    .-  :',;
  .'    : '.;
   '.   :  ' .
    '.  :  ' '
     ;  :   ' '
      : :    ' '
      : :     ' '
      ; :      ' '.                       .''.
     :  :       '. '..                   :    ;
     :  :         ''. '..                '.   ;
      ; :            ''-.''-....          .  ;
      : :                ''---..'''''----'.-'
       '                        ''''''''''               

THIS IS NOT THE EASTER EGG, FIND THE EASTER EGG !`, "color:red; font-size:18px");
