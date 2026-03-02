import React from "react";
import "./errorPopUp.css";

interface errorPopUpProps {
  message?: string;
}

export function ErrorPopUp({ message }: errorPopUpProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="popup-close" onClick={closePopup}>
              &times;
            </button>
            <div className="popup-message">{message}</div>
          </div>
        </div>
      )}
    </>
  );
}
