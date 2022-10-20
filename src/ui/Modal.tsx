import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export const Modal = () => {
  const { modal, setModal, setModalForm } = useStateContext();
  const handleClick = () => {
    setModalForm(true);
  };
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-center  text-red-600"
                  >
                    Opps! No te encuentras registrado
                  </Dialog.Title>
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-center">
                      Puedes registraste en Puntos Colombia escaneando el
                      siguiente QR.
                    </p>
                    <hr className="w-full my-2" />
                    <img
                      className="w-3/5"
                      src="https://www.ocu.org/-/media/ta/images/qr-code.png?rev=2e1cc496-40d9-4e21-a7fb-9e2c76d6a288&hash=AF7C881FCFD0CBDA00B860726B5E340B&mw=960"
                      alt="QR-PC"
                    />

                    <hr className="w-full my-2" />
                    <p className="text-center">
                      Si no deseas registrate puedes contribuir sin ningún
                      problema.
                    </p>
                    <i className="text-green-500 text-center text-sm ">
                      Recuerda que nuestro compromiso está en ayudar a conservar
                      nuestro medio ambiente.
                    </i>
                  </div>

                  <div className="mt-4 gap-7 flex justify-between items-center">
                    <button
                      type="button"
                      className="text-red-500 w-2/4"
                      onClick={() => setModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleClick}
                    >
                      Continuar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
