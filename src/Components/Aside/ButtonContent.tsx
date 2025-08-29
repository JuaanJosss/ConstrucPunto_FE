import type { ILinks } from "@/Types/Types"
import { ChevronDown } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { NavLink } from "react-router"
import AnimationContainer from "@/Components/Shared/AnimationContainer"


interface AsideProps {
    onClick?: () => void
    children: React.ReactNode
    classes?: string;
    isOpen?: boolean;
}


interface ButtonContentProp {
    onClick: () => void
    isOpen: boolean,
    sectionName: String,
    links: ILinks
}


export function ButtonContent({ onClick, isOpen, sectionName, links }: ButtonContentProp) {
    const classes = `flex p-4 gap-4 capitalize text-lg justify-center hover:cursor-pointer hover:bg-amber-200 transition-colors duration-200 `

    return (
        <>
            <ButtonAside onClick={onClick} >
                {sectionName}
                <ChevronDown className={`size-4 transition duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </ButtonAside>

            <AnimatePresence>
                {isOpen && (
                    <AnimationContainer>
                        {links.links.map((link, i) => (
                            <NavLink key={i} to={link} className={classes}>
                                {links.text[i]} {links.icons[i]}
                            </NavLink>
                        ))}
                    </AnimationContainer>
                )}
            </AnimatePresence>
        </>
    )
}


function ButtonAside({ children, onClick, classes }: AsideProps) {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`w-full text-xl flex items-center justify-center gap-2 p-4 hover:bg-accent-bg hover:cursor-pointer transition-colors duration-200 ${classes}`}>
            {children}
        </button>
    )
}
