import React, { ButtonHTMLAttributes } from "react";

interface IConfirmationModal {
  title: string;
  description?: string;
  visible: boolean;
  confirmText?: string;
  cancelText?: string;
  handleConfirm: () => void;
  handleCancel: () => void;
  btnConfirmClassNames?: React.ComponentProps<"button">["className"];
  btnCancelClassNames?: React.ComponentProps<"button">["className"];
}

const ConfirmationModal = ({
  title,
  description,
  visible,
  confirmText = "Confirm",
  cancelText = "Cancel",
  handleConfirm,
  handleCancel,
  btnCancelClassNames,
  btnConfirmClassNames,
}: IConfirmationModal) => {
  return (
    <dialog
      id="my_modal_1"
      className={`modal modal-${visible ? "open" : "close"}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <button
              className={`btn ${btnCancelClassNames}`}
              onClick={handleCancel}>
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`btn ${btnConfirmClassNames}`}>
              {confirmText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
