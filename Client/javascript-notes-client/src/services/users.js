import Api from "./api";

const UserService = {
  register: (params) => Api.post("/users/register", params),
  login: async (params) => {
    const response = await Api.post("/users/login", params);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
  },
  logout: () => localStorage.clear(),
  update: async (params) => {
    const response = await Api.put("/users", params, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    const user = JSON.stringify(response.data);
    localStorage.setItem("user", user);
  },
  delete: () =>
    Api.delete("/users", {
      headers: { "x-access-token": localStorage.getItem("token") },
    }),
  updatePassword: async (params) => {
    const response = await Api.put("/users/password", params, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    if (response.data.user) {
      const user = JSON.stringify(response.data.user);
      localStorage.setItem("user", user);
      return response.data;
    } else return response.data;
  },
};

export default UserService;
