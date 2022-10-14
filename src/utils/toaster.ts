import { ToasterType } from "./interfaces";
import { toast } from 'react-toastify';

export const toaster = (type: ToasterType, message: string) => {
    const options: any = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
    }

    switch (type) {
        case ToasterType.INFO:
            toast.info(message, options);
            break;
        case ToasterType.SUCCESS:
            toast.success(message, options);
            break;

        case ToasterType.ERROR:
            toast.error(message, options);
            break;
    }
}
