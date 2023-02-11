import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AxiosInterceptor(props: any) {
    const navigate = useNavigate();
    const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

    useEffect(() => {
        // async function interceptorToCheckError() {
            const interceptor = axios.interceptors.response.use(async response => {
                await sleep(1000);
                return response;
              }, (error: AxiosError<any>) => {
                console.log('interceptor run to get error msg');
                switch (error.response?.status) {
                    case 400:
                        if (error.response?.data.message) {
                        const errors = error.response?.data.message.split('; ').filter((message: string) => message !== '');
                        throw errors;
                        }
                        toast.error(error.response?.data.message, {theme: "colored"});
                        break;
                    
                    case 404:
                        navigate('/not-found');
                        break;

                    default:
                        toast.error(error.response?.data.message, {theme: "dark"});
                        break;
                }
                console.log(error.response);
                return Promise.reject(error);
            });
    
            return () => {
                axios.interceptors.response.eject(interceptor);
            }
        // }

        // interceptorToCheckError();
    }, [navigate]);

    return props.children;
}