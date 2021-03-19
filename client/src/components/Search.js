import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListJob from './ListJob';

const Search = () => {
    const [desc, setDescription] = useState("");
    const [loc, setLocation] = useState("");
    const [full, setFullTime] = useState(false);
    const [data, setData] = useState([]);

    const handleDescription = e => {
        let value = e.target.value;
        setDescription(value);
    }
    const handleLocation = e => {
        let value = e.target.value;
        setLocation(value);
    }
    const handleFullTime = e => {
        let value = e.target.checked;
        setFullTime(value);
    }
    const handleSearch = e => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        var url = new URL('http://localhost:5000/job/search');
        var params = { description:desc, location:loc, fullTime:full};
        Object.keys(params).forEach(key => {
            if (params[key] !== "" && params[key] !== false)
            url.searchParams.append(key, params[key])
        })
        fetch(url, requestOptions)
            .then(response => response.json())
            .then (items => {
                setData(items.values);
            })
            .catch(err => alert(err));
    }
    return (
        <>
        <Container>
        <Form>
            <Form.Row>
                <Col>
                    <Form.Group onChange={handleDescription}>
                        <Form.Control placeholder="Job Description" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group onChange={handleLocation}>
                        <Form.Control placeholder="Location" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group onChange={handleFullTime}>
                        <Form.Check type="checkbox" label="Full Time Only" />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Col>
            </Form.Row>
        </Form>
        {data?
            <ListJob
                data={data}
            />: 
            <p>Loading...</p>
        }
        </Container>
        </>
    )
}

export default Search;