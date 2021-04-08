import userStore from './user'

export function createStore(){
    return {
        userStore
    }
}
export const store = createStore();
export type TStore = ReturnType<typeof createStore>;