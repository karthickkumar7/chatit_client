export const BASEURL = 'http://localhost:5000/api';

export const postRequest = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    const data = await res.json();
    if (!res.ok) {
        let message;
        if (data?.error) message = data.error;
        else message = 'Something went wrong!';
        return { error: true, message };
    }

    return data;
};

export const getRequest = async (url) => {
    const res = await fetch(url);

    const data = await res.json();
    if (!res.ok) {
        let message;
        if (data?.error) message = data.error;
        else message = 'Something went wrong!';
        return { error: true, message };
    }

    return data;
};
