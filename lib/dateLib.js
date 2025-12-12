export function getFullMonth(month) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[month];
}

export function formatDate(date) {
    let pattern = /\d{4}-\d{2}-\d{2}/;
    let output;
    if(!pattern.test(date)) {
        output = "Invalid Date";
    } else {
        output = date + "T00:00:00.000Z";
    }
    return output;
}

export function toFormDate(date){
  const options = {
    hour12: false
  };
  let time = date.toLocaleTimeString('en-us', options);
  let dateOnly = date.toISOString().split('T')[0];
  
}
