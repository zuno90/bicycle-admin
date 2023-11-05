import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppSelector } from "../store";

type TModal = {
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  close: () => void;
  isForm?: boolean;
};

const Modal: React.FC<TModal> = ({ title, body, footer, close, isForm }) => {
  const commonState = useAppSelector((state) => state.common);

  return (
    <Transition.Root show={commonState.isOpenModal} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center items-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {isForm === true ? (
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-230">
                  <div className="bg-white p-4 sm:p-6 sm:pb-4">
                    <div className="text-center">
                        <Dialog.Title
                          as="h1"
                          className="text-xl font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                      <div className="mt-2">{body}</div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center items-center gap-4">
                    {footer}
                  </div>
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                  <div className="bg-white p-4 sm:p-6 sm:pb-4">
                    <div className="text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                      <div className="mt-2">{body}</div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center items-center gap-4">
                    {footer}
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
