const USER_API_URL = 'http://localhost:3001/users';

export const getProfileInfo = async (userName: string, curentUser: string)=> {
    console.log(`${USER_API_URL}/${userName}/${curentUser}`)
    const response = await fetch(`${USER_API_URL}/${userName}/${curentUser}`,{
        method : 'GET'
    });
    if (!response.ok){
    throw new Error('Failed to fetch users');
    }
    console.log(response.json)
    return response.json();
};

export const getProfilepicture = async (userName: string)=> {
    const response = await fetch(`${USER_API_URL}/${userName}`,{
        method : 'GET'
    });
    if (!response.ok){
        throw new Error('Failed to fetch users');
    }
    return response.text();
};
