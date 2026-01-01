const POST_API_URL = "http://localhost:3001/posts";

export const findAllExceptMyPost = async (userName: string) => {
  console.log(`${POST_API_URL}/${userName}`);
  const response = await fetch(`${POST_API_URL}/${userName}`, {
    method: "GET",
  });
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};

export const postImage = async (photoSrc: string, userName: string) => {
  const response = await fetch(`${POST_API_URL}/uploadImage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photoSrc, userName }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};

export const postLike = async (postId: number, userName: string) => {
  const response = await fetch(
    `${POST_API_URL}/postLike/${postId}/${userName}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};

export const deleteLike = async (postId: number, userName: string) => {
  const response = await fetch(
    `${POST_API_URL}/deleteLike/${postId}/${userName}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};
export const deletePost = async (postId: number) => {
  console.log(`${POST_API_URL}/${postId}`);
  const response = await fetch(`${POST_API_URL}/deletePost/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};
