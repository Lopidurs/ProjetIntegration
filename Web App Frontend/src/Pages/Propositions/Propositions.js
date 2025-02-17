/* Importing Components */
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserCard from "../../Components/UserCard/UserCard";
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';

/* Importing style */
import './Propositions.css';

/*Importing Config*/
import config from "../../config.json";


function Propositions() {
    const [ListPropositions, setListPropositions] = useState([])
    let offset = 0
    const limit = 10

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        LoadProposition(
            offset,
            limit,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function LoadProposition(offset = 0) {

        fetch(config.API_URL +
            '/propositions?' +
            'offset=' +
            offset +
            "&limit=" +
            limit
        )
            .then((response) => response.json())
            .then((data) => {
                if (offset === 0) {
                    setListPropositions(data)
                    return
                }
                setListPropositions(ListPropositions => [...ListPropositions, ...data])
            });
    }


    function handleScroll(e) {

        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            offset += 10
            LoadProposition(offset)
        }
    }
    return (
        <div className="Propositions">
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                textLinkThree="S'inscrire"
                linkThree="/register"
                textLinkFour="Se connecter"
                linkFour="/login"
                color="rgba(47, 72, 88, 1)"
                position="absolute"
            />
            <Container className='title'>
                <h2>Propositions</h2>
            </Container>
            <Container>
                <Button
                    className="new-annonce-button filter-button"
                    variant=""
                    href="createProposition"
                >
                    Nouvelle Proposition
                </Button>
            </Container>
            <Container className='proposition-list'>
                {
                    ListPropositions.length === 0 ?
                        <h2 className="no-result-message">Personne ne s'est encore proposé :/</h2>
                        :
                        <Row xs={1} sm={1} lg={2} className="propositions-list-row" >
                            {
                                ListPropositions.map((proposition, index) => {
                                    return (
                                        <Col key={index} onClick={e => console.log(proposition.Type)}>
                                            <UserCard proposition={proposition} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                }
            </Container>
        </div>
    )
}

export default Propositions;    