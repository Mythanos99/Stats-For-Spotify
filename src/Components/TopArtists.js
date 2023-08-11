import React, { useState, useEffect } from "react";
import { Container, Nav, Card, ProgressBar, Tabs, Tab, Button} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAuth from "../useAuth";


export default function TopArtists(token) {
    const [artists, setArtists] = useState([]);
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState('');
  const[color,setcolor]=useState('success');

    const[selectedTab,setselectedTab] =useState('long_term')

    const Authenticatorstring='Bearer ' + token.token
  
useEffect(() => {
  function fetchTopArtists(value) {
    // console.log(value)
    if (token.token) {
      fetch("https://api.spotify.com/v1/me/top/artists?time_range="+value,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authenticatorstring,
        },
      })
      .then(function (response) {
        response.json().then(function (data) {
          console.log("apicall");
          setArtists(data.items);
        });
      })
      .catch(function (error) {
        console.log("Fetch Error:", error);
      });
    }
  }
  fetchTopArtists(selectedTab);
  // console.log(selectedTab);
}, [selectedTab, token.token, artists.length]);

  return (
    <Container>
      <Tabs
        defaultActiveKey="long_term"
        transition={false}
        id="noanim-tab-example"
        className="mb-3 justify-content-center"
        activeKey={selectedTab}
        onSelect={(tab) => setselectedTab(tab)}
      >
        <Tab eventKey="long_term" title="All Time" >         
        </Tab>
        <Tab eventKey="medium_term" title="Last 6 months">         
        </Tab>
        <Tab eventKey="short_term" title="Last 4 months" >         
        </Tab>
      </Tabs>
      <Row>
        {artists.map((artist) => (
          <Col item key={artist.id} xs={12} sm={6} md={3}>
            <Card className="my-2" style={{ width: "18rem" }}>
              {(() => {
                if (artist.images.length > 0) {
                  return (
                    <Card.Img variant="top" src={artist.images[0].url} style={{ width: "100%", height: "40vh" }}/>
                  );
                } else {
                  return (
                    <Card.Img
                      variant="top"
                      src="https://i.scdn.co/image/ab67616d0000b273a1606e4d1f32827a6c03142e"
                      style={{ width: "100%", height: "40vh" }}
                    />
                  );
                }
              })()}
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <span>
                  {(() => {
                    if (artist.popularity > 75) {
                      return (
                        <ProgressBar
                          variant="success"
                          now={artist.popularity}
                          label={`${artist.popularity}%`}
                        />
                      );
                    } else if (artist.popularity > 40) {
                      return (
                        <ProgressBar
                          variant="info"
                          now={artist.popularity}
                          label={`${artist.popularity}%`}
                        />
                      );
                    } else if (artist.popularity < 10) {
                      return (
                        <ProgressBar variant="info" now="15" label="<10%" />
                      );
                    } else {
                      return (
                        <ProgressBar
                          variant="warning"
                          now={artist.popularity}
                          label={`${artist.popularity}%`}
                        />
                      );
                    }
                  })()}
                  {(() => {
                    if (artist.popularity < 10) {
                      return (
                        <Card.Text>
                          Wow. It seems You have found a gem
                        </Card.Text>
                      );
                    }
                  })()}
                </span>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );}

