import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import Avaliation from "../../components/Avaliation";
import Coment from "../../components/Coment";

import { Context } from "../../context";
import { toBase64 } from "../../utils";
import DefaultUserImage from "../../assets/user-image.png";

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

  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");

  const [amountFollowers, setAmountFollowers] = useState(0);
  const [amountFollowing, setAmountFollowing] = useState(0);

  const inputImage = useRef(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const findedUser = users.find((u) => u.user === userParam);

    if (findedUser) {
      setUser(findedUser);
      setUserNotExists(false);
      setName(findedUser.name);
      setBiography(findedUser.biography);
      setAvaliations(findedUser.avaliations);
      setComents(findedUser.coments);
      setImage(findedUser.image);
      setLoading(false);

      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      const commentsUser = comments.filter((c) => c.user_id === findedUser.id);

      const follows = JSON.parse(localStorage.getItem("follows")) || [];
      const follow = follows.find(
        (f) =>
          f.following_user_id === findedUser.id && f.user_id === userContext.id
      );

      setAmountFollowers(
        follows.filter((follow) => follow.following_user_id === findedUser.id)
          .length
      );
      setAmountFollowing(
        follows.filter((follow) => follow.user_id === findedUser.id).length
      );

      if (follow) {
        setFollowing(true);
      }

      setComents(commentsUser);
    } else {
      setUserNotExists(true);
      setLoading(false);
    }
  }, [userParam]);

  function handleFollow() {
    const follow = { user_id: userContext.id, following_user_id: user.id };
    const follows = JSON.parse(localStorage.getItem("follows")) || [];

    if (following) {
      const followsFiltered = follows.filter(
        (follow) => follow.following_user_id !== user.id
      );
      localStorage.setItem("follows", JSON.stringify(followsFiltered));
      setAmountFollowers(amountFollowers - 1);
      setFollowing(false);
    } else {
      const newFollows = [...follows, follow];
      localStorage.setItem("follows", JSON.stringify(newFollows));
      setAmountFollowers(amountFollowers + 1);
      setFollowing(true);
    }
  }

  async function handleEdit() {
    const helpUser = { ...user };
    const imageString = image?.name ? await toBase64(image) : image;
    const newUser = Object.assign(helpUser, {
      name,
      biography,
      image: imageString,
    });

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = users.filter((u) => u.user !== user.user);
    localStorage.setItem("users", JSON.stringify([newUser, ...newUsers]));
    setOnEdit(false);
  }

  function getImage() {
    if (image?.name) {
      return URL.createObjectURL(image);
    } else if (image) {
      return image;
    } else {
      return DefaultUserImage;
    }
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
              <img src={getImage()} alt={user.user} />
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
                <p>{amountFollowing} Seguindo</p>
                <p>{amountFollowers} Seguidores</p>
                {userContext.user === user.user && (
                  <button onClick={() => setOnEdit(!onEdit)}>
                    Editar Perfil
                  </button>
                )}
                {userContext.user !== user.user && (
                  <button
                    className={following ? "selected" : ""}
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
                      setImage(user.image);
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
              <Avaliation key={avaliation.id} avaliation={avaliation} />
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
            coments.map((coment) => <Coment key={coment.id} coment={coment} />)
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
