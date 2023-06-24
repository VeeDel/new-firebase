import React, { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movieRelease, setMovieRelease] = useState(0);
  const [movieOscar, setMovieOscar] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [file, setfile] = useState(null);
  const moviesCollectionRef = collection(db, "Movies");

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieName,
        releaseDate: movieRelease,
        Oscar: movieOscar,
        userid: auth?.currentUser?.uid,
      });
      setMovieName("");
      setMovieRelease(0);
      setMovieOscar(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "Movies", id);
      await deleteDoc(movieDoc);
    } catch (err) {
      console.error(err);
    }
  };

  const editMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "Movies", id);
      await updateDoc(movieDoc, {
        title: newMovieTitle,
      });
      setNewMovieTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const querySnapshot = await getDocs(moviesCollectionRef);
        const movies = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMoviesList(movies);
        console.log(moviesList);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, []); // Empty dependency array to fetch movies only once on component mount

  const uploadFile = async () => {
    if (!file) return;
    const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Auth />
      <div>
        <input
          placeholder="Movie Title..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date..."
          value={movieRelease}
          onChange={(e) => setMovieRelease(parseInt(e.target.value))}
        />
        <input
          id="oscarCheckbox"
          type="checkbox"
          checked={movieOscar}
          onChange={(e) => setMovieOscar(e.target.checked)}
        />
        <label htmlFor="oscarCheckbox">Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit the Movie</button>
      </div>
      <div>
        {moviesList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.Oscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="New Title..."
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
            />
            <button onClick={() => editMovieTitle(movie.id)}>
              Edit the Title
            </button>
          </div>
        ))}
      </div>
      <div />
      <input type="file" onChange={(e) => setfile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload the File</button>
    </div>
  );
}

export default App;
