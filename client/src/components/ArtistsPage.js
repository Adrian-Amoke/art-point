import React, { useEffect, useState } from "react";

function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/artists")
      .then((res) => res.json())
      .then(setArtists);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Artists</h2>
      <ul className="list-group">
        {artists.map((artist) => (
          <li key={artist.id} className="list-group-item">
            <h5>{artist.name}</h5>
            <p>Email: {artist.email}</p>
            {artist.bio && <p>Bio: {artist.bio}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistsPage;
