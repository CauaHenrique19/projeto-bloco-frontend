import React, { useEffect, useState, useContext, useRef } from "react";

import Loading from "../../Components/Loading";
import Avaliation from "../../Components/Avaliation";
import Coment from "../../Components/Coment";

import api from "../../services/api";
import "./user.css";

const User = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userNotExists, setUserNotExists] = useState();
  const [avaliations, setAvaliations] = useState([]);
  const [coments, setComents] = useState([]);
  const [following, setFollowing] = useState(false);
  const [followMe, setFollowMe] = useState(false);
  const [amountFollowers, setAmountFollowers] = useState(0);
  const [onEdit, setOnEdit] = useState(false);

  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");

  const [viewModal, setViewModal] = useState(false);
  const [percentualUpload, setPercentualUpload] = useState(0);

  const inputImage = useRef(null);

  useEffect(() => {
    
  }, [props]);

  useEffect(() => {
    
  }, [user]);

  function handleFollow() {
    const follow = { user_id: userContext.id, following_user_id: user.user.id };

    if (following) {
      
    } else {
      api
       
    }
  }

  function handleEdit() {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("biography", biography);
    formdata.append("image", image);

    api
      .put(`/users/${userContext.id}`, formdata, {
        onUploadProgress: (e) => handleProgress(e),
      })
      .then((res) => {
        if (res.data.message) {
        } else {
          setOnEdit(false);
        }
      })
      .catch((error) => console.error(error.message));
  }

  function handleProgress(e) {
    setViewModal(true);
    setPercentualUpload(parseInt(Math.round(e.loaded * 100) / e.total));
  }

  return (
    <div className="profile-container">
      {userNotExists && (
        <div className="container-user-not-exists">
          <ion-icon name="alert-circle"></ion-icon>
          <h1>Este usuário não existe!</h1>
        </div>
      )}
      {loading && <Loading />}
      {viewModal && (
        <div className="modal">
          <div className="modal-content upload">
            {percentualUpload !== 100 ? (
              <ion-icon className="rotate" name="hourglass-outline"></ion-icon>
            ) : (
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            )}
            {percentualUpload !== 100 ? (
              <h1>Enviando...</h1>
            ) : (
              <h1>Atualizado com sucesso!</h1>
            )}
            {percentualUpload !== 100 ? (
              <div className="progress">
                <div
                  style={{ width: `${percentualUpload}%` }}
                  className="progress-content"
                ></div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setViewModal(false);
                }}
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      )}
      <div className="profile-info-container">
        {user && (
          <div className="user-info-container">
            <div className="image-user-container">
              <img
                src={
                  image.name
                    ? URL.createObjectURL(image)
                    : `${user.user.url_image}?${Date.now()}`
                }
                alt={user.user.user}
              />
              {onEdit && (
                <div className="button-container">
                  <button
                    onClick={() =>
                      inputImage.current && inputImage.current.click()
                    }
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </div>
              )}
            </div>
            <div className="user-info">
              {!onEdit && (
                <div className="name-container">
                  <h1>{name}</h1>
                  {followMe && <div className="follow-tag">Segue você</div>}
                </div>
              )}
              {onEdit && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Seu nome"
                />
              )}
              <h1>@{user.user.user}</h1>
              <div className="follow-container">
                <p>{user.following_count.amount} Seguindo</p>
                <p>{amountFollowers} Seguidores</p>
                {userContext.user === user.user.user && (
                  <button onClick={() => setOnEdit(!onEdit)}>
                    Editar Perfil
                  </button>
                )}
                {userContext.user !== user.user.user && (
                  <button
                    className={following && "selected"}
                    onClick={() => handleFollow()}
                  >
                    {following ? "Deixar de seguir" : "Seguir"}
                  </button>
                )}
              </div>
              {!onEdit && (
                <p className="biography">
                  {biography ? biography : "Sem Biografia"}
                </p>
              )}
              {onEdit && (
                <textarea
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Sua biografia"
                  cols="30"
                  rows="10"
                ></textarea>
              )}
              {onEdit && (
                <div className="buttons-container">
                  <button className="submit-edit" onClick={() => handleEdit()}>
                    Salvar
                  </button>
                  <button
                    className="cancel-edit"
                    onClick={() => {
                      setOnEdit(false);
                      setImage(user.user.url_image);
                      inputImage.current.value = "";
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              )}
              <input
                ref={inputImage}
                type="file"
                hidden={true}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
        )}
      </div>
      <div className="profile-interations-container">
        <div className="avaliations-column">
          {user && avaliations.length > 0 ? (
            avaliations.map((avaliation) => (
              <Avaliation
                key={avaliation.id}
                avaliation={avaliation}
                handleDelete={() =>
                  handleDeleteAvaliation(
                    avaliation,
                    avaliations,
                    setAvaliations
                  )
                }
              />
            ))
          ) : (
            <div className="nothing-container">
              <ion-icon name="alert-circle"></ion-icon>
              <h1>Esse usuário não realizou avaliações</h1>
            </div>
          )}
        </div>
        <div className="coment-column">
          {user && coments.length > 0 ? (
            coments.map((coment) => (
              <Coment
                key={coment.id}
                coment={coment}
                handleDelete={() =>
                  handleDeleteComent(coment, coments, setComents)
                }
              />
            ))
          ) : (
            <div className="nothing-container">
              <ion-icon name="alert-circle"></ion-icon>
              <h1>Esse usuário não realizou comentários</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
