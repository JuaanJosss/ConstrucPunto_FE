import type { ILinks } from "@/Types/Types"
import { ChevronDown } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { NavLink } from "react-router"
import AnimationContainer from "@/Components/Shared/AnimationContainer"
import { useState } from "react"


interface AsideProps {
    onClick?: () => void
    children: React.ReactNode
    isOpen?: boolean;
}

type ButtonContentProp = Pick<AsideProps, 'isOpen' | 'onClick'> & {
    sectionName: string,
    links: ILinks
}

const defaultClass = 'w-full text-lg flex items-center justify-center p-4 gap-1 hover:bg-green-200 hover:cursor-pointer transition-colors duration-200'
const classes = `flex p-4 text-lg capitalize items-center justify-center gap-1 hover:cursor-pointer hover:bg-green-200 transition-colors duration-200 `

export function ButtonWithSubSections({ sectionName, links }: ButtonContentProp) {
    const [openSection, setOpenSection] = useState<boolean>(false)

    const toggleSection = () => {
        setOpenSection(!openSection)
    }

    return (
        <>
            <ButtonAside onClick={toggleSection} >
                {sectionName}
                <ChevronDown className={`size-4 transition duration-200 ${openSection ? 'rotate-180' : ''}`} />
            </ButtonAside>

            <AnimatePresence>
                {openSection && (
                    <AnimationContainer>
                        {
                            links.links.map((link, i) => (
                                <NavLink key={i} to={link} className={({ isActive }) => (isActive ? `bg-emerald-200 ${classes}` : `${classes}`)}>
                                    {links.text[i]} {links.icons[i]}
                                </NavLink>
                            ))
                        }
                    </AnimationContainer>
                )}
            </AnimatePresence>
        </>
    )
}

export function ButtonSection({ sectionName, links }: ButtonContentProp) {
    return (
        <NavLink
            className={({ isActive }) => (isActive ? `bg-emerald-200 ${classes}` : `${classes}`)}
            to={links.links[0]}> {sectionName}{links.icons[0]}</NavLink>
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


export const AsideButtons = {
    ButtonSection,
    ButtonWithSubSections
}