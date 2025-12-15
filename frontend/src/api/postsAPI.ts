const POST_API_URL = 'http://localhost:3001/posts';

export const findAllExceptMyPost = async (userName: string)=> {
    console.log('in trying')
    const response = await fetch(`${POST_API_URL}/${userName}`,{
        method : 'GET'
    });
    if (!response.ok){
        console.log(response);
    throw new Error('Failed to fetch users');
    }
    console.log(response.json)
    return response.json();
};

export const postImage = async (photoSrc : string, userName: string)=> {

    const response = await fetch(POST_API_URL,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({photoSrc,userName}),
    });
    if (!response.ok){
        console.log(response);
    throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const postLike = async (postId: number ,userName : string )=> {

    const response = await fetch(`${POST_API_URL}/${postId}/${userName}`,{
        method: 'POST',
    });
    if (!response.ok){
        console.log(response);
    throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const deleteLike = async (postId: number ,userName : string )=> {

    const response = await fetch(`${POST_API_URL}/${postId}/${userName}`,{
        method: 'DELETE',
    });
    if (!response.ok){
        console.log(response);
    throw new Error('Failed to fetch users');
    }
    return response.json();
};