import React ,{ useState, useEffect } from 'react'
import { Container, Nav, Card, ProgressBar, Tabs, Tab, Button} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GetRecentlyPlayed(token) {
    const [RecentTracks, setRecentTracks] = useState([]);
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState('');
  const[color,setcolor]=useState('success');

    // console.log(token)
    // console.log(token.token);
    const Authenticatorstring='Bearer ' + token.token
  
useEffect(() => {
  function fetchTopRecentTracks() {
    // console.log(value)
    if (token.token) {
      fetch("https://api.spotify.com/v1/me/player/recently-played",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authenticatorstring,
        },
      })
      .then(function (response) {
        response.json().then(function (data) {
          console.log("apicall");
          setRecentTracks(data.items);
        });
      })
      .catch(function (error) {
        console.log("Fetch Error:", error);
      });
    }
  }
  fetchTopRecentTracks();
  // console.log(selectedTab);
}, [token.token, RecentTracks.length]);

  return (
    <Container>
      <Row>     
        {RecentTracks.map((recent_track) => (
          <Col item key={recent_track.track.id} xs={12} sm={6} md={3}>
            <Card className="my-2" style={{ width: "18rem" }}>
              {(() => {
                if (recent_track.track.album.images.length > 0) {
                  return (
                    <Card.Img variant="top" src={recent_track.track.album.images[0].url} style={{ width: "100%", height: "40vh" }}/>
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
                <Card.Title>{recent_track.track.name}</Card.Title>
                <span>
                  {(() => {
                    if (recent_track.track.popularity > 75) {
                      return (
                        <ProgressBar
                          variant="success"
                          now={recent_track.track.popularity}
                          label={`${recent_track.track.popularity}%`}
                        />
                      );
                    } else if (recent_track.track.popularity > 40) {
                      return (
                        <ProgressBar
                          variant="info"
                          now={recent_track.track.popularity}
                          label={`${recent_track.track.popularity}%`}
                        />
                      );
                    } else if (recent_track.track.popularity < 10) {
                      return (
                        <ProgressBar variant="info" now="15" label="<10%" />
                      );
                    } else {
                      return (
                        <ProgressBar
                          variant="warning"
                          now={recent_track.track.popularity}
                          label={`${recent_track.track.popularity}%`}
                        />
                      );
                    }
                  })()}
                  {(() => {
                    if (recent_track.track.popularity < 10) {
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
