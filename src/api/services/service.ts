import api from "../axiosConfig";

export const fetchServices = async (search: string = "") => {
    const url = search
      ? `/superadmin/services/?pagination=false&search=${search}`
      : "/superadmin/services/?pagination=false";
    const response = await api.get(url);
    return response.data;
};

export const CreateServices = async (data: any) => {
    const url =`/superadmin/createservice/`
    const response = await api.post(url,data);
    return response.data;
};

export const UpdateServices = async (data: any) => {
    const url = `/superadmin/updateservice/`;
    const response = await api.post(url,data);
    return response.data;
};

export const DeleteServices = async (data: any) => {
    const url = `/superadmin/deleteservice/`;
    const response = await api.post(url,data);
    return response.data;
};

