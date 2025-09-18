import type { EquipmentActions, ITools } from '@/Types/StoreTypes';
import { create } from 'zustand'
import { createEquipmentSlice } from './EquipmentSlice';

export const useEquipmentsStore = create<ITools & EquipmentActions>()((...a) => ({
    ...createEquipmentSlice(...a),
})) 
