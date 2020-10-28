import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_RESOURCE } from '../utils/queries';
import { Col, Row, Container }  from 'reactstrap';

import { useParams } from 'react-router-dom';

function ResourceView(){

    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_RESOURCE, {variables: { _id: id }});

    return (
        <main>
            {loading ? <div>Loading...</div> : 
            <div>
                <Container>
                <Col sm="12" md="6" lg="8" offset="3">
                    <Row>
                        <h2>{data.resource.name}</h2>
                    </Row>

                    <Row>
                        <h4>{data.resource.shortDescription}</h4><br /><br />
                    </Row>

                    <Row>
                    <h5>Author: {data.resource.displayName}</h5>
                    </Row>
                    
                    {data.resource.images.map(image => (
                        <Row key ={`image-${data.resource.images.indexOf(image)}`}>
                            <Row>
                                <img src={`${image.fileURL}`} alt={`${image.imageCaption}`} width="300" ></img>
                            </Row>
                            <Row>
                                <p class="caption">
                                    <span>{image.imageCaption}</span>
                                </p>
                            </Row>
                        </Row>
                    ))}

                    <Row>
                        <p>{data.resource.resourceBody}</p>
                    </Row>
                    
                    {data.resource.videos.map(video => (
                        <Row key ={`video-${data.resource.videos.indexOf(video)}`}>
                            <Row>
                            <iframe width="300" src={`${video.fileURL}`} frameBorder="0" title={video.videoCaption}
                                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
                            </Row>
                            <Row>
                                <p class="caption">
                                    <span>{video.videoCaption}</span>
                                </p>
                            </Row>
                        </Row>
                    ))}

                </Col>
                </Container>
            </div>}
        </main>
    );
};

export default ResourceView;