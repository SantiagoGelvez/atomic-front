import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status >= 500) {
        Swal.fire({
            icon: "error",
            title: "Internal Server Error",
            html: error?.response?.data?.text || error?.response?.data
        });
    }
    return Promise.reject(error);
});

export default axiosInstance;