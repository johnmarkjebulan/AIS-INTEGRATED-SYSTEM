const output = document.querySelector('#output');
let authToken = localStorage.getItem('ais_token') || '';

const show = (value) => {
  output.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
};

const formToJson = (form) => Object.fromEntries(new FormData(form).entries());

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
};

document.querySelector('#registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const data = await request('/user/register', {
      method: 'POST',
      body: JSON.stringify(formToJson(event.target))
    });

    if (data.data?.legacyStudentId) {
      document.querySelector('#legacyStudentId').value = data.data.legacyStudentId;
    }

    show(data);
  } catch (error) {
    show(error);
  }
});

document.querySelector('#loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const data = await request('/user/login', {
      method: 'POST',
      body: JSON.stringify(formToJson(event.target))
    });

    authToken = data.message?.find((item) => item.token)?.token || '';
    localStorage.setItem('ais_token', authToken);
    show(data);
  } catch (error) {
    show(error);
  }
});

document.querySelector('#fetchMyProfile').addEventListener('click', async () => {
  if (!authToken) {
    show('Login first so the portal can use your token to fetch your linked legacy student profile.');
    return;
  }

  try {
    const data = await request('/user/profile', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    show(data);
  } catch (error) {
    show(error);
  }
});

document.querySelector('#fetchById').addEventListener('click', async () => {
  const id = document.querySelector('#legacyStudentId').value.trim();

  if (!id) {
    show('Enter a legacy student id first.');
    return;
  }

  try {
    const data = await request(`/user/profile/${encodeURIComponent(id)}`);
    show(data);
  } catch (error) {
    show(error);
  }
});
