import "./App.css";

import { useState, useEffect } from "react";

function App() {
  // setear los hooks de useState
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("all");

  // traer los datos de la API
  const showData = async () => {
    const response = await fetch("https://hp-api.onrender.com/api/characters/");
    const data = await response.json();
    const dataFilter = data.filter(
      (personajeImage) => personajeImage.image != ""
    );
    setCharacters(dataFilter);
  };

  // funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // metodo de filtrado
  let results = [];
  if (!search) {
    results = characters;
  } else {
    results = characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (selectedHouse != "all") {
    results = characters.filter((character) => character.house.toLowerCase() === selectedHouse);
  }

  function genero(personaje) {
    if (personaje.gender === 'male') {
      return 'Masculino';
    } else if (personaje.gender === 'female') {
      return 'Femenino'
    } else {
      return 'No especificado'
    }
  }

  function cumpleanio(personaje) {
    if (personaje.dateOfBirth == null) {
      return 'No especificado'
    } else {
      return personaje.dateOfBirth;
    }
  }

  useEffect(() => {
    showData();
  }, [selectedHouse]);

  return (
    <div>
      <div>
        <form className="flex justify-items-center mx-auto max-w-md mt-8 bg-white rounded-lg shadow-lg ">
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" value={search} onChange={searcher} type="text" placeholder="Buscar personaje..." />
        </form>
      </div>

      <div className="flex">
        <label className="text-white ml-5 text-lg font-mono " htmlFor={characters}>Equipo seleccionado:</label>
        <select id="house"
          name="house"
          value={selectedHouse}
          onChange={(e) => setSelectedHouse(e.target.value)}
          className="ml-2 block px-1 py-1 text-gray-700 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg text-center font-mono">
          <option value="all">Ninguno</option>
          <option value="gryffindor">Gryffindor</option>
          <option value="slytherin">Slytherin</option>
          <option value="hufflepuff">Hufflepug</option>
          <option value="ravenclaw">Ravenclaw</option>
        </select>
      </div>

      <div>
        <section className="flex flex-wrap justify-center">
          {results.map((personaje) => (
            <div key={personaje.id} className="bg max-w-xs rounded overflow-hidden shadow-lg m-4 w-48">
              <img className="w-full h-48 object-cover self-start" src={personaje.image} alt={personaje.name} />
              <div className="px-6 py-4">
                <h3 className="font-bold text-xl mb-2">{personaje.name}</h3>
                <p className="font-mono text-sm">Genero: {genero(personaje)}</p>
                <p className="font-mono text-sm">Equipo: {personaje.house}</p>
                <p className="font-mono text-sm">Fecha de cumpleaños: {cumpleanio(personaje)}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
