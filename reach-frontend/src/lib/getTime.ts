
function getTime(){

    let date = new Date();
    
    let hours:number = date.getHours();
    let minutes:number|string = date.getMinutes() ;
    
    // Check whether AM or PM
    let newformat:string = hours >= 12 ? "PM" : "AM";
    
    // Find current hour in AM-PM Format
    hours = hours % 12;
    
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    
    return `${hours}:${minutes} ${newformat}`


}
export default getTime

