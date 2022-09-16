export default class APIService{
    // Insert an article
    static InsertArticle(body){

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        return fetch('https://g1nmdzeyx4.execute-api.us-west-2.amazonaws.com/staging', requestOptions)
        .then(response => response.json())
        .catch(error => console.log(error))
        }
        
    
}