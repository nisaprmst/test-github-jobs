import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';


const Details = ({ id }) => {
    const [type, setType] = useState("Type");
    const [createdAt, setCreatedAt] = useState("now")
    const [company, setCompany] = useState("Dans")
    const [companyUrl, setCompanyUrl] = useState("url")
    const [location, setLocation] = useState("Indonesia")
    const [title, setTitle] = useState("Title")
    const [description, setDescription] = useState("Desc")
    const [logo, setLogo] = useState("logo")
    const [apply, setApply] = useState("How to Apply")

    function getDetails() {
        let url = 'http://localhost:5000/job/details/5be3664e-83df-4572-a176-65e6d0adf997';
        return fetch(url, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => data.json())
    }

    useEffect(() => {
        let mounted = true;
        getDetails()
          .then(item => {
            if (mounted) {
              if (item.status === 200) {
                setTitle(item.values.title);
                setType(item.values.type);
                setCompany(item.values.company);
                setLocation(item.values.location);
                setCompanyUrl(item.values.company_url);
                setDescription(item.values.description);
                setLogo(item.values.company_logo);
                setApply(item.values.how_to_apply)
              }
            }
          })
        return () => mounted = false;
      }, [])

    return (
        <>
        <Container>
        <Link to='/jobs'>
            <FaArrowLeft/> Kembali 
        </Link>
        <h3>
            {type} / {location}
        </h3>
        <h1>
            {title}
        </h1>
        <h3>
            {company}
        </h3>
        <img src={logo} alt="logo"></img>
        <p dangerouslySetInnerHTML={{__html: description}}>
        </p>
        <p dangerouslySetInnerHTML={{__html: apply}}>
        </p>
        <a href={companyUrl}>
            Visit company
        </a>
        </Container>
        </>
    )
}

export default Details;