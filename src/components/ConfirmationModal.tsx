import React from "react";
import { Window } from "@progress/kendo-react-dialogs";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Window
      title="Confirm"
      onClose={onCancel}
      width={window.innerWidth * 0.4}
      height={window.innerHeight * 0.4}
    >
      <div style={{ padding: "1rem", minWidth: "300px", margin:"auto" }}>
        <p>{message}</p>
        <div style={{ textAlign: "right" }}>
          <button className="k-button" onClick={onCancel} style={{ marginRight: "0.5rem" }}>
            Cancel
          </button>
          <button className="k-button k-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Window>
  );
};

export default ConfirmationModal;


