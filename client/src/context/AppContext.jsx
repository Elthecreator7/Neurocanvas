import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
   const [user, setUser] = useState(null);
   const [showLogin, setShowLogin] = useState(false);
   const [token, setToken] = useState(localStorage.getItem('token'))
   const [credit, setCredit] = useState(false)
   const [originalImage, setOriginalImage] = useState(null)
   const [resultImage, setResultImage] = useState(null)
   const [loading, setLoading] = useState(false)


   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const navigate = useNavigate()

   const handleGoogleLogin = async (credential) => {
      try {
         const { data } = await axios.post(`${backendUrl}/api/user/google-login`, { token: credential });
         if (data.success) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token', data.token);
            setShowLogin(false);
            toast.success("Welcome, " + data.user.name);
            console.log("Google login user:", data.user)
         } else {
            toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message);
      }
   }


   const handleFileChange = async (event, navigate) => {
      const file = event.target.files[0];
      if (!file) return;

      setOriginalImage(URL.createObjectURL(file));
      setLoading(true);

      const formData = new FormData();
      formData.append('image', file);
      // formData.append('userId', user.id)

      try {
         const res = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
            headers: {
               token,
               "Content-Type": 'multipart/form-data'
            }
         }
         );
         setResultImage(res.data.image);
         navigate('/bgr-result')
         loadCreditData()
      } catch (error) {
         console.log("Upload error:", error)
         toast.error('Failed to remove background')
      } finally {
         setLoading(false)
      }
   }

   const loadCreditData = async () => {
      try {

         const { data } = await axios.get(`${backendUrl}/api/user/credits`, { headers: { token } })

         if (data.success) {
            setUser(data.user);
            setCredit(data.credits);
         }


      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   const generateImage = async (prompt) => {
      try {
         const { data } = await axios.post(`${backendUrl}/api/image/generate-image`, { prompt }, { headers: { token } })

         if (data.success) {
            loadCreditData()
            return data.image
         } else {
            toast.error(data.message)
            loadCreditData()
            if (data.creditBalance < 8) {
               navigate('/buy-credit')
            }
         }
      } catch (error) {
         toast.error(error.message)
      }
   }

   const logout = () => {
      localStorage.removeItem('token');
      setToken('');
      setUser(null)
   }

   useEffect(() => {
     loadCreditData();
   }, [token]);

   const value = {
      user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditData, logout, generateImage, handleGoogleLogin, originalImage,
      resultImage, setOriginalImage, setResultImage, handleFileChange, loading, setLoading
   }

   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}

export default AppContextProvider