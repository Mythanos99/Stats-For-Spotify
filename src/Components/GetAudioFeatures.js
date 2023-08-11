import React, { useState, useEffect } from "react";
import { Container, Card } from 'react-bootstrap';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/dashboard.css";

export default function GetAudioFeatures() {
  const location = useLocation();
  const {
    token,
    track_id,
    track_image,
    track_name,
    track_artist,
  } = location.state;

  const Authenticatorstring = 'Bearer ' + token.token;

  const fetchAudioData = () => {
    return fetch("https://api.spotify.com/v1/audio-features/" + track_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Authenticatorstring
      }
    })
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        console.log('Fetch Error:', error);
      });
  };

  const [audio, setAudio] = useState([
    {
      Feature: 'Acoustics', Feature_value: 0,
    },
    {
      Feature: 'Dancebility', Feature_value: 0,
    },
    {
      Feature: 'Energy', Feature_value: 0,
    },
    {
      Feature: 'Valence', Feature_value: 0,
    },
    {
      Feature: 'Speechiness', Feature_value: 0,
    }
  ]);

  const getUpdatedAudioData = () => {
    fetchAudioData().then(data => {
      const updatedAudioData = [...audio];
      updatedAudioData[0]['Feature_value'] = Math.ceil(data.acousticness * 100);
      updatedAudioData[1]['Feature_value'] = Math.ceil(data.danceability * 100);
      updatedAudioData[2]['Feature_value'] = Math.ceil(data.energy * 100);
      updatedAudioData[3]['Feature_value'] = Math.ceil(data.valence * 100);
      updatedAudioData[4]['Feature_value'] = Math.ceil(data.speechiness * 100);

      console.log("apicall");
      setAudio(updatedAudioData);
    });
  };

  useEffect(() => {
    getUpdatedAudioData();
  }, [token.token, track_id]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="move-up">
        <Row className="justify-content-center align-items-center flex-column flex-md-row">
          <Col xs={12} md={4} className="my-2 text-center">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={track_image} />
              <Card.Body>
                <Card.Title>{track_name}</Card.Title>
                <Card.Text>{track_artist}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8} className="my-2 text-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius="80%" data={audio}>
                <PolarGrid />
                <PolarAngleAxis dataKey="Feature" />
                <PolarRadiusAxis />
                <Radar name="Features" dataKey="Feature_value" stroke="#1707f0" fill="#1707f0" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
