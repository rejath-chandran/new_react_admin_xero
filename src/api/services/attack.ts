import api from "../axiosConfig";

export const fetchAttack = async (search: string = "") => {
    const url = search
      ? `/superadmin/attacks/?pagination=false&search=${search}`
      : "/superadmin/attacks/?pagination=false";
    const response = await api.get(url);
    return response.data;
};

export const UpdateAttack = async (data: any) => {
    const url = `/superadmin/updateattack/`;
    const response = await api.post(url,data);
    return response.data;
};

export const CreateAttack = async (data: any) => {
    const url = `/superadmin/createattack/`;
    const response = await api.post(url,data);
    return response.data;
};

export const DeleteAttack = async (data: any) => {
    const url = `/superadmin/deleteattack/`;
    const response = await api.post(url,data);
    return response.data;
};

