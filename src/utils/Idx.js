import { IDX } from '@ceramicstudio/idx'

export function createIDX(ceramic) {
    const idx = new IDX({ ceramic })
    window.idx = idx
    return idx
}
