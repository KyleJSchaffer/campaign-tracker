import { locations } from '../locations'
import {
    REQUEST_MAP_DATA_SUCCESS,
    SAVE_JOURNEY_SUCCESS,
    EDIT_LOCATION,
    ADD_LOCATION,
    DELETE_LOCATION,
    INSERT_LOCATION,
    CANCEL_LOCATION_CHANGE,
    CANCEL_ALL_CHANGES
} from '../../actions';

const SAMPLE_LOCATION_1 = {
    _id: '5d2d1681717e67e98d6bc6fd',
    name: 'Sample Location 1',
    xPos: .15,
    yPos: .15,
    sessions: []
}

const SAMPLE_LOCATION_2 = {
    _id: '5d2d167f717e67e98d6bc6fb',
    name: 'Sample Location 2',
    xPos: .25,
    yPos: .25,
    sessions: ['5cc0de3fcca7171f10e18835', '5d0634bd9272c723fcb28c21']
}

const SAMPLE_LOCATION_3 = {
    _id: '5d2fca0614dd7ed185c99d40',
    name: 'Sample Location 3',
    xPos: .35,
    yPos: .35,
    sessions: ['5d09cdbdfcc2710f1cc3e369', '5d09f8f4a2c79a3a6169c13b']
}

describe('locations reducer', () => {
    it('returns the initial state', () => {
        expect(locations(undefined, {})).toEqual(
            {
                unsavedLocations: {},
                savedLocations: {}
            }
        )
    })

    it('returns a copy of the fetched locations as an object keyed with location ids after REUQEST_MAP_DATA_SUCCESS', () => {
        let beforeState = {
            unsavedLocations: {},
            savedLocations: {}
        }
        let action = {
            type: REQUEST_MAP_DATA_SUCCESS,
            locations: [
                SAMPLE_LOCATION_1,
                SAMPLE_LOCATION_2
            ]
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState);
    })

    it('replaces savedLocation with unsavedLocations and isNew and isEdited are flagged false after SAVE_JOURNEY_SUCCESS', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: { ...SAMPLE_LOCATION_1 },
                [SAMPLE_LOCATION_2._id]: { ...SAMPLE_LOCATION_2, name: 'New Sample Name', isEdited: true },
                [SAMPLE_LOCATION_3._id]: { ...SAMPLE_LOCATION_3, isNew: true }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: SAVE_JOURNEY_SUCCESS
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: { ...SAMPLE_LOCATION_1, isEdited: false, isNew: false },
                [SAMPLE_LOCATION_2._id]: { ...SAMPLE_LOCATION_2, name: 'New Sample Name', isEdited: false, isNew: false },
                [SAMPLE_LOCATION_3._id]: { ...SAMPLE_LOCATION_3, isEdited: false, isNew: false }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: { ...SAMPLE_LOCATION_1, isEdited: false, isNew: false },
                [SAMPLE_LOCATION_2._id]: { ...SAMPLE_LOCATION_2, name: 'New Sample Name', isEdited: false, isNew: false },
                [SAMPLE_LOCATION_3._id]: { ...SAMPLE_LOCATION_3, isEdited: false, isNew: false }
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })

    it('replaces the edited location in unsavedLocations after EDIT_LOCATION', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_3._id]: SAMPLE_LOCATION_3
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: EDIT_LOCATION,
            location: { ...SAMPLE_LOCATION_3, xPos: .5 }
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_3._id]: { ...SAMPLE_LOCATION_3, xPos: .5, isEdited: true }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })

    it('adds the new location to unsavedLocations after ADD_LOCATION', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: ADD_LOCATION,
            xPos: .1,
            yPos: .2,
            newLocID: '5d310af5ce2002793514aae5'
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2,
                '5d310af5ce2002793514aae5': {
                    _id: '5d310af5ce2002793514aae5',
                    name: 'New Location',
                    xPos: .1,
                    yPos: .2,
                    sessions: [],
                    isNew: true
                }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })

    it('removes the deleted location from unsavedLocations after DELETE_LOCATION', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: DELETE_LOCATION,
            id: SAMPLE_LOCATION_1._id
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })

    it('adds a new location to unsavedLocations at the midpoint between the startLoc and endLoc after INSERT_LOCATION', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: INSERT_LOCATION,
            startLoc: SAMPLE_LOCATION_1._id,
            endLoc: SAMPLE_LOCATION_2._id,
            newLocID: '5d36476cc1b9e94abce4bafd',
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2,
                '5d36476cc1b9e94abce4bafd': {
                    _id: '5d36476cc1b9e94abce4bafd',
                    name: 'New Location',
                    xPos: (SAMPLE_LOCATION_1.xPos + SAMPLE_LOCATION_2.xPos) / 2,
                    yPos: (SAMPLE_LOCATION_1.yPos + SAMPLE_LOCATION_2.yPos) / 2,
                    sessions: [],
                    isNew: true
                }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })

    it('replaces the location in unsavedLocations with the location in savedLocations after CANCEL_LOCATION_CHANGE', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: { ...SAMPLE_LOCATION_1, name: 'Edited Name', isEdited: true },
                [SAMPLE_LOCATION_2._id]: { ...SAMPLE_LOCATION_2, name: 'Also Edited', isEdited: true }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: CANCEL_LOCATION_CHANGE,
            id: SAMPLE_LOCATION_2._id
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: { ...SAMPLE_LOCATION_1, name: 'Edited Name', isEdited: true },
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })

    it('replaces unsavedLocations with a copy of savedLocations after CANCEL_ALL_CHANGES', () => {
        let beforeState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: { ...SAMPLE_LOCATION_1, name: 'Edited Name', isEdited: true },
                [SAMPLE_LOCATION_2._id]: { ...SAMPLE_LOCATION_2, name: 'Also Edited', isEdited: true }
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        let action = {
            type: CANCEL_ALL_CHANGES
        }
        let afterState = {
            unsavedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            },
            savedLocations: {
                [SAMPLE_LOCATION_1._id]: SAMPLE_LOCATION_1,
                [SAMPLE_LOCATION_2._id]: SAMPLE_LOCATION_2
            }
        }
        expect(locations(beforeState, action)).toEqual(afterState)
    })
})
