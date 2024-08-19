import {ToastOptions} from "react-simple-toasts";
import './toastStyles.css';

const ERROR_CONFIG : ToastOptions = {position: 'top-center', clickClosable: true,maxVisibleToasts: 3, className: "error-toast", duration: 5000};
const SUCCESS_CONFIG : ToastOptions ={position: 'top-center', clickClosable: true,maxVisibleToasts: 1, className: "success-toast", duration: 5000};

export default {ERROR_CONFIG, SUCCESS_CONFIG};
