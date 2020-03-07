// create an action
export const SelectSong = (song) => {
    // return an action
    return {
        type: 'SONG_SELECTED',
        payload: song
    };
};
