/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, } from 'react-bootstrap';
import AnimalCard from '../../Components/AnimalCard/AnimalCard';
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';
import {useNavigate} from 'react-router-dom';

/*Importing Styles*/
import './MesAnnonces.css';

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";

/*Importing Config*/
import config from "../../config.json";

function Annonces(){
    const[ListAnnonces, setListAnnonces] = useState ([]);
    const[id, setID] = useState(0);
    let navigate = useNavigate();
    let offset = 0

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        setID(JSON.parse(localStorage.getItem("user")).id);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        LoadAnnonces(offset,id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    function LoadAnnonces(offset = 0,id = 0){

            fetch(config.API_URL+'/annonces/me?id='+id)
                .then((response) => response.json())
                .then((data) => {
                    if(offset === 0){
                        setListAnnonces(data)
                        return
                    }
                    setListAnnonces(ListAnnonces => [...ListAnnonces, ...data])
            });
    }
    
    function handleScroll(e){
        if(window.innerHeight+e.target.documentElement.scrollTop+1 >= e.target.documentElement.scrollHeight){
            offset += 6 
            LoadAnnonces(offset)
        }
    }
    return (
        <div className="mesannonces">
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                color="rgba(47, 72, 88, 1)"
                position="absolute"
            />
            <Container className='top-container'>
                <h2>Mes Animaux</h2>
            </Container>

            <Container className='mesannonces-container'>
                 {
                 Object.keys(ListAnnonces).length === 0 ? 
                    <h2 className='no-result-message'>Aucun Résultat :/</h2> 
                    :
                     <Row xs={1} sm={1} lg={2} >
                        {
                            ListAnnonces.map((annonce,index) => {
                                return (
                                        <Col key={index} colSpan={annonce.Pets.length} onClick={()=>navigate('/detailannonce/'+ annonce.id )}>
                                            <AnimalCard annonce={annonce} image={
                                                    annonce.Pets.map((pet) => {                                                            
                                                        const ReturnTable = AnimauxImages[pet.Type]
                                                        return ReturnTable
                                                        })
                                                    } />
                                        </Col>
                                        )
                            })
                        }
                    </Row>
                }
                    
            </Container>

        </div>
    );
}

export default Annonces;