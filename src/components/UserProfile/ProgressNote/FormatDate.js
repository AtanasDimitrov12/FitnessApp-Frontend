export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Add leading zero if needed
    const day = (`0${d.getDate()}`).slice(-2); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };
  