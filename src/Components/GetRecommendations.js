import React, { useState, useEffect } from "react";
import { Container, Nav, Card, ProgressBar, Dropdown } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function GetRecommendations(token) {
  const [RecommendedTracks, setRecommendedTracks] = useState([]);
  // const [playlist, setplaylist] = useState();
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [PlaylistTracks, setPlaylistTracks] = useState([]);
  const [selectedPlaylist, setselectedPLaylist] = useState("");
  const [PlaylistName, setPlaylistName] = useState("");


  // console.log(token)
  // console.log(token.token);
  const Authenticatorstring = "Bearer " + token.token;
  var track_song = "51uEHUBV7YCrdNZoWRVJPc";
  const handlePlaylistSelect = (playlist) => {
    // console.log(playlist);
    setselectedPLaylist(playlist.id);
    setPlaylistName(playlist.name);

  };
  useEffect(() => {
    function fetchAllPlaylists() {
      if (token.token) {
        fetch("https://api.spotify.com/v1/me/playlists", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: Authenticatorstring,
          },
        })
          .then(function (response) {
            response.json().then(function (data) {
              console.log("apicall");
              setAllPlaylist(data.items);
            });
          })
          .catch(function (error) {
            console.log("Fetch Error:", error);
          });
      }
    }
    fetchAllPlaylists();
  }, [token.token]);
  useEffect(
    () => {
      function fetchPLaylistTracks(value) {
        if (token.token && value) {
          fetch(
            "https://api.spotify.com/v1/playlists/" + value + "/tracks",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: Authenticatorstring,
              },
            }
          )
            .then(function (response) {
              response.json().then(function (data) {
                console.log("apicall");
                if (data.items.length > 5) {
                  // Select random 5 tracks from the playlist
                  const randomTracks = data.items.sort(() => Math.random() - 0.5).slice(0, 5);
                  const trackIds = randomTracks.map((track) => track.track.id).join(",");
                  setPlaylistTracks(trackIds);
                } else {
                  // Use all tracks from the playlist
                  const trackIds = data.items.map((track) => track.track.id).join(",");
                  setPlaylistTracks(trackIds);
                }
              });
            })
            .catch(function (error) {
              console.log("Fetch Error:", error);
            });
        }
      }
      fetchPLaylistTracks(selectedPlaylist);
    },[selectedPlaylist]
  );
  useEffect(() => {
    function fetchRecommendations() {
      // console.log(value)
      if (token.token  && selectedPlaylist) {
        fetch(      
          "https://api.spotify.com/v1/recommendations?seed_tracks="+PlaylistTracks,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: Authenticatorstring,
            },
          }
        )
          .then(function (response) {
            response.json().then(function (data) {
              console.log("apicall");
              setRecommendedTracks(data.tracks);
            });
          })
          .catch(function (error) {
            console.log("Fetch Error:", error);
          });
      }
    }
    fetchRecommendations();
    // console.log(selectedTab);
  }, [PlaylistTracks]);

  return (
    <Container>
      <Dropdown>
  <div className="my-2 d-flex justify-content-center"> 
    <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: "400px" }}> 
      {PlaylistName ? PlaylistName: "Select a Playlist to Get Recommendations"} 
    </Dropdown.Toggle>
  </div>
  <Dropdown.Menu>
    {allPlaylist.map((playlist) => (
      <Dropdown.Item
        key={playlist.id}
        onClick={() => handlePlaylistSelect(playlist)}
      >
        {playlist.name}
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>
      {(() => {
        if (RecommendedTracks) {
          return (      
      <Row>
        {RecommendedTracks.map((artist) => (
          <Col item key={artist.id} xs={12} sm={6} md={3}>
            <Card className="my-2" style={{ width: "18rem" }}>
              {(() => {
                if (artist.album.images.length > 0) {
                  return (
                    <Card.Img variant="top" src={artist.album.images[0].url} />
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
                    if (artist.popularity < 15) {
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
      )};
    })()}
    </Container>
  );
}
