import toast from 'react-hot-toast';

export const showSuccess = (message)=>{
    toast.success(message);
}
export const showError = (message)=>{
    toast.error(message);
}
export const showPromise = (promise,message)=>{
    toast.promise(promise, {
    loading: message.loading,
    success: message.success,
    error: message.error,
  });

}
export default "Toast";