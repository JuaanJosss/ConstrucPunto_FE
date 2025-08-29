import type { ToolsActions, ITools } from '@/Types/StoreTypes';
import { create } from 'zustand'
import { createToolsSlice } from './ToolsSlice';

export const useToolsStore = create<ITools & ToolsActions>()((...a) => ({
    ...createToolsSlice(...a),
})) 
