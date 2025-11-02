import { useState } from "react"

export default function ModalHooks() {
    const [isOpen, setIsOpen] = useState(false)

    const switchModal = () => {
        setIsOpen(!isOpen)
    }

    return {
        isOpen,
        switchModal
    }
}
