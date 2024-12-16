
export default function useApiManager() {

    const fnApiCall =async({endpoint = 'note', method = 'GET', body} = {})=>{
        try {
            const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/${endpoint}`;

            let requestOptions = {
                method: method,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
            };
    
            if (method.toLowerCase() !== 'get') {
                requestOptions['body'] = JSON.stringify(body)
            }

            const response = await fetch(apiUrl, requestOptions);
            const responseJson = await response.json();
            return responseJson;

        } catch (error) {
            console.log('error =========>', error);
            return error
        }
    };
    
    return { 
        fnApiCall
    }
}