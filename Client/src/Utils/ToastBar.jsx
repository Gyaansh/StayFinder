import toast from 'react-hot-toast';

export const showSuccess = (message)=>{
    toast.success(message);
}
export const showError = (message)=>{
    toast.error(message);
}
export const showPromise = (promise,waiting, messageResolve, messageReject)=>{
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const wrappedPromise = Promise.all([
        promise,
        delay(1000) // ensures at least 2 sec loading
    ]);
    toast.promise(wrappedPromise, {
        loading: waiting,
        success: messageResolve,
        error: messageReject,
    });
    
}
export const showLoading = (message)=>{
    toast.loading(message,{
        duration:2000,
    });
}
export default "Toast";