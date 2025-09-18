
interface IProps {
    section: string,
    text: string | number,
    classes?: string
}

export default function Paragraph({ classes, section, text }: IProps) {
    return <p className={`text-gray-500 ${classes}`}>{section}:  <span className="text-black">{text}</span></p>
}
