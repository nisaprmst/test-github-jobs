import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const ListJob = ({data}) => {
    
    return (
        <>
        <h>
            Job List
        </h>
        <ListGroup>
            { 
                data.map(function(job) {
                    let idDetails = job.id;
                    return (

                        <Link to={{
                            pathname: '/job/details',
                            state: {
                                id: idDetails
                            }
                        }}>
                            <ListGroup.Item id={job.id}>
                                {job.title}
                            </ListGroup.Item>
                        </Link>
                    )
                })
            }
        </ListGroup>
        </>
    )
}

export default ListJob;