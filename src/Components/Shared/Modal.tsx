import React from "react";
import { AnimatePresence, motion } from "motion/react";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";


interface IModalProps {
    isOpen: boolean;
    isQuestion?: boolean;
    title: string
    children?: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    degress?: string;
    confirm?: string;
    height?: string;
    width?: string;
}

type CloserModalType = Pick<IModalProps, 'onClose'>
type ModalTitleType = Pick<IModalProps, 'title'>
type QuestionContainerType = Pick<IModalProps, 'onConfirm' | 'onCancel'> & { confirmation?: string, degress?: string }


const ModalContainer = ({ isOpen, isQuestion, title, children, onClose, onConfirm, onCancel, confirm, degress, height = 'h-max', width = 'w-[40%]' }: IModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <ModalDialogAnimation onClose={onClose}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`${height} bg-white p-4 rounded-md shadow-md ${width} flex justify-between flex-col`}>
                        <ModalCloser onClose={onClose} />
                        <ModalTitle title={title} />
                        {children}
                        {isQuestion && <QuestionContainer onCancel={onCancel} onConfirm={onConfirm} confirmation={confirm} degress={degress} />}
                    </div>
                </ModalDialogAnimation>
            )}
        </AnimatePresence>
    )
}


const ModalDialogAnimation = ({ onClose, children }: CloserModalType & { children: React.ReactNode }) => {
    return (
        <motion.dialog
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            exit={{ opacity: [1, 0] }}
            onClick={onClose}
            className="absolute w-screen h-screen bg-black/80 left-0 top-0 flex items-center justify-center overflow-hidden">
            {children}
        </motion.dialog>
    )
}


const ModalCloser = ({ onClose }: CloserModalType) => {

    return (
        <div className="flex justify-end">
            <CustomButton
                type="button"
                classAdd="text-white bg-red-500 hover:bg-red-700"
                onClick={onClose}>
                <X />
            </CustomButton>
        </div>
    )
}

const ModalTitle = ({ title }: ModalTitleType) => {
    return <h1 className="text-2xl font-semibold text-center">{title}</h1>
}


const QuestionContainer = ({ onCancel, onConfirm, confirmation = 'Aceptar', degress = 'Cancelar' }: QuestionContainerType) => {
    return (
        <div className="flex justify-around text-white my-7">
            <CustomButton type="button" classAdd="bg-red-500 hover:bg-red-700" onClick={onCancel} >{degress}</CustomButton>
            <CustomButton type="button" classAdd="bg-green-500 hover:bg-green-600" onClick={onConfirm}>{confirmation}</CustomButton>
        </div>
    )
}


export const Modal = React.memo(ModalContainer)
