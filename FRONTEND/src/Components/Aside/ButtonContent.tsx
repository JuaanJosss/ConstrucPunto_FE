import type { ILinks } from "@/Types/Types"
import { ChevronDown } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { NavLink } from "react-router"
import AnimationContainer from "@/Components/Shared/AnimationContainer"


interface AsideProps {
    onClick?: () => void
    children: React.ReactNode
    isOpen?: boolean;
}

interface ButtonContentProp {
    onClick?: () => void
    isOpen?: boolean,
    sectionName: String,
    links: ILinks
    haveSubsections?: boolean;
}

const defaultClass = 'w-full text-xl flex items-center justify-center p-4 gap-1 hover:bg-green-200 hover:cursor-pointer transition-colors duration-200'
const classes = `flex p-4 text-lg capitalize items-center justify-center gap-1 hover:cursor-pointer hover:bg-green-200 transition-colors duration-200 `

export function ButtonContent({ onClick, isOpen, sectionName, links, haveSubsections = false }: ButtonContentProp) {
    if (!haveSubsections) {
        return (
            <NavLink className={({ isActive }) => (isActive ? `bg-emerald-200 ${classes}` : `${classes}`)} to={links.links[0]}> {sectionName}{links.icons[0]}</NavLink>
        )
    }

    return (
        <>
            <ButtonAside onClick={onClick} >
                {sectionName}
                <ChevronDown className={`size-4 transition duration-200  ${isOpen ? 'rotate-180' : ''}`} />
            </ButtonAside>

            <AnimatePresence>
                {isOpen && (
                    <AnimationContainer>
                        {links.links.map((link, i) => (
                            <NavLink key={i} to={link} className={({ isActive }) => (isActive ? `bg-emerald-200 ${classes}` : `${classes}`)}>
                                {links.text[i]} {links.icons[i]}
                            </NavLink>
                        ))}
                    </AnimationContainer>
                )}
            </AnimatePresence>
        </>
    )


}


function ButtonAside({ children, onClick }: AsideProps) {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`${defaultClass}`}>
            {children}
        </button>
    )
}
