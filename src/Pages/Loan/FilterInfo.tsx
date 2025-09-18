import Paragraph from "@/Components/Shared/Paragraph";

export default function FilterInfo({ fecha, document }: { fecha: string, document: string }) {
    return (
        <div className="text-lg font-semibold flex gap-2">
            <Paragraph section="Filtros" text={''} />
            {fecha && <Paragraph section="Fecha" text={fecha} />}
            {document && <Paragraph section="Documento" text={document} />}
        </div>
    )
}
