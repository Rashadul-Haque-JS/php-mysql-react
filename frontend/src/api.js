import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // 
});

const api = {
  getTasks: () => axiosInstance.get('/app/controllers/GetItems.php'), 
  createTask: (task) => axiosInstance.post('/app/controllers/CreateItem.php', task),
  updateTask: (id, task) => axiosInstance.put(`/app/controllers/UpdateItem.php?id=${id}`, task),
  getTask: (id) => axiosInstance.get(`app/controllers/GetItem.php?id=${id}`), 
  deleteTask: (id) => axiosInstance.delete(`/app/controllers/DeleteItem.php?id=${id}`), 
};

export default api;
