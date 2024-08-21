
export const formatDateLoc = (date: string) => {
    const dateSplit = date.split('T')[0].split('-');
    return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
}