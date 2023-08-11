import React, { useState, useEffect } from "react";
import { Container, Nav, Card, ProgressBar, Tabs, Tab,Button} from "react-bootstrap";
import { useNavigate,  Navigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAuth from "../useAuth";
import "../assets/dashboard.css";

export default function TopTracks(token) {
  const navigate = useNavigate();
    const [Tracks, setTracks] = useState([]);
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState('');
  const[color,setcolor]=useState('success');

    const[selectedTab,setselectedTab] =useState('long_term')
    const handleViewStatsClick = (trackId, imageUrl, trackName, artistName) => {
      navigate(`/viewstats`, {
        state: {
          token: token,
          track_id: trackId,
          track_image: imageUrl,
          track_name: trackName,
          track_artist: artistName,
        },
      });
    };

    const Authenticatorstring='Bearer ' + token.token
  
useEffect(() => {
  function fetchTopTracks(value) {
    // console.log(value)
    if (token.token) {
      fetch("https://api.spotify.com/v1/me/top/tracks?time_range="+value,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authenticatorstring,
        },
      })
      .then(function (response) {
        response.json().then(function (data) {
          console.log("apicall");
          setTracks(data.items);
        });
      })
      .catch(function (error) {
        console.log("Fetch Error:", error);
      });
    }
  }
  fetchTopTracks(selectedTab);
  // console.log(selectedTab);
}, [selectedTab, token.token, Tracks.length]);



  return (
    <div className="background-colour-div" >
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
        {Tracks.map((track) => (
          <Col item key={track.id} xs={12} sm={6} md={3}>
            <Card className="my-2"  style={{ width: "18rem" }}>
              {(() => {
                if (track.album.images.length > 0) {
                  return (
                    <Card.Img variant="top" src={track.album.images[0].url} />
                  );
                } else {
                  return (
                    <Card.Img
                      variant="top"
                      src="https://i.scdn.co/image/ab67616d0000b273a1606e4d1f32827a6c03142e"
                    />
                  );
                }
              })()}
              <Card.Body >
                <Card.Title >{track.name}</Card.Title>
                <span>
                  {(() => {
                    if (track.popularity > 75) {
                      return (
                        <ProgressBar
                          variant="success"
                          now={track.popularity}
                          label={`${track.popularity}%`}
                        />
                      );
                    } else if (track.popularity > 40) {
                      return (
                        <ProgressBar
                          variant="info"
                          now={track.popularity}
                          label={`${track.popularity}%`}
                        />
                      );
                    } else if (track.popularity < 10) {
                      return (
                        <ProgressBar variant="info" now="15" label="<10%" />
                      );
                    } else {
                      return (
                        <ProgressBar
                          variant="warning"
                          now={track.popularity}
                          label={`${track.popularity}%`}
                        />
                      );
                    }
                  })()}
                  {(() => {
                    if (track.popularity < 10) {
                      return (
                        <Card.Text>
                          Wow. It seems You have found a gem
                        </Card.Text>
                      );
                    }
                  })()}
                </span>
                <div className="d-flex justify-content-center mt-2">
                  <Button variant="primary" size="sm" style={{ width: "80%" }}
                  onClick={() => handleViewStatsClick(track.id, track.album.images[0].url, track.name, track.artists[0].name)}
                  >View stats for the song</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );}

