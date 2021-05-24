import { paths } from '../paths';
import { REQUEST_MAP_DATA_SUCCESS, SAVE_JOURNEY_SUCCESS, CANCEL_PATH_CHANGE, CANCEL_ALL_CHANGES, EDIT_PATH, ADD_LOCATION, DELETE_LOCATION, INSERT_LOCATION } from '../../actions';

const SAMPLE_PATH_1 = {
    _id: '5d2d1681717e67e98d6bc6fe',
    name: 'Sample Path 1',
    sessions: ['5d0634bd9272c723fcb28c21'],
    startLoc: '5d2d167f717e67e98d6bc6fb',
    endLoc: '5d2d1681717e67e98d6bc6fd',
}

const SAMPLE_PATH_2 = {
    _id: '5d2d1683717e67e98d6bc700',
    name: 'Sample Path 2',
    sessions: ['5d0634bd9272c723fcb28c21', '5d09cbd9469ceb29f836bf63'],
    startLoc: '5d2d1681717e67e98d6bc6fd',
    endLoc: '5d2d1683717e67e98d6bc6ff',
}

const SAMPLE_PATH_3 = {
    _id: '5d2fca6314dd7ed185c99d45',
    name: 'Sample Path 3',
    sessions: [],
    startLoc: '5d2d1683717e67e98d6bc6ff',
    endLoc: '5d2fca0614dd7ed185c99d40',
}

describe('locations reducer', () => {
    it('returns the initial state', () => {
        expect(paths(undefined, {})).toEqual({
            unsavedPaths: {},
            unsavedLastLocation: null,
            savedPaths: {},
            savedLastLocation: null,
        })
    })

    it('copies the data from an array of path objects into an object keyed with path ids and sets it to the unsavedPaths and savedPaths', () => {
        const beforeState = {
            unsavedPaths: {},
            unsavedLastLocation: null,
            savedPaths: {},
            savedLastLocation: null
        }
        const action = {
            type: REQUEST_MAP_DATA_SUCCESS,
            paths: [
                SAMPLE_PATH_1,
                SAMPLE_PATH_2,
                SAMPLE_PATH_3
            ],
            lastLoc: SAMPLE_PATH_3.endLoc
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            savedLastLocation: SAMPLE_PATH_3.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('replaces savedPaths with unsavedPaths and isNew and isEdited properties are unflagged after SAVE_JOURNEY_SUCCESS', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: { ...SAMPLE_PATH_1, name: 'Edited Name', isEdited: true },
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2 },
                [SAMPLE_PATH_3._id]: { ...SAMPLE_PATH_3, isNew: true }
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        const action = {
            type: SAVE_JOURNEY_SUCCESS
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: { ...SAMPLE_PATH_1, name: 'Edited Name', isEdited: false, isNew: false },
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2, isEdited: false, isNew: false },
                [SAMPLE_PATH_3._id]: { ...SAMPLE_PATH_3, isEdited: false, isNew: false }
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: { ...SAMPLE_PATH_1, name: 'Edited Name', isEdited: false, isNew: false },
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2, isEdited: false, isNew: false },
                [SAMPLE_PATH_3._id]: { ...SAMPLE_PATH_3, isEdited: false, isNew: false }
            },
            savedLastLocation: SAMPLE_PATH_3.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('replaces the path in unsavedPaths with a copy of the path in savedPaths after CANCEL_PATH_CHANGE', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: { ...SAMPLE_PATH_1, name: 'Edited Name', isEdited: true },
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2, name: 'Also Edited', isEdited: true },
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        const action = {
            type: CANCEL_PATH_CHANGE,
            id: SAMPLE_PATH_1._id
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2, name: 'Also Edited', isEdited: true }
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('replaces the unsavedPaths with the savedPaths after CANCEL_ALL_CHANGES', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: { ...SAMPLE_PATH_1, name: 'Edited Name', isEdited: true },
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2 },
                [SAMPLE_PATH_3._id]: { ...SAMPLE_PATH_3, isNew: true }
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        const action = {
            type: CANCEL_ALL_CHANGES
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('replaces the edited path in unsaved path with the path from the action after EDIT_PATH', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        const action = {
            type: EDIT_PATH,
            path: { ...SAMPLE_PATH_2, name: 'New Name' }
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: { ...SAMPLE_PATH_2, name: 'New Name', isEdited: true }
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('creates a new path starting at the last location and ending at the new location after ADD_LOCATION action', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        const action = {
            type: ADD_LOCATION,
            newLocID: '5d2d1683717e67e98d6bc6f8',
            newPathID: '5d2d1683717e67e98d6bc667'
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
                '5d2d1683717e67e98d6bc667': {
                    _id: '5d2d1683717e67e98d6bc667',
                    name: 'New Path',
                    sessions: [],
                    startLoc: SAMPLE_PATH_2.endLoc,
                    endLoc: '5d2d1683717e67e98d6bc6f8',
                    isNew: true
                }
            },
            unsavedLastLocation: '5d2d1683717e67e98d6bc6f8',
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2
            },
            savedLastLocation: SAMPLE_PATH_2.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('deletes the last path after the last location is deleted after DELETE_PATH action', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            savedLastLocation: SAMPLE_PATH_3.endLoc
        }
        const action = {
            type: DELETE_LOCATION,
            id: SAMPLE_PATH_3.endLoc
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
            },
            unsavedLastLocation: SAMPLE_PATH_2.endLoc,
            savedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_2._id]: SAMPLE_PATH_2,
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            savedLastLocation: SAMPLE_PATH_3.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })

    it('creates a new path starting at the new location and ending at the endLoc of the targeted path after INSERT_PATH action', () => {
        const beforeState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: SAMPLE_PATH_1,
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            savedLastLocation: SAMPLE_PATH_3.endLoc
        }
        const action = {
            type: INSERT_LOCATION,
            endLoc: SAMPLE_PATH_1.endLoc,
            pathID: SAMPLE_PATH_1._id,
            newLocID: '5d2d1683717e67e98d6bc667',
            newPathID: '5d2d1683717e67e98d6bc644'
        }
        const afterState = {
            unsavedPaths: {
                [SAMPLE_PATH_1._id]: {...SAMPLE_PATH_1, endLoc: '5d2d1683717e67e98d6bc667'},
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3,
                '5d2d1683717e67e98d6bc644': {
                    _id: '5d2d1683717e67e98d6bc644',
                    name: 'New Path',
                    sessions: [],
                    startLoc: '5d2d1683717e67e98d6bc667',
                    endLoc: SAMPLE_PATH_1.endLoc,
                    isNew: true
                }
            },
            unsavedLastLocation: SAMPLE_PATH_3.endLoc,
            savedPaths: {
                [SAMPLE_PATH_3._id]: SAMPLE_PATH_3
            },
            savedLastLocation: SAMPLE_PATH_3.endLoc
        }
        expect(paths(beforeState, action)).toEqual(afterState)
    })
})