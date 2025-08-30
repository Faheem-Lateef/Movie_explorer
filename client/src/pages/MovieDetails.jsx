import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesAPI } from '../services/api';

export default function MovieDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await MoviesAPI.details(id);
        setData(res.data);
      } catch {
        setErr('Failed to load details');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!data) return null;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <img
          src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x445?text=No+Poster'}
          alt={data.Title}
          className="rounded-xl"
        />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold">{data.Title} <span className="text-gray-500">({data.Year})</span></h1>
        <p className="mt-2 text-sm text-gray-600">{data.Genre} • {data.Runtime} • {data.Rated}</p>
        <p className="mt-4">{data.Plot}</p>
        <div className="mt-4 space-y-1 text-sm">
          <p><strong>Director:</strong> {data.Director}</p>
          <p><strong>Actors:</strong> {data.Actors}</p>
          <p><strong>IMDB:</strong> {data.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}
