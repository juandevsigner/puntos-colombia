import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Spinner } from "./Spinner";

export const ModalForm = () => {
  const navigate = useNavigate();
  const { modalForm, setModalForm, userNotPC, load } = useStateContext();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleClick = async () => {
    await userNotPC(name, phone);
    navigate("/user/register");
    setName("");
    setPhone("");
  };

  return (
    <>
      <Transition appear show={modalForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalForm(false)}
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
                    className="text-xl font-semibold text-center  text-green-600"
                  >
                    Registrarse para donar
                  </Dialog.Title>
                  <div>
                    <form>
                      <input
                        className="my-5  border-b border-green-600 w-full p-2 text-center text-xl"
                        placeholder="Ingrese su nombre"
                        type="name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                      />
                      <input
                        className="my-5  border-b border-green-600 w-full p-2 text-center text-xl"
                        placeholder="Ingrese su número de celular"
                        type="number"
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
                      />
                      <button
                        className="my-3 btn-primary justify-center items-center cursor-pointer transition-all"
                        type="submit"
                        onClick={handleClick}
                      >
                        {load ? <Spinner /> : <p>Registrarme</p>}
                      </button>
                    </form>
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
