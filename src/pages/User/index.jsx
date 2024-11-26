import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import Avaliation from "../../components/Avaliation";
import Coment from "../../components/Coment";

import { Context } from "../../context";

import "./user.css";

const User = () => {
  const { user: userParam } = useParams();
  const { user: userContext } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [onEdit, setOnEdit] = useState(false);

  const [user, setUser] = useState();
  const [userNotExists, setUserNotExists] = useState();
  const [avaliations, setAvaliations] = useState([]);
  const [coments, setComents] = useState([]);
  const [following, setFollowing] = useState(false);
  const [followMe, setFollowMe] = useState(false);
  const [amountFollowers, setAmountFollowers] = useState(0);

  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");

  const inputImage = useRef(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const findedUser = users.find((u) => u.user === userParam);

    if (findedUser) {
      setUser(findedUser);
      setUserNotExists(false);
      setAmountFollowers(findedUser.followers_count);
      setName(findedUser.name);
      setBiography(findedUser.biography);
      setAvaliations(findedUser.avaliations);
      setComents(findedUser.coments);
      setLoading(false);
    } else {
      setUserNotExists(true);
      setLoading(false);
    }
  }, [userParam]);

  function handleFollow() {
    const follow = { user_id: userContext.id, following_user_id: user.id };

    if (following) {
      setFollowing(false);
      console.log("remover follow");
    } else {
      setFollowing(true);
      console.log("criar follow");
    }
  }

  function handleEdit() {
    const newUser = { name, biography, image };
    console.log({ newUser });
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
      <div className="profile-info-container">
        {user && (
          <div className="user-info-container">
            <div className="image-user-container">
              <img
                src={
                  image?.name
                    ? URL.createObjectURL(image)
                    : `${user.user.url_image}?${Date.now()}`
                }
                alt={user.user}
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
              <h1>@{user.user}</h1>
              <div className="follow-container">
                <p>{user.following_count} Seguindo</p>
                <p>{amountFollowers} Seguidores</p>
                {userContext.user === user.user && (
                  <button onClick={() => setOnEdit(!onEdit)}>
                    Editar Perfil
                  </button>
                )}
                {userContext.user !== user.user && (
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
          {user && avaliations?.length > 0 ? (
            avaliations.map((avaliation) => (
              <Avaliation
                key={avaliation.id}
                avaliation={avaliation}
                handleDelete={() => {}}
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
          {user && coments?.length > 0 ? (
            coments.map((coment) => (
              <Coment key={coment.id} coment={coment} handleDelete={() => {}} />
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
