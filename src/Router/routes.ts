const ClientRoutes = {
    FIND: 'find-client',
    EDIT: 'edit-client',
    REGISTER: 'register-client',
    REGISTER_LOAN: 'register-client-loan',
    CLIENT_MANAGEMENT: 'client-management',
}

const equipmentRoutes = {
    EQUIPMENT_MANAGEMENT: 'equipment-management',
    ADD: 'add-equipment',
    EDIT: 'edit-equipment'
}

const lendsRoutes = {
    ADD: 'new-lend',
    VIEW_ACTIVE_COMPLETED: 'view-active-lend-completed',
    VIEW_ACTIVE: 'view-active-lend',
    EDIT_RETURN: 'edit-returns',
    HISTORY: 'history-lend'
}

export const routes = {
    HOME: '/',
    LEND: lendsRoutes,
    FORMS: 'form',
    CLIENT: ClientRoutes,
    EQUIPMENT: equipmentRoutes,
    INVOICE: 'view-invoice'
}
