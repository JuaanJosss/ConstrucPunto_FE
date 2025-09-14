export default function Paragraph({ section, text }: { section: string, text: string | number }) {
    return <p className="text-gray-500">{section}:  <span className="text-black">{text}</span></p>
}
