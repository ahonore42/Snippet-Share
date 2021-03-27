import ApiClient from './ApiConfig';

export const _DeleteAccount = async () => {
  try {
    const res = await ApiClient.delete(`/auth/delete`);
    return res.status;
  } catch(err){
    console.log(err);
  }
}

export const _CheckSession = async () => {
  try {
      const res = await ApiClient.get(`/auth/session`);
      return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const _LoginUser = async (formData) => {
  try {
    const res = await ApiClient.post('/auth/login', formData);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const _RegisterUser = async (formData) => {
  try {
    const res = ApiClient.post('/auth/register', formData)
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const _CreateCodeSnippet = async (snippet) => {
  try {
    const res = await ApiClient.post('/snippets', snippet);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const _GetCodeSnippets = async () => {
  try {
    const res = await ApiClient.get('/snippets')
    return res;
  } catch (err) {
    console.log(err);
  }
}