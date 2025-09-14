import React from "react";
import { AnimatePresence, motion } from "motion/react";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";


interface modalProps {
    isOpen: boolean;
    isQuestion?: boolean;
    title: string
    children?: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    degress?: string;
    confirm?: string;
}


const ModalContainer = ({ isOpen, isQuestion, title, children, onClose, onConfirm, onCancel, confirm, degress }: modalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.dialog
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1] }}
                    exit={{ opacity: [1, 0] }}
                    onClick={onClose}
                    className="absolute w-screen h-screen bg-black/80 left-0 top-0 flex items-center justify-center">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-4 rounded-md shadow-md w-[40%] h-max flex justify-between flex-col">
                        <div className="flex justify-end">
                            <CustomButton
                                type="button"
                                classAdd="text-white bg-red-500 hover:bg-red-700"
                                onClick={onClose}>
                                <X />
                            </CustomButton>
                        </div>
                        <ModalTitle title={title} />
                        {children}

                        {isQuestion && <QuestionContainer onCancel={onCancel} onConfirm={onConfirm} confirmation={confirm} degress={degress} />}
                    </div>
                </motion.dialog>
            )}
        </AnimatePresence>
    )
}

const ModalTitle = ({ title }: { title: string }) => {
    return <h1 className="text-2xl font-semibold text-center">{title}</h1>
}


const QuestionContainer = ({
    onCancel,
    onConfirm,
    confirmation = 'Aceptar',
    degress = 'Cancelar' }:
    {
        onConfirm?: () => void,
        onCancel?: () => void,
        confirmation?: string,
        degress?: string
    }) => {
    return (
        <div className="flex justify-around text-white my-7">
            <CustomButton type="button" classAdd="bg-red-500 hover:bg-red-700" onClick={onCancel} >{degress}</CustomButton>
            <CustomButton type="button" classAdd="bg-green-500 hover:bg-green-600" onClick={onConfirm}>{confirmation}</CustomButton>
        </div>
    )
}


export const Modal = React.memo(ModalContainer)
