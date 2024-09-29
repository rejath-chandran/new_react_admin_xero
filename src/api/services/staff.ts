import api from "../axiosConfig";

export const fetchStaff = async (search: string = "") => {
    const url = search
      ? `/superadmin/staff/?pagination=false&search=${search}`
      : "/superadmin/staff/?pagination=false";
    const response = await api.get(url);
    return response.data;
};

export const UpdateStaff = async (data: any) => {
    const url = `/superadmin/updatestaff/`;
    const response = await api.post(url,data);
    return response.data;
};

export const CreateStaff = async (data: any) => {
    const url = `/superadmin/createstaff/`;
    const response = await api.post(url,data);
    return response.data;
};

export const DeleteStaff = async (data: any) => {
    const url = `/superadmin/deletestaff/`;
    const response = await api.post(url,data);
    return response.data;
};

export const ChangePassword = async (data: any) => {
    const url = `/changepassword/`;
    const response = await api.post(url,data);
    return response.data;
};
