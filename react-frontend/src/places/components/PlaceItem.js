import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // we can also use toggleMapHandler here instead of 2 handlers
  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);

  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };

  const auth = useContext(AuthContext);

  return (
    <>
      {/* closeMapHandler will in turn get triggered when we click the backdrop */}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place__modal-content"
        footerClass="place__modal-actions"
        // we can pass JSX in curly braces to footer
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map zoom={6} center={props.coordinates} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place?This can't be undone
          later
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            {/* we have to ensure that only to the creator the edit and delete is visible */}
            {/* we can both pass props as well as write Buttton without self closing tag */}
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {/* you have to slashes as separtors properly  */}
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
