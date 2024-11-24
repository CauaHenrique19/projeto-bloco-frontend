import { useEffect, useState } from "react";

import Media from "../../components/Media";
import Loading from "../../components/Loading";

import api from "../../services/api";
import "./catalog.css";

const Catalog = () => {
  const [loading, setLoading] = useState(true);
  const [medias, setMedias] = useState([]);
  const [searchString, setSearchString] = useState();
  const [filteredMedias, setFilteredMedias] = useState([]);

  useEffect(() => {
    api
      .get("/discover/movie")
      .then((res) => {
        setMedias(res.data.results);
        setFilteredMedias(res.data.results);
        setLoading(false);
      })
      .catch((error) => console.error(error.message));
  }, []);

  function handleSearch(search) {
    setSearchString(search);
    const mediasSearched = medias.filter((media) =>
      media.title.toLowerCase().includes(search)
    );
    setFilteredMedias(mediasSearched);
  }

  return (
    <div className="catalog-container">
      {loading && <Loading />}
      <div className="medias-catalog-container">
        <div className="header-medias-catalog-container">
          <h1>Todas as nossas mídias</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Pesquisar"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </div>
        {searchString && filteredMedias.length > 0 && (
          <div className="header-search-result">
            <h1>Resultados para "{searchString}"</h1>
          </div>
        )}
        {filteredMedias.length === 0 && !loading && (
          <div className="not-result-container">
            <h1>Nenhum Resultado para "{searchString}"</h1>
            <p>Digite outro nome, talvez você encontre o que procura.</p>
          </div>
        )}
        <div className="medias-main-catalog-container">
          {filteredMedias.length > 0 &&
            filteredMedias.map((media) => (
              <Media
                key={media.id}
                redirect
                selectMedia={() => {}}
                media={media}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
