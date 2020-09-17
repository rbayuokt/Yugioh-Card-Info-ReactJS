import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ApiServices from '../Services/ApiServices'
import { Button, Row, Container, Col, Navbar, Nav, NavbarBrand, NavDropdown, Form, FormControl, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

//komponen
import CardYugi from '../Component/CardYugi';

function Home() {

  const [listKartu, setListKartu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jumCard, setJumCard] = useState(21);

  //search
  const [searchText, setSearchText] = useState("");
  const [searchNotFound, setSearchNotFound] = useState([]);

  const [detailKartu, setDetailKartu] = useState([]);

  useEffect(() => {
    getAllCard()
  }, [])

  const getAllCard = () => {
    ApiServices.get('', 'cardinfo.php')
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

  const getDetailCard = (name) => {
    ApiServices.get('', `cardinfo.php?name=${name}`)
      .then((response) => {
        let detail = response.data.data
        setDetailKartu(detail)
        // console.log(detail)
      })
  }

  const getSearchCard = (name) => {
    if (name === "" || name === null) {
      getAllCard()
      setSearchNotFound([])
      setDetailKartu([])
    } else {
      ApiServices.get('', `cardinfo.php?name=${name}`)
        .then((response) => {
          let detail = response.data.data
          setListKartu(detail)
          setDetailKartu([])
          console.log(detail)
        }).catch((error) => {
          setSearchNotFound(error.response.data)
          setListKartu([])
          setDetailKartu([])
          // console.log(error.response.data)
        })
    }
  }

  return (
    <>
      {
        (!isLoading) ?
          <>
            <Navbar bg="light" expand="lg" className="custom-nav" sticky="top">
              <Container>
                <Col xs={12} md={4} lg={4}>
                  <Navbar.Brand href="/" className="d-flex">
                    <img
                      alt=""
                      src="/images/logo.png"
                      width="150"
                      height="32"
                      className="d-inline-block align-top img-fluid mx-auto"
                    />
                  </Navbar.Brand>
                </Col>

                <Col xs={12} md={8} lg={8}>
                  <Form>
                    <FormControl type="text" placeholder="Cari Kartu. . ." className="searchbox" onChange={(event) => setSearchText(event.target.value)} onBlur={() => getSearchCard(searchText)} />
                  </Form>
                </Col>
              </Container>
            </Navbar>

            <Container style={{ paddingBottom: 30 }}>
              <Row>
                <Col xs={12} md={4} lg={4}>
                  <div className="sticky-top custom-sticky overflow-auto" style={{ top: 110 , height: 840 }}>
                    <div className="d-flex flex-column">
                      <img src={detailKartu.length > 0 ? detailKartu[0].card_images[0].image_url : null} width="260" className="img-fluid mb-5 ml-auto mr-auto" />
                      <h3 className="detail-card-title mt-2" style={{width:'90%'}}>{detailKartu.length > 0 ? detailKartu[0].name : null}</h3>
                      <p className="detail-desc">{detailKartu.length > 0 ? detailKartu[0].type : null}</p>

                      {
                        (detailKartu.length > 0) ?
                          (detailKartu[0].type === "Monster" || detailKartu[0].type === "Effect Monster" | detailKartu[0].type === "Normal Monster") ?
                            <div className="d-flex flex-row ">
                              <div className="d-flex flex-row mr-4">
                                <img src="/images/pedang.svg" width="24" />
                                <p className="ml-2 my-auto">{detailKartu[0].atk}</p>
                              </div>

                              <div className="d-flex flex-row">
                                <img src="/images/perisai.svg" width="24" />
                                <p className="ml-2  my-auto">{detailKartu[0].def}</p>
                              </div>
                            </div>
                            : null
                          : null
                      }

                      <div className="my-4">

                        {
                          (detailKartu.length > 0) ?
                            <>
                              <h5 className="detail-card-title mt-2">Race : </h5>
                              <p className="detail-desc">{detailKartu.length > 0 ? detailKartu[0].race : null} </p>
                            </>
                            : null
                        }

                        {
                          (detailKartu.length > 0) ?
                            (detailKartu[0].hasOwnProperty('level')) ?
                              <>
                                <h5 className="detail-card-title mt-2">Level : </h5>
                                <p className="detail-desc">{detailKartu[0].level}</p>
                              </>
                              : null
                            : null
                        }

                        {
                          (detailKartu.length > 0) ?
                            (detailKartu[0].hasOwnProperty('attribute')) ?
                              <>
                                <h5 className="detail-card-title mt-2">Attribute : </h5>
                                <p className="detail-desc">{detailKartu[0].attribute}</p>
                              </>
                              : null
                            : null
                        }

                        {
                          (detailKartu.length > 0) ?
                            (detailKartu[0].hasOwnProperty('archetype')) ?
                              <>
                                <h5 className="detail-card-title mt-2">Archetype : </h5>
                                <p className="detail-desc">{detailKartu[0].archetype}</p>
                              </>
                              : null
                            : null
                        }

                        {
                          (detailKartu.length > 0) ?
                            <>
                              <h5 className="detail-card-title mt-2">Description : </h5>
                              <p className="detail-desc" style={{width:'90%'}}>{detailKartu.length > 0 ? detailKartu[0].desc : null}</p>
                            </>
                            : null
                        }

                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={8} lg={8}>
                  <Row className="mt-1">
                    {(searchNotFound !== "") ? <p>{searchNotFound.error}</p> : null}
                    {
                      listKartu.slice(0, jumCard).map((datana, index) => {
                        return (
                          // <p>Wow</p>
                          <Col xs={12} md={4} lg={4} className="my-3" key={index.toString()}>
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
            </Container>
          </>
          : <p> Loading </p>
      }
    </>
  );
}

export default Home;
