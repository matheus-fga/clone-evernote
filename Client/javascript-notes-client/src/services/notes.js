import Api from "./api";

const NotesService = {
  index: async () =>
    Api.get("/notes", {
      headers: { "x-access-token": localStorage.getItem("token") },
    }),
  create: async () =>
    Api.post(
      "/notes",
      { title: "Nova Nota", body: "Digite aqui..." },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    ),
};

export default NotesService;
