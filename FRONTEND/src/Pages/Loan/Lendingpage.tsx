import ToolsListAdded from "@/Components/LendPage/ToolsListAdded";
import ToolsSearched from "@/Components/LendPage/ToolsSearched";

import { Modal } from "@/Components/Shared/Modal";
import { ModalContent } from "@/Components/LendPage/Modal/ModalContent";

import SearcBar from "@/Components/LendPage/SearcBar";
import useLendingPageHook from "@/hooks/LendingPageHook";
import BoxContainer from "@/Components/Shared/BoxContainer";


export default function Lendingpage() {
    const { client, toolsList, handlerSubmit, isOpen, equipments, switchOpen, handleSubmit, handlerSearchbar, register, errors } = useLendingPageHook();

    return (
        <div className="flex gap-3 w-12/12 mx-auto">
            <div className="md:w-8/12 @3xl:w-12/12">
                <BoxContainer>
                    <SearcBar handleSubmit={handleSubmit} handlerSubmit={handlerSearchbar} {...register('name')} error={errors.name} />
                </BoxContainer>
                <BoxContainer height="md:h-[80vh] @3xl:h-[85vh] overflow-y-scroll">
                    {equipments.map((tool, i) => <ToolsSearched key={i} tool={tool} idx={i} />)}
                </BoxContainer>
            </div>
            <div className="md:w-4/12 @3xl:w-3/12">
                <ToolsListAdded name={client?.name!} switchOpen={switchOpen} toolsList={toolsList} />
            </div>

            <Modal title="Pagaré" isOpen={isOpen} onClose={switchOpen} >
                <ModalContent client={client!} toolsList={toolsList} handlerSubmit={handlerSubmit} />
            </Modal>
        </div>
    )
}


