const api = async (url, params, method = "GET") => {
  const api = await fetch(`http://4254c7a6.ngrok.io${url}`, {
    method,
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const apiResponse = await api.json();
  return apiResponse;
};

export const faceMatchApi = params => api("/", params, "POST");

export const emailCheckApi = params => api("/usercheck", params, "POST");

export const employeeProfileApi = params =>
  api("/employeedetail", params, "POST");
