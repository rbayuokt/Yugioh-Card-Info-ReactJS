import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ApiServices from '../Services/ApiServices'
import { Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Detail() {

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <h2>detail</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Detail;
